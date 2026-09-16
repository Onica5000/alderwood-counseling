import type { Metadata } from "next";
import { MatchWizard } from "@/components/MatchWizard";
import { Breadcrumb, Callout, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Find a Therapist",
  description:
    "Six questions, then a ranked shortlist of Alderwood clinicians — with the reasoning for and against each match shown rather than hidden.",
};

export default function FindTherapistPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Find a Therapist" }]} />
      <PageHeader
        eyebrow="Get started"
        title="Six questions, then a shortlist that shows its work"
        lede="Our intake coordinator matches every client by hand. This asks the same questions she would and ranks the roster the same way — including the reasons against each match, because a recommendation you cannot interrogate is just a guess with a number on it."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-12">
          <MatchWizard />

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Callout title="Nothing you enter is sent anywhere" icon="shield">
              This runs entirely in your browser. No answers are transmitted, stored or
              recorded, and closing the tab discards them. You are not creating a record by
              using it.
            </Callout>

            <div className="ow-card p-6">
              <h2 className="text-lg">How the ranking works</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                <li>
                  <strong className="text-ink">Age group is the hard constraint.</strong> A
                  clinician who does not see that age is removed rather than ranked lower.
                </li>
                <li>
                  <strong className="text-ink">Concerns are weighted but capped.</strong>{" "}
                  Selecting fifteen things cannot brute-force a match.
                </li>
                <li>
                  <strong className="text-ink">Availability is weighted against urgency.</strong>{" "}
                  Saying you need to be seen soon demotes anyone on a waitlist.
                </li>
                <li>
                  <strong className="text-ink">Caveats are shown, not suppressed.</strong> If the
                  best match does not cover one of your concerns, it says so.
                </li>
              </ul>
            </div>

            <Callout title="This is not a diagnosis" tone="crisis" icon="alert">
              A matching tool cannot assess you. It cannot tell you what you have, and it does
              not replace the intake conversation. If you are in crisis, call or text 988.
            </Callout>
          </aside>
        </div>
      </Section>
    </>
  );
}
