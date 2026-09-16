"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Pill } from "./ui";
import { maxScore, scoreBand, screeners } from "@/lib/data/screeners";

const toneStyles = {
  ok: { bar: "bg-olive", chip: "olive" },
  mild: { bar: "bg-olive", chip: "olive" },
  moderate: { bar: "bg-gold", chip: "gold" },
  high: { bar: "bg-crisis", chip: "crisis" },
} as const;

export function ScreenerTool() {
  const [active, setActive] = useState(screeners[0].slug);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const screener = screeners.find((s) => s.slug === active)!;
  const answered = screener.questions.filter((q) => answers[`${screener.slug}-${q.id}`] !== undefined);
  const complete = answered.length === screener.questions.length;

  const total = useMemo(
    () =>
      screener.questions.reduce(
        (sum, q) => sum + (answers[`${screener.slug}-${q.id}`] ?? 0),
        0,
      ),
    [answers, screener],
  );

  const band = scoreBand(screener, total);

  // PHQ-9 item 9 asks about thoughts of self-harm. Any non-zero answer surfaces
  // crisis resources immediately, before and regardless of the total score —
  // a screener that buries that behind a "submit" button is doing harm.
  const riskFlagged = screener.questions.some(
    (q) => q.risk && (answers[`${screener.slug}-${q.id}`] ?? 0) > 0,
  );

  const switchTo = (slug: string) => {
    setActive(slug);
    setSubmitted(false);
  };

  const reset = () => {
    setAnswers((a) => {
      const next = { ...a };
      screener.questions.forEach((q) => delete next[`${screener.slug}-${q.id}`]);
      return next;
    });
    setSubmitted(false);
  };

  return (
    <div>
      <div role="tablist" aria-label="Choose a screener" className="flex flex-wrap gap-2">
        {screeners.map((s) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={active === s.slug}
            onClick={() => switchTo(s.slug)}
            className={`ow-tap rounded-pill border px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === s.slug
                ? "border-olive bg-olive text-white"
                : "border-line bg-surface text-ink-soft hover:border-olive/50 hover:text-ink"
            }`}
          >
            {s.name}
            <span className={`ml-2 text-xs ${active === s.slug ? "text-white/70" : "text-ink-soft"}`}>
              {s.full}
            </span>
          </button>
        ))}
      </div>

      <div className="ow-card mt-5 p-6 sm:p-8">
        <h2 className="text-2xl">{screener.name}</h2>
        <p className="ow-prose mt-2 text-sm leading-relaxed text-ink-soft">{screener.intro}</p>

        <p className="mt-6 rounded-lg bg-surface-2 px-4 py-3 text-sm font-medium text-ink">
          {screener.timeframe}
        </p>

        <ol className="mt-6 space-y-6">
          {screener.questions.map((q, i) => {
            const key = `${screener.slug}-${q.id}`;
            return (
              <li key={q.id}>
                <fieldset>
                  <legend className="flex gap-3 text-sm font-medium text-ink">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-soft text-xs font-semibold text-olive-deep">
                      {i + 1}
                    </span>
                    <span className="ow-prose">{q.text}</span>
                  </legend>

                  <div className="mt-3 grid gap-2 pl-9 sm:grid-cols-4">
                    {screener.options.map((o) => {
                      const on = answers[key] === o.value;
                      return (
                        <label
                          key={o.value}
                          className={`ow-tap flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                            on
                              ? "border-olive bg-olive text-white"
                              : "border-line bg-surface text-ink-soft hover:border-olive/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={key}
                            checked={on}
                            onChange={() => setAnswers({ ...answers, [key]: o.value })}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                              on ? "border-white bg-white/25" : "border-line"
                            }`}
                          >
                            {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                          {o.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            );
          })}
        </ol>

        {riskFlagged && (
          <div className="mt-8 rounded-card border-2 border-crisis bg-crisis-soft p-5">
            <h3 className="flex items-center gap-2 font-display text-lg text-crisis">
              <Icon name="alert" className="h-5 w-5" />
              Please read this before you finish
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              You indicated thoughts that you would be better off dead, or of hurting yourself.
              That is more common than most people are ever told, and it is treatable — but it
              is not something to sit with alone while you finish a form.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Suicide & Crisis Lifeline", value: "Call or text 988", href: "tel:988" },
                { label: "Northampton County Crisis", value: "610-252-9060", href: "tel:+16102529060" },
                { label: "Lehigh County Crisis", value: "610-782-3127", href: "tel:+16107823127" },
                { label: "Emergency", value: "911", href: "tel:911" },
              ].map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="ow-tap flex items-center justify-between gap-3 rounded-lg border border-crisis/30 bg-surface px-4 py-3 text-sm transition-colors hover:bg-crisis hover:text-white"
                  >
                    <span>{c.label}</span>
                    <span className="shrink-0 font-semibold">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              When you call Alderwood, say that this is part of what is going on. It changes how
              quickly we schedule you and which clinician you are matched with — and your first
              session will include building a safety plan you actually leave with.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-sm text-ink-soft" aria-live="polite">
            {answered.length} of {screener.questions.length} answered
          </p>
          <div className="flex gap-3">
            {answered.length > 0 && (
              <button
                type="button"
                onClick={reset}
                className="ow-tap rounded-pill px-4 py-2.5 text-sm font-semibold text-ink-soft hover:text-ink"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              disabled={!complete}
              onClick={() => {
                setSubmitted(true);
                requestAnimationFrame(() =>
                  resultRef.current?.scrollIntoView({ block: "nearest" }),
                );
              }}
              className="ow-tap inline-flex items-center gap-2 rounded-pill bg-clay px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              See my score
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {submitted && complete && (
        <div ref={resultRef} tabIndex={-1} className="ow-card mt-5 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="ow-eyebrow">{screener.full} result</p>
                <p className="mt-2 font-display text-5xl text-ink">
                  {total}
                  <span className="ml-1 text-xl text-ink-soft">/ {maxScore(screener)}</span>
                </p>
              </div>
              <Pill tone={toneStyles[band.tone].chip}>{band.label}</Pill>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-pill bg-surface-2">
              <div
                className={`h-full rounded-pill transition-[width] duration-700 ${toneStyles[band.tone].bar}`}
                style={{ width: `${(total / maxScore(screener)) * 100}%` }}
              />
            </div>

            <p className="ow-prose mt-6 leading-relaxed text-ink-soft">{band.advice}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book/"
                className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-clay px-5 py-3 text-sm font-semibold text-white"
              >
                Request an appointment
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href="/find-a-therapist/"
                className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line px-5 py-3 text-sm font-semibold text-ink"
              >
                Find a matching clinician
              </Link>
            </div>

            <div className="mt-7 space-y-3 border-t border-line pt-5 text-xs leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">This is a screener, not a diagnosis.</strong> It
                measures a narrow slice of a wide experience over a two-week window. A low score
                does not mean nothing is wrong, and a high one does not name what is.
              </p>
              <p>{screener.source}</p>
              <p>
                Nothing you entered left your browser. No answers were transmitted, stored or
                recorded, and closing this tab discards them.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
