"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  city: string;
  service: string;
  budget: string | null;
  contact_pref: string;
  message: string | null;
  status: "new" | "contacted" | "won" | "lost";
  notes: string | null;
}

interface Counts {
  all: number;
  new: number;
  contacted: number;
  won: number;
  lost: number;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    new: 0,
    contacted: 0,
    won: 0,
    lost: 0,
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected lead for detail modal
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [activeNotes, setActiveNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Lead targeted for deletion
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const params = new URLSearchParams({
          status: statusFilter,
          page: page.toString(),
          pageSize: "15",
        });
        if (searchQuery.trim()) {
          params.set("q", searchQuery.trim());
        }

        const res = await fetch(`/api/admin/leads?${params.toString()}`);
        const json = await res.json();

        if (!isMounted) return;

        if (res.ok && json.ok) {
          setLeads(json.data.items);
          setTotalPages(json.data.totalPages || 1);
          if (json.data.counts) {
            setCounts(json.data.counts);
          }
        } else {
          setError(json.error?.message || "Failed to load leads");
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Error connecting to server");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [statusFilter, searchQuery, page, refreshKey]);

  const handleManualRefresh = () => {
    setIsLoading(true);
    setRefreshKey((k) => k + 1);
  };

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        // Revert on failure
        handleManualRefresh();
      }
    } catch {
      handleManualRefresh();
    }
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/leads/${activeLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: activeNotes }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === activeLead.id ? { ...l, notes: activeNotes } : l))
        );
        setActiveLead((prev) => (prev ? { ...prev, notes: activeNotes } : null));
      }
    } catch {
      alert("Failed to save notes. Please try again.");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadToDelete.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadToDelete.id));
        setLeadToDelete(null);
        if (activeLead?.id === leadToDelete.id) {
          setActiveLead(null);
        }
      }
    } catch {
      alert("Failed to delete lead. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams({
      status: statusFilter,
    });
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    const link = document.createElement("a");
    link.href = `/api/admin/leads/export?${params.toString()}`;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "contacted":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "won":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "lost":
        return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {[
          { key: "all", label: "All Leads", count: counts.all, color: "text-[var(--color-text)]" },
          { key: "new", label: "New", count: counts.new, color: "text-blue-500" },
          { key: "contacted", label: "Contacted", count: counts.contacted, color: "text-amber-500" },
          { key: "won", label: "Won Deals", count: counts.won, color: "text-emerald-500" },
          { key: "lost", label: "Lost / Closed", count: counts.lost, color: "text-neutral-400" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setStatusFilter(item.key);
              setPage(1);
            }}
            className={`rounded-xl border p-4 text-left transition-all ${
              statusFilter === item.key
                ? "border-[var(--color-red)] bg-[var(--color-surface)] ring-1 ring-[var(--color-red)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]"
            }`}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {item.label}
            </div>
            <div className={`mt-2 font-mono text-2xl font-bold ${item.color}`}>
              {item.count}
            </div>
          </button>
        ))}
      </div>

      {/* Toolbar: Search, Filter, Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, phone, email, company..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] py-2 pl-9 pr-4 text-xs text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-red)]"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handleExportCsv}
            className="h-9 px-4 text-xs font-medium"
          >
            <svg
              className="mr-1.5 h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </Button>

          <Button
            variant="secondary"
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="h-9 px-3 text-xs"
            aria-label="Refresh leads"
          >
            <svg
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500">
          {error}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-hover)] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Lead</th>
                <th className="px-4 py-3.5">Contact</th>
                <th className="px-4 py-3.5">Requirement</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Received</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {isLoading && leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--color-text-muted)]">
                    Loading enquiries...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--color-text-muted)]">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                    {/* Name + Company */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[var(--color-text)]">{lead.name}</div>
                      {lead.company && (
                        <div className="text-[11px] text-[var(--color-text-muted)]">{lead.company}</div>
                      )}
                    </td>

                    {/* Phone + Email */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[var(--color-text)]">+91 {lead.phone}</span>
                        <a
                          href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(
                            lead.name
                          )}%2C%20thank%20you%20for%20contacting%20Ethixweb`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-0.5 text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                          </svg>
                        </a>
                      </div>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-[11px] text-[var(--color-text-muted)] hover:underline"
                      >
                        {lead.email}
                      </a>
                    </td>

                    {/* Service & City */}
                    <td className="px-4 py-3.5">
                      <div className="text-[var(--color-text)] font-medium">{lead.service}</div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">
                        {lead.city} {lead.budget ? `• ${lead.budget}` : ""}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-4 py-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as Lead["status"])
                        }
                        className={`rounded-md border px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[var(--color-red)] ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-[var(--color-text-muted)] whitespace-nowrap font-mono text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => {
                          setActiveLead(lead);
                          setActiveNotes(lead.notes || "");
                        }}
                        className="rounded px-2.5 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setLeadToDelete(lead)}
                        className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete Lead"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3">
            <span className="text-xs text-[var(--color-text-muted)]">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-8 px-3 text-xs"
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="h-8 px-3 text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail / Notes Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)]">
                  {activeLead.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {activeLead.company || "Independent"} • {activeLead.city}
                </p>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[var(--color-bg)] p-3 border border-[var(--color-border)]">
                  <div className="font-semibold text-[var(--color-text-muted)] uppercase">Service</div>
                  <div className="mt-1 font-medium text-[var(--color-text)]">{activeLead.service}</div>
                </div>
                <div className="rounded-lg bg-[var(--color-bg)] p-3 border border-[var(--color-border)]">
                  <div className="font-semibold text-[var(--color-text-muted)] uppercase">Budget</div>
                  <div className="mt-1 font-medium text-[var(--color-text)]">{activeLead.budget || "Not specified"}</div>
                </div>
              </div>

              {activeLead.message && (
                <div className="rounded-lg bg-[var(--color-bg)] p-3 border border-[var(--color-border)]">
                  <div className="font-semibold text-[var(--color-text-muted)] uppercase">Client Message</div>
                  <p className="mt-1 text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
                    {activeLead.message}
                  </p>
                </div>
              )}

              {/* Editable Internal Notes */}
              <div>
                <label className="block font-semibold text-[var(--color-text-muted)] uppercase mb-1.5">
                  Internal Operations Notes
                </label>
                <textarea
                  rows={3}
                  value={activeNotes}
                  onChange={(e) => setActiveNotes(e.target.value)}
                  placeholder="Add notes about calls, client preferences, or follow-up status..."
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-xs text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-red)] resize-y"
                />
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="primary"
                    disabled={isSavingNotes}
                    onClick={handleSaveNotes}
                    className="h-8 px-3 text-xs"
                  >
                    {isSavingNotes ? "Saving..." : "Save Notes"}
                  </Button>
                </div>
              </div>

              {/* Direct Communication CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/91${activeLead.phone}?text=Hello%20${encodeURIComponent(
                    activeLead.name
                  )}%2C%20thank%20you%20for%20contacting%20Ethixweb`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 px-4 text-xs font-semibold text-white hover:bg-[#1EBE5D] transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  WhatsApp Lead
                </a>
                <a
                  href={`mailto:${activeLead.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 px-4 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  Email Lead
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-base font-bold text-[var(--color-text)]">
              Confirm Lead Deletion
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Are you sure you want to permanently delete the lead from{" "}
              <strong className="text-[var(--color-text)]">{leadToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setLeadToDelete(null)}
                className="h-8 px-3 text-xs"
              >
                Cancel
              </Button>
              <button
                disabled={isDeleting}
                onClick={handleDeleteLead}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
