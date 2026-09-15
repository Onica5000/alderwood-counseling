"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { Pill } from "./ui";
import { concernGroups, emptyAnswers, matchTherapists, type MatchAnswers } from "@/lib/match";
import { ageBandLabels, allLanguages, type AgeBand } from "@/lib/data/staff";

type StepKey = "who" | "age" | "concerns" | "format" | "times" | "urgency";

const steps: { key: StepKey; title: string; help: string }[] = [
  { key: "who", title: "Who is the counseling for?", help: "This decides almost everything downstream, so we ask it first." },
  { key: "age", title: "How old is the client?", help: "Our clinicians are grouped by developmental stage rather than by diagnosis." },
  { key: "concerns", title: "What brings you in?", help: "Pick as many as apply. Nothing here is a diagnosis and you can leave it blank." },
  { key: "format", title: "In person or by video?", help: "Every clinician offers both, and you can switch week to week." },
  { key: "times", title: "When could you actually come?", help: "Evening and Saturday slots fill first, so this changes the answer." },
  { key: "urgency", title: "How soon do you need to be seen?", help: "This weights availability against specialty fit." },
];

const whoOptions: { value: NonNullable<MatchAnswers["who"]>; label: string; hint: string; age?: AgeBand }[] = [
  { value: "self", label: "Myself", hint: "Individual counseling for an adult", age: "adults" },
  { value: "child", label: "My child", hint: "Age 12 or under" },
  { value: "teen", label: "My teenager", hint: "Age 13 to 18", age: "teens" },
  { value: "couple", label: "My partner and me", hint: "Couples counseling", age: "adults" },
  { value: "family", label: "Our whole family", hint: "Family or co-parenting work", age: "adults" },
  { value: "parent", label: "My parent", hint: "An older adult in my family", age: "seniors" },
];

export function MatchWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<MatchAnswers>(emptyAnswers);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const results = useMemo(() => (done ? matchTherapists(answers).slice(0, 4) : []), [done, answers]);

  const current = steps[step];
  const progress = done ? 100 : Math.round((step / steps.length) * 100);

  // Moving focus to the new question is what makes this usable on a screen
  // reader — otherwise the page silently swaps its contents.
  const focusHeading = () =>
    requestAnimationFrame(() => headingRef.current?.focus());

  const next = () => {
    if (step === steps.length - 1) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
    focusHeading();
  };

  const back = () => {
    if (done) setDone(false);
    else setStep((s) => Math.max(0, s - 1));
    focusHeading();
  };

  const restart = () => {
    setAnswers(emptyAnswers);
    setStep(0);
    setDone(false);
    focusHeading();
  };

  const canAdvance = () => {
    switch (current.key) {
      case "who": return answers.who !== null;
      case "age": return answers.age !== null;
      case "concerns": return true; // genuinely optional
      case "format": return answers.format !== null;
      case "times": return answers.times.length > 0;
      case "urgency": return answers.urgency !== null;
    }
  };

  const toggle = <K extends keyof MatchAnswers>(key: K, value: string) =>
    setAnswers((a) => {
      const list = a[key] as unknown as string[];
      return {
        ...a,
        [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      };
    });

  /* ------------------------------------------------------------- Results */
  if (done) {
    return (
      <div>
        <div className="ow-card p-6 sm:p-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl sm:text-3xl">
            {results.length > 0
              ? `${results.length} clinician${results.length === 1 ? "" : "s"} who fit what you described`
              : "No clean match — but that does not mean no match"}
          </h2>
          <p className="ow-prose mt-3 text-ink-soft">
            Ranked by how well each one fits your answers. We show the reasoning, including the
            reasons against, because a match you cannot interrogate is just a guess with a
            number on it.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {answers.age && <Pill tone="muted">{ageBandLabels[answers.age]}</Pill>}
            {answers.format && (
              <Pill tone="muted">{answers.format === "telehealth" ? "Telehealth" : "In person"}</Pill>
            )}
            {answers.times.map((t) => (
              <Pill key={t} tone="muted">
                {t === "weekday" ? "Weekday daytime" : t === "evening" ? "Evenings" : "Saturdays"}
              </Pill>
            ))}
            {answers.concerns.slice(0, 4).map((c) => (
              <Pill key={c} tone="clay">{c}</Pill>
            ))}
            {answers.concerns.length > 4 && (
              <Pill tone="clay">+{answers.concerns.length - 4} more</Pill>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={back}
              className="ow-tap inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <Icon name="chevron" className="h-4 w-4 rotate-90" />
              Change my answers
            </button>
            <button
              type="button"
              onClick={restart}
              className="ow-tap inline-flex items-center gap-2 rounded-pill px-4 py-2.5 text-sm font-semibold text-clay hover:bg-clay-soft"
            >
              Start over
            </button>
          </div>
        </div>

        <ul className="mt-6 space-y-4">
          {results.map((r, i) => (
            <li key={r.therapist.slug}>
              <article className="ow-card overflow-hidden">
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:p-8">
                  <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-start">
                    <Avatar initials={r.therapist.initials} hue={r.therapist.hue} size={80} />
                    <div className="sm:mt-1">
                      <p className="font-display text-2xl text-olive">{r.percent}%</p>
                      <p className="text-xs text-ink-soft">match</p>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {i === 0 && <Pill tone="clay">Best match</Pill>}
                      <Pill
                        tone={
                          r.therapist.availability === "accepting"
                            ? "olive"
                            : r.therapist.availability === "limited"
                              ? "gold"
                              : "muted"
                        }
                      >
                        {r.therapist.availability === "accepting"
                          ? "Accepting new clients"
                          : r.therapist.availability === "limited"
                            ? "Limited openings"
                            : "Waitlist only"}
                      </Pill>
                    </div>

                    <h3 className="mt-2 text-xl">
                      <Link href={`/about/staff/${r.therapist.slug}/`} className="hover:text-olive">
                        {r.therapist.name}, {r.therapist.credentials}
                      </Link>
                    </h3>
                    <p className="mt-0.5 text-sm text-ink-soft">{r.therapist.title}</p>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h4 className="ow-eyebrow">Why this match</h4>
                        <ul className="mt-2 space-y-1.5">
                          {r.reasons.map((reason) => (
                            <li key={reason} className="flex items-start gap-2 text-sm text-ink-soft">
                              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {r.caveats.length > 0 && (
                        <div>
                          <h4 className="ow-eyebrow !text-ink-soft">Worth knowing</h4>
                          <ul className="mt-2 space-y-1.5">
                            {r.caveats.map((c) => (
                              <li key={c} className="flex items-start gap-2 text-sm text-ink-soft">
                                <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {r.services.length > 0 && (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-ink">Likely service:</span>
                        {r.services.map((s) => (
                          <Link key={s.slug} href={`/services/${s.slug}/`}>
                            <Pill tone="muted">{s.name}</Pill>
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/book/?therapist=${r.therapist.slug}`}
                        className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-clay px-5 py-3 text-sm font-semibold text-white"
                      >
                        Request {r.therapist.name.split(" ")[0]}
                        <Icon name="arrow" className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/about/staff/${r.therapist.slug}/`}
                        className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line px-5 py-3 text-sm font-semibold text-ink"
                      >
                        Full profile
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="ow-card mt-6 border-olive/25 bg-olive-soft p-6">
          <h3 className="flex items-center gap-2 font-display text-lg text-olive-deep">
            <Icon name="phone" className="h-5 w-5" />
            A tool is not an intake conversation
          </h3>
          <p className="ow-prose mt-2 text-sm leading-relaxed text-ink-soft">
            This ranks eight clinicians against six answers. Our intake coordinator has the
            actual schedule, knows who has had a cancellation, and can ask the follow-up
            question this form did not think to ask. If the result above looks wrong, it
            probably is — call (610) 417-0463 and say so.
          </p>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------- Steps */
  return (
    <div className="ow-card overflow-hidden">
      <div className="border-b border-line bg-surface-2 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-ink">
            Question {step + 1} of {steps.length}
          </p>
          <p className="text-sm text-ink-soft">{progress}% complete</p>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-pill bg-line"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Matching progress"
        >
          <div
            className="h-full rounded-pill bg-olive transition-[width] duration-500"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl sm:text-3xl">
          {current.title}
        </h2>
        <p className="ow-prose mt-2 text-sm text-ink-soft">{current.help}</p>

        <div className="mt-7">
          {current.key === "who" && (
            <fieldset>
              <legend className="sr-only">Who is the counseling for?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {whoOptions.map((o) => (
                  <ChoiceCard
                    key={o.value}
                    name="who"
                    type="radio"
                    checked={answers.who === o.value}
                    label={o.label}
                    hint={o.hint}
                    onChange={() =>
                      setAnswers((a) => ({ ...a, who: o.value, age: o.age ?? a.age }))
                    }
                  />
                ))}
              </div>
            </fieldset>
          )}

          {current.key === "age" && (
            <fieldset>
              <legend className="sr-only">Client age group</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.keys(ageBandLabels) as AgeBand[]).map((k) => (
                  <ChoiceCard
                    key={k}
                    name="age"
                    type="radio"
                    checked={answers.age === k}
                    label={ageBandLabels[k]}
                    onChange={() => setAnswers((a) => ({ ...a, age: k }))}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {current.key === "concerns" && (
            <div className="space-y-6">
              {concernGroups.map((g) => (
                <fieldset key={g.label}>
                  <legend className="ow-eyebrow">{g.label}</legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {g.options.map((o) => {
                      const on = answers.concerns.includes(o);
                      return (
                        <label
                          key={o}
                          className={`ow-tap inline-flex cursor-pointer items-center gap-2 rounded-pill border px-3.5 py-2 text-sm font-medium transition-colors ${
                            on
                              ? "border-olive bg-olive text-white"
                              : "border-line bg-surface text-ink-soft hover:border-olive/50 hover:text-ink"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggle("concerns", o)}
                            className="sr-only"
                          />
                          {on && <Icon name="check" className="h-3.5 w-3.5" />}
                          {o}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <div>
                <label htmlFor="match-language" className="block text-sm font-semibold text-ink">
                  Do you need a clinician who speaks a language other than English?
                </label>
                <select
                  id="match-language"
                  value={answers.language ?? "English"}
                  onChange={(e) => setAnswers((a) => ({ ...a, language: e.target.value }))}
                  className="mt-2 w-full max-w-sm rounded-lg border border-line bg-surface px-3.5 py-2.5 text-ink sm:w-auto"
                >
                  {allLanguages.map((l) => (
                    <option key={l} value={l}>
                      {l === "English" ? "English is fine" : l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {current.key === "format" && (
            <fieldset>
              <legend className="sr-only">Session format</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceCard
                  name="format"
                  type="radio"
                  checked={answers.format === "in-person"}
                  label="In person"
                  hint="At 510 Delaware Avenue, Bethlehem"
                  onChange={() => setAnswers((a) => ({ ...a, format: "in-person" }))}
                />
                <ChoiceCard
                  name="format"
                  type="radio"
                  checked={answers.format === "telehealth"}
                  label="Secure video"
                  hint="You must be in Pennsylvania during the session"
                  onChange={() => setAnswers((a) => ({ ...a, format: "telehealth" }))}
                />
              </div>
            </fieldset>
          )}

          {current.key === "times" && (
            <fieldset>
              <legend className="sr-only">Availability — choose all that could work</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { v: "weekday", label: "Weekday daytime", hint: "8:00am – 5:00pm" },
                  { v: "evening", label: "Weeknight evenings", hint: "Until 8:30pm, Mon–Thu" },
                  { v: "saturday", label: "Saturday morning", hint: "8:00am – 1:00pm" },
                ].map((o) => (
                  <ChoiceCard
                    key={o.v}
                    name="times"
                    type="checkbox"
                    checked={answers.times.includes(o.v as "weekday")}
                    label={o.label}
                    hint={o.hint}
                    onChange={() => toggle("times", o.v)}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {current.key === "urgency" && (
            <fieldset>
              <legend className="sr-only">How soon do you need to be seen?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceCard
                  name="urgency"
                  type="radio"
                  checked={answers.urgency === "soon"}
                  label="As soon as possible"
                  hint="Weight availability over a perfect specialty fit"
                  onChange={() => setAnswers((a) => ({ ...a, urgency: "soon" }))}
                />
                <ChoiceCard
                  name="urgency"
                  type="radio"
                  checked={answers.urgency === "flexible"}
                  label="I can wait for the right person"
                  hint="Weight specialty fit over speed"
                  onChange={() => setAnswers((a) => ({ ...a, urgency: "flexible" }))}
                />
              </div>

              <div className="mt-6 rounded-card border border-crisis/25 bg-crisis-soft p-5">
                <p className="flex items-center gap-2 font-display text-base text-crisis">
                  <Icon name="alert" className="h-5 w-5" />
                  If you need help today
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  This form schedules outpatient counseling, which is not the same as crisis
                  care. If you are in danger right now, call or text{" "}
                  <a href="tel:988" className="font-semibold text-crisis underline">988</a>, or
                  call 911.
                </p>
              </div>
            </fieldset>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="ow-tap inline-flex items-center gap-2 rounded-pill px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink disabled:invisible"
          >
            <Icon name="chevron" className="h-4 w-4 rotate-90" />
            Back
          </button>

          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="ow-tap inline-flex items-center gap-2 rounded-pill bg-clay px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === steps.length - 1 ? "See my matches" : "Continue"}
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChoiceCard({
  name,
  type,
  checked,
  label,
  hint,
  onChange,
}: {
  name: string;
  type: "radio" | "checkbox";
  checked: boolean;
  label: string;
  hint?: string;
  onChange: () => void;
}) {
  return (
    <label
      className={`ow-tap flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors ${
        checked ? "border-olive bg-olive-soft" : "border-line bg-surface hover:border-olive/40"
      }`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors ${
          type === "radio" ? "rounded-full" : "rounded"
        } ${checked ? "border-olive bg-olive text-white" : "border-line"}`}
      >
        {checked && <Icon name="check" className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{hint}</span>}
      </span>
    </label>
  );
}
