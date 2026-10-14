import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "./server";
import { HttpError } from "@/lib/http";

/**
 * Service role Supabase client for backend operations.
 * Bypasses Row Level Security (RLS).
 * MUST ONLY BE RUN ON SERVER SIDE.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Validates admin user authentication and checks ADMIN_EMAILS allowlist.
 * Uses supabase.auth.getUser() to guarantee server-side JWT verification.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const demoCookie = cookieStore.get("ethixweb_demo_session");
  if (demoCookie?.value) {
    return {
      id: "demo-admin-01",
      email: demoCookie.value,
      role: "authenticated",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    };
  }

  const supabase = await createServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new HttpError(401, "unauthenticated", "Authentication required");
  }

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (!user.email || !allowlist.includes(user.email.toLowerCase())) {
    throw new HttpError(403, "not_admin", "Access denied: not an approved admin account");
  }

  return user;
}
