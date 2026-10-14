import { z } from "zod";

export const CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Other",
] as const;

export const SERVICES = [
  "Website",
  "AI chatbot / receptionist",
  "Growth (SEO / Ads / Social)",
  "Data and reporting",
  "Accessibility",
  "Support",
  "Not sure yet",
] as const;

export const BUDGETS = [
  "Under ₹25,000",
  "₹25,000–75,000",
  "₹75,000–2,00,000",
  "₹2,00,000+",
  "Not sure",
] as const;

/**
 * Normalises phone numbers:
 * Strips whitespace, dashes, and leading +91 / 91 / 0
 */
export const normalizePhone = (v: string): string =>
  v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, "");

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(254),
  phone: z
    .string()
    .transform(normalizePhone)
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.enum(CITIES, { message: "Choose your city" }),
  service: z.enum(SERVICES, { message: "Choose a service" }),
  budget: z.enum(BUDGETS).optional(),
  contactPref: z.enum(["whatsapp", "call", "email"]).default("whatsapp"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please agree so we can contact you" }),
  // Spam trap fields
  website: z.string().max(0).optional(),
  startedAt: z.number().int(),
  turnstileToken: z.string().min(1, "Please complete the verification"),
});

export type LeadInput = z.infer<typeof leadSchema>;
