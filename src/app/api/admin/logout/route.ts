import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { ok, fail } from "@/lib/http";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("ethixweb_demo_session");

    const supabase = await createServerClient();
    await supabase.auth.signOut().catch(() => {});

    return ok({ loggedOut: true });
  } catch (err) {
    return fail(err);
  }
}
