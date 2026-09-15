import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { TherapistCard } from "@/components/TherapistCard";
import { Breadcrumb, ButtonLink, Callout, Pill, Section } from "@/components/ui";
import { getService, services } from "@/lib/data/services";
import { therapists } from "@/lib/data/staff";
import { sessionTypes } from "@/lib/data/fees";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service not found" };
  return { title: s.name, description: s.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const matched = therapists.filter(
    (t) =>
      t.ages.some((a) => service.ageBands.includes(a)) &&
      t.modalities.some((m) => service.modalities.includes(m)),
  );

  const related = services
    .filter((s) => s.slug !== service.slug && s.ageBands.some((a) => service.ageBands.includes(a)))
    .slice(0, 3);

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/services/", label: "Services" },
          { label: service.name },
        ]}
      />

      <header className="relative overflow-hidden border-b border-line bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-olive/10 blur-3xl"
        />
        <div className="ow-shell relative py-12 sm:py-16">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-olive-soft text-olive">
            <Icon name={service.icon} className="h-7 w-7" />
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
            {service.name}
          </h1>
          <p className="ow-prose mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {service.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book/" icon="arrow">Request an appointment</ButtonLink>
            <a
              href={site.phoneHref}
              className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-olive/50"
            >
              <Icon name="phone" className="h-4 w-4 text-olive" />
              {site.phone}
            </a>
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="ow-prose space-y-5 leading-relaxed text-ink-soft">
              {service.body.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? "text-lg text-ink" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl sm:text-3xl">What this looks like in practice</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.looksLike.map((l) => (
                <li key={l} className="ow-card flex items-start gap-3 p-4">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                  <span className="text-sm leading-relaxed text-ink-soft">{l}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl sm:text-3xl">Concerns this covers</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.concerns.map((c) => (
                <li key={c}>
                  <Pill tone="clay">{c}</Pill>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="ow-card p-6">
              <h2 className="text-lg">The practicalities</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Session length</dt>
                  <dd className="mt-0.5 text-ink-soft">{service.sessionLength}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Typical course</dt>
                  <dd className="mt-0.5 text-ink-soft">{service.typicalCourse}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Approaches used</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {service.modalities.map((m) => (
                      <Pill key={m} tone="muted">{m}</Pill>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Self-pay rate</dt>
                  <dd className="mt-0.5 text-ink-soft">
                    {rateFor(service.sessionLength)} · most insurance accepted
                  </dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-line pt-4">
                <ButtonLink href="/fees/" tone="secondary" icon="arrow" className="w-full">
                  Estimate your cost
                </ButtonLink>
              </div>
            </div>

            <Callout title="Not sure this is the right one?" icon="spark">
              Six questions and we will rank the services and clinicians that fit, with the
              reasoning shown rather than hidden.
              <div className="mt-4">
                <ButtonLink href="/find-a-therapist/" icon="arrow">Start the matcher</ButtonLink>
              </div>
            </Callout>
          </aside>
        </div>
      </Section>

      {matched.length > 0 && (
        <section className="border-y border-line bg-surface">
          <Section>
            <h2 className="text-2xl sm:text-3xl">Clinicians who provide this</h2>
            <p className="ow-prose mt-2 text-ink-soft">
              {matched.length} of our {therapists.length} clinicians work in this area.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matched.map((t) => (
                <li key={t.slug}>
                  <TherapistCard t={t} compact />
                </li>
              ))}
            </ul>
          </Section>
        </section>
      )}

      {related.length > 0 && (
        <Section>
          <h2 className="text-2xl sm:text-3xl">Related services</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}/`}
                  className="ow-card group flex h-full items-start gap-3 p-5 transition-colors hover:border-olive/40"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive">
                    <Icon name={r.icon} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-base text-ink">{r.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                      {r.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

/** Maps a service's stated session length onto the published rate card. */
function rateFor(sessionLength: string) {
  const minutes = parseInt(sessionLength, 10);
  const match = sessionTypes.find((s) => s.minutes === minutes);
  return match ? `$${match.rate}` : "See fee schedule";
}
