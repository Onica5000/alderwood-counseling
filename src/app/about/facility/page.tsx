import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { RoomGallery } from "@/components/RoomGallery";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";
import { site, fullAddress } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "The Facility",
  description:
    "Olivewood's facility provides a welcoming environment for all ages — seven rooms at 510 Delaware Avenue, Bethlehem, deliberately different from one another.",
};

const accessibility = [
  { icon: "check" as const, label: "Step-free entrance from the Delaware Avenue lot" },
  { icon: "check" as const, label: "All counseling rooms on the ground floor" },
  { icon: "check" as const, label: "Accessible restroom with grab rails" },
  { icon: "check" as const, label: "Hearing loop in the group room" },
  { icon: "check" as const, label: "Fragrance-free policy throughout" },
  { icon: "check" as const, label: "Seating with and without arms in every room" },
  { icon: "check" as const, label: "No fluorescent tube lighting anywhere in the building" },
  { icon: "check" as const, label: "Quiet corner in the waiting area, away from the door" },
];

export default function FacilityPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "The Facility" }]} />
      <PageHeader
        eyebrow="About"
        title="Olivewood's facility provides a welcoming environment for all ages"
        lede="We have a variety of rooms to accommodate the needs of our clients — whether we are working with young children, adults or a whole family at once. If a particular room would help, tell us when you schedule."
      >
        <ButtonLink
          href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
          tone="secondary"
          external
        >
          {fullAddress}
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="ow-prose">
          <p className="text-lg leading-relaxed text-ink">
            We looked at a lot of buildings before choosing this one. Most of the options were
            medical-office suites, and every one of them had the same three things: a sliding
            glass window, a row of identical chairs facing a television, and lighting that makes
            everybody look unwell.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            None of that is incidental. A waiting room communicates something before anyone has
            said a word, and what most of them communicate is that you are a case being
            processed. So we chose a building with seven rooms that are genuinely different from
            one another, and we furnished them one at a time.
          </p>
        </div>

        <div className="mt-10">
          <RoomGallery />
        </div>
        <p className="mt-4 text-xs text-ink-soft">
          Rooms are shown as illustrations. Replace the art with photographs by dropping files
          into <code className="rounded bg-surface-2 px-1.5 py-0.5">/public/rooms/</code> and
          setting <code className="rounded bg-surface-2 px-1.5 py-0.5">image</code> on each
          record.
        </p>
      </Section>

      <section className="border-y border-line bg-surface">
        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="ow-eyebrow">Access</p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">
                &ldquo;Welcoming&rdquo; is meaningless without specifics
              </h2>
              <p className="ow-prose mt-4 text-ink-soft">
                So here are the specifics. If something you need is not on this list, ask —
                several of these were added because a client told us they were missing.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact/" tone="secondary" icon="arrow">
                  Ask about an accommodation
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {accessibility.map((a) => (
                <li key={a.label} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Icon name={a.icon} className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                  {a.label}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl">Getting here</h2>
            <div className="ow-prose mt-4 space-y-4 text-ink-soft">
              <p>
                510 Delaware Avenue sits on Bethlehem&rsquo;s south side, a few minutes from the
                Hill-to-Hill Bridge and within walking distance of the Lehigh University campus.
                Parking is free in the lot behind the building; the entrance from the lot is
                step-free.
              </p>
              <p>
                LANTA routes stop within three blocks. If you are arriving by bus for a first
                appointment, tell us when you schedule and we will build in a buffer rather than
                have you arrive rushed.
              </p>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="ow-card p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon name="clock" className="h-4 w-4 text-olive" />
                  Hours
                </dt>
                <dd className="mt-3 space-y-1 text-sm text-ink-soft">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-ink">{h.time}</span>
                    </div>
                  ))}
                </dd>
              </div>
              <div className="ow-card p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon name="pin" className="h-4 w-4 text-olive" />
                  Parking
                </dt>
                <dd className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  <p>Free lot behind the building, entered from Delaware Avenue.</p>
                  <p>Two accessible spaces nearest the step-free door.</p>
                  <p>Street parking is unmetered after 6pm.</p>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="space-y-6">
            <Callout title="Say so when you schedule" icon="check">
              A client who cannot tolerate the playroom&rsquo;s brightness, a teenager who would
              rather not sit in a room with a dollhouse, a wheelchair user who needs the wider
              doorway — all of this is routine to arrange and none of it is an imposition.
            </Callout>
            <div className="ow-card p-6">
              <h3 className="text-lg">Before your first visit</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                A walkthrough of the first hour, the paperwork, and the questions you are
                allowed to decline to answer.
              </p>
              <div className="mt-4">
                <ButtonLink href="/first-visit/" tone="secondary" icon="arrow" className="w-full">
                  Your first visit
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
