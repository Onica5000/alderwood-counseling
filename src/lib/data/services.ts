import type { AgeBand, Modality } from "./staff";

export interface Service {
  slug: string;
  name: string;
  category: "individual" | "relationship" | "group" | "specialty";
  /** One line for cards and the matcher results. */
  summary: string;
  /** Full page copy. */
  body: string[];
  ageBands: AgeBand[];
  modalities: Modality[];
  /** What a first block of sessions typically looks like. */
  looksLike: string[];
  /** Presenting concerns that map to this service. */
  concerns: string[];
  sessionLength: string;
  typicalCourse: string;
  icon: IconName;
}

export type IconName =
  | "blocks"
  | "backpack"
  | "compass"
  | "anchor"
  | "sunset"
  | "rings"
  | "bridge"
  | "house"
  | "leaf"
  | "circle"
  | "screen"
  | "shield";

export const services: Service[] = [
  {
    slug: "young-children",
    name: "Counseling for Young Children",
    category: "individual",
    summary:
      "Ages 2–5. Play and art therapy with a CBT component, plus Filial Therapy that puts the parent in the room as part of the treatment.",
    body: [
      "Very young children do not process difficulty by talking about it, so we do not ask them to. Sessions are built around play and art, which is where a two-, three- or four-year-old will actually show you what is happening — the same scene acted out six times with a different ending, the drawing that keeps appearing.",
      "Underneath the play is a Cognitive Behavioral Therapy framework: we are steadily building the child's ability to name a feeling, tolerate it, and pick a next move. With children this young that work is concrete and repetitive by design.",
      "Much of the change happens through you. Filial Therapy trains parents to run therapeutic play sessions at home, which does two things at once: it treats the child, and it repairs the parent's confidence — often badly damaged by the time a family calls us.",
      "We see young children with trauma histories, children on the autism spectrum, and children whose behavior has outgrown what a preschool can manage.",
    ],
    ageBands: ["young-children"],
    modalities: ["Play & Art", "CBT", "Filial"],
    looksLike: [
      "A 20-minute parent check-in before the child joins",
      "Playroom sessions with a one-way observation option",
      "Filial coaching so you can run the same play at home",
      "Written strategies shared with preschool or daycare, with your consent",
    ],
    concerns: ["Trauma", "Autism spectrum", "Behavioral challenges", "Attachment", "Sleep & separation", "Aggression"],
    sessionLength: "45 minutes",
    typicalCourse: "12–20 sessions, often with breaks",
    icon: "blocks",
  },
  {
    slug: "children",
    name: "Counseling for Children",
    category: "individual",
    summary:
      "Ages 6–12. CBT-based problem-solving for school, peer and home difficulties, with social competency and bullying prevention woven in.",
    body: [
      "School-age children arrive with a problem that has a location: the classroom, the bus, the lunch table, the moment homework starts. We work at that level of specificity rather than in generalities about feelings.",
      "The core is Cognitive Behavioral Therapy adapted for this age — externalizing the problem, catching the thought, running an experiment, reviewing what happened. Children this age are good at this when it is framed as detective work rather than correction.",
      "We add social competency and bullying-prevention work for children whose difficulty is relational, and Filial Therapy sessions where the family system is doing more of the work than anyone intended.",
      "With your consent we coordinate directly with school counselors and teachers. In our experience this is frequently the intervention that moves fastest.",
    ],
    ageBands: ["children"],
    modalities: ["CBT", "Filial", "Play & Art"],
    looksLike: [
      "A feelings-and-thoughts vocabulary the whole family can use",
      "Between-session experiments, not worksheets for their own sake",
      "Parent sessions roughly every fourth week",
      "School coordination when it will actually change something",
    ],
    concerns: ["Anxiety", "School issues", "Social skills", "Family conflict", "ADHD support", "Bullying"],
    sessionLength: "50 minutes",
    typicalCourse: "10–16 sessions",
    icon: "backpack",
  },
  {
    slug: "teens",
    name: "Counseling for Teenagers",
    category: "individual",
    summary:
      "Ages 13–18. Depression, anxiety, peer difficulty and family conflict, treated with CBT and Dialectical Behavior Therapy.",
    body: [
      "A teenager who has been brought to counseling and does not want to be there is not a treatment failure; it is the first clinical problem to solve. Our clinicians expect it and are unbothered by it.",
      "We are explicit with teens about confidentiality in the first session: what stays in the room, what does not, and exactly where the line is. That conversation does more for engagement than anything else we do.",
      "Clinically the work is CBT and DBT. DBT skills — distress tolerance, emotion regulation, interpersonal effectiveness — are particularly well suited to adolescence, when the intensity of a feeling is genuinely new and genuinely overwhelming.",
      "Parents stay involved, but the teen is the client. We will tell you how that balance works before you commit to anything.",
    ],
    ageBands: ["teens"],
    modalities: ["CBT", "DBT", "Group"],
    looksLike: [
      "An explicit confidentiality conversation in session one",
      "Skills your teen can use without announcing they are using them",
      "Scheduled parent updates rather than ad-hoc reporting",
      "A path into the DBT skills group if intensity is the core issue",
    ],
    concerns: ["Depression", "Anxiety", "Self-harm", "Identity", "Family conflict", "School refusal", "Body image & eating concerns"],
    sessionLength: "50 minutes",
    typicalCourse: "16–24 sessions",
    icon: "compass",
  },
  {
    slug: "adults",
    name: "Counseling for Adults",
    category: "individual",
    summary:
      "Evidence-based therapy for life transitions and for persistent conditions — CBT, DBT and EMDR, matched to what you are actually carrying.",
    body: [
      "Adults come to us in roughly two groups: something has changed, or nothing has changed for a long time. Both are good reasons.",
      "For the first — a divorce, a diagnosis, a job, a death, a new baby — the work is usually time-limited and practical. For the second, where a depression or an anxiety has become the background condition of a life, it is longer and more structural.",
      "We practice Cognitive Behavioral Therapy as the default, Dialectical Behavior Therapy where emotional intensity is the central problem, and EMDR for trauma that has not responded to talking about it.",
      "You will not be asked to commit to an open-ended course of therapy. We review progress at session six and again at session twelve, out loud, with you.",
    ],
    ageBands: ["adults"],
    modalities: ["CBT", "DBT", "EMDR"],
    looksLike: [
      "Goals written down in session two, revisited at six and twelve",
      "Evening appointments through 8:30pm, four nights a week",
      "Telehealth for any session, switchable week to week",
      "An honest referral out if we are not the right fit",
    ],
    concerns: ["Depression", "Anxiety", "PTSD", "Life transitions", "Occupational stress", "Boundaries", "Men's issues"],
    sessionLength: "50 minutes",
    typicalCourse: "12–20 sessions",
    icon: "anchor",
  },
  {
    slug: "seniors",
    name: "Counseling for Seniors",
    category: "individual",
    summary:
      "Age-related health, financial and social stressors, and the anxiety and depression that arrive with them. In-office, by video, or at home.",
    body: [
      "Later life produces a specific set of losses — of a role, a body, a spouse, a driver's license — and a culture that treats the resulting depression as simply what old age is. It is not, and it responds to treatment.",
      "We work with older adults on adjustment to chronic illness, isolation after a loss, anxiety about finances and care, and the grief that accumulates when your generation begins to go.",
      "Alderwood is one of the few Lehigh Valley practices equipped to treat the full age span, which matters more than it sounds: we can see an older adult and their adult child and their grandchild without three different intake processes.",
      "Where mobility is the barrier, we offer telehealth with a phone-only fallback and, in a limited radius, in-home sessions.",
    ],
    ageBands: ["seniors"],
    modalities: ["CBT", "Group", "ESFT"],
    looksLike: [
      "Daytime appointments that avoid evening driving",
      "Phone-only sessions where video is a barrier",
      "Family sessions with adult children, where wanted",
      "Coordination with your physician, with your consent",
    ],
    concerns: ["Aging & later life", "Grief & loss", "Chronic illness", "Isolation", "Depression", "Caregiver strain"],
    sessionLength: "50 minutes",
    typicalCourse: "8–16 sessions",
    icon: "sunset",
  },
  {
    slug: "couples",
    name: "Couples Counseling",
    category: "relationship",
    summary:
      "Communication that works under stress, trust repair after a breach, and the practical business of co-running a household.",
    body: [
      "Most couples arrive having had the same argument for several years in slightly different words. The first job is to find the argument underneath it, which is rarely the one being had out loud.",
      "We work on communication that holds up under stress rather than in the calm of a session, on rebuilding trust after a breach, and on the unglamorous logistics — money, labor, in-laws, parenting — that quietly do most of the damage.",
      "Our couples work draws on the Gottman Method and on Eco-systemic Structural Family Therapy. Sessions are 80 minutes because 50 is not enough for two people.",
      "We will tell you honestly, usually by session four, whether we think this work is likely to help.",
    ],
    ageBands: ["adults"],
    modalities: ["ESFT", "CBT"],
    looksLike: [
      "An 80-minute session length, not 50",
      "A structured assessment across the first three sessions",
      "One individual session with each partner",
      "A clear read on fit by session four",
    ],
    concerns: ["Couples", "Communication", "Trust & infidelity", "Relationship distress", "Intimacy", "Boundaries"],
    sessionLength: "80 minutes",
    typicalCourse: "10–20 sessions",
    icon: "rings",
  },
  {
    slug: "co-parenting",
    name: "Co-Parenting Counseling",
    category: "relationship",
    summary:
      "Child-focused planning for separated and divorcing parents. Not couples counseling — a different goal, stated up front.",
    body: [
      "Co-parenting counseling is not a reconciliation process and is not couples therapy in disguise. The client, functionally, is the child; the work is building two households that a child can move between without carrying the conflict.",
      "We cover handoffs, schedules, consistency of rules across houses, how and when to communicate, and — most importantly — how to stop routing information through a child.",
      "Sessions can be held separately where being in a room together is not yet productive, and we can work alongside a custody agreement without becoming part of the litigation. We do not provide custody evaluations or court testimony, and we will explain why in the first session.",
    ],
    ageBands: ["adults"],
    modalities: ["ESFT", "CBT"],
    looksLike: [
      "A written co-parenting plan you both hold",
      "Separate sessions where joint ones are not yet useful",
      "Communication rules in plain language",
      "Explicitly no custody evaluations or court testimony",
    ],
    concerns: ["Co-parenting", "Divorce & separation", "Blended families", "Family conflict", "Communication"],
    sessionLength: "60 minutes",
    typicalCourse: "6–12 sessions",
    icon: "bridge",
  },
  {
    slug: "family",
    name: "Family Counseling",
    category: "relationship",
    summary:
      "Eco-systemic Structural Family Therapy for families improving dynamics, integrating a blended household, or repairing communication.",
    body: [
      "Family therapy treats the pattern rather than the person. This is not a softening — it is usually harder, because it asks everyone in the room to change something instead of one identified patient.",
      "Eco-systemic Structural Family Therapy, which several of our clinicians are certified in, looks at the structure of a family: who holds authority, which alliances have formed, where the boundaries are too rigid or too porous, and what outside systems — school, court, extended family, a child-welfare agency — are pressing on the household.",
      "We see families integrating after a remarriage, families in chronic conflict with an adolescent, and families managing a member's serious mental illness.",
    ],
    ageBands: ["children", "teens", "adults"],
    modalities: ["ESFT", "CBT", "Filial"],
    looksLike: [
      "Sessions with different combinations of family members",
      "An explicit map of the family structure, shared with you",
      "Work with outside systems that are part of the pattern",
      "Homework that changes a routine, not a feeling",
    ],
    concerns: ["Family conflict", "Blended families", "Parenting support", "Behavioral challenges", "Communication"],
    sessionLength: "60 minutes",
    typicalCourse: "10–18 sessions",
    icon: "house",
  },
  {
    slug: "grief",
    name: "Grief Counseling",
    category: "specialty",
    summary:
      "Support through loss and mourning — including the losses that do not get recognized as losses.",
    body: [
      "Grief is not a disorder and most people do not need treatment for it. People come to us when grief has become stuck, complicated by circumstance, or unrecognized by everyone around them.",
      "That last category is larger than expected: the death of an estranged parent, a miscarriage, a pet, a marriage, a career, a diagnosis that ends a version of your future. These losses are real and produce real mourning without producing casseroles.",
      "We work with sudden and traumatic loss, with grief in children — who mourn in bursts and then go play, which alarms adults unnecessarily — and with anticipatory grief in families facing a terminal diagnosis.",
    ],
    ageBands: ["children", "teens", "adults", "seniors"],
    modalities: ["CBT", "EMDR", "Group"],
    looksLike: [
      "No timeline imposed on your grief",
      "Traumatic-loss work using EMDR where it applies",
      "Children's grief explained to the adults around them",
      "A monthly drop-in grief group, no referral needed",
    ],
    concerns: ["Grief & loss", "Trauma", "Depression", "Chronic illness", "Isolation"],
    sessionLength: "50 minutes",
    typicalCourse: "6–16 sessions",
    icon: "leaf",
  },
  {
    slug: "dbt-program",
    name: "DBT Skills Program",
    category: "group",
    summary:
      "A full-model DBT program: weekly skills group, individual therapy, and between-session phone coaching.",
    body: [
      "Dialectical Behavior Therapy is the treatment with the strongest evidence base for chronic suicidality, self-harm and borderline personality disorder, and it works because it is a program rather than a conversation.",
      "Our full model has three parts: a weekly two-hour skills group working through mindfulness, distress tolerance, emotion regulation and interpersonal effectiveness; a weekly individual session applying those skills to your actual week; and phone coaching between sessions, because the skill you need at 11pm is not much use if you can only discuss it on Thursday.",
      "The program runs in 24-week cycles and asks a lot: attendance, diary cards, homework. We are direct about that before you enrol, because a half-attended DBT program is not DBT.",
      "We run separate adolescent and adult tracks. The adolescent track includes a parallel parent group.",
    ],
    ageBands: ["teens", "adults"],
    modalities: ["DBT", "Group"],
    looksLike: [
      "A 24-week cycle with a defined start date",
      "Weekly 2-hour skills group plus weekly individual therapy",
      "Phone coaching between sessions",
      "Diary cards and real homework, non-negotiable",
    ],
    concerns: ["Borderline personality disorder", "Self-harm", "Emotion regulation", "Chronic suicidality", "Bipolar disorder"],
    sessionLength: "2-hour group + 50-minute individual",
    typicalCourse: "24-week cycle, renewable",
    icon: "circle",
  },
  {
    slug: "telehealth",
    name: "Telehealth",
    category: "specialty",
    summary:
      "Any Alderwood service by secure video, switchable week to week, with a phone-only fallback when bandwidth or comfort is the barrier.",
    body: [
      "Telehealth is not a lesser version of the work. For a good number of our clients it is the reason the work happens at all — a parent who cannot arrange childcare, a client without a car, a teenager who talks more freely from their own room.",
      "Every clinician on our roster offers video sessions on the same platform, and you can switch between in-person and video week to week without renegotiating anything. Where video is the barrier rather than the solution, we will do a phone session.",
      "Two honest limits. Pennsylvania licensure means we can only see you when you are physically in PA at the time of the session. And some work — young children, high-risk clients, some couples — genuinely goes better in a room, and we will say so.",
    ],
    ageBands: ["children", "teens", "adults", "seniors"],
    modalities: ["CBT", "DBT", "ESFT"],
    looksLike: [
      "The same clinician, in-person or by video, your choice each week",
      "A HIPAA-compliant platform with no app to install",
      "Phone-only sessions when video is not workable",
      "PA-only: you must be in Pennsylvania during the session",
    ],
    concerns: ["Anxiety", "Depression", "Life transitions", "Isolation", "Occupational stress"],
    sessionLength: "Matches the in-person service",
    typicalCourse: "Same as the underlying service",
    icon: "screen",
  },
  {
    slug: "first-responders",
    name: "First Responder & Veteran Services",
    category: "specialty",
    summary:
      "Critical-incident work, occupational stress and PTSD for police, fire, EMS, dispatch, veterans and their families.",
    body: [
      "People whose job is other people's worst day accumulate exposure that does not resolve on its own, in a culture that has historically treated seeking help as a fitness-for-duty question.",
      "We run a confidential track for first responders, dispatchers, veterans and their families, staffed by clinicians who know the work well enough that you will not spend the first three sessions explaining acronyms.",
      "Services include critical-incident debriefing, EMDR for specific incidents, occupational-stress work, and family sessions — because the household absorbs a great deal of this and rarely gets counted.",
      "Scheduling accommodates shift work, including early mornings and post-night-shift appointments.",
    ],
    ageBands: ["adults"],
    modalities: ["EMDR", "CBT", "Group"],
    looksLike: [
      "Clinicians who already know the operational vocabulary",
      "Shift-friendly scheduling, including post-night-shift",
      "Critical-incident debriefing, individual or unit",
      "Family sessions for the household carrying it too",
    ],
    concerns: ["PTSD", "First responders", "Veterans & military families", "Occupational stress", "Disaster & critical incident", "Men's issues"],
    sessionLength: "50 minutes",
    typicalCourse: "8–20 sessions",
    icon: "shield",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceCategories = [
  { key: "individual", label: "Individual counseling", blurb: "One-to-one work, matched to life stage." },
  { key: "relationship", label: "Couples & family", blurb: "Work where the relationship is the client." },
  { key: "group", label: "Group programs", blurb: "Structured, cohort-based treatment." },
  { key: "specialty", label: "Specialty services", blurb: "Focused tracks for particular needs." },
] as const;

/** Union of every concern across services and therapists — the matcher's vocabulary. */
export const allConcerns = Array.from(
  new Set(services.flatMap((s) => s.concerns)),
).sort();

export const modalityDetail: { name: string; full: string; description: string }[] = [
  {
    name: "CBT",
    full: "Cognitive Behavioral Therapy",
    description:
      "The best-evidenced treatment for anxiety and depression. Identifies the thought patterns driving a feeling, tests them against reality, and builds different responses. Structured, time-limited, homework-based.",
  },
  {
    name: "DBT",
    full: "Dialectical Behavior Therapy",
    description:
      "Developed for people whose emotions arrive at overwhelming intensity. Four skill modules — mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness — delivered as a full program with group, individual work and phone coaching.",
  },
  {
    name: "ESFT",
    full: "Eco-systemic Structural Family Therapy",
    description:
      "Treats the family's structure rather than one member's symptoms: who holds authority, which alliances have formed, where boundaries fail, and which outside systems are pressing on the household.",
  },
  {
    name: "Filial",
    full: "Filial Therapy",
    description:
      "Trains parents to run therapeutic play sessions with their own child. The parent becomes the agent of change, which treats the child and rebuilds parental confidence at the same time.",
  },
  {
    name: "EMDR",
    full: "Eye Movement Desensitization and Reprocessing",
    description:
      "For traumatic memory that has not responded to talking about it. Uses bilateral stimulation while the memory is held in mind, which appears to let the brain file an experience that has stayed stuck in the present tense.",
  },
  {
    name: "Play & Art",
    full: "Play and Art Therapy",
    description:
      "The developmentally correct language for young children. A child shows you in play what they cannot yet say, and the play itself is where the change is made.",
  },
];
