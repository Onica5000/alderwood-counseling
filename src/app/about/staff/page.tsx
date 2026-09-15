import type { Metadata } from "next";
import { Avatar } from "@/components/Avatar";
import { StaffDirectory } from "@/components/StaffDirectory";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";
import { supportStaff } from "@/lib/data/staff";

export const metadata: Metadata = {
  title: "Our Clinicians",
  description:
    "Eight licensed clinicians covering ages two through senior adulthood — CBT, DBT, ESFT, Filial Therapy, EMDR and play therapy. Filter by age group, approach and availability.",
};

export default function StaffPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Our Clinicians" }]} />
      <PageHeader
        eyebrow="About"
        title="Everyone here has a specialty, and we will tell you what it is"
        lede="All of our clinicians have a stellar reputation and extensive training. We are committed to matching each client with the counselor best suited to them — which is a different thing from whoever has the next open slot."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/find-a-therapist/" icon="arrow">
            Match me automatically
          </ButtonLink>
          <ButtonLink href="/book/" tone="secondary">
            Request an appointment
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <StaffDirectory />
      </Section>

      <section className="border-y border-line bg-surface">
        <Section>
          <h2 className="text-2xl sm:text-3xl">The front desk</h2>
          <p className="ow-prose mt-3 text-ink-soft">
            The two people most likely to determine whether you ever actually get seen.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {supportStaff.map((s) => (
              <li key={s.name} className="ow-card flex items-start gap-4 p-6">
                <Avatar initials={s.initials} hue={s.hue} size={64} />
                <div>
                  <h3 className="text-lg leading-tight">{s.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-olive">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </section>

      <Section>
        <Callout title="About the portrait marks" icon="spark">
          Each clinician is shown with a generated abstract mark rather than a photograph.
          Portraits are the one asset a site redesign cannot invent, and we would rather show
          an honest placeholder than a face that does not belong to the person named beside
          it. Swap in real headshots and every card below picks them up unchanged.
        </Callout>
      </Section>
    </>
  );
}
