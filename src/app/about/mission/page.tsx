import type { Metadata } from "next";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section, Stat } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Alderwood Counseling believes in people's capacity for positive change. Our mission is to give people the skills to overcome barriers created by past trauma, current circumstances or ongoing behavioral health issues.",
};

const principles = [
  {
    icon: "users" as const,
    title: "The match matters more than the wait",
    body: "Being seen quickly by the wrong clinician wastes more of your time than waiting a week for the right one. Our intake coordinator matches by specialty, age range and availability, by hand, every time.",
  },
  {
    icon: "spark" as const,
    title: "Evidence, not preference",
    body: "We practice CBT, DBT, ESFT, Filial Therapy and EMDR because they have evidence behind them for the problems we treat — not because a clinician happens to like them.",
  },
  {
    icon: "clock" as const,
    title: "Hours that fit a working life",
    body: "Open until 8:30pm four nights a week and Saturday mornings. Therapy that requires you to lose a half day of pay is therapy a lot of people cannot have.",
  },
  {
    icon: "wallet" as const,
    title: "The money conversation happens first",
    body: "We verify your benefits before your first session and tell you what you will owe. Nobody should discover a deductible in week six.",
  },
  {
    icon: "shield" as const,
    title: "Respect is not a soft skill",
    body: "Nobody's full name is called out across a waiting room. Nobody is handed a clipboard and left. Being treated as an adult is part of the treatment, not an amenity.",
  },
  {
    icon: "check" as const,
    title: "We will tell you if we are not the right fit",
    body: "An honest referral out at session three is worth more than a year of sessions with someone who cannot help you. We keep a real referral list for this.",
  },
];

export default function MissionPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Mission" }]} />
      <PageHeader
        eyebrow="About"
        title="We start from the assumption that people can change."
        lede="Our mission is to give people the practical skills to get past what is standing in their way — whether that is something that happened to them, something happening around them now, or a condition they will be managing for a long time."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div className="ow-prose space-y-5 text-base leading-relaxed text-ink-soft">
            <p className="text-lg text-ink">
              That sentence does a lot of work, so it is worth unpacking what each part of it
              commits us to.
            </p>
            <p>
              <strong className="text-ink">Capacity for positive change.</strong> Not everyone
              who walks in believes this about themselves, and a good number have been given
              solid reasons not to. Starting from the assumption that change is available is a
              clinical position, not an optimistic one — it changes what you look for and what
              you are willing to work on.
            </p>
            <p>
              <strong className="text-ink">Skills, not insight alone.</strong> Understanding
              why you do something is genuinely useful and frequently insufficient. Our
              modalities are the ones that end with a person able to do something they could
              not do before: catch a thought, tolerate a wave, say a hard sentence, run a
              thirty-minute play session with their own child.
            </p>
            <p>
              <strong className="text-ink">Barriers, not deficits.</strong> Past trauma,
              current circumstances and ongoing conditions are obstacles in a path. That framing
              matters: it puts the problem between a person and where they are going, rather
              than inside them as a permanent feature.
            </p>
            <p>
              Alderwood is recognised as one of the few practices in the Lehigh Valley equipped
              to serve the full age spectrum — preschoolers through seniors — in a welcoming
              clinical environment. In practice this means a family does not have to assemble
              three different practices and three different intake processes to get everyone
              seen.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="ow-card p-6">
              <h2 className="text-lg">At a glance</h2>
              <dl className="mt-5 grid grid-cols-2 gap-5">
                <Stat value="2011" label="Founded" />
                <Stat value="8" label="Clinicians" />
                <Stat value="2–90" label="Ages served" />
                <Stat value="7" label="Rooms, all different" />
              </dl>
            </div>
            <Callout title="A limit worth stating" tone="crisis" icon="alert">
              Alderwood is an outpatient practice. We do not provide 24-hour crisis coverage,
              inpatient care, or medication management. We will say so early and refer you well
              rather than hold onto work we cannot do.
            </Callout>
            <ButtonLink href="/about/founders/" tone="secondary" icon="arrow" className="w-full">
              How this started
            </ButtonLink>
          </aside>
        </div>
      </Section>

      <section className="border-y border-line bg-surface">
        <Section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">What that looks like on a Tuesday</h2>
          <p className="ow-prose mt-3 text-ink-soft">
            Values are cheap to publish. These are the six that cost us something to keep.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60}>
                <div className="ow-card h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-soft text-olive">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>
      </section>

      <Section>
        <div className="ow-card bg-olive p-8 sm:p-12">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
              &ldquo;A person&rsquo;s history explains their behavior without excusing them from
              their future.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-white/80">
              Marian Holloway, LCSW — Founding Partner
            </footer>
          </blockquote>
        </div>
      </Section>
    </>
  );
}
