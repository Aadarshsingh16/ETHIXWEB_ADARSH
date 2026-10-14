export interface LeadRecord {
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

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || url.includes("your-project") || url.includes("placeholder")) return false;
  if (!key || key.includes("placeholder")) return false;
  return true;
}

// In-memory persistent array for local development preview
let DEMO_LEADS: LeadRecord[] = [
  {
    id: "lead-in-000",
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
    name: "Adarsh",
    email: "adarshsingh4106@gmail.com",
    phone: "9876543210",
    company: "Ethixweb Operations & Tech",
    city: "Mumbai",
    service: "Website",
    budget: "₹75,000–2,00,000",
    contact_pref: "whatsapp",
    message: "Enquiry submitted via contact form for website engineering and full-stack development.",
    status: "new",
    notes: "Recently submitted enquiry from contact form.",
  },
  {
    id: "lead-in-001",
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    name: "Vikramaditya Roy",
    email: "vikram@royayurveda.in",
    phone: "9820144556",
    company: "Roy Ayurvedic Wellness D2C",
    city: "Mumbai",
    service: "Website",
    budget: "₹75,000–2,00,000",
    contact_pref: "whatsapp",
    message: "Need a fast Next.js storefront for our Kumkumadi skincare line with instant WhatsApp order updates and 1-tap UPI checkout.",
    status: "new",
    notes: "High intent founder. Prefers communication over WhatsApp.",
  },
  {
    id: "lead-in-002",
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    name: "Pooja Deshmukh",
    email: "pooja@zenithedtech.com",
    phone: "9811234567",
    company: "Zenith NEET & JEE Academy",
    city: "Delhi NCR",
    service: "AI chatbot / receptionist",
    budget: "₹2,00,000+",
    contact_pref: "whatsapp",
    message: "Looking for an automated 24/7 bilingual Hinglish WhatsApp bot to qualify student admissions and schedule campus tours.",
    status: "contacted",
    notes: "Introductory WhatsApp audit sent. Scheduled review call for Friday 3 PM IST.",
  },
  {
    id: "lead-in-003",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    name: "Dr. Arvind Verma",
    email: "drverma@delhidental.org",
    phone: "9910088776",
    company: "Dr. Verma Multispecialty Dental",
    city: "Delhi NCR",
    service: "Website",
    budget: "₹25,000–75,000",
    contact_pref: "call",
    message: "Want online slot booking synchronized with doctor schedules across our 2 South Delhi branches.",
    status: "won",
    notes: "Contract signed with GST invoice. Advance payment received via NEFT.",
  },
  {
    id: "lead-in-004",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    name: "Ananya Krishnan",
    email: "ananya@prestigerealty.in",
    phone: "9845011223",
    company: "Skyline Ventures Developers",
    city: "Bengaluru",
    service: "Growth (SEO / Ads / Social)",
    budget: "₹2,00,000+",
    contact_pref: "whatsapp",
    message: "Need targeted Google Ads and Meta campaigns for luxury 3BHK high-rise development in Whitefield.",
    status: "new",
    notes: null,
  },
  {
    id: "lead-in-005",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    name: "Rajesh Khandelwal",
    email: "rajesh@khandelwaljewels.com",
    phone: "9414055667",
    company: "Khandelwal Heritage Kundan",
    city: "Jaipur",
    service: "Data and reporting",
    budget: "₹75,000–2,00,000",
    contact_pref: "call",
    message: "Require a live bullion gold rate ticker synced catalog and server-side conversion tracking for luxury bridal buyers.",
    status: "won",
    notes: "Live site deployed. Running with 99 PageSpeed on mobile.",
  },
  {
    id: "lead-in-006",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    name: "Siddharth Patel",
    email: "siddharth@kiranafast.co",
    phone: "9879012345",
    company: "Quick Kirana Logistics",
    city: "Ahmedabad",
    service: "Support",
    budget: "Under ₹25,000",
    contact_pref: "email",
    message: "Exploring micro-app feasibility for B2B supplier inventory dispatch.",
    status: "lost",
    notes: "Project budget too low for dedicated IST custom infrastructure. Referred to standard templates.",
  },
];

export function getDemoLeads(status?: string, q?: string, page = 1, pageSize = 20) {
  let filtered = [...DEMO_LEADS];

  if (status && status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }

  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(term) ||
        l.email.toLowerCase().includes(term) ||
        l.phone.includes(term) ||
        (l.company && l.company.toLowerCase().includes(term)) ||
        l.city.toLowerCase().includes(term)
    );
  }

  const total = filtered.length;
  const from = (page - 1) * pageSize;
  const items = filtered.slice(from, from + pageSize);

  const counts = {
    all: DEMO_LEADS.length,
    new: DEMO_LEADS.filter((l) => l.status === "new").length,
    contacted: DEMO_LEADS.filter((l) => l.status === "contacted").length,
    won: DEMO_LEADS.filter((l) => l.status === "won").length,
    lost: DEMO_LEADS.filter((l) => l.status === "lost").length,
  };

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    counts,
  };
}

export function updateDemoLead(id: string, updates: Partial<Pick<LeadRecord, "status" | "notes">>): LeadRecord | null {
  const index = DEMO_LEADS.findIndex((l) => l.id === id);
  if (index === -1) return null;

  DEMO_LEADS[index] = {
    ...DEMO_LEADS[index],
    ...updates,
  };

  return DEMO_LEADS[index];
}

export function deleteDemoLead(id: string): boolean {
  const beforeLen = DEMO_LEADS.length;
  DEMO_LEADS = DEMO_LEADS.filter((l) => l.id !== id);
  return DEMO_LEADS.length < beforeLen;
}

export function addDemoLead(
  lead: Omit<LeadRecord, "id" | "created_at" | "status" | "notes"> & { notes?: string | null }
): LeadRecord {
  const newLead: LeadRecord = {
    id: `lead-in-${Date.now().toString().slice(-4)}`,
    created_at: new Date().toISOString(),
    status: "new",
    notes: lead.notes || null,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company || null,
    city: lead.city,
    service: lead.service,
    budget: lead.budget || null,
    contact_pref: lead.contact_pref || "whatsapp",
    message: lead.message || null,
  };

  // Prepend at index 0 so newly submitted enquiry appears at the very top of Admin Dashboard
  DEMO_LEADS.unshift(newLead);
  return newLead;
}
