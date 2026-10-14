import { createServerClient } from "@/lib/supabase/server";
import { ok, fail } from "@/lib/http";

export async function POST() {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
    return ok({ loggedOut: true });
  } catch (err) {
    return fail(err);
  }
}
