import type { Metadata } from "next";
import { ScreenerTool } from "@/components/Screener";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Self-Check",
  description:
    "Two-minute depression (PHQ-9) and anxiety (GAD-7) screeners that run entirely in your browser. Educational, not diagnostic.",
  robots: { index: true, follow: true },
};

export default function SelfCheckPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Self-Check" }]} />
      <PageHeader
        eyebrow="Get started"
        title="Two minutes, and a structured way of noticing"
        lede="These are the same two screeners your primary-care office would hand you: the PHQ-9 for depression and the GAD-7 for anxiety. They will not tell you what you have. They are quite good at telling you whether it is worth a conversation."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-12">
          <ScreenerTool />

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Callout title="Nothing leaves your browser" icon="shield">
              These run entirely on your device. No answers are transmitted, stored or recorded,
              nothing is added to a file, and closing the tab discards everything. Using this
              does not create a client record or a relationship with the practice.
            </Callout>

            <Callout title="A screener is not an assessment" tone="clay" icon="alert">
              A number cannot account for what is happening in your life, what you are carrying,
              or what you have already survived. A clinician can. Treat the score as a prompt to
              have a conversation, not as a verdict.
            </Callout>

            <div className="ow-card p-6">
              <h2 className="text-lg">If the score concerns you</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Say so when you call, and mention the range you landed in. It changes how quickly
                we schedule you and who you are matched with.
              </p>
              <div className="mt-4 space-y-2">
                <ButtonLink href="/book/" icon="arrow" className="w-full">
                  Request an appointment
                </ButtonLink>
                <ButtonLink href="/fees/" tone="secondary" icon="arrow" className="w-full">
                  Check what it would cost
                </ButtonLink>
              </div>
            </div>

            <Callout title="If you need help right now" tone="crisis" icon="alert">
              Do not wait for an appointment. Call or text{" "}
              <a href="tel:988" className="font-semibold underline">988</a> for the Suicide &amp;
              Crisis Lifeline, or call 911 if there is immediate danger. Both county crisis lines
              operate 24 hours and can send a mobile team.
            </Callout>
          </aside>
        </div>
      </Section>
    </>
  );
}
