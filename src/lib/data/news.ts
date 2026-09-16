export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  author: string;
  authorSlug?: string;
  category: "practice news" | "groups" | "resources" | "recognition";
  excerpt: string;
  /** Simple block model — enough structure without pulling in an MDX pipeline. */
  body: Block[];
  readingMinutes: number;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export const posts: Post[] = [
  {
    slug: "educator-support-group",
    title: "New Educator Support Group Beginning in June",
    date: "2026-06-03",
    author: "Kate Holloway",
    authorSlug: "kate-holloway",
    category: "groups",
    excerpt:
      "An eight-week confidential group for teachers, aides, counselors and administrators — built around the specific exhaustion of a job that asks you to regulate thirty other nervous systems before you have regulated your own.",
    readingMinutes: 3,
    body: [
      { type: "p", text: "We are starting an eight-week support group for educators, running Thursday evenings from 6:30 to 8:00 beginning the second week of June." },
      { type: "p", text: "This is not a professional-development workshop and there are no continuing-education credits attached. It is a confidential group for people whose job requires them to absorb a great deal and who have very few places to put any of it down." },
      { type: "h2", text: "Who it is for" },
      { type: "ul", items: [
        "Classroom teachers at any grade level",
        "Paraprofessionals and classroom aides",
        "School counselors, nurses and social workers",
        "Building and district administrators",
      ] },
      { type: "h2", text: "What we will cover" },
      { type: "p", text: "The group is semi-structured. Each session has a topic, and each session has room for whatever happened that week." },
      { type: "ul", items: [
        "Compassion fatigue and secondary traumatic stress, named properly",
        "Boundaries when the job has no natural edge",
        "Managing a classroom of dysregulated students while dysregulated yourself",
        "What to do with the student you cannot stop thinking about",
        "Deciding whether to stay in the profession, without anybody pushing an answer",
      ] },
      { type: "callout", title: "Confidentiality", text: "Group members will not be placed with colleagues from their own building. If you register and we find an overlap, we will call you before the first session and offer the next cohort instead." },
      { type: "p", text: "Cost is $45 per session, and most insurance plans cover group therapy at the standard specialist rate. Space is capped at ten. Call (610) 555-0142 to register." },
    ],
  },
  {
    slug: "telehealth-expansion",
    title: "Telehealth Is Now Available With Every Clinician",
    date: "2026-03-18",
    author: "Marian Holloway",
    authorSlug: "marian-holloway",
    category: "practice news",
    excerpt:
      "Every clinician on the roster now offers secure video sessions, and you can switch between in-person and video week to week without renegotiating your slot.",
    readingMinutes: 2,
    body: [
      { type: "p", text: "As of this month every clinician at Alderwood offers telehealth, and your appointment slot no longer has to be one thing or the other. You can come in this week, join by video next week when the car is in the shop, and come back in the week after." },
      { type: "p", text: "We resisted this for a while, and it is worth saying why. Some of our work — play therapy with a four-year-old, high-risk sessions, a good deal of couples work — is meaningfully better in a room, and we did not want convenience quietly replacing effectiveness." },
      { type: "p", text: "What changed our minds was who was not coming. Parents without childcare. Clients without a car. A teenager who talked more in twenty minutes from her own bedroom than in six weeks on our couch." },
      { type: "h2", text: "The practical details" },
      { type: "ul", items: [
        "HIPAA-compliant video, browser-based, nothing to install",
        "A phone-only option when video is the barrier rather than the fix",
        "Same clinician, same rate, same insurance billing",
        "You must be physically in Pennsylvania during the session — our licensure requires it",
      ] },
      { type: "callout", title: "Where we will still push for in-person", text: "Young children, clients at elevated risk, and the assessment phase of couples work. Your clinician will say so directly rather than leaving you to guess." },
    ],
  },
  {
    slug: "dbt-fall-cohort",
    title: "Fall DBT Skills Cohort: Registration Open",
    date: "2026-08-11",
    author: "Ingrid Voss",
    authorSlug: "ingrid-voss",
    category: "groups",
    excerpt:
      "The 24-week adult cycle starts the week of September 22nd, with a parallel adolescent track and a parent group. Registration closes when the cohort fills.",
    readingMinutes: 3,
    body: [
      { type: "p", text: "Registration is open for the fall cycle of the DBT Skills Program. The adult group starts the week of September 22nd and runs 24 weeks, through mid-March." },
      { type: "h2", text: "What full-model DBT actually requires" },
      { type: "p", text: "I want to be blunt about this before anyone enrols, because a half-attended DBT program is not DBT and I would rather you know that now than in week nine." },
      { type: "ul", items: [
        "A weekly two-hour skills group, attended",
        "A weekly individual therapy session alongside it",
        "A diary card completed daily",
        "Homework between sessions, every week",
        "Phone coaching used when you need it, which is the part people skip",
      ] },
      { type: "quote", text: "The skill you need at eleven at night is not much use to you if the only time you can discuss it is Thursday at four.", cite: "Ingrid Voss, LPC" },
      { type: "h2", text: "The adolescent track" },
      { type: "p", text: "The teen cycle runs in parallel on Tuesday evenings and includes a required parent group meeting at the same time. Parents learn the same skills their teenager is learning, which prevents the common and demoralizing situation where a teen comes home with a skill nobody in the house recognizes." },
      { type: "callout", title: "How to enrol", text: "Call (610) 555-0142 and ask for the DBT intake. There is a screening conversation first — the program is not right for everyone, and I will tell you so." },
    ],
  },
  {
    slug: "nasw-trainings",
    title: "State Association Trainings",
    date: "2025-05-20",
    author: "Kate Holloway",
    authorSlug: "kate-holloway",
    category: "practice news",
    excerpt:
      "Marian and Raymond regularly lead licensure preparation and clinical supervision trainings for the state social work association across eastern Pennsylvania.",
    readingMinutes: 1,
    body: [
      { type: "p", text: "Marian Holloway and Raymond Castellan regularly lead trainings for the state social work association, covering licensure preparation, clinical supervision, and disaster mental health response." },
      { type: "p", text: "Marian's licensure-prep sessions run several times a year across eastern Pennsylvania and are aimed at social workers sitting for the clinical exam. Raymond's disaster mental health training draws on three decades of disaster-relief deployment." },
      { type: "p", text: "Both are available for agency-level in-service training. Contact the office for scheduling." },
    ],
  },
  {
    slug: "top-social-worker",
    title: "Kate Holloway Named to the Clinical Excellence List",
    date: "2025-05-20",
    author: "Marian Holloway",
    authorSlug: "marian-holloway",
    category: "recognition",
    excerpt:
      "A regional review board named Kate to its annual clinical excellence list, for work with young children and the families around them.",
    readingMinutes: 1,
    body: [
      { type: "p", text: "Kate Holloway has been named to the Lehigh Valley Clinical Excellence list for her work with young children and families." },
      { type: "p", text: "Kate began her career doing early-intervention home visits and brought that orientation with her when we founded Alderwood in 2011 — that the work happens where the family actually lives, not where it is convenient for the clinician." },
      { type: "quote", text: "She learned this job on living-room floors. It is still the best training I have seen anyone get.", cite: "Marian Holloway, LCSW" },
    ],
  },
  {
    slug: "new-location",
    title: "New Location on Alder Court",
    date: "2025-05-20",
    author: "Kate Holloway",
    authorSlug: "kate-holloway",
    category: "practice news",
    excerpt:
      "Alderwood is pleased to have its home at 215 Alder Court in Bethlehem — a building chosen specifically for how little it resembles a clinic.",
    readingMinutes: 2,
    body: [
      { type: "p", text: "Alderwood is pleased to have its location at 215 Alder Court in Bethlehem, PA." },
      { type: "p", text: "We looked at a lot of buildings. Most of the options were medical-office suites, and every one of them had the same three things: a sliding glass window, a row of identical chairs facing a television, and fluorescent lighting that makes everybody look unwell." },
      { type: "p", text: "We chose this building because it does not have any of those. There are seven rooms, and they are deliberately different from one another — a playroom with a sand tray, a quiet room with low light for trauma work, a larger room that can hold a whole family or a skills group." },
      { type: "callout", title: "Tell us what you need", text: "If a particular room would help — or a particular room would not — say so when you schedule. We will make it work. This is not an unusual request and you will not be the first to make it." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const postCategories = ["practice news", "groups", "resources", "recognition"] as const;

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
