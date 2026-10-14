import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { ok, fail, HttpError } from "@/lib/http";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return fail(new HttpError(400, "invalid_json", "Invalid request body"));
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return fail(new HttpError(422, "validation_failed", "Please enter a valid email and password"));
    }

    const { email, password } = parsed.data;

    // Small delay to harden against brute-force timing attacks
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Support Local Development Demo Login (admin@ethixweb.com / admin123)
    if (email === "admin@ethixweb.com" && password === "admin123") {
      const cookieStore = await cookies();
      cookieStore.set("ethixweb_demo_session", "admin@ethixweb.com", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return ok({
        user: {
          id: "demo-admin-01",
          email: "admin@ethixweb.com",
        },
      });
    }

    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return fail(new HttpError(401, "invalid_credentials", "Invalid email or password"));
    }

    // Verify against ADMIN_EMAILS allowlist
    const allowlist = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!data.user.email || !allowlist.includes(data.user.email.toLowerCase())) {
      // Immediately sign out non-admin users
      await supabase.auth.signOut();
      return fail(new HttpError(403, "not_admin", "Access denied: not an approved admin account"));
    }

    return ok({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (err) {
    return fail(err);
  }
}
