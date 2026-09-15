import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/BookingFlow";
import { Icon } from "@/components/Icon";
import { Breadcrumb, Callout, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Choose a clinician, pick a time from their openings, and send a request. We confirm by phone within one business day and verify your insurance before your first session.",
};

export default function BookPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Request an Appointment" }]} />
      <PageHeader
        eyebrow="Get started"
        title="Request an appointment"
        lede="Pick a clinician and a time and we will confirm by phone within one business day. Nothing is booked until we speak — that call is where we verify your insurance and make sure the match is right."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-12">
          <Suspense
            fallback={
              <div className="ow-card p-8">
                <div className="h-6 w-48 animate-pulse rounded bg-surface-2" />
                <div className="mt-4 h-4 w-full animate-pulse rounded bg-surface-2" />
                <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-surface-2" />
              </div>
            }
          >
            <BookingFlow />
          </Suspense>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="ow-card p-6">
              <h2 className="text-lg">Rather just call?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Plenty of people would, and it is often faster. You will reach a person, not a
                queue.
              </p>
              <a
                href={site.phoneHref}
                className="ow-tap mt-4 flex items-center justify-center gap-2 rounded-pill bg-olive px-5 py-3 text-sm font-semibold text-white"
              >
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </a>
              <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs text-ink-soft">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt>{h.days}</dt>
                    <dd className="text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="ow-card p-6">
              <h2 className="text-lg">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                {[
                  "We call within one business day to confirm the time.",
                  "Our coordinator verifies your benefits and tells you what you will owe.",
                  "Intake paperwork arrives by secure link, or on paper if you prefer.",
                  "Your first session is a 60-minute diagnostic intake.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-soft text-xs font-semibold text-olive-deep">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <Callout title="This form is not monitored overnight" tone="crisis" icon="alert">
              It is a scheduling request, not a crisis service. If you need help before we reach
              you, call or text <a href="tel:988" className="font-semibold underline">988</a>,
              or call 911.
            </Callout>
          </aside>
        </div>
      </Section>
    </>
  );
}
