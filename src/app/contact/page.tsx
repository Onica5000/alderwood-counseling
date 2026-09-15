import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";
import { site, fullAddress } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call (610) 417-0463 or send a message. Olivewood Counseling is at 510 Delaware Avenue, Bethlehem, PA 18015, with evening and Saturday hours.",
};

export default function ContactPage() {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title="Call us, and you will reach a person"
        lede="Not a queue, not a menu. They will ask what is bringing you in, what you have already tried, and what days could actually work — and then match you deliberately."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-clay px-6 py-3.5 text-sm font-semibold text-white"
          >
            <Icon name="phone" className="h-4 w-4" />
            {site.phone}
          </a>
          <ButtonLink href="/book/" tone="secondary" icon="arrow">
            Request an appointment online
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          <ContactForm />

          <aside className="space-y-6">
            <div className="ow-card overflow-hidden">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-[4/3] bg-surface-2">
                  <MapArt />
                  <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-pill bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
                    <Icon name="external" className="h-3.5 w-3.5" />
                    Open in Google Maps
                  </span>
                </div>
              </a>
              <div className="p-6">
                <h2 className="text-lg">Visit us</h2>
                <address className="mt-3 space-y-3 text-sm not-italic">
                  <p className="flex items-start gap-2.5 text-ink">
                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                    <span>
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Icon name="phone" className="h-4 w-4 shrink-0 text-olive" />
                    <a href={site.phoneHref} className="text-ink hover:text-olive">{site.phone}</a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Icon name="print" className="h-4 w-4 shrink-0 text-olive" />
                    <span className="text-ink-soft">Fax {site.fax}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Icon name="mail" className="h-4 w-4 shrink-0 text-olive" />
                    <a href={`mailto:${site.email}`} className="break-all text-ink hover:text-olive">
                      {site.email}
                    </a>
                  </p>
                </address>
              </div>
            </div>

            <div className="ow-card p-6">
              <h2 className="flex items-center gap-2 text-lg">
                <Icon name="clock" className="h-5 w-5 text-olive" />
                Office hours
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
                    <dt className="text-ink-soft">{h.days}</dt>
                    <dd className="text-right font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                Evening and Saturday slots fill first. If you can take a daytime appointment to
                start, you will be seen sooner.
              </p>
            </div>

            <Callout title="If you are in crisis" tone="crisis" icon="alert">
              <ul className="mt-2 space-y-2">
                {site.crisis.map((c) => (
                  <li key={c.label} className="flex items-center justify-between gap-3">
                    <span>{c.label}</span>
                    <a href={c.href} className="shrink-0 font-semibold text-crisis underline">
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs">
                Olivewood is an outpatient practice and does not provide 24-hour crisis coverage.
              </p>
            </Callout>
          </aside>
        </div>
      </Section>

      <section className="border-t border-line bg-surface">
        <Section>
          <h2 className="text-2xl sm:text-3xl">Getting here</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "pin" as const,
                title: "By car",
                body: "Free lot behind the building, entered from Delaware Avenue. Two accessible spaces nearest the step-free door. Street parking is unmetered after 6pm.",
              },
              {
                icon: "users" as const,
                title: "By bus",
                body: "LANTA routes stop within three blocks. Tell us when you schedule and we will build in a buffer rather than have you arrive rushed.",
              },
              {
                icon: "screen" as const,
                title: "Not at all",
                body: "Every clinician offers secure video sessions. You must be physically in Pennsylvania during the session — that is a licensure rule, not a preference.",
              },
            ].map((c) => (
              <div key={c.title} className="ow-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-soft text-olive">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>
    </>
  );
}

/** A stylised locator rather than an embedded map — no third-party tracker on page load. */
function MapArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Stylised map showing 510 Delaware Avenue, Bethlehem">
      <rect width="400" height="300" fill="hsl(var(--ow-surface-2))" />

      {/* River */}
      <path
        d="M-10 214 Q 70 196, 150 212 T 300 200 T 410 216 L410 250 Q 300 236, 200 248 T -10 244 Z"
        fill="hsl(200 40% 60%)"
        opacity="0.35"
      />

      {/* Blocks */}
      <g fill="hsl(var(--ow-line))" opacity="0.7">
        <rect x="24" y="30" width="86" height="58" rx="3" />
        <rect x="132" y="30" width="110" height="58" rx="3" />
        <rect x="264" y="30" width="96" height="58" rx="3" />
        <rect x="24" y="112" width="86" height="64" rx="3" />
        <rect x="264" y="112" width="96" height="64" rx="3" />
      </g>

      {/* Streets */}
      <g stroke="hsl(var(--ow-canvas))" strokeWidth="10" strokeLinecap="round">
        <path d="M0 100h400M0 186h400M120 10v186M252 10v186" />
      </g>

      {/* Delaware Avenue, highlighted */}
      <path d="M132 112h110v64H132z" fill="hsl(var(--ow-olive))" opacity="0.18" />
      <text x="140" y="168" fontSize="9" fill="hsl(var(--ow-ink-soft))" fontFamily="var(--font-sans)">
        Delaware Ave
      </text>

      {/* Pin */}
      <g transform="translate(176 118)">
        <path
          d="M11 30S22 19.5 22 11A11 11 0 1 0 0 11c0 8.5 11 19 11 19Z"
          fill="hsl(var(--ow-clay))"
        />
        <circle cx="11" cy="11" r="4.2" fill="#fff" />
      </g>
      <text x="204" y="132" fontSize="10" fontWeight="600" fill="hsl(var(--ow-ink))" fontFamily="var(--font-sans)">
        510
      </text>
    </svg>
  );
}
