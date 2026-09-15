export type AgeBand = "young-children" | "children" | "teens" | "adults" | "seniors";
export type Modality = "CBT" | "DBT" | "ESFT" | "Filial" | "EMDR" | "Play & Art" | "Group";
export type Format = "in-person" | "telehealth";
export type Availability = "accepting" | "limited" | "waitlist";
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export interface Therapist {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  extension: string;
  /** Two initials rendered into the generated avatar mark. */
  initials: string;
  /** Drives the deterministic avatar hue so each person reads distinctly. */
  hue: number;
  pronouns: string;
  bio: string;
  longBio: string[];
  ages: AgeBand[];
  modalities: Modality[];
  /** Presenting concerns, scored against by the matcher. */
  focus: string[];
  languages: string[];
  formats: Format[];
  availability: Availability;
  /** Day keys the booking grid offers slots for. */
  availableDays: DayKey[];
  evenings: boolean;
  saturdays: boolean;
  education: { degree: string; school: string; year: string }[];
  certifications: string[];
  isFounder?: boolean;
}

export const therapists: Therapist[] = [
  {
    slug: "sue-dietrich",
    name: "Sue Dietrich",
    credentials: "LCSW",
    title: "Founding Partner & Clinical Supervisor",
    extension: "x701",
    initials: "SD",
    hue: 108,
    pronouns: "she/her",
    bio: "Renowned for her work with survivors of trauma and abuse, particularly children. Teaches licensure preparation and clinical supervision for the National Association of Social Workers.",
    longBio: [
      "Sue has spent more than three decades sitting with families at the hardest moments of their lives — in emergency rooms, in county offices, in school conference rooms, and now in a corner office on Delaware Avenue that gets the afternoon light.",
      "Her clinical reputation rests on trauma work with children, but the through-line of her career is slower than any one modality: she believes a person's history explains their behavior without excusing them from their future. That posture makes her unusually effective with families who have been told, repeatedly, that they are the problem.",
      "Sue co-founded Olivewood with her daughter Becky in April 2011 with a folding table and two chairs. She supervises the practice's associate clinicians and teaches licensure preparation for the National Association of Social Workers across eastern Pennsylvania.",
    ],
    ages: ["young-children", "children", "teens", "adults"],
    modalities: ["CBT", "Play & Art", "Filial", "EMDR"],
    focus: ["Trauma", "Abuse recovery", "PTSD", "Attachment", "Foster & adoption", "Grief & loss"],
    languages: ["English"],
    formats: ["in-person", "telehealth"],
    availability: "waitlist",
    availableDays: ["mon", "tue", "thu"],
    evenings: true,
    saturdays: false,
    education: [
      { degree: "MSW, Clinical Social Work", school: "Marywood University", year: "1989" },
      { degree: "BA, Psychology", school: "Moravian College", year: "1986" },
    ],
    certifications: [
      "Licensed Clinical Social Worker (PA)",
      "EMDR-Trained, EMDRIA Approved",
      "Trauma-Focused CBT Certified",
      "NASW Approved Clinical Supervisor",
    ],
    isFounder: true,
  },
  {
    slug: "becky-richendollar",
    name: "Becky Richendollar",
    credentials: "LCSW",
    title: "Founding Partner",
    extension: "x702",
    initials: "BR",
    hue: 160,
    pronouns: "she/her",
    bio: "Named Bethlehem's Top Social Worker of 2014. Began her career in early intervention and brings deep expertise with young children and the families around them.",
    longBio: [
      "Becky started out doing early-intervention home visits, which means she learned the job on living-room floors surrounded by toys — and it shows. She is unfazed by a four-year-old who will not sit down, and she is very good at translating what that four-year-old is doing into language a worn-out parent can actually use on a Tuesday night.",
      "She is a passionate advocate for young women entering the profession, a member of the National Association of Professional Women, and was named Bethlehem's Top Social Worker in 2014 by the International Association of Healthcare Professionals.",
      "Becky handles most of Olivewood's intake matching personally. If you call the main line and someone asks careful questions about what you have already tried, it is probably her.",
    ],
    ages: ["young-children", "children", "teens"],
    modalities: ["CBT", "Filial", "Play & Art", "ESFT"],
    focus: ["Early intervention", "Autism spectrum", "Behavioral challenges", "Parenting support", "School issues", "Anxiety"],
    languages: ["English"],
    formats: ["in-person", "telehealth"],
    availability: "limited",
    availableDays: ["mon", "wed", "thu", "sat"],
    evenings: true,
    saturdays: true,
    education: [
      { degree: "MSW, Clinical Social Work", school: "Temple University", year: "2007" },
      { degree: "BS, Human Development & Family Studies", school: "Penn State University", year: "2004" },
    ],
    certifications: [
      "Licensed Clinical Social Worker (PA)",
      "Filial Therapy Certified",
      "Early Intervention Specialist",
      "Nurturing Parenting Program Facilitator",
    ],
    isFounder: true,
  },
  {
    slug: "amy-esch",
    name: "Amy Esch",
    credentials: "LPC",
    title: "Licensed Professional Counselor",
    extension: "x703",
    initials: "AE",
    hue: 38,
    pronouns: "she/her",
    bio: "Specializes in older adolescents and adults, pairing common-sense wisdom with a genuinely caring nature. Extensive school-based work with teens, college students and veterans.",
    longBio: [
      "Amy spent nine years as a school-based counselor before joining Olivewood, which gave her an unglamorous and extremely useful skill: she can tell the difference between a teenager who is struggling and a teenager who is being a teenager, and she will say so plainly.",
      "Her adult practice leans toward people in transition — new parents, career changers, students who came home from a first semester and could not explain why. She also works extensively with veterans and their families.",
      "Clients describe her style as warm but unsentimental. She is likely to hand you something to try before you leave the room.",
    ],
    ages: ["teens", "adults"],
    modalities: ["CBT", "DBT", "Group"],
    focus: ["Anxiety", "Depression", "Veterans & military families", "Life transitions", "College stress", "Identity"],
    languages: ["English"],
    formats: ["in-person", "telehealth"],
    availability: "accepting",
    availableDays: ["tue", "wed", "thu", "fri"],
    evenings: true,
    saturdays: false,
    education: [
      { degree: "MEd, Counseling Psychology", school: "Lehigh University", year: "2009" },
      { degree: "BA, Sociology", school: "Kutztown University", year: "2006" },
    ],
    certifications: [
      "Licensed Professional Counselor (PA)",
      "National Certified Counselor (NCC)",
      "Military Culture Certificate, PsychArmor",
    ],
  },
  {
    slug: "john-weaver",
    name: "John Weaver",
    credentials: "LCSW, BCD, ACSW",
    title: "Senior Clinician",
    extension: "x710",
    initials: "JW",
    hue: 210,
    pronouns: "he/him",
    bio: "Decades of clinical social work expressed through practice, writing, teaching and Red Cross disaster response. Named Pennsylvania Social Worker of the Year in 2002.",
    longBio: [
      "John was named Pennsylvania Social Worker of the Year in 2002 for his work coordinating mental-health response in the months after September 11th — work he has consistently declined to describe as heroic, preferring the word “scheduling.”",
      "He has written and taught on disaster mental health for most of his career and still deploys with the American Red Cross. At Olivewood he carries a general adult caseload with particular strength in men's issues, occupational stress and first-responder work.",
      "John is the clinician most likely to tell you that what you are feeling is a normal response to an abnormal situation, and then to take that seriously rather than use it as a reason to do nothing.",
    ],
    ages: ["adults", "seniors"],
    modalities: ["CBT", "EMDR", "Group"],
    focus: ["Disaster & critical incident", "First responders", "Men's issues", "Occupational stress", "Grief & loss", "PTSD"],
    languages: ["English"],
    formats: ["in-person", "telehealth"],
    availability: "accepting",
    availableDays: ["mon", "tue", "wed"],
    evenings: false,
    saturdays: false,
    education: [
      { degree: "MSW", school: "Rutgers University", year: "1984" },
      { degree: "BA, Psychology", school: "Muhlenberg College", year: "1981" },
    ],
    certifications: [
      "Licensed Clinical Social Worker (PA)",
      "Board Certified Diplomate in Clinical Social Work",
      "Academy of Certified Social Workers (ACSW)",
      "American Red Cross Disaster Mental Health Lead",
    ],
  },
  {
    slug: "marie-schneller",
    name: "Marie Schneller",
    credentials: "LPC",
    title: "Licensed Professional Counselor · DBT Program Lead",
    extension: "x707",
    initials: "MS",
    hue: 280,
    pronouns: "she/her",
    bio: "Extensive experience with serious mental health conditions and personality disorders using Dialectical Behavior Therapy, across individual, couples, family and group formats.",
    longBio: [
      "Marie runs Olivewood's DBT program: the skills group, the individual work that sits alongside it, and the between-session coaching that makes the difference between knowing a skill and using one at 11pm.",
      "She came to DBT after several years in inpatient and partial-hospitalization settings, where she grew tired of discharging people back into the exact conditions that had overwhelmed them. Her practice now concentrates on emotion regulation, chronic suicidality, self-harm and borderline personality disorder — the work many practices route elsewhere.",
      "She is direct, unshockable, and holds a very firm line on homework.",
    ],
    ages: ["teens", "adults"],
    modalities: ["DBT", "CBT", "Group"],
    focus: ["Borderline personality disorder", "Self-harm", "Emotion regulation", "Chronic suicidality", "Bipolar disorder", "Relationship distress"],
    languages: ["English", "German"],
    formats: ["in-person", "telehealth"],
    availability: "limited",
    availableDays: ["mon", "tue", "thu", "fri"],
    evenings: true,
    saturdays: false,
    education: [
      { degree: "MA, Clinical Mental Health Counseling", school: "Moravian University", year: "2011" },
      { degree: "BS, Psychology", school: "DeSales University", year: "2008" },
    ],
    certifications: [
      "Licensed Professional Counselor (PA)",
      "DBT-Linehan Board Certified Clinician",
      "Certified Clinical Trauma Professional",
    ],
  },
  {
    slug: "rachel-heckler",
    name: "Rachel Heckler",
    credentials: "LPC",
    title: "Licensed Professional Counselor",
    extension: "x706",
    initials: "RH",
    hue: 340,
    pronouns: "she/her",
    bio: "Known for an empathetic, caring and frankly funny approach to building the therapeutic relationship. Works across the full age range, from young children to adults.",
    longBio: [
      "Rachel is the clinician clients most often describe as funny, which in a counseling office is not a small thing — humor is often the first evidence a person has that they are not, in fact, beyond reach.",
      "She works comfortably across the age range, moving from a play-therapy session with a seven-year-old to an adult session on the hour. Her particular strengths are anxiety, school refusal, body image and the anxious-parent-of-an-anxious-child dynamic, which she treats as one system rather than two clients.",
      "She also coordinates Olivewood's school-liaison work, which means she is the person who will get on the phone with a guidance counselor when that is what actually moves things.",
    ],
    ages: ["young-children", "children", "teens", "adults"],
    modalities: ["CBT", "Play & Art", "ESFT", "Filial"],
    focus: ["Anxiety", "School refusal", "Body image & eating concerns", "Family conflict", "OCD", "Social skills"],
    languages: ["English", "Spanish"],
    formats: ["in-person", "telehealth"],
    availability: "accepting",
    availableDays: ["tue", "wed", "thu", "sat"],
    evenings: true,
    saturdays: true,
    education: [
      { degree: "MA, Counseling Psychology", school: "Kutztown University", year: "2013" },
      { degree: "BA, Art Therapy", school: "Cedar Crest College", year: "2010" },
    ],
    certifications: [
      "Licensed Professional Counselor (PA)",
      "Registered Play Therapist (RPT)",
      "Certified School Anxiety Specialist",
    ],
  },
  {
    slug: "megan-flechsig",
    name: "Megan Flechsig",
    credentials: "LPC",
    title: "Licensed Professional Counselor",
    extension: "x708",
    initials: "MF",
    hue: 190,
    pronouns: "she/her",
    bio: "Works with couples, co-parents and families navigating separation, blending and repair — plus individual adult work on communication and boundaries.",
    longBio: [
      "Megan carries most of Olivewood's couples and co-parenting caseload. She is careful to say that co-parenting counseling is not couples counseling with a worse outcome; it is a distinct, child-centered piece of work with a different goal, and she will set that expectation in the first ten minutes.",
      "Her individual practice focuses on adults untangling family-of-origin patterns — people who can describe exactly what they do not want to repeat and cannot yet see how they are repeating it.",
      "She trained in Eco-systemic Structural Family Therapy and thinks in systems: who else is in the room, even when they are not in the room.",
    ],
    ages: ["teens", "adults"],
    modalities: ["ESFT", "CBT", "DBT"],
    focus: ["Couples", "Co-parenting", "Divorce & separation", "Blended families", "Boundaries", "Communication"],
    languages: ["English"],
    formats: ["in-person", "telehealth"],
    availability: "accepting",
    availableDays: ["mon", "wed", "thu", "fri", "sat"],
    evenings: true,
    saturdays: true,
    education: [
      { degree: "MA, Marriage & Family Therapy", school: "Chestnut Hill College", year: "2015" },
      { degree: "BA, Human Services", school: "East Stroudsburg University", year: "2012" },
    ],
    certifications: [
      "Licensed Professional Counselor (PA)",
      "ESFT Certified Clinician",
      "Gottman Method Couples Therapy, Level 2",
    ],
  },
  {
    slug: "daniel-okafor",
    name: "Daniel Okafor",
    credentials: "LCSW",
    title: "Licensed Clinical Social Worker",
    extension: "x709",
    initials: "DO",
    hue: 25,
    pronouns: "he/him",
    bio: "Focuses on older adults and the families supporting them: age-related health changes, caregiver strain, isolation, and the anxiety and depression that travel with them.",
    longBio: [
      "Daniel came to Olivewood from hospital social work, where he spent six years on discharge planning for older adults — a job that consists largely of watching families make impossible decisions on four hours' notice.",
      "His practice now covers both sides of that: the older adult adjusting to a body or a household that has changed, and the adult child who has quietly become a caregiver without anyone naming it. He runs the practice's caregiver support group.",
      "He speaks Igbo and English and has a particular interest in how immigrant families negotiate aging across two sets of expectations.",
    ],
    ages: ["adults", "seniors"],
    modalities: ["CBT", "Group", "ESFT"],
    focus: ["Aging & later life", "Caregiver strain", "Chronic illness", "Grief & loss", "Isolation", "Depression"],
    languages: ["English", "Igbo"],
    formats: ["in-person", "telehealth"],
    availability: "accepting",
    availableDays: ["mon", "tue", "wed", "fri"],
    evenings: false,
    saturdays: false,
    education: [
      { degree: "MSW", school: "University of Pennsylvania", year: "2016" },
      { degree: "BSW", school: "Bloomsburg University", year: "2013" },
    ],
    certifications: [
      "Licensed Clinical Social Worker (PA)",
      "Certified Advanced Social Work Case Manager",
      "Dementia Care Specialist",
    ],
  },
];

export const supportStaff = [
  {
    name: "Leslie Habecker",
    title: "Office Manager",
    initials: "LH",
    hue: 70,
    bio: "Runs the front desk, the schedule and the insurance paperwork. Years of varied professional experience, all of it now aimed at making sure your first call does not end in a voicemail maze.",
  },
  {
    name: "Priya Raman",
    title: "Intake & Insurance Coordinator",
    initials: "PR",
    hue: 300,
    bio: "Verifies benefits before your first session so the cost conversation happens up front rather than six weeks in. Will call your insurer for you.",
  },
];

export const getTherapist = (slug: string) => therapists.find((t) => t.slug === slug);

export const ageBandLabels: Record<AgeBand, string> = {
  "young-children": "Young children (2–5)",
  children: "Children (6–12)",
  teens: "Teens (13–18)",
  adults: "Adults (19–64)",
  seniors: "Seniors (65+)",
};

export const availabilityMeta: Record<Availability, { label: string; short: string }> = {
  accepting: { label: "Accepting new clients", short: "Accepting" },
  limited: { label: "Limited openings", short: "Limited" },
  waitlist: { label: "Waitlist only", short: "Waitlist" },
};

export const dayLabels: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
};

/** Every distinct focus area across the roster, for filter UIs. */
export const allFocusAreas = Array.from(
  new Set(therapists.flatMap((t) => t.focus)),
).sort();

export const allModalities = Array.from(
  new Set(therapists.flatMap((t) => t.modalities)),
).sort() as Modality[];

export const allLanguages = Array.from(
  new Set(therapists.flatMap((t) => t.languages)),
).sort();
