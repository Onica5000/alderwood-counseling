import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { TherapistCard } from "@/components/TherapistCard";
import { ButtonLink, Callout, Pill, Section, SectionHead, Stat } from "@/components/ui";
import { services } from "@/lib/data/services";
import { therapists } from "@/lib/data/staff";
import { testimonials } from "@/lib/data/testimonials";
import { groups } from "@/lib/data/programs";
import { sortedPosts, formatDate } from "@/lib/data/news";
import { site } from "@/lib/data/site";

const entryPoints = [
  {
    href: "/find-a-therapist/",
    icon: "spark" as const,
    title: "I don't know where to start",
    body: "Six questions, then a ranked shortlist of clinicians with the reasoning shown.",
    cta: "Find a therapist",
  },
  {
    href: "/book/",
    icon: "calendar" as const,
    title: "I know who I want to see",
    body: "Pick a clinician, a day and a time. We confirm by phone within one business day.",
    cta: "Request an appointment",
  },
  {
    href: "/fees/",
    icon: "wallet" as const,
    title: "I need to know what it costs",
    body: "Estimate your per-session and first-year cost from your plan, before you call.",
    cta: "Estimate my cost",
  },
];

export default function HomePage() {
  const featured = testimonials.filter((t) => t.featured).slice(0, 3);
  const openGroups = groups.filter((g) => g.status !== "waitlist").slice(0, 3);
  const latest = sortedPosts.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="ow-grain pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-olive/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-clay/10 blur-3xl"
        />

        <div className="ow-shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-28">
          <div>
            <Reveal>
              <Pill tone="olive">
                <Icon name="check" className="h-3.5 w-3.5" />
                Accepting new clients · Evening &amp; Saturday hours
              </Pill>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.75rem]">
                Accomplished clinicians.
                <br />
                <span className="text-olive">Inviting space.</span>
                <br />
                Genuine respect.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="ow-prose mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
                Olivewood is one of the few practices in the Lehigh Valley equipped to treat
                the full age range — from a two-year-old in the playroom to an eighty-year-old
                in the quiet room — in a building chosen specifically for how little it
                resembles a clinic.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/find-a-therapist/" icon="arrow">
                  Find your therapist
                </ButtonLink>
                <ButtonLink href="/first-visit/" tone="secondary">
                  What a first visit is like
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
                <Stat value="2011" label="Founded in Bethlehem" />
                <Stat value="8" label="Licensed clinicians" />
                <Stat value="2–90" label="Ages treated" />
                <Stat value="8:30pm" label="Latest weeknight slot" />
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140} className="relative">
            <HeroArt />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- Three entry points */}
      <Section className="!py-12 sm:!py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {entryPoints.map((e, i) => (
            <Reveal key={e.href} delay={i * 80}>
              <Link
                href={e.href}
                className="ow-card group flex h-full flex-col p-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive-soft text-olive">
                  <Icon name={e.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-xl">{e.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-clay">
                  {e.cta}
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Services */}
      <Section id="services">
        <SectionHead
          eyebrow="Services"
          title="Matched to the life stage, not just the diagnosis"
          lede="A four-year-old, a fifteen-year-old and a seventy-year-old are not doing the same work. Our services are organised the way people actually arrive."
          action={
            <ButtonLink href="/services/" tone="secondary" icon="arrow">
              All services
            </ButtonLink>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                href={`/services/${s.slug}/`}
                className="ow-card group flex h-full flex-col p-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-soft text-clay">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg leading-snug">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.modalities.slice(0, 3).map((m) => (
                    <Pill key={m} tone="muted">{m}</Pill>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- The building */}
      <section className="border-y border-line bg-surface">
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <FacilityArt />
            </Reveal>
            <Reveal delay={100}>
              <p className="ow-eyebrow">The facility</p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">
                No sliding glass window. No row of identical chairs.
              </h2>
              <div className="ow-prose mt-5 space-y-4 text-ink-soft">
                <p>
                  We looked at a lot of buildings before choosing 510 Delaware Avenue. Most of
                  the options were medical-office suites, and every one of them had the same
                  three things: a sliding glass window, a row of identical chairs facing a
                  television, and lighting that makes everybody look unwell.
                </p>
                <p>
                  There are seven rooms here and they are deliberately different from one
                  another — a playroom with a sand tray, a quiet room with low light for trauma
                  work, a larger room that holds a whole family or a skills group.
                </p>
              </div>
              <div className="mt-6">
                <Callout title="Tell us what you need" icon="check">
                  If a particular room would help, or a particular room would not, say so when
                  you schedule. This is not an unusual request and you will not be the first to
                  make it.
                </Callout>
              </div>
              <div className="mt-6">
                <ButtonLink href="/about/facility/" tone="secondary" icon="arrow">
                  Take a look inside
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Section>
      </section>

      {/* ----------------------------------------------------------- Staff */}
      <Section>
        <SectionHead
          eyebrow="Our clinicians"
          title="Everyone here has a specialty, and we will tell you what it is"
          lede="Being matched to the right clinician matters more than being seen quickly. Our intake coordinator does this by hand — and our matching tool shows you the same reasoning."
          action={
            <ButtonLink href="/about/staff/" tone="secondary" icon="arrow">
              Meet everyone
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {therapists.slice(0, 3).map((t, i) => (
            <Reveal key={t.slug} delay={i * 80}>
              <TherapistCard t={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------- Testimonials */}
      <section className="border-y border-line bg-olive-soft/50">
        <Section>
          <SectionHead
            eyebrow="In their words"
            title="What clients say when nobody is editing"
            action={
              <ButtonLink href="/testimonials/" tone="secondary" icon="arrow">
                Read more
              </ButtonLink>
            }
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featured.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <figure
                  className={`ow-card flex h-full flex-col p-6 ${
                    t.childNote ? "bg-clay-soft" : ""
                  }`}
                >
                  <blockquote
                    className={`flex-1 leading-relaxed ${
                      t.childNote
                        ? "font-display text-lg text-clay"
                        : "text-sm text-ink-soft"
                    }`}
                  >
                    {t.childNote ? `"${t.quote}"` : `"${t.quote}"`}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <p className="text-sm font-semibold text-ink">{t.attribution}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{t.context}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      {/* --------------------------------------------------------- Groups */}
      <Section>
        <SectionHead
          eyebrow="Groups & workshops"
          title="Cohorts with actual open seats"
          lede="Seat counts are live. When a group fills, it says so rather than taking your details and calling you in three weeks."
          action={
            <ButtonLink href="/groups/" tone="secondary" icon="arrow">
              All groups
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {openGroups.map((g, i) => (
            <Reveal key={g.slug} delay={i * 80}>
              <Link
                href={`/groups/#${g.slug}`}
                className="ow-card group flex h-full flex-col p-6 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg leading-snug">{g.name}</h3>
                  <Pill tone={g.seatsLeft <= 3 ? "gold" : "olive"}>
                    {g.seatsLeft} left
                  </Pill>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{g.summary}</p>
                <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs text-ink-soft">
                  <div className="flex items-center gap-2">
                    <Icon name="clock" className="h-3.5 w-3.5 shrink-0 text-olive" />
                    {g.schedule}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="users" className="h-3.5 w-3.5 shrink-0 text-olive" />
                    {g.leader}
                  </div>
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- News */}
      <section className="border-t border-line bg-surface">
        <Section>
          <SectionHead
            eyebrow="News"
            title="From the practice"
            action={
              <ButtonLink href="/news/" tone="secondary" icon="arrow">
                All posts
              </ButtonLink>
            }
          />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {latest.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/news/${p.slug}/`}
                  className="group flex flex-col gap-2 py-5 transition-colors hover:bg-surface-2 sm:flex-row sm:items-baseline sm:gap-6 sm:px-2"
                >
                  <time
                    dateTime={p.date}
                    className="shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-soft sm:w-40"
                  >
                    {formatDate(p.date)}
                  </time>
                  <div className="min-w-0">
                    <h3 className="text-lg leading-snug transition-colors group-hover:text-olive">
                      {p.title}
                    </h3>
                    <p className="ow-prose mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <Section>
        <Reveal>
          <div className="ow-card relative overflow-hidden bg-olive p-8 text-center sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl text-white sm:text-4xl">
                The hardest session to book is the first one.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                Call and you will speak with a person, not a queue. They will ask what is
                bringing you in, what you have already tried, and what days could actually
                work — and then match you deliberately. Most people are seen within seven to
                ten days.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={site.phoneHref}
                  className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold text-olive-deep transition-transform hover:scale-[1.02]"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {site.phone}
                </a>
                <Link
                  href="/book/"
                  className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Request online instead
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------- Art */

/**
 * The hero illustration.
 *
 * Drawn rather than photographed: a stock photo of strangers in a therapy room
 * is the single most generic move a counseling site can make, and any photo we
 * used would show people who are not the people here.
 */
function HeroArt() {
  return (
    <div className="ow-card relative overflow-hidden p-0">
      <svg viewBox="0 0 400 340" className="w-full" role="img" aria-label="Illustration of a warm counseling room with two chairs, a window and an olive tree outside">
        <defs>
          <linearGradient id="hero-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--ow-surface-2))" />
            <stop offset="100%" stopColor="hsl(var(--ow-surface))" />
          </linearGradient>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="hsl(var(--ow-olive) / 0.18)" />
            <stop offset="100%" stopColor="hsl(var(--ow-gold) / 0.22)" />
          </linearGradient>
          <linearGradient id="hero-light" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="hsl(var(--ow-gold) / 0.3)" />
            <stop offset="100%" stopColor="hsl(var(--ow-gold) / 0)" />
          </linearGradient>
        </defs>

        <rect width="400" height="340" fill="url(#hero-wall)" />

        {/* Window and the tree the practice is named for */}
        <g>
          <rect x="196" y="38" width="150" height="130" rx="6" fill="url(#hero-sky)" />
          <circle cx="262" cy="96" r="30" fill="hsl(var(--ow-olive) / 0.5)" />
          <circle cx="292" cy="82" r="20" fill="hsl(var(--ow-olive) / 0.38)" />
          <circle cx="238" cy="80" r="17" fill="hsl(var(--ow-olive) / 0.34)" />
          <path d="M268 168V108" stroke="hsl(var(--ow-olive-deep))" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
          <rect x="196" y="38" width="150" height="130" rx="6" fill="none" stroke="hsl(var(--ow-line))" strokeWidth="3" />
          <path d="M271 38v130M196 103h150" stroke="hsl(var(--ow-line))" strokeWidth="3" />
        </g>

        {/* Afternoon light across the floor */}
        <path d="M196 168 346 168 300 300 150 300Z" fill="url(#hero-light)" />

        {/* Floor line */}
        <path d="M0 262h400" stroke="hsl(var(--ow-line))" strokeWidth="2" />

        {/* Two chairs, turned slightly toward one another */}
        <g fill="hsl(var(--ow-olive))" opacity="0.9">
          <path d="M40 262v-46a20 20 0 0 1 20-20h22a20 20 0 0 1 20 20v46Z" opacity="0.28" />
          <path d="M44 262v-42a16 16 0 0 1 16-16h22a16 16 0 0 1 16 16v42Z" />
          <rect x="46" y="256" width="6" height="26" rx="3" />
          <rect x="90" y="256" width="6" height="26" rx="3" />
        </g>
        <g fill="hsl(var(--ow-clay))" opacity="0.9">
          <path d="M150 262v-52a22 22 0 0 1 22-22h24a22 22 0 0 1 22 22v52Z" opacity="0.25" />
          <path d="M155 262v-47a18 18 0 0 1 18-18h23a18 18 0 0 1 18 18v47Z" />
          <rect x="157" y="256" width="6" height="26" rx="3" />
          <rect x="207" y="256" width="6" height="26" rx="3" />
        </g>

        {/* Side table with a plant and a box of tissues */}
        <g>
          <rect x="112" y="228" width="32" height="5" rx="2.5" fill="hsl(var(--ow-ink-soft))" opacity="0.5" />
          <rect x="126" y="233" width="4" height="29" fill="hsl(var(--ow-ink-soft))" opacity="0.4" />
          <path d="M120 228c0-10 4-16 8-18 1 8-2 15-8 18Z" fill="hsl(var(--ow-olive))" opacity="0.7" />
          <path d="M132 228c2-8 6-12 10-13-1 7-4 12-10 13Z" fill="hsl(var(--ow-olive))" opacity="0.55" />
        </g>

        {/* Rug */}
        <ellipse cx="150" cy="288" rx="118" ry="20" fill="hsl(var(--ow-clay))" opacity="0.12" />
      </svg>
    </div>
  );
}

function FacilityArt() {
  const rooms = [
    { label: "Playroom", hue: 38 },
    { label: "Quiet room", hue: 200 },
    { label: "Family room", hue: 110 },
    { label: "Group room", hue: 280 },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {rooms.map((r, i) => (
        <div
          key={r.label}
          className={`ow-card relative overflow-hidden ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`room-${r.hue}`} x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor={`hsl(${r.hue} 34% 72%)`} />
                <stop offset="100%" stopColor={`hsl(${r.hue + 14} 30% 46%)`} />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#room-${r.hue})`} />
            <rect x="10" y="12" width="34" height="30" rx="3" fill="#fff" opacity="0.28" />
            <path d="M0 74c18-6 30 4 48-2s34-8 52-2v30H0Z" fill="#fff" opacity="0.16" />
            <circle cx="72" cy="30" r="12" fill="#fff" opacity="0.2" />
          </svg>
          <span className="absolute bottom-2 left-2 rounded-pill bg-surface/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur">
            {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}
