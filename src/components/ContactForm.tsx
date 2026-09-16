"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Field, inputClass } from "./ui";

const reasons = [
  "Request a first appointment",
  "Ask about insurance or cost",
  "Ask about a group or workshop",
  "I am an existing client",
  "Professional referral",
  "Something else",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", reason: reasons[0], message: "", voicemailOk: "yes",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please tell us what to call you.";
    if (!form.phone.trim() && !form.email.trim())
      next.phone = "We need one way to reach you — a phone number or an email address.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      next.email = "That does not look like a complete email address.";
    if (!form.message.trim()) next.message = "A sentence is plenty — just enough to route it.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="ow-card p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-olive-soft text-olive">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <h2 className="mt-5 text-2xl">Thank you — we have your message</h2>
        <p className="ow-prose mx-auto mt-3 text-sm leading-relaxed text-ink-soft">
          Someone will get back to you within one business day. If you need help before then,
          call us at (610) 555-0142 during office hours, or call or text 988 at any hour.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ ...form, message: "" });
          }}
          className="ow-tap mt-6 inline-flex items-center gap-2 rounded-pill border border-line px-5 py-2.5 text-sm font-semibold text-ink"
        >
          Send another message
        </button>
        <p className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">
          This is a front-end demonstration. Nothing was transmitted or stored.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="ow-card p-6 sm:p-8">
      <h2 className="text-2xl">Send us a message</h2>
      <p className="ow-prose mt-2 text-sm text-ink-soft">
        Please keep clinical detail out of this form — email is not a secure channel and this
        is only for routing your message to the right person.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="What should we call you?" htmlFor="ct-name" required>
          <input
            id="ct-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`${inputClass} ${errors.name ? "border-crisis" : ""}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "ct-name-err" : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="ct-name-err" className="mt-1.5 text-xs font-semibold text-crisis">{errors.name}</p>
          )}
        </Field>

        <Field label="What is this about?" htmlFor="ct-reason">
          <select
            id="ct-reason"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className={inputClass}
          >
            {reasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Phone" htmlFor="ct-phone">
          <input
            id="ct-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`${inputClass} ${errors.phone ? "border-crisis" : ""}`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "ct-phone-err" : undefined}
            autoComplete="tel"
          />
          {errors.phone && (
            <p id="ct-phone-err" className="mt-1.5 text-xs font-semibold text-crisis">{errors.phone}</p>
          )}
        </Field>

        <Field label="Email" htmlFor="ct-email">
          <input
            id="ct-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`${inputClass} ${errors.email ? "border-crisis" : ""}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "ct-email-err" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="ct-email-err" className="mt-1.5 text-xs font-semibold text-crisis">{errors.email}</p>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label="Is it safe to leave a voicemail?" htmlFor="ct-vm">
            <select
              id="ct-vm"
              value={form.voicemailOk}
              onChange={(e) => setForm({ ...form, voicemailOk: e.target.value })}
              className={inputClass}
            >
              <option value="yes">Yes, a voicemail is fine</option>
              <option value="no">No — please call without leaving a message</option>
              <option value="text">Please text rather than call</option>
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            label="Your message"
            htmlFor="ct-message"
            required
            hint="A sentence or two is plenty. The detail belongs in a conversation."
          >
            <textarea
              id="ct-message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} ${errors.message ? "border-crisis" : ""}`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "ct-message-err" : "ct-message-hint"}
            />
            {errors.message && (
              <p id="ct-message-err" className="mt-1.5 text-xs font-semibold text-crisis">
                {errors.message}
              </p>
            )}
          </Field>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-crisis/25 bg-crisis-soft p-4">
        <p className="text-xs leading-relaxed text-ink-soft">
          <strong className="text-crisis">This form is not monitored outside office hours</strong>{" "}
          and is not a crisis service. If you need help now, call or text{" "}
          <a href="tel:988" className="font-semibold text-crisis underline">988</a>, or call 911.
        </p>
      </div>

      <button
        type="submit"
        className="ow-tap mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-clay px-6 py-3.5 text-sm font-semibold text-white sm:w-auto"
      >
        Send message
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    </form>
  );
}
