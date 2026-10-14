"use client";

import { useState, useEffect, useRef, useId } from "react";
import {
  CITIES,
  SERVICES,
  BUDGETS,
  leadSchema,
  type LeadInput,
} from "@/lib/validation";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  content: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    city: string;
    service: string;
    budget: string;
    contactPref: string;
    message: string;
    messagePlaceholder: string;
    consent: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    anotherSubmission: string;
  };
}

export function ContactForm({ content }: ContactFormProps) {
  const formId = useId();
  // Time-trap: record timestamp via ref on client mount (avoids cascading re-renders)
  const startedAtRef = useRef<number>(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "" as (typeof CITIES)[number] | "",
    service: "" as (typeof SERVICES)[number] | "",
    budget: "" as (typeof BUDGETS)[number] | "",
    contactPref: "whatsapp" as "whatsapp" | "call" | "email",
    message: "",
    consent: false,
    website: "", // Honeypot field (must remain empty)
    turnstileToken: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-level error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleTurnstileToken = (token: string) => {
    setFormData((prev) => ({ ...prev, turnstileToken: token }));
    if (errors.turnstileToken) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.turnstileToken;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side schema validation
    const payload: Partial<LeadInput> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || undefined,
      city: formData.city as (typeof CITIES)[number],
      service: formData.service as (typeof SERVICES)[number],
      budget: formData.budget ? (formData.budget as (typeof BUDGETS)[number]) : undefined,
      contactPref: formData.contactPref,
      message: formData.message || undefined,
      consent: formData.consent as true,
      website: formData.website,
      startedAt: startedAtRef.current || Date.now(),
      turnstileToken: formData.turnstileToken,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        if (json.error?.fields) {
          setErrors(json.error.fields);
        } else {
          setServerError(
            json.error?.message ||
              "Unable to submit your enquiry at this moment. Please reach out via WhatsApp directly."
          );
        }
        return;
      }

      // Success
      setIsSuccess(true);
    } catch {
      setServerError(
        "Network connection error. Please try again or message our team directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      service: "",
      budget: "",
      contactPref: "whatsapp",
      message: "",
      consent: false,
      website: "",
      turnstileToken: "",
    });
    setErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-red-subtle)] text-[var(--color-red)]">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-[var(--color-text)]">
          {content.successTitle}
        </h3>
        <p className="mt-3 max-w-md mx-auto text-sm text-[var(--color-text-muted)] leading-relaxed">
          {content.successDesc}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="secondary" onClick={handleReset}>
            {content.anotherSubmission}
          </Button>
          <a
            href="https://wa.me/919999999999?text=Hello%20Ethixweb%2C%20I%20just%20submitted%20an%20enquiry%20on%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-semibold hover:bg-[#1EBE5D] transition-colors"
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            Follow up on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10 space-y-6"
      aria-label="Project enquiry form"
    >
      {/* Server Error Banner with WhatsApp fallback */}
      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 space-y-2"
        >
          <div className="flex items-center gap-2 font-semibold">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Submission error</span>
          </div>
          <p>{serverError}</p>
          <p className="pt-1">
            Need an immediate reply?{" "}
            <a
              href="https://wa.me/919999999999?text=Hello%20Ethixweb%2C%20I%20had%20trouble%20with%20the%20website%20enquiry%20form"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-[var(--color-text)]"
            >
              Chat directly with our team on WhatsApp →
            </a>
          </p>
        </div>
      )}

      {/* Honeypot field (hidden from legitimate users, catches dumb bots) */}
      <div
        className="hidden"
        style={{ display: "none" }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.name} <span className="text-[var(--color-red)]">*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={content.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--color-border)]"
            }`}
          />
          {errors.name && (
            <p
              id={`${formId}-name-err`}
              className="mt-1.5 text-xs text-red-500"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.email} <span className="text-[var(--color-red)]">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={content.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--color-border)]"
            }`}
          />
          {errors.email && (
            <p
              id={`${formId}-email-err`}
              className="mt-1.5 text-xs text-red-500"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Mobile Number (+91) */}
        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.phone} <span className="text-[var(--color-red)]">*</span>
          </label>
          <div className="relative flex rounded-lg">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-[var(--color-border)] bg-[var(--color-surface-hover)] px-3 text-xs font-medium text-[var(--color-text-muted)] select-none">
              +91
            </span>
            <input
              id={`${formId}-phone`}
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={content.phonePlaceholder}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
              className={`w-full rounded-r-lg border bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[var(--color-border)]"
              }`}
            />
          </div>
          {errors.phone && (
            <p
              id={`${formId}-phone-err`}
              className="mt-1.5 text-xs text-red-500"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Company Name (Optional) */}
        <div>
          <label
            htmlFor={`${formId}-company`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.company}
          </label>
          <input
            id={`${formId}-company`}
            type="text"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            placeholder={content.companyPlaceholder}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* City Select */}
        <div>
          <label
            htmlFor={`${formId}-city`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.city} <span className="text-[var(--color-red)]">*</span>
          </label>
          <select
            id={`${formId}-city`}
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? `${formId}-city-err` : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors ${
              errors.city
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--color-border)]"
            }`}
          >
            <option value="" disabled>
              Select your city
            </option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && (
            <p
              id={`${formId}-city-err`}
              className="mt-1.5 text-xs text-red-500"
              role="alert"
            >
              {errors.city}
            </p>
          )}
        </div>

        {/* Service Select */}
        <div>
          <label
            htmlFor={`${formId}-service`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.service} <span className="text-[var(--color-red)]">*</span>
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? `${formId}-service-err` : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors ${
              errors.service
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--color-border)]"
            }`}
          >
            <option value="" disabled>
              Select service needed
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p
              id={`${formId}-service-err`}
              className="mt-1.5 text-xs text-red-500"
              role="alert"
            >
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Estimated Budget Select */}
        <div>
          <label
            htmlFor={`${formId}-budget`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            {content.budget}
          </label>
          <select
            id={`${formId}-budget`}
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors"
          >
            <option value="">Select budget range (optional)</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Preference */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2">
            {content.contactPref}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "whatsapp", label: "WhatsApp" },
              { val: "call", label: "Call" },
              { val: "email", label: "Email" },
            ].map(({ val, label }) => (
              <label
                key={val}
                className={`flex items-center justify-center rounded-lg border px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors ${
                  formData.contactPref === val
                    ? "border-[var(--color-red)] bg-[var(--color-red-subtle)] text-[var(--color-red)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <input
                  type="radio"
                  name="contactPref"
                  value={val}
                  checked={formData.contactPref === val}
                  onChange={handleChange}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
        >
          {content.message}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={content.messagePlaceholder}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors resize-y"
        />
      </div>

      {/* Turnstile Verification */}
      <div>
        <TurnstileWidget onToken={handleTurnstileToken} />
        {errors.turnstileToken && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {errors.turnstileToken}
          </p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3 pt-2">
        <input
          id={`${formId}-consent`}
          type="checkbox"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? `${formId}-consent-err` : undefined}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-red)] focus:ring-[var(--color-red)] cursor-pointer"
        />
        <label
          htmlFor={`${formId}-consent`}
          className="text-xs text-[var(--color-text-muted)] leading-relaxed cursor-pointer"
        >
          {content.consent} <span className="text-[var(--color-red)]">*</span>
        </label>
      </div>
      {errors.consent && (
        <p
          id={`${formId}-consent-err`}
          className="text-xs text-red-500"
          role="alert"
        >
          {errors.consent}
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[200px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {content.submitting}
            </span>
          ) : (
            content.submit
          )}
        </Button>
      </div>
    </form>
  );
}
