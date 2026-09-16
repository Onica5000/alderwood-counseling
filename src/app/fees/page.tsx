import type { Metadata } from "next";
import { FeeEstimator } from "@/components/FeeEstimator";
import { Icon } from "@/components/Icon";
import { Breadcrumb, Callout, PageHeader, Section } from "@/components/ui";
import { plans, sessionTypes } from "@/lib/data/fees";

export const metadata: Metadata = {
  title: "Fees & Insurance",
  description:
    "Alderwood's published rates, the plans we accept, and an interactive estimator that shows what you would pay per session and over a first year.",
};

const accessibilityNotes = [
  {
    icon: "wallet" as const,
    title: "Sliding scale",
    body: "A limited number of reduced-rate slots, allocated by need. Ask the intake coordinator — this is a normal conversation and it does not affect the care you get.",
  },
  {
    icon: "calendar" as const,
    title: "Payment plans",
    body: "We will set up a plan rather than lose a client over money. Say so before a balance builds up, not after.",
  },
  {
    icon: "book" as const,
    title: "Good Faith Estimate",
    body: "Self-paying clients receive a written estimate of expected charges before the first session, as required by the No Surprises Act.",
  },
  {
    icon: "print" as const,
    title: "Superbills",
    body: "Out-of-network clients get a monthly superbill with everything an insurer needs on it. We will not submit it for you, but it will be complete.",
  },
];

export default function FeesPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Fees & Insurance" }]} />
      <PageHeader
        eyebrow="Get started"
        title="What this will cost, before you call"
        lede="Insurance coverage varies greatly, which is usually where cost pages stop. This one keeps going: pick your plan and session type and see the arithmetic, including the deductible nobody mentioned."
      />

      <Section>
        <FeeEstimator />
      </Section>

      <section className="border-y border-line bg-surface">
        <Section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">Published rates</h2>
          <p className="ow-prose mt-3 text-ink-soft">
            These are our self-pay rates and the rates insurers are billed. No line item on a
            statement will be a surprise.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">Alderwood Counseling session rates</caption>
              <thead>
                <tr className="border-b border-line text-left">
                  <th scope="col" className="py-3 pr-4 font-semibold text-ink">Session</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-ink">Length</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-ink">Rate</th>
                  <th scope="col" className="py-3 font-semibold text-ink">CPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sessionTypes.map((s) => (
                  <tr key={s.key}>
                    <td className="py-3.5 pr-4 text-ink">{s.label}</td>
                    <td className="py-3.5 pr-4 text-ink-soft">{s.minutes} min</td>
                    <td className="py-3.5 pr-4 font-semibold text-ink">${s.rate}</td>
                    <td className="py-3.5 font-mono text-xs text-ink-soft">{s.cptCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-14 text-2xl sm:text-3xl lg:text-4xl">Plans we accept</h2>
          <p className="ow-prose mt-3 text-ink-soft">
            Coverage differs plan to plan even within one insurer, so these are typical figures
            rather than promises. Call us and we will verify yours.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plans
              .filter((p) => p.network === "in")
              .map((p) => (
                <li key={p.key} className="ow-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-olive">
                    {p.copay !== null
                      ? p.copay === 0
                        ? "No member cost share"
                        : `~$${p.copay} copay`
                      : `${p.coinsurance}% coinsurance`}
                    {p.deductibleApplies && " · after deductible"}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{p.note}</p>
                </li>
              ))}
          </ul>
        </Section>
      </section>

      <Section>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl">If the number above is a problem</h2>
        <p className="ow-prose mt-3 text-ink-soft">
          Say so. We would far rather have that conversation than have you not call — and we
          have four different ways of dealing with it.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {accessibilityNotes.map((n) => (
            <li key={n.title} className="ow-card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive">
                <Icon name={n.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg leading-snug">{n.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{n.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Callout title="Cancellation policy" icon="clock">
            We ask for 24 hours&rsquo; notice. Later cancellations and no-shows are billed at
            $75, which insurance does not cover. We waive it for emergencies and illness, and we
            do not ask you to prove either.
          </Callout>
          <Callout title="Couples counseling and insurance" tone="clay" icon="alert">
            Many plans do not cover couples work unless one partner carries a qualifying
            diagnosis. We will not manufacture one. Expect to self-pay for couples sessions
            unless verification says otherwise.
          </Callout>
        </div>
      </Section>
    </>
  );
}
