import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Your First Visit",
  description:
    "A minute-by-minute walkthrough of the first appointment at Olivewood — the paperwork, the questions you will be asked, the ones you may decline, and what happens after.",
};

const timeline = [
  {
    when: "Before you arrive",
    title: "Paperwork, on your own time",
    body: "Intake forms come by secure link a few days ahead, or on paper if you would rather. Filling them in beforehand buys you back about fifteen minutes of the first hour. If you do not get to them, nobody minds — you can do them in the waiting area.",
    detail: [
      "Contact and insurance details",
      "A brief history — what has happened, what has been tried",
      "Consent forms, including the confidentiality limits",
      "A release form only if you want us to speak to a doctor or school",
    ],
  },
  {
    when: "Minutes 0–5",
    title: "Arriving",
    body: "There is no sliding glass window and nobody calls your full name across the room. You will be greeted at the desk, offered water or tea, and your clinician will come and collect you personally.",
    detail: [
      "Free parking in the lot behind the building",
      "Step-free entrance from the lot",
      "A quiet corner in the waiting area, away from the door",
      "Arrive ten minutes early if you have paperwork left",
    ],
  },
  {
    when: "Minutes 5–15",
    title: "The ground rules, before anything else",
    body: "Your clinician will explain confidentiality and its four legal exceptions out loud, before you tell them anything. If the client is a teenager, this is when everyone agrees what will and will not be reported home — with the teen in the room.",
    detail: [
      "What stays in the room, and the four things that cannot",
      "How records work and who can ever see them",
      "Fees, and what your insurance verification came back with",
      "How to reach us, and what to do when we are closed",
    ],
  },
  {
    when: "Minutes 15–50",
    title: "The actual conversation",
    body: "What brought you in, when it started, what you have already tried, and what a good outcome would look like. It is a conversation, not an interrogation — and you may decline any question. Saying “I am not ready to talk about that” is a complete and acceptable answer in session one.",
    detail: [
      "What is happening now, in your words",
      "History only as far as it helps — no requirement to start at childhood",
      "What has already helped, even a little",
      "Safety, asked directly and without alarm, because it matters",
    ],
  },
  {
    when: "Minutes 50–60",
    title: "A plan you leave with",
    body: "You will not leave the first session with nothing. That means goals in plain language, a sense of how many sessions this might take, one thing to try before next time, and an appointment on the calendar.",
    detail: [
      "Goals written down, in your words rather than clinical ones",
      "An honest estimate of course length",
      "One concrete thing to try this week",
      "A safety plan if any risk came up",
    ],
  },
  {
    when: "After",
    title: "Checking the fit, out loud",
    body: "Around session three or four your clinician will ask directly whether this is working. That is a real question. If the fit is wrong, changing clinicians within the practice is routine — and if we are not the right practice at all, we will say so and refer you somewhere better.",
    detail: [
      "Progress reviewed out loud at sessions six and twelve",
      "Switching clinicians is normal and nobody takes it personally",
      "An honest referral out if we cannot help",
      "You can stop at any point, for any reason",
    ],
  },
];

const bring = [
  "Photo ID and your insurance card",
  "A list of any medications, including doses",
  "The name and number of your primary-care physician",
  "Anything a previous provider gave you, if you have it",
  "A rough sense of what you want to be different",
];

export default function FirstVisitPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Your First Visit" }]} />
      <PageHeader
        eyebrow="Get started"
        title="What actually happens in the first hour"
        lede="Most people's anxiety about a first appointment is really anxiety about not knowing the shape of it. So here is the shape of it, minute by minute."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/book/" icon="arrow">Request an appointment</ButtonLink>
          <a
            href={site.phoneHref}
            className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink"
          >
            <Icon name="phone" className="h-4 w-4 text-olive" />
            {site.phone}
          </a>
        </div>
      </PageHeader>

      <Section>
        <ol className="relative space-y-10 border-l-2 border-line pl-8 sm:pl-10">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.when} delay={i * 50}>
              <span
                aria-hidden="true"
                className="absolute -left-[11px] mt-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-canvas bg-olive"
              />
              <p className="ow-eyebrow">{t.when}</p>
              <h2 className="mt-1.5 text-xl sm:text-2xl">{t.title}</h2>
              <p className="ow-prose mt-3 leading-relaxed text-ink-soft">{t.body}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.detail.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Section>

      <section className="border-y border-line bg-surface">
        <Section>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl sm:text-3xl">What to bring</h2>
              <ul className="mt-5 space-y-2.5">
                {bring.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-ink-soft">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-olive" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="ow-prose mt-5 text-sm leading-relaxed text-ink-soft">
                None of it is mandatory. Arriving with nothing but yourself is fine, and happens
                often.
              </p>
            </div>

            <div className="space-y-4">
              <Callout title="You can decline any question" icon="shield">
                Including in the first session, including the difficult ones. &ldquo;I am not
                ready to talk about that&rdquo; is a complete answer, and a clinician who
                responds badly to it is telling you something useful.
              </Callout>
              <Callout title="Bringing someone with you" tone="clay" icon="users">
                A friend, partner or parent can come to the building and sit in the waiting area,
                and can join the session if you want them to. Say so when you schedule so we put
                you in a room with enough chairs.
              </Callout>
              <Callout title="If you need to cancel" icon="clock">
                Twenty-four hours&rsquo; notice, and we waive the fee for emergencies and illness
                without asking you to prove either. Rescheduling a first appointment is not a
                black mark and does not affect your place.
              </Callout>
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <div className="ow-card bg-olive p-8 text-center sm:p-12">
          <h2 className="text-2xl text-white sm:text-3xl">
            The hardest session to book is the first one.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">
            Most people are seen within seven to ten days. If you need to be seen sooner, say so
            when you call — we hold a small number of slots for exactly that.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold text-olive-deep"
            >
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </a>
            <ButtonLink
              href="/book/"
              tone="ghost"
              icon="arrow"
              className="!border !border-white/40 !text-white hover:!bg-white/10"
            >
              Request online instead
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
