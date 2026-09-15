export interface FaqItem {
  id: string;
  category: "getting-started" | "cost" | "sessions" | "privacy" | "crisis";
  question: string;
  answer: string[];
  /** Extra terms the FAQ search should match beyond the visible text. */
  keywords: string[];
}

export const faqCategories = [
  { key: "getting-started", label: "Getting started" },
  { key: "cost", label: "Cost & insurance" },
  { key: "sessions", label: "Sessions & scheduling" },
  { key: "privacy", label: "Privacy & records" },
  { key: "crisis", label: "Crisis & safety" },
] as const;

export const faqs: FaqItem[] = [
  {
    id: "when-to-seek",
    category: "getting-started",
    question: "When should I seek counseling?",
    answer: [
      "If your emotions feel out of control and are interfering with your life at home, work or school, it is time to seek help.",
      "You do not need to be in crisis to qualify. A great deal of useful counseling happens with people whose lives look fine from outside and who are quietly spending enormous energy keeping them that way. The threshold is not severity — it is whether something is costing you more than it should.",
    ],
    keywords: ["ready", "bad enough", "should i", "need therapy", "worth it"],
  },
  {
    id: "first-appointment",
    category: "getting-started",
    question: "How do I schedule a first appointment?",
    answer: [
      "Call (610) 417-0463 or use the request form on our contact page. Either way you will speak with a person, not a queue.",
      "We will ask what is bringing you in, who the client is, what has already been tried, your insurance, and what days and times could actually work. That conversation is how we match you to a clinician rather than to whoever has the next open slot.",
      "Most people are seen within seven to ten days. If you need to be seen sooner, say so when you call — we hold a small number of slots for exactly that.",
    ],
    keywords: ["appointment", "book", "schedule", "intake", "first visit", "how long wait"],
  },
  {
    id: "choose-therapist",
    category: "getting-started",
    question: "Can I choose my therapist?",
    answer: [
      "Yes. You can request any clinician by name and we will tell you honestly what their current availability looks like.",
      "That said, our intake coordinator matches based on specialty, age range and availability, and that match is usually better than one made from a website alone. Our Find a Therapist tool does the same matching and shows you its reasoning.",
      "If the fit is wrong, tell us. Changing clinicians within the practice is routine and nobody's feelings are hurt.",
    ],
    keywords: ["pick", "choose", "switch", "change therapist", "match", "fit"],
  },
  {
    id: "what-it-costs",
    category: "cost",
    question: "What does counseling cost?",
    answer: [
      "Insurance coverage varies greatly. With most in-network plans you pay only a copay, typically $20–$60 per session; if you have a deductible that has not been met, you pay the contracted rate until it is.",
      "Our self-pay rates are $160 for a 50-minute individual session, $210 for an 80-minute couples session, and $90 per session for the DBT skills group.",
      "Olivewood is committed to accessibility. We hold a limited number of sliding-scale slots and we will set up a payment plan rather than lose a client over money. Ask — we would far rather have that conversation than have you not call.",
    ],
    keywords: ["cost", "price", "fee", "rate", "expensive", "afford", "sliding scale", "copay"],
  },
  {
    id: "insurance-accepted",
    category: "cost",
    question: "Which insurances do you accept?",
    answer: [
      "We accept many major insurances and most government-funded plans, including Highmark, Capital BlueCross, Aetna, Cigna, UnitedHealthcare / Optum, Geisinger Health Plan, Medicare, and the Pennsylvania HealthChoices behavioral-health plans.",
      "Coverage differs plan to plan even within one insurer, so please call us to verify your specific plan before your first session. Our intake coordinator will run the verification for you and tell you what you will owe.",
    ],
    keywords: ["insurance", "highmark", "aetna", "cigna", "medicare", "medicaid", "in network", "coverage"],
  },
  {
    id: "no-insurance",
    category: "cost",
    question: "What if I have no insurance, or you are out of network?",
    answer: [
      "You can self-pay at the rates above, and we will give you a Good Faith Estimate in writing before you start, as required by the No Surprises Act.",
      "If your plan has out-of-network benefits we will provide a monthly superbill you can submit for reimbursement. We will not submit it for you, but we will make sure it has everything your insurer needs on it.",
      "Sliding-scale slots are limited and allocated by need. Ask the intake coordinator.",
    ],
    keywords: ["out of network", "superbill", "self pay", "uninsured", "good faith estimate", "reimbursement"],
  },
  {
    id: "session-length",
    category: "sessions",
    question: "How long is a session, and how many will I need?",
    answer: [
      "Individual sessions are 50 minutes, couples sessions 80 minutes, family sessions 60, and the DBT skills group runs two hours.",
      "Course length depends entirely on the work. A focused piece of anxiety work might run ten sessions; trauma work or the DBT program runs considerably longer. We set goals with you in session two and review them out loud at sessions six and twelve, so you are never guessing about progress.",
    ],
    keywords: ["how long", "how many sessions", "duration", "length", "weeks"],
  },
  {
    id: "evening-weekend",
    category: "sessions",
    question: "Do you have evening or weekend appointments?",
    answer: [
      "Yes. We are open until 8:30pm Monday through Thursday and 8:00am to 1:00pm on Saturdays.",
      "Evening and Saturday slots are the first to fill, so there is usually a short wait for one. If you can take a daytime slot to start and move to an evening one later, you will be seen sooner.",
    ],
    keywords: ["evening", "weekend", "saturday", "after work", "night", "hours"],
  },
  {
    id: "telehealth",
    category: "sessions",
    question: "Do you offer telehealth?",
    answer: [
      "Every clinician offers secure video sessions, and you can switch between in-person and video week to week. Where video is itself the barrier, we will do a phone session.",
      "One legal limit: our clinicians are licensed in Pennsylvania, so you must be physically in Pennsylvania at the time of the session. This applies even if you normally live here — a session while you are away at college out of state is not something we can do.",
    ],
    keywords: ["telehealth", "video", "online", "zoom", "remote", "virtual"],
  },
  {
    id: "cancellation",
    category: "sessions",
    question: "What is your cancellation policy?",
    answer: [
      "We ask for 24 hours' notice. Later cancellations and no-shows are billed at $75, which insurance does not cover.",
      "We waive it for genuine emergencies and for illness, and we do not require you to prove either. The policy exists because a slot held for you is a slot somebody else could not have, not because we want the $75.",
    ],
    keywords: ["cancel", "no show", "reschedule", "late", "missed appointment", "fee"],
  },
  {
    id: "confidential",
    category: "privacy",
    question: "Is what I say confidential?",
    answer: [
      "Yes, with four legal exceptions that we will explain in your first session: a serious and imminent risk of harm to yourself, a serious threat to an identifiable other person, suspected abuse or neglect of a child or vulnerable adult, and a valid court order.",
      "Nothing goes to your employer, your school or your family without your written consent. If you want us to coordinate with a doctor, a school counselor or a lawyer, you sign a release specifying exactly what may be shared and with whom, and you can revoke it.",
    ],
    keywords: ["confidential", "private", "secret", "hipaa", "records", "who finds out"],
  },
  {
    id: "teen-confidentiality",
    category: "privacy",
    question: "My teenager is the client. What will I be told?",
    answer: [
      "Under Pennsylvania law a minor aged 14 or older can consent to their own outpatient mental-health treatment, and has a corresponding right to confidentiality.",
      "In practice we set the terms explicitly in the first session with everyone in the room: parents are told about safety concerns and about the shape of the work, and are not given a transcript of what their teenager said.",
      "This is not us siding with your teenager. A teen who believes their words will be reported home will not use therapy, and you will have paid for a room in which nothing happened.",
    ],
    keywords: ["teenager", "minor", "parent", "told", "confidentiality", "14"],
  },
  {
    id: "crisis",
    category: "crisis",
    question: "What should I do in a mental health crisis?",
    answer: [
      "Call 911 or go to the emergency room if there is immediate danger. Call or text 988 for the Suicide & Crisis Lifeline, any hour.",
      "County crisis services: Lehigh County 610-782-3127, Northampton County 610-252-9060. Both operate 24 hours and can send a mobile crisis team.",
      "Olivewood is an outpatient practice. We do not provide 24-hour crisis coverage, and our voicemail is not monitored overnight. If you are an active client, your clinician will have given you a specific after-hours plan.",
    ],
    keywords: ["crisis", "emergency", "988", "suicidal", "help now", "hotline", "urgent"],
  },
  {
    id: "safety-plan",
    category: "crisis",
    question: "I am having thoughts of suicide. Can I still come to Olivewood?",
    answer: [
      "Yes. Thoughts of suicide are common, treatable, and not a reason to be turned away — several of our clinicians specialize in exactly this, and our DBT program was built for it.",
      "Tell us when you call. It changes how fast we schedule you and which clinician you are matched with, and it means your first session will include building a safety plan you actually leave with.",
      "If you are in immediate danger right now, do not wait for an appointment: call or text 988, or call 911.",
    ],
    keywords: ["suicide", "suicidal", "self harm", "safety plan", "thoughts", "kill myself"],
  },
];
