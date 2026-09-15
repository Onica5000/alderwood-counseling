import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Pill, Section } from "@/components/ui";
import { modalityDetail, serviceCategories, services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Individual counseling from age two through senior adulthood, couples and family work, the DBT skills program, grief counseling, telehealth and a first-responder track.",
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Services" }]} />
      <PageHeader
        eyebrow="Services"
        title="Matched to the life stage, not just the diagnosis"
        lede="A four-year-old, a fifteen-year-old and a seventy-year-old presenting with the same word are not doing the same work. Our services are organised the way people actually arrive."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/find-a-therapist/" icon="arrow">
            Find the right service for me
          </ButtonLink>
          <ButtonLink href="/fees/" tone="secondary">
            What it costs
          </ButtonLink>
        </div>
      </PageHeader>

      {serviceCategories.map((cat) => {
        const items = services.filter((s) => s.category === cat.key);
        if (!items.length) return null;
        return (
          <Section key={cat.key} id={cat.key}>
            <div className="flex flex-col gap-2 border-b border-line pb-5">
              <h2 className="text-2xl sm:text-3xl">{cat.label}</h2>
              <p className="text-ink-soft">{cat.blurb}</p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 60}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="ow-card group flex h-full flex-col p-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive-soft text-olive">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg leading-snug">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.summary}</p>

                    <dl className="mt-5 space-y-1 border-t border-line pt-4 text-xs text-ink-soft">
                      <div className="flex justify-between gap-3">
                        <dt>Session length</dt>
                        <dd className="text-right text-ink">{s.sessionLength}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>Typical course</dt>
                        <dd className="text-right text-ink">{s.typicalCourse}</dd>
                      </div>
                    </dl>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay">
                      Read more
                      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Section>
        );
      })}

      <section className="border-y border-line bg-surface">
        <Section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">The approaches we practice</h2>
          <p className="ow-prose mt-3 text-ink-soft">
            Acronyms are thrown around a great deal in this field. Here is what each of ours
            actually means, and what it is for.
          </p>

          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {modalityDetail.map((m, i) => (
              <Reveal key={m.name} delay={i * 50}>
                <div className="ow-card h-full p-6">
                  <dt>
                    <Pill tone="clay">{m.name}</Pill>
                    <span className="mt-3 block font-display text-lg text-ink">{m.full}</span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{m.description}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Section>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Callout title="What we do not do" tone="crisis" icon="alert">
            Olivewood is outpatient only. We do not provide inpatient care, partial
            hospitalization, medication management, custody evaluations or court testimony,
            or 24-hour crisis coverage. We keep a real referral list for all of it and will
            use it rather than hold onto work we cannot do well.
          </Callout>
          <Callout title="Not sure which one applies?" icon="spark">
            That is an extremely common place to start, and it is what the intake conversation
            is for. Our matching tool asks the same six questions our coordinator would and
            shows you the reasoning behind every suggestion.
            <div className="mt-4">
              <ButtonLink href="/find-a-therapist/" icon="arrow">
                Start the matcher
              </ButtonLink>
            </div>
          </Callout>
        </div>
      </Section>
    </>
  );
}
