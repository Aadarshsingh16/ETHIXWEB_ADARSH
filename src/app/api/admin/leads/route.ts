import { NextRequest } from "next/server";
import { requireAdmin, createAdminClient } from "@/lib/supabase/admin";
import { ok, fail, HttpError } from "@/lib/http";
import { isSupabaseConfigured, getDemoLeads } from "@/lib/mock-leads";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim().toLowerCase();
    const q = searchParams.get("q")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10) || 20)
    );

    // If Supabase is not configured, return realistic demo Indian leads
    if (!isSupabaseConfigured()) {
      const demoData = getDemoLeads(status, q, page, pageSize);
      return ok(demoData);
    }

    const supabase = createAdminClient();

    // Query builder for items
    let query = supabase
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (q) {
      // Search across name, email, phone, and company
      query = query.or(
        `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,company.ilike.%${q}%`
      );
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data: items, count, error } = await query;

    if (error) {
      console.error("Error fetching leads:", error);
      throw new HttpError(500, "db_error", "Failed to retrieve leads");
    }

    // Query counts by status for metric pills
    const { data: allLeads } = await supabase
      .from("leads")
      .select("status");

    const counts = {
      all: allLeads?.length || 0,
      new: allLeads?.filter((l) => l.status === "new").length || 0,
      contacted: allLeads?.filter((l) => l.status === "contacted").length || 0,
      won: allLeads?.filter((l) => l.status === "won").length || 0,
      lost: allLeads?.filter((l) => l.status === "lost").length || 0,
    };

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return ok({
      items: items || [],
      total,
      page,
      pageSize,
      totalPages,
      counts,
    });
  } catch (err) {
    return fail(err);
  }
}
