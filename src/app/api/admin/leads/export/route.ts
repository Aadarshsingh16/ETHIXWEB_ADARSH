import { NextRequest } from "next/server";
import { requireAdmin, createAdminClient } from "@/lib/supabase/admin";
import { fail, HttpError } from "@/lib/http";
import { isSupabaseConfigured, getDemoLeads } from "@/lib/mock-leads";

/**
 * Sanitises CSV cells against formula injection (CSV injection attack).
 * Prefixes cells beginning with =, +, -, @, \t, or \r with a single quote (').
 * Also escapes double quotes by doubling them.
 */
function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }

  let str = String(value).trim();

  // If the cell begins with dangerous formula triggers
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape inner double quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim().toLowerCase();
    const q = searchParams.get("q")?.trim();

    let leads = null;

    if (!isSupabaseConfigured()) {
      leads = getDemoLeads(status, q, 1, 1000).items;
    } else {
      const supabase = createAdminClient();

      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      if (q) {
        query = query.or(
          `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,company.ilike.%${q}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error("Export leads error:", error);
        throw new HttpError(500, "db_error", "Failed to query leads for export");
      }

      leads = data;
    }

    const headers = [
      "ID",
      "Created At",
      "Name",
      "Phone",
      "Email",
      "Company",
      "City",
      "Service",
      "Budget",
      "Contact Preference",
      "Status",
      "Message",
      "Notes",
    ];

    const rows = (leads || []).map((lead) => [
      sanitizeCsvCell(lead.id),
      sanitizeCsvCell(lead.created_at),
      sanitizeCsvCell(lead.name),
      sanitizeCsvCell(`+91${lead.phone}`),
      sanitizeCsvCell(lead.email),
      sanitizeCsvCell(lead.company || ""),
      sanitizeCsvCell(lead.city),
      sanitizeCsvCell(lead.service),
      sanitizeCsvCell(lead.budget || ""),
      sanitizeCsvCell(lead.contact_pref),
      sanitizeCsvCell(lead.status),
      sanitizeCsvCell(lead.message || ""),
      sanitizeCsvCell(lead.notes || ""),
    ]);

    const csvContent = [
      headers.map(sanitizeCsvCell).join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\r\n");

    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `ethixweb-leads-${dateStr}.csv`;

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    return fail(err);
  }
}
