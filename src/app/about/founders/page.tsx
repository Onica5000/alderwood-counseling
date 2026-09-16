import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Pill, Section } from "@/components/ui";
import { therapists } from "@/lib/data/staff";

export const metadata: Metadata = {
  title: "Founders",
  description:
    "Alderwood Counseling was established in March 2012 by Marian and Kate Holloway, a mother and daughter committed to serving the children and families of the Lehigh Valley.",
};

const timeline = [
  {
    year: "2011",
    title: "Two chairs and a folding table",
    body: "Marian and Kate open Alderwood in April with a two-room suite, one shared phone line and a caseload built entirely of referrals from people who already knew them.",
  },
  {
    year: "2013",
    title: "The practice outgrows the suite",
    body: "Dana Whitfield and Raymond Castellan join, extending the practice into adolescent, adult and disaster-response work. Evening hours start because the waitlist is made almost entirely of people who work.",
  },
  {
    year: "2014",
    title: "Alder Court",
    body: "Alderwood moves to 215 Alder Court — a building chosen over several medical-office suites specifically because it has seven rooms that are different from one another. Kate is named Bethlehem's Top Social Worker.",
  },
  {
    year: "2018",
    title: "Groups begin",
    body: "The DBT skills program launches under Ingrid Voss, followed by the educator support group. The practice starts running cohorts rather than only individual hours.",
  },
  {
    year: "2026",
    title: "Eight clinicians, full age span",
    body: "Telehealth extends to every clinician. The roster now covers ages two through senior adulthood without a family needing to assemble three separate practices.",
  },
];

export default function FoundersPage() {
  const founders = therapists.filter((t) => t.isFounder);

  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Founders" }]} />
      <PageHeader
        eyebrow="About"
        title="A mother and a daughter, since March 2012"
        lede="Alderwood Counseling was established by Marian and Kate Holloway — a mother and daughter committed to using their education and extensive professional experience to provide excellent services to the children and families of the Lehigh Valley."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.slug} delay={i * 100}>
              <article className="ow-card h-full p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <Avatar initials={f.initials} hue={f.hue} size={88} />
                  <div className="min-w-0">
                    <h2 className="text-2xl leading-tight">{f.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-olive">
                      {f.credentials} · {f.title}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">{f.pronouns}</p>
                  </div>
                </div>

                <div className="ow-prose mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
                  {f.longBio.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {f.modalities.map((m) => (
                    <Pill key={m} tone="muted">{m}</Pill>
                  ))}
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <Link
                    href={`/about/staff/${f.slug}/`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-clay hover:underline"
                  >
                    Full profile and credentials
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-y border-line bg-surface">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <div>
              <p className="ow-eyebrow">How it grew</p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">
                Fifteen years, deliberately slowly
              </h2>
              <p className="ow-prose mt-4 text-ink-soft">
                The practice has expanded since its inception to include clinicians with
                specialized expertise. Each addition was made to cover a gap we kept referring
                out — not to fill a schedule.
              </p>
              <div className="mt-6">
                <Callout title="Still family-run" icon="check">
                  Both founders still carry clinical caseloads. Neither has moved into a purely
                  administrative role, which is the main reason intake is still done by hand.
                </Callout>
              </div>
            </div>

            <ol className="relative space-y-8 border-l border-line pl-8">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.year} delay={i * 70}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[9px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-canvas bg-olive"
                  />
                  <p className="font-display text-xl text-olive">{t.year}</p>
                  <h3 className="mt-1 text-lg leading-snug">{t.title}</h3>
                  <p className="ow-prose mt-1.5 text-sm leading-relaxed text-ink-soft">{t.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>
      </section>

      <Section>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl">The rest of the team</h2>
            <p className="ow-prose mt-2 text-ink-soft">
              Six more clinicians and the two people who make the front desk work.
            </p>
          </div>
          <ButtonLink href="/about/staff/" icon="arrow">Meet everyone</ButtonLink>
        </div>
      </Section>
    </>
  );
}
