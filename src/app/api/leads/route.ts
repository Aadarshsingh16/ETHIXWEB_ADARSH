import { NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation";
import { HttpError, ok, fail } from "@/lib/http";
import { verifyTurnstile } from "@/lib/turnstile";
import { hashIp, getClientIp, checkRateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured, addDemoLead } from "@/lib/mock-leads";

export async function POST(req: NextRequest) {
  try {
    // 1. Content-Type and payload size check (< 10 KB)
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new HttpError(400, "invalid_content_type", "Content-Type must be application/json");
    }

    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 10240) {
      throw new HttpError(413, "payload_too_large", "Payload exceeds 10 KB limit");
    }

    const body = await req.json().catch(() => {
      throw new HttpError(400, "invalid_json", "Malformed JSON payload");
    });

    // 2. Validate with shared Zod schema
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (path) fields[path] = err.message;
      });
      throw new HttpError(422, "validation_failed", "Please correct the highlighted fields", fields);
    }

    const data = parsed.data;

    // 3. Honeypot: if hidden website field is filled, silently return 201 success without saving
    if (data.website && data.website.trim().length > 0) {
      return ok({ id: "hp_ok" }, 201);
    }

    // 4. Time-trap: detect bots submitting too fast (< 3s) or stale form (> 2h)
    const now = Date.now();
    const elapsed = now - data.startedAt;
    if (elapsed < 3000) {
      throw new HttpError(400, "too_fast", "Form submitted too quickly. Please take your time.");
    }
    if (elapsed > 7200000) {
      throw new HttpError(400, "expired", "Form session expired. Please refresh the page and try again.");
    }

    // 5. Cloudflare Turnstile verification
    const clientIp = getClientIp(req);
    const isValidToken = await verifyTurnstile(data.turnstileToken, clientIp);
    if (!isValidToken) {
      throw new HttpError(403, "turnstile_failed", "Bot verification failed. Please try again.");
    }

    // 6. Rate limit check via hashed IP
    const ipHash = hashIp(clientIp);
    await checkRateLimit(ipHash);

    // 7. Store lead
    // In local development when Supabase is not configured, save directly to demo store
    if (!isSupabaseConfigured()) {
      const demoLead = addDemoLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        city: data.city,
        service: data.service,
        budget: data.budget || null,
        contact_pref: data.contactPref,
        message: data.message || null,
      });
      return ok({ id: demoLead.id }, 201);
    }

    // Insert lead using Supabase Service-Role Admin Client (RLS bypassed on server)
    const supabase = createAdminClient();
    const userAgent = req.headers.get("user-agent") || "";
    const sourcePage = req.headers.get("referer") || "/contact";

    const { data: inserted, error: dbError } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone, // Already normalized to 10 digits
        company: data.company || null,
        city: data.city,
        service: data.service,
        budget: data.budget || null,
        contact_pref: data.contactPref,
        message: data.message || null,
        consent: data.consent,
        ip_hash: ipHash,
        user_agent: userAgent.slice(0, 500),
        source_page: sourcePage.slice(0, 200),
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      // In offline/dev environment without real Supabase connection, return a dev mock id
      if (process.env.NODE_ENV === "development" && dbError.message.includes("fetch failed")) {
        return ok({ id: "dev_mock_id_" + Date.now() }, 201);
      }
      throw new HttpError(500, "db_error", "Failed to save enquiry. Please contact us via WhatsApp.");
    }

    // 8. Success response
    return ok({ id: inserted?.id || "ok" }, 201);
  } catch (err) {
    return fail(err);
  }
}
