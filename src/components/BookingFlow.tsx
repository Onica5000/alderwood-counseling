"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { Field, Pill, inputClass } from "./ui";
import { therapists, availabilityMeta, getTherapist } from "@/lib/data/staff";
import { sessionTypes } from "@/lib/data/fees";
import { plans } from "@/lib/data/fees";
import { slotsFor, type DaySlots } from "@/lib/slots";
import { site } from "@/lib/data/site";

type Stage = "clinician" | "time" | "details" | "sent";

const stageOrder: Stage[] = ["clinician", "time", "details", "sent"];
const stageLabels: Record<Stage, string> = {
  clinician: "Choose a clinician",
  time: "Pick a time",
  details: "Your details",
  sent: "Request sent",
};

export function BookingFlow() {
  const params = useSearchParams();
  const preselect = params.get("therapist");

  const [stage, setStage] = useState<Stage>(preselect ? "time" : "clinician");
  const [slug, setSlug] = useState<string | null>(
    preselect && getTherapist(preselect) ? preselect : null,
  );
  const [slot, setSlot] = useState<{ day: DaySlots; time: string } | null>(null);
  const [sessionType, setSessionType] = useState("individual");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", plan: "highmark", notes: "", contact: "phone", newClient: "yes",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  const therapist = slug ? getTherapist(slug) : null;
  const days = useMemo(
    () => (therapist ? slotsFor(therapist, new Date()) : []),
    [therapist],
  );

  useEffect(() => {
    requestAnimationFrame(() => headingRef.current?.focus());
  }, [stage]);

  const go = (s: Stage) => setStage(s);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please tell us what to call you.";
    if (!form.phone.trim() && !form.email.trim())
      next.phone = "We need one way to reach you — a phone number or an email address.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      next.email = "That does not look like a complete email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) go("sent");
  };

  /* --------------------------------------------------------- Confirmation */
  if (stage === "sent") {
    return (
      <div className="ow-card overflow-hidden">
        <div className="bg-olive px-6 py-10 text-center sm:px-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
            <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
          </span>
          <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl text-white sm:text-3xl">
            Request sent. Nothing is booked yet.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85">
            We will call you within one business day to confirm the time, verify your insurance
            and answer anything you did not want to type into a form.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <dl className="grid gap-5 sm:grid-cols-2">
            <Detail label="Clinician" value={therapist ? `${therapist.name}, ${therapist.credentials}` : "No preference"} />
            <Detail
              label="Requested time"
              value={
                slot
                  ? `${slot.day.weekday} ${slot.day.month} ${slot.day.dayNum}, ${slot.time}`
                  : "First available"
              }
            />
            <Detail label="Session type" value={sessionTypes.find((s) => s.key === sessionType)?.label ?? "—"} />
            <Detail label="Insurance" value={plans.find((p) => p.key === form.plan)?.name ?? "—"} />
            <Detail label="Name" value={form.name} />
            <Detail label="Best contact" value={form.contact === "phone" ? form.phone : form.email} />
          </dl>

          <div className="mt-8 rounded-card border border-crisis/25 bg-crisis-soft p-5">
            <p className="flex items-center gap-2 font-display text-base text-crisis">
              <Icon name="alert" className="h-5 w-5" />
              While you wait
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              This form is not monitored outside office hours and is not a crisis service. If
              things get worse before we reach you, call or text{" "}
              <a href="tel:988" className="font-semibold text-crisis underline">988</a>, call
              Northampton County crisis at{" "}
              <a href="tel:+16102529060" className="font-semibold text-crisis underline">610-252-9060</a>, or call 911.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/first-visit/"
              className="ow-tap inline-flex items-center gap-2 rounded-pill bg-clay px-5 py-3 text-sm font-semibold text-white"
            >
              What happens at the first visit
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a
              href={site.phoneHref}
              className="ow-tap inline-flex items-center gap-2 rounded-pill border border-line px-5 py-3 text-sm font-semibold text-ink"
            >
              <Icon name="phone" className="h-4 w-4 text-olive" />
              Call instead: {site.phone}
            </a>
          </div>

          <p className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">
            This is a front-end demonstration. No request was transmitted and nothing was
            stored — the confirmation above is rendered from your own browser state.
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- Stepper */
  return (
    <div>
      <ol className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
        {stageOrder.slice(0, 3).map((s, i) => {
          const idx = stageOrder.indexOf(stage);
          const state = i < idx ? "done" : i === idx ? "current" : "todo";
          return (
            <li key={s} className="flex items-center gap-2">
              <button
                type="button"
                disabled={state === "todo"}
                onClick={() => go(s)}
                className={`ow-tap flex items-center gap-2 rounded-pill px-3 py-2 font-semibold transition-colors ${
                  state === "current"
                    ? "bg-olive text-white"
                    : state === "done"
                      ? "text-olive hover:bg-olive-soft"
                      : "cursor-default text-ink-soft/60"
                }`}
                aria-current={state === "current" ? "step" : undefined}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    state === "current" ? "bg-white/20" : state === "done" ? "bg-olive-soft" : "bg-surface-2"
                  }`}
                >
                  {state === "done" ? <Icon name="check" className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                {stageLabels[s]}
              </button>
              {i < 2 && <Icon name="chevron" className="h-4 w-4 -rotate-90 text-ink-soft/40" />}
            </li>
          );
        })}
      </ol>

      <div className="ow-card p-6 sm:p-8">
        {/* --------------------------------------------------- 1. Clinician */}
        {stage === "clinician" && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl sm:text-3xl">
              Who would you like to see?
            </h2>
            <p className="ow-prose mt-2 text-sm text-ink-soft">
              Not sure? <Link href="/find-a-therapist/" className="font-semibold text-clay underline">Use the matcher</Link>, or
              pick &ldquo;no preference&rdquo; and our intake coordinator will match you by hand.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {therapists.map((t) => (
                <li key={t.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSlug(t.slug);
                      setSlot(null);
                      go("time");
                    }}
                    className="ow-tap flex w-full items-start gap-3 rounded-card border border-line bg-surface p-4 text-left transition-colors hover:border-olive/50 hover:bg-olive-soft/40"
                  >
                    <Avatar initials={t.initials} hue={t.hue} size={48} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">
                        {t.name}, {t.credentials}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-soft">{t.title}</span>
                      <span className="mt-2 block">
                        <Pill
                          tone={
                            t.availability === "accepting" ? "olive" : t.availability === "limited" ? "gold" : "muted"
                          }
                        >
                          {availabilityMeta[t.availability].short}
                        </Pill>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="sm:col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    setSlug(null);
                    setSlot(null);
                    go("details");
                  }}
                  className="ow-tap flex w-full items-center gap-3 rounded-card border border-dashed border-line bg-surface p-4 text-left transition-colors hover:border-olive/50"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-2 text-olive">
                    <Icon name="users" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">No preference — match me</span>
                    <span className="mt-0.5 block text-xs text-ink-soft">
                      Our intake coordinator will pick based on your needs and the real schedule
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </>
        )}

        {/* -------------------------------------------------------- 2. Time */}
        {stage === "time" && therapist && (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl sm:text-3xl">
                  When could you come?
                </h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Openings for {therapist.name} over the next two weeks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => go("clinician")}
                className="ow-tap inline-flex items-center gap-2 rounded-pill border border-line px-3 py-2 text-sm font-semibold text-ink"
              >
                Change clinician
              </button>
            </div>

            {days.length === 0 ? (
              <div className="mt-6 rounded-card border border-line bg-surface-2 p-6 text-center">
                <p className="font-display text-lg">No online openings in the next two weeks</p>
                <p className="ow-prose mx-auto mt-2 text-sm text-ink-soft">
                  {therapist.name} is {availabilityMeta[therapist.availability].label.toLowerCase()}.
                  Continue anyway and we will add you to the list, or call us — cancellations
                  come up more often than this grid can show.
                </p>
                <button
                  type="button"
                  onClick={() => go("details")}
                  className="ow-tap mt-5 inline-flex items-center gap-2 rounded-pill bg-clay px-5 py-3 text-sm font-semibold text-white"
                >
                  Join the waitlist
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-5">
                  {days.map((d) => (
                    <div key={d.iso}>
                      <h3 className="flex items-baseline gap-2 text-sm font-semibold text-ink">
                        {d.weekday}
                        <span className="text-ink-soft">
                          {d.month} {d.dayNum}
                        </span>
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {d.slots.map((s) => {
                          const on = slot?.day.iso === d.iso && slot?.time === s.label;
                          return (
                            <button
                              key={s.iso}
                              type="button"
                              onClick={() => setSlot({ day: d, time: s.label })}
                              aria-pressed={on}
                              className={`ow-tap rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                                on
                                  ? "border-olive bg-olive text-white"
                                  : "border-line bg-surface text-ink hover:border-olive/50 hover:bg-olive-soft"
                              }`}
                            >
                              {s.label}
                              {s.evening && (
                                <span className={`ml-1.5 text-xs ${on ? "text-white/70" : "text-ink-soft"}`}>
                                  eve
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
                  <p className="text-sm text-ink-soft" aria-live="polite">
                    {slot
                      ? `Selected: ${slot.day.weekday} ${slot.day.month} ${slot.day.dayNum} at ${slot.time}`
                      : "Pick a time, or continue without one."}
                  </p>
                  <button
                    type="button"
                    onClick={() => go("details")}
                    className="ow-tap inline-flex items-center gap-2 rounded-pill bg-clay px-6 py-3 text-sm font-semibold text-white"
                  >
                    Continue
                    <Icon name="arrow" className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ----------------------------------------------------- 3. Details */}
        {stage === "details" && (
          <form onSubmit={submit} noValidate>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl sm:text-3xl">
              How should we reach you?
            </h2>
            <p className="ow-prose mt-2 text-sm text-ink-soft">
              We ask for as little as possible here. The clinical questions belong in a
              conversation, not a text box.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="What should we call you?" htmlFor="bk-name" required>
                <input
                  id="bk-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputClass} ${errors.name ? "border-crisis" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "bk-name-err" : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <p id="bk-name-err" className="mt-1.5 text-xs font-semibold text-crisis">
                    {errors.name}
                  </p>
                )}
              </Field>

              <Field label="Is this for a new client?" htmlFor="bk-new">
                <select
                  id="bk-new"
                  value={form.newClient}
                  onChange={(e) => setForm({ ...form, newClient: e.target.value })}
                  className={inputClass}
                >
                  <option value="yes">Yes, this would be a first appointment</option>
                  <option value="no">No, I am a returning client</option>
                </select>
              </Field>

              <Field label="Phone" htmlFor="bk-phone" hint="Tell us in the notes if a voicemail is not safe to leave.">
                <input
                  id="bk-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`${inputClass} ${errors.phone ? "border-crisis" : ""}`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "bk-phone-err" : "bk-phone-hint"}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p id="bk-phone-err" className="mt-1.5 text-xs font-semibold text-crisis">
                    {errors.phone}
                  </p>
                )}
              </Field>

              <Field label="Email" htmlFor="bk-email">
                <input
                  id="bk-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${inputClass} ${errors.email ? "border-crisis" : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "bk-email-err" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="bk-email-err" className="mt-1.5 text-xs font-semibold text-crisis">
                    {errors.email}
                  </p>
                )}
              </Field>

              <Field label="Session type" htmlFor="bk-session">
                <select
                  id="bk-session"
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className={inputClass}
                >
                  {sessionTypes
                    .filter((s) => s.key !== "intake")
                    .map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label} · {s.minutes} min
                      </option>
                    ))}
                </select>
              </Field>

              <Field label="Insurance" htmlFor="bk-plan" hint="We verify benefits before your first session.">
                <select
                  id="bk-plan"
                  value={form.plan}
                  onChange={(e) => setForm({ ...form, plan: e.target.value })}
                  className={inputClass}
                  aria-describedby="bk-plan-hint"
                >
                  {plans.map((p) => (
                    <option key={p.key} value={p.key}>{p.name}</option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Anything we should know before we call?"
                  htmlFor="bk-notes"
                  hint="Optional. Do not include clinical detail you would rather say out loud — this is a scheduling form."
                >
                  <textarea
                    id="bk-notes"
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={inputClass}
                    aria-describedby="bk-notes-hint"
                    placeholder="e.g. Please don't leave a voicemail. Best to call after 4pm."
                  />
                </Field>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
              <button
                type="button"
                onClick={() => go(slug ? "time" : "clinician")}
                className="ow-tap inline-flex items-center gap-2 rounded-pill px-4 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink"
              >
                <Icon name="chevron" className="h-4 w-4 rotate-90" />
                Back
              </button>
              <button
                type="submit"
                className="ow-tap inline-flex items-center gap-2 rounded-pill bg-clay px-6 py-3 text-sm font-semibold text-white"
              >
                Send request
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="ow-eyebrow">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value || "—"}</dd>
    </div>
  );
}
