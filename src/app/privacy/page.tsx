import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Breadcrumb, Callout, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy & HIPAA",
  description:
    "How Olivewood Counseling handles protected health information, the four legal limits on confidentiality, your rights over your record, and what this website does and does not collect.",
};

const exceptions = [
  {
    title: "Serious and imminent risk to yourself",
    body: "If you are in immediate danger of taking your own life, we may involve emergency services or a crisis team. We will tell you we are doing it and, wherever it is safe to, do it with you rather than around you.",
  },
  {
    title: "A serious threat to an identifiable person",
    body: "Pennsylvania law requires us to act if you make a specific threat against a specific person. This is a narrow exception and it is not triggered by anger, or by describing a violent thought you do not intend to act on.",
  },
  {
    title: "Suspected abuse or neglect",
    body: "Clinicians are mandated reporters for suspected abuse or neglect of a child or of a vulnerable adult. We must report the suspicion; we do not decide the outcome. We will tell you when we are filing unless doing so would increase someone's danger.",
  },
  {
    title: "A valid court order",
    body: "A subpoena signed by a clerk is not the same as a court order and we will not release records on one alone. Where a judge orders disclosure we comply, and we tell you, and we release the minimum the order requires.",
  },
];

const rights = [
  "See and get a copy of your record, normally within 30 days",
  "Ask us to correct something you believe is wrong",
  "Ask for a restriction on what we share, which we will honour where we can",
  "Ask to be contacted a specific way — a particular number, no voicemail, no mail",
  "Get a list of certain disclosures we have made",
  "Revoke a release you signed, at any time, in writing",
  "File a complaint without it affecting your care in any way",
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Privacy & HIPAA" }]} />
      <PageHeader
        eyebrow="Support"
        title="Privacy, in language you can actually use"
        lede="The full Notice of Privacy Practices is a long document you will receive and sign at your first appointment. This is the same information written to be read."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl">What stays in the room</h2>
            <div className="ow-prose mt-4 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Effectively everything. What you say in session is protected health information
                and does not go to your employer, your school, your insurer beyond what billing
                requires, or your family, without your written consent.
              </p>
              <p>
                If you want us to coordinate with a physician, a school counselor, a lawyer or a
                previous therapist, you sign a release that names exactly who may be told and
                exactly what may be shared. You can revoke it at any point.
              </p>
            </div>

            <h2 className="mt-12 text-2xl sm:text-3xl">The four things that cannot</h2>
            <p className="ow-prose mt-3 text-ink-soft">
              Your clinician will explain these out loud in the first session, before you have
              told them anything.
            </p>
            <ol className="mt-6 space-y-5">
              {exceptions.map((e, i) => (
                <li key={e.title} className="ow-card p-5">
                  <h3 className="flex items-start gap-3 font-display text-lg text-ink">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crisis-soft text-xs font-semibold text-crisis">
                      {i + 1}
                    </span>
                    {e.title}
                  </h3>
                  <p className="mt-2 pl-9 text-sm leading-relaxed text-ink-soft">{e.body}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-2xl sm:text-3xl">Minors and confidentiality</h2>
            <div className="ow-prose mt-4 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Under Pennsylvania law a minor aged 14 or older can consent to their own
                outpatient mental-health treatment, with a corresponding right to
                confidentiality.
              </p>
              <p>
                In practice we set the terms explicitly in the first session with everyone
                present: parents are told about safety concerns and about the shape of the work,
                and are not given a transcript. A teenager who believes their words will be
                reported home will not use therapy, and you will have paid for a room in which
                nothing happened.
              </p>
            </div>

            <h2 className="mt-12 text-2xl sm:text-3xl">Your rights over your record</h2>
            <ul className="mt-5 space-y-2.5">
              {rights.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-ink-soft">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-olive" />
                  {r}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl sm:text-3xl">This website</h2>
            <div className="ow-prose mt-4 space-y-4 leading-relaxed text-ink-soft">
              <p>
                The site sets no advertising or tracking cookies and carries no third-party
                analytics, social pixels or ad-network scripts. There is no embedded map, so
                loading a page does not report your visit to anyone.
              </p>
              <p>
                The interactive tools — the therapist matcher, the fee estimator and the
                self-check screeners — run entirely in your browser. Nothing you enter into them
                is transmitted, stored or logged, and closing the tab discards it. Using them
                does not create a record or a relationship with the practice.
              </p>
              <p>
                Your theme preference is the one thing kept in your browser&rsquo;s local
                storage. It never leaves your device.
              </p>
              <p>
                Email and web forms are not secure channels. Please keep clinical detail out of
                them — that belongs in a conversation.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <Callout title="Using a shared device?" tone="crisis" icon="exit">
              Every page carries a Quick Exit button in the bar at the top, which leaves the site
              immediately and buries it behind several history entries. Pressing Escape three
              times does the same thing. Browser history cannot be erased by a website, so clear
              it yourself if that matters.
            </Callout>

            <div className="ow-card p-6">
              <h3 className="text-lg">Ask us to contact you carefully</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                You can ask us to call a particular number, never leave a voicemail, text rather
                than call, or send nothing by mail. Say so at intake and it goes on your file as
                a standing instruction.
              </p>
            </div>

            <div className="ow-card p-6">
              <h3 className="text-lg">Complaints</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Raise it with your clinician, or with our clinical supervisor at {site.phone}. You
                may also file with the U.S. Department of Health and Human Services Office for
                Civil Rights. We will not retaliate, and it will not affect your care.
              </p>
            </div>

            <p className="text-xs leading-relaxed text-ink-soft">
              This page summarises our practices for readability and is not a substitute for the
              full Notice of Privacy Practices, which governs.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
