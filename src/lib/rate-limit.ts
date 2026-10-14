import crypto from "crypto";
import { createAdminClient } from "./supabase/admin";
import { HttpError } from "./http";

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "ethixweb-default-salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex");
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Checks if the hashed IP has submitted 3 or more leads in the last 10 minutes.
 * Rejects with 429 if rate limit is exceeded.
 */
export async function checkRateLimit(ipHash: string): Promise<void> {
  const supabase = createAdminClient();

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  try {
    const { count, error } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", tenMinutesAgo);

    if (error) {
      console.warn("Rate limit check db error (skipped in dev):", error.message);
      return;
    }

    if (count !== null && count >= 3) {
      throw new HttpError(
        429,
        "rate_limited",
        "Too many enquiries submitted from this network. Please wait 10 minutes or message us on WhatsApp."
      );
    }
  } catch (err) {
    if (err instanceof HttpError) throw err;
    console.warn("Rate limit check failure:", err);
  }
}
