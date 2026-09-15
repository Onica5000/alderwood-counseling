export interface Group {
  slug: string;
  name: string;
  leader: string;
  leaderSlug?: string;
  audience: string;
  schedule: string;
  starts: string;
  weeks: number;
  cost: string;
  seats: number;
  seatsLeft: number;
  summary: string;
  covers: string[];
  status: "open" | "filling" | "waitlist" | "starting-soon";
}

export const groups: Group[] = [
  {
    slug: "dbt-adult",
    name: "DBT Skills Group — Adult",
    leader: "Marie Schneller, LPC",
    leaderSlug: "marie-schneller",
    audience: "Adults 19+, concurrent individual therapy required",
    schedule: "Mondays, 6:00 – 8:00 pm",
    starts: "2026-09-22",
    weeks: 24,
    cost: "$90 per session · most plans cover group therapy",
    seats: 10,
    seatsLeft: 3,
    status: "filling",
    summary:
      "The full four-module DBT curriculum across 24 weeks, paired with weekly individual therapy and between-session phone coaching.",
    covers: ["Mindfulness", "Distress tolerance", "Emotion regulation", "Interpersonal effectiveness"],
  },
  {
    slug: "dbt-teen",
    name: "DBT Skills Group — Adolescent",
    leader: "Marie Schneller, LPC",
    leaderSlug: "marie-schneller",
    audience: "Ages 13–18, with a required parallel parent group",
    schedule: "Tuesdays, 6:00 – 8:00 pm",
    starts: "2026-09-23",
    weeks: 24,
    cost: "$90 per session · parent group included",
    seats: 8,
    seatsLeft: 5,
    status: "open",
    summary:
      "The adolescent DBT curriculum with a walking-the-middle-path module, run alongside a parent group learning the same skills at the same hour.",
    covers: ["Mindfulness", "Distress tolerance", "Emotion regulation", "Walking the middle path"],
  },
  {
    slug: "educator-support",
    name: "Educator Support Group",
    leader: "Becky Richendollar, LCSW",
    leaderSlug: "becky-richendollar",
    audience: "Teachers, aides, counselors, nurses and administrators",
    schedule: "Thursdays, 6:30 – 8:00 pm",
    starts: "2026-10-08",
    weeks: 8,
    cost: "$45 per session",
    seats: 10,
    seatsLeft: 6,
    status: "open",
    summary:
      "Eight weeks on compassion fatigue, boundaries without a natural edge, and the student you cannot stop thinking about. Members are never placed with colleagues from their own building.",
    covers: ["Compassion fatigue", "Secondary traumatic stress", "Boundaries", "Staying or leaving"],
  },
  {
    slug: "caregiver",
    name: "Caregiver Support Group",
    leader: "Daniel Okafor, LCSW",
    leaderSlug: "daniel-okafor",
    audience: "Adults caring for an aging parent, spouse or partner",
    schedule: "Second Wednesday monthly, 10:00 – 11:30 am",
    starts: "2026-10-14",
    weeks: 12,
    cost: "$35 per session · drop-in",
    seats: 12,
    seatsLeft: 8,
    status: "open",
    summary:
      "A monthly drop-in group for people who became caregivers without anyone naming it. Practical, unsentimental, and open to joining mid-cycle.",
    covers: ["Caregiver strain", "Guilt & resentment", "Practical care navigation", "Anticipatory grief"],
  },
  {
    slug: "grief-drop-in",
    name: "Grief Drop-In",
    leader: "John Weaver, LCSW",
    leaderSlug: "john-weaver",
    audience: "Adults, any loss, no referral needed",
    schedule: "First Tuesday monthly, 7:00 – 8:30 pm",
    starts: "2026-10-06",
    weeks: 12,
    cost: "Free",
    seats: 16,
    seatsLeft: 11,
    status: "open",
    summary:
      "No registration, no cost, no timeline imposed on your grief. Includes the losses that do not get recognized as losses.",
    covers: ["Sudden loss", "Anticipatory grief", "Disenfranchised grief", "Grief in children"],
  },
  {
    slug: "social-skills-kids",
    name: "Social Skills Group — Ages 8–11",
    leader: "Rachel Heckler, LPC",
    leaderSlug: "rachel-heckler",
    audience: "Children 8–11, screening conversation required",
    schedule: "Saturdays, 9:30 – 10:30 am",
    starts: "2026-09-26",
    weeks: 10,
    cost: "$60 per session",
    seats: 6,
    seatsLeft: 0,
    status: "waitlist",
    summary:
      "Ten weeks of structured, play-based practice in reading a room, joining a group, handling losing, and repairing after a conflict.",
    covers: ["Reading social cues", "Joining and exiting groups", "Handling losing", "Repair after conflict"],
  },
];

export const getGroup = (slug: string) => groups.find((g) => g.slug === slug);

export interface Resource {
  slug: string;
  title: string;
  type: "worksheet" | "guide" | "hotline" | "reading" | "video";
  audience: ("parents" | "teens" | "adults" | "educators" | "caregivers")[];
  topics: string[];
  description: string;
  /** Minutes to read, or null for a reference card. */
  minutes: number | null;
}

export const resources: Resource[] = [
  {
    slug: "safety-plan",
    title: "Building a Safety Plan",
    type: "worksheet",
    audience: ["adults", "teens", "parents"],
    topics: ["Crisis", "Self-harm", "Suicide prevention"],
    description:
      "The six-step plan we build with clients in session: warning signs, internal coping, people and places that distract, people to ask for help, professionals to call, and making the environment safer. Printable, fridge-sized.",
    minutes: null,
  },
  {
    slug: "thought-record",
    title: "The Thought Record, Explained Properly",
    type: "worksheet",
    audience: ["adults", "teens"],
    topics: ["CBT", "Anxiety", "Depression"],
    description:
      "Most people are handed a thought record with no instruction and conclude CBT is homework for its own sake. This walks through one real example, badly filled in first and then well.",
    minutes: 8,
  },
  {
    slug: "distress-tolerance-card",
    title: "DBT Distress Tolerance — Wallet Card",
    type: "worksheet",
    audience: ["adults", "teens"],
    topics: ["DBT", "Emotion regulation", "Crisis"],
    description:
      "TIPP, ACCEPTS and self-soothe condensed onto something you can actually find at 11pm. Print double-sided and cut.",
    minutes: null,
  },
  {
    slug: "talking-to-kids-about-death",
    title: "Talking to Children About Death",
    type: "guide",
    audience: ["parents", "caregivers"],
    topics: ["Grief", "Children"],
    description:
      "What children understand about death at each age, why a grieving child goes back to playing after ten minutes, and the specific phrases to avoid — including the well-meant ones about sleep and about God needing them.",
    minutes: 11,
  },
  {
    slug: "school-refusal",
    title: "When Your Child Will Not Go to School",
    type: "guide",
    audience: ["parents"],
    topics: ["Anxiety", "School", "Children"],
    description:
      "The morning escalation, why letting them stay home works brilliantly today and catastrophically by Thursday, and how a graded return is actually structured. Written for parents mid-crisis, not for a calm Sunday.",
    minutes: 14,
  },
  {
    slug: "first-session-what-to-expect",
    title: "What Actually Happens in a First Session",
    type: "guide",
    audience: ["adults", "teens", "parents"],
    topics: ["Getting started"],
    description:
      "A minute-by-minute account of the intake hour, including the paperwork, the questions you will be asked, and the ones you are allowed to decline to answer.",
    minutes: 6,
  },
  {
    slug: "teen-confidentiality",
    title: "Confidentiality When Your Teenager Is the Client",
    type: "guide",
    audience: ["parents", "teens"],
    topics: ["Privacy", "Teens"],
    description:
      "Pennsylvania's age-14 consent rule in plain language, what you will and will not be told as a parent, and why the answer to that question is itself part of the treatment.",
    minutes: 7,
  },
  {
    slug: "crisis-numbers",
    title: "Lehigh Valley Crisis Numbers",
    type: "hotline",
    audience: ["adults", "teens", "parents", "educators", "caregivers"],
    topics: ["Crisis"],
    description:
      "988, both county crisis lines, mobile crisis teams, the veterans line, the trans lifeline, and the local domestic violence and sexual assault hotlines. One page, current.",
    minutes: null,
  },
  {
    slug: "compassion-fatigue",
    title: "Compassion Fatigue for People Who Do Not Think They Have It",
    type: "reading",
    audience: ["educators", "caregivers", "adults"],
    topics: ["Burnout", "Educators", "Caregiver strain"],
    description:
      "Secondary traumatic stress in teachers, nurses, caseworkers and first responders — what it looks like from inside, which is usually nothing like what you expect.",
    minutes: 12,
  },
  {
    slug: "sleep-hygiene",
    title: "Sleep, and Why the Advice Never Works",
    type: "reading",
    audience: ["adults", "teens"],
    topics: ["Sleep", "Anxiety", "Depression"],
    description:
      "Standard sleep-hygiene advice fails for anxious people because lying still in the dark is when anxiety has the floor. What to do instead, including the counterintuitive one about getting out of bed.",
    minutes: 9,
  },
  {
    slug: "filial-play-at-home",
    title: "Running a Filial Play Session at Home",
    type: "video",
    audience: ["parents"],
    topics: ["Filial", "Young children", "Parenting"],
    description:
      "A twelve-minute demonstration of the thirty-minute special playtime, including the four rules, the tracking language, and what to do when your child tests the limit — which they will, on purpose, because that is the point.",
    minutes: 12,
  },
  {
    slug: "insurance-questions",
    title: "Eight Questions to Ask Your Insurer",
    type: "worksheet",
    audience: ["adults", "parents", "caregivers"],
    topics: ["Insurance", "Cost"],
    description:
      "The exact wording to use on the phone so you get a usable answer about your behavioral-health benefit — including the two questions that catch a deductible nobody mentioned.",
    minutes: null,
  },
];

export const resourceTypes = [
  { key: "worksheet", label: "Worksheets" },
  { key: "guide", label: "Guides" },
  { key: "reading", label: "Reading" },
  { key: "video", label: "Video" },
  { key: "hotline", label: "Crisis cards" },
] as const;

export const resourceAudiences = [
  { key: "parents", label: "Parents" },
  { key: "teens", label: "Teens" },
  { key: "adults", label: "Adults" },
  { key: "educators", label: "Educators" },
  { key: "caregivers", label: "Caregivers" },
] as const;
