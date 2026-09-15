"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { Field, Pill, inputClass } from "./ui";
import { estimate, plans, sessionTypes } from "@/lib/data/fees";

export function FeeEstimator() {
  const [planKey, setPlanKey] = useState("highmark");
  const [sessionKey, setSessionKey] = useState("individual");
  const [sessions, setSessions] = useState(16);
  const [deductible, setDeductible] = useState(750);
  const [sliding, setSliding] = useState(false);

  const plan = plans.find((p) => p.key === planKey)!;
  const session = sessionTypes.find((s) => s.key === sessionKey)!;

  const result = useMemo(
    () => estimate(plan, session, sessions, deductible, sliding),
    [plan, session, sessions, deductible, sliding],
  );

  const selfPay = plan.network === "none";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* ------------------------------------------------------------ Inputs */}
      <div className="ow-card p-6 sm:p-8">
        <h2 className="text-xl">Your situation</h2>
        <p className="mt-1.5 text-sm text-ink-soft">
          Everything updates as you change it. Nothing is sent anywhere.
        </p>

        <div className="mt-6 space-y-5">
          <Field label="Your insurance" htmlFor="fe-plan">
            <select
              id="fe-plan"
              value={planKey}
              onChange={(e) => setPlanKey(e.target.value)}
              className={inputClass}
            >
              {plans.map((p) => (
                <option key={p.key} value={p.key}>{p.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Type of session" htmlFor="fe-session">
            <select
              id="fe-session"
              value={sessionKey}
              onChange={(e) => setSessionKey(e.target.value)}
              className={inputClass}
            >
              {sessionTypes.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label} · {s.minutes} min · ${s.rate}
                </option>
              ))}
            </select>
          </Field>

          <div>
            <label htmlFor="fe-sessions" className="flex items-baseline justify-between text-sm font-semibold text-ink">
              Sessions you expect this year
              <span className="font-display text-lg text-olive">{sessions}</span>
            </label>
            <input
              id="fe-sessions"
              type="range"
              min={4}
              max={52}
              step={1}
              value={sessions}
              onChange={(e) => setSessions(Number(e.target.value))}
              className="mt-3 w-full accent-[hsl(var(--ow-olive))]"
            />
            <p className="mt-1.5 text-xs text-ink-soft">
              A focused course of CBT runs 10–16. The DBT program runs 24 weeks.
            </p>
          </div>

          {plan.deductibleApplies && !selfPay && (
            <div>
              <label htmlFor="fe-deductible" className="flex items-baseline justify-between text-sm font-semibold text-ink">
                Deductible still to meet
                <span className="font-display text-lg text-olive">${deductible.toLocaleString()}</span>
              </label>
              <input
                id="fe-deductible"
                type="range"
                min={0}
                max={6000}
                step={250}
                value={deductible}
                onChange={(e) => setDeductible(Number(e.target.value))}
                className="mt-3 w-full accent-[hsl(var(--ow-olive))]"
              />
              <p className="mt-1.5 text-xs text-ink-soft">
                Check your plan portal, or ask us to verify it for you.
              </p>
            </div>
          )}

          {selfPay && (
            <label className="flex cursor-pointer items-start gap-3 rounded-card border border-line bg-surface-2 p-4">
              <input
                type="checkbox"
                checked={sliding}
                onChange={(e) => setSliding(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[hsl(var(--ow-olive))]"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">
                  Apply a sliding-scale rate
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                  Limited slots, allocated by need. Ask the intake coordinator — we would far
                  rather have that conversation than lose a client over money.
                </span>
              </span>
            </label>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------- Results */}
      <div className="space-y-4">
        <div className="ow-card overflow-hidden">
          <div className="bg-olive px-6 py-8 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              {result.deductibleSessions > 0 ? "Once your deductible is met" : "Your cost per session"}
            </p>
            <p className="mt-2 font-display text-5xl text-white" aria-live="polite">
              ${result.perSession}
              <span className="ml-2 text-lg text-white/70">per session</span>
            </p>

            <div className="mt-6 grid gap-4 border-t border-white/20 pt-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/70">
                  Estimated first-year total
                </p>
                <p className="mt-1 font-display text-2xl text-white">
                  ${result.firstYearTotal.toLocaleString()}
                </p>
              </div>
              {result.deductibleSessions > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/70">
                    Sessions at the full rate first
                  </p>
                  <p className="mt-1 font-display text-2xl text-white">
                    {result.deductibleSessions} × ${session.rate}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg">
              <Icon name="spark" className="h-5 w-5 text-olive" />
              How that number is built
            </h3>
            <ul className="mt-4 space-y-3">
              {result.explanation.map((line) => (
                <li key={line.slice(0, 32)} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
              <Pill tone="muted">CPT {session.cptCode}</Pill>
              <Pill tone="muted">{session.minutes} minutes</Pill>
              <Pill tone="muted">List rate ${session.rate}</Pill>
              {plan.network === "in" && <Pill tone="olive">In network</Pill>}
              {plan.network === "out" && <Pill tone="gold">Out of network</Pill>}
            </div>

            {session.note && (
              <p className="mt-4 rounded-lg bg-surface-2 p-3 text-xs leading-relaxed text-ink-soft">
                <strong className="text-ink">Note on {session.label.toLowerCase()}:</strong>{" "}
                {session.note}
              </p>
            )}
          </div>
        </div>

        <div className="ow-card border-clay/25 bg-clay-soft p-6">
          <h3 className="flex items-center gap-2 font-display text-lg text-clay">
            <Icon name="alert" className="h-5 w-5" />
            An estimate, not a quote
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Plans differ enormously even within one insurer, and the only number that binds
            anyone is the one your insurer gives on verification. Our intake coordinator runs
            that check before your first session and tells you what you will actually owe — and
            you get a written Good Faith Estimate if you are self-paying.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/book/"
              className="ow-tap inline-flex items-center gap-2 rounded-pill bg-clay px-5 py-2.5 text-sm font-semibold text-white"
            >
              Have us verify my benefits
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/faq/#what-it-costs"
              className="ow-tap inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink"
            >
              Read the cost FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
