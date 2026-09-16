import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Pill, Section } from "@/components/ui";
import { groups } from "@/lib/data/programs";
import { formatDate } from "@/lib/data/news";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Groups & Workshops",
  description:
    "Current Alderwood cohorts with live seat counts — the DBT skills program for adults and adolescents, educator support, caregiver support, grief drop-in and a children's social skills group.",
};

const statusMeta = {
  open: { label: "Open", tone: "olive" },
  filling: { label: "Filling fast", tone: "gold" },
  "starting-soon": { label: "Starting soon", tone: "clay" },
  waitlist: { label: "Waitlist", tone: "muted" },
} as const;

export default function GroupsPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Groups & Workshops" }]} />
      <PageHeader
        eyebrow="Services"
        title="Cohorts with actual open seats"
        lede="Seat counts are shown honestly. When a group is full it says so, rather than taking your details and calling you in three weeks to explain."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-clay px-6 py-3.5 text-sm font-semibold text-white"
          >
            <Icon name="phone" className="h-4 w-4" />
            Register: {site.phone}
          </a>
          <ButtonLink href="/services/dbt-program/" tone="secondary" icon="arrow">
            About the DBT program
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <ul className="grid gap-5 lg:grid-cols-2">
          {groups.map((g, i) => {
            const meta = statusMeta[g.status];
            const pct = Math.round(((g.seats - g.seatsLeft) / g.seats) * 100);
            const full = g.seatsLeft === 0;

            return (
              <Reveal as="li" key={g.slug} delay={i * 60}>
                <article id={g.slug} className="ow-card flex h-full scroll-mt-28 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-xl leading-snug sm:text-2xl">{g.name}</h2>
                    <Pill tone={meta.tone}>{meta.label}</Pill>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{g.summary}</p>

                  <dl className="mt-6 space-y-2.5 text-sm">
                    <Row icon="users" label="Led by">
                      {g.leaderSlug ? (
                        <Link href={`/about/staff/${g.leaderSlug}/`} className="text-ink hover:text-olive hover:underline">
                          {g.leader}
                        </Link>
                      ) : (
                        g.leader
                      )}
                    </Row>
                    <Row icon="clock" label="When">{g.schedule}</Row>
                    <Row icon="calendar" label="Starts">
                      {formatDate(g.starts)} · {g.weeks} weeks
                    </Row>
                    <Row icon="wallet" label="Cost">{g.cost}</Row>
                    <Row icon="check" label="For">{g.audience}</Row>
                  </dl>

                  <div className="mt-6">
                    <h3 className="ow-eyebrow">Covers</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {g.covers.map((c) => (
                        <Pill key={c} tone="muted">{c}</Pill>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-semibold text-ink">
                        {full ? "Full" : `${g.seatsLeft} of ${g.seats} seats left`}
                      </span>
                      <span className="text-xs text-ink-soft">{pct}% filled</span>
                    </div>
                    <div
                      className="mt-2 h-2 overflow-hidden rounded-pill bg-surface-2"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${g.name} enrolment`}
                    >
                      <div
                        className={`h-full rounded-pill ${full ? "bg-ink-soft" : g.seatsLeft <= 3 ? "bg-gold" : "bg-olive"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <a
                      href={site.phoneHref}
                      className={`ow-tap mt-4 flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-semibold ${
                        full
                          ? "border border-line text-ink"
                          : "bg-clay text-white"
                      }`}
                    >
                      <Icon name="phone" className="h-4 w-4" />
                      {full ? "Join the waitlist" : "Call to register"}
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <section className="border-t border-line bg-surface">
        <Section>
          <div className="grid gap-6 md:grid-cols-2">
            <Callout title="Why groups are capped small" icon="users">
              A skills group of twenty is a lecture. Ours run at six to twelve so that everyone
              has to speak, which is uncomfortable and is the entire mechanism.
            </Callout>
            <Callout title="Confidentiality in a group" tone="clay" icon="shield">
              Group members agree to confidentiality in writing, and we do not place people with
              colleagues from their own workplace. It is still a room with other people in it,
              and we will talk through what that means before you join.
            </Callout>
          </div>
        </Section>
      </section>
    </>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: "users" | "clock" | "calendar" | "wallet" | "check";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
      <dt className="sr-only">{label}</dt>
      <dd className="text-ink-soft">{children}</dd>
    </div>
  );
}
