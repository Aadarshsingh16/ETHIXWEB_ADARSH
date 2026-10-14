import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin, createAdminClient } from "@/lib/supabase/admin";
import { ok, fail, HttpError } from "@/lib/http";

const updateSchema = z.object({
  status: z.enum(["new", "contacted", "won", "lost"]).optional(),
  notes: z.string().max(4000).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const body = await req.json().catch(() => null);
    if (!body) {
      return fail(new HttpError(400, "invalid_json", "Invalid request body"));
    }

    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return fail(new HttpError(422, "validation_failed", "Invalid update payload"));
    }

    const updates: Record<string, unknown> = {};
    if (parsed.data.status !== undefined) updates.status = parsed.data.status;
    if (parsed.data.notes !== undefined) updates.notes = parsed.data.notes;

    if (Object.keys(updates).length === 0) {
      return fail(new HttpError(400, "empty_update", "No update fields provided"));
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return fail(new HttpError(404, "not_found", "Lead not found"));
    }

    return ok({ lead: data });
  } catch (err) {
    return fail(err);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      return fail(new HttpError(500, "db_error", "Failed to delete lead"));
    }

    return ok({ deleted: true, id });
  } catch (err) {
    return fail(err);
  }
}
