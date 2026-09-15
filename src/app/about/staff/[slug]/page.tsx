import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { TherapistCard } from "@/components/TherapistCard";
import { Breadcrumb, ButtonLink, Callout, Pill, Section } from "@/components/ui";
import {
  ageBandLabels,
  availabilityMeta,
  dayLabels,
  getTherapist,
  therapists,
} from "@/lib/data/staff";
import { services } from "@/lib/data/services";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return therapists.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTherapist(slug);
  if (!t) return { title: "Clinician not found" };
  return {
    title: `${t.name}, ${t.credentials}`,
    description: t.bio,
  };
}

export default async function TherapistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTherapist(slug);
  if (!t) notFound();

  const related = services.filter(
    (s) =>
      s.ageBands.some((a) => t.ages.includes(a)) &&
      s.modalities.some((m) => t.modalities.includes(m)),
  );
  const colleagues = therapists
    .filter((o) => o.slug !== t.slug && o.focus.some((f) => t.focus.includes(f)))
    .slice(0, 3);

  const availTone =
    t.availability === "accepting" ? "olive" : t.availability === "limited" ? "gold" : "muted";

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/about/staff/", label: "Our Clinicians" },
          { label: t.name },
        ]}
      />

      <header className="border-b border-line bg-surface">
        <div className="ow-shell py-10 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <Avatar initials={t.initials} hue={t.hue} size={128} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl leading-tight sm:text-4xl">
                {t.name}
                <span className="ml-2 font-sans text-lg font-medium text-ink-soft">
                  {t.credentials}
                </span>
              </h1>
              <p className="mt-2 text-base font-semibold text-olive">{t.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{t.pronouns}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Pill tone={availTone}>{availabilityMeta[t.availability].label}</Pill>
                {t.formats.includes("telehealth") && <Pill tone="muted">Telehealth</Pill>}
                {t.evenings && <Pill tone="muted">Evenings</Pill>}
                {t.saturdays && <Pill tone="muted">Saturdays</Pill>}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/book/?therapist=${t.slug}`} icon="arrow">
                  Request an appointment
                </ButtonLink>
                <a
                  href={site.phoneHref}
                  className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-olive/50"
                >
                  <Icon name="phone" className="h-4 w-4 text-olive" />
                  {site.phone} <span className="text-ink-soft">{t.extension}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl">About {t.name.split(" ")[0]}</h2>
            <div className="ow-prose mt-5 space-y-4 leading-relaxed text-ink-soft">
              {t.longBio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl sm:text-3xl">Focus areas</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.focus.map((f) => (
                <li key={f}>
                  <Pill tone="clay">{f}</Pill>
                </li>
              ))}
            </ul>

            {related.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl sm:text-3xl">Services {t.name.split(" ")[0]} provides</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="ow-card group flex h-full items-start gap-3 p-4 transition-colors hover:border-olive/40"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive">
                          <Icon name={s.icon} className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">{s.name}</span>
                          <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                            {s.summary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="space-y-6">
            <div className="ow-card p-6">
              <h2 className="text-lg">Practice details</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Works with</dt>
                  <dd className="mt-1 text-ink-soft">
                    {t.ages.map((a) => ageBandLabels[a]).join(" · ")}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Approaches</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {t.modalities.map((m) => (
                      <Pill key={m} tone="muted">{m}</Pill>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Typically in office</dt>
                  <dd className="mt-1 text-ink-soft">
                    {t.availableDays.map((d) => dayLabels[d]).join(", ")}
                    {t.evenings && " · evenings to 8:30pm"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Languages</dt>
                  <dd className="mt-1 text-ink-soft">{t.languages.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Session formats</dt>
                  <dd className="mt-1 text-ink-soft">
                    {t.formats.map((f) => (f === "in-person" ? "In person" : "Telehealth")).join(" · ")}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Direct extension</dt>
                  <dd className="mt-1 text-ink-soft">
                    {site.phone} {t.extension}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="ow-card p-6">
              <h2 className="text-lg">Education</h2>
              <ul className="mt-4 space-y-3">
                {t.education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-sm font-semibold text-ink">{e.degree}</p>
                    <p className="text-xs text-ink-soft">{e.school} · {e.year}</p>
                  </li>
                ))}
              </ul>

              <h2 className="mt-6 text-lg">Licensure & certification</h2>
              <ul className="mt-4 space-y-2">
                {t.certifications.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {t.availability === "waitlist" && (
              <Callout title="Currently waitlist only" tone="clay" icon="clock">
                {t.name.split(" ")[0]} is not taking new clients at the moment. Our intake
                coordinator can put you on the list and, separately, suggest a colleague whose
                specialties overlap — often with no wait at all.
              </Callout>
            )}
          </aside>
        </div>
      </Section>

      {colleagues.length > 0 && (
        <section className="border-t border-line bg-surface">
          <Section>
            <h2 className="text-2xl sm:text-3xl">Clinicians with overlapping specialties</h2>
            <p className="ow-prose mt-2 text-ink-soft">
              If {t.name.split(" ")[0]} is not available, these colleagues cover similar ground.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colleagues.map((c) => (
                <li key={c.slug}>
                  <TherapistCard t={c} compact />
                </li>
              ))}
            </ul>
          </Section>
        </section>
      )}
    </>
  );
}
