import type { Metadata } from "next";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { Breadcrumb, Callout, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resource Library",
  description:
    "Worksheets, guides and crisis cards from Alderwood's clinicians — safety planning, thought records, DBT skills, school refusal, talking to children about death, and insurance questions worth asking.",
};

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Resource Library" }]} />
      <PageHeader
        eyebrow="Resources"
        title="The handouts we actually give people"
        lede="Written by our clinicians, mostly because a client asked a question well enough that the answer deserved writing down. Free, no email address required, no account to create."
      />

      <Section>
        <ResourceLibrary />
        <p className="mt-6 text-xs text-ink-soft">
          Resource downloads are illustrative in this build — the buttons are wired to the
          layout, not to files.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Callout title="Use these however you like" icon="print">
            Print them, photocopy them, hand them to a client of your own, put one on a fridge.
            They are not proprietary and we would rather they were useful than credited.
          </Callout>
          <Callout title="A worksheet is not treatment" tone="clay" icon="alert">
            These work best alongside therapy, not instead of it. A thought record filled in
            alone for six months is usually a sign that the thing underneath it needs a
            clinician, not more worksheets.
          </Callout>
        </div>
      </Section>
    </>
  );
}
