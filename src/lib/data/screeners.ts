export interface Screener {
  slug: string;
  name: string;
  full: string;
  intro: string;
  /** Shown above the questions; the timeframe the respondent should consider. */
  timeframe: string;
  source: string;
  options: { label: string; value: number }[];
  questions: { id: string; text: string; /** Triggers the safety interstitial. */ risk?: boolean }[];
  bands: { min: number; max: number; label: string; advice: string; tone: "ok" | "mild" | "moderate" | "high" }[];
}

const fourPoint = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export const screeners: Screener[] = [
  {
    slug: "phq-9",
    name: "Depression check",
    full: "PHQ-9",
    timeframe: "Over the last 2 weeks, how often have you been bothered by any of the following?",
    intro:
      "The PHQ-9 is the depression screener most primary-care offices and therapists use. It takes about two minutes and it is not a diagnosis — it is a structured way of noticing what you may already suspect.",
    source: "Patient Health Questionnaire-9 (Kroenke, Spitzer & Williams, 2001). Public domain.",
    options: fourPoint,
    questions: [
      { id: "q1", text: "Little interest or pleasure in doing things" },
      { id: "q2", text: "Feeling down, depressed, or hopeless" },
      { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much" },
      { id: "q4", text: "Feeling tired or having little energy" },
      { id: "q5", text: "Poor appetite or overeating" },
      { id: "q6", text: "Feeling bad about yourself — or that you are a failure, or have let yourself or your family down" },
      { id: "q7", text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
      { id: "q8", text: "Moving or speaking so slowly that other people could have noticed — or being so fidgety or restless that you have been moving a lot more than usual" },
      { id: "q9", text: "Thoughts that you would be better off dead, or of hurting yourself in some way", risk: true },
    ],
    bands: [
      { min: 0, max: 4, label: "Minimal", tone: "ok", advice: "Your answers do not suggest significant depressive symptoms right now. If something still feels off, that is worth a conversation regardless — a screener measures a narrow thing." },
      { min: 5, max: 9, label: "Mild", tone: "mild", advice: "Your answers suggest mild depressive symptoms. This is the range where counseling tends to work quickly, and where people most often talk themselves out of calling. A short course of CBT is a reasonable next step." },
      { min: 10, max: 14, label: "Moderate", tone: "moderate", advice: "Your answers suggest moderate depressive symptoms. This is squarely in the range where treatment is indicated and effective. We would recommend scheduling an appointment, and mentioning this score when you call." },
      { min: 15, max: 19, label: "Moderately severe", tone: "high", advice: "Your answers suggest moderately severe depressive symptoms. Please do not sit on this. Call us at (610) 555-0142 — tell the person who answers that you scored in this range and we will prioritize scheduling you." },
      { min: 20, max: 27, label: "Severe", tone: "high", advice: "Your answers suggest severe depressive symptoms. Please contact us today, or speak with your physician. If you are in danger right now, call or text 988, or call 911." },
    ],
  },
  {
    slug: "gad-7",
    name: "Anxiety check",
    full: "GAD-7",
    timeframe: "Over the last 2 weeks, how often have you been bothered by the following problems?",
    intro:
      "The GAD-7 screens for generalized anxiety. Seven questions, under two minutes. Like any screener it measures a narrow slice of a wide experience, and a low score does not mean nothing is wrong.",
    source: "Generalized Anxiety Disorder-7 (Spitzer, Kroenke, Williams & Löwe, 2006). Public domain.",
    options: fourPoint,
    questions: [
      { id: "q1", text: "Feeling nervous, anxious, or on edge" },
      { id: "q2", text: "Not being able to stop or control worrying" },
      { id: "q3", text: "Worrying too much about different things" },
      { id: "q4", text: "Trouble relaxing" },
      { id: "q5", text: "Being so restless that it is hard to sit still" },
      { id: "q6", text: "Becoming easily annoyed or irritable" },
      { id: "q7", text: "Feeling afraid, as if something awful might happen" },
    ],
    bands: [
      { min: 0, max: 4, label: "Minimal", tone: "ok", advice: "Your answers do not suggest a significant anxiety problem at the moment. Worth rechecking if things change." },
      { min: 5, max: 9, label: "Mild", tone: "mild", advice: "Your answers suggest mild anxiety. CBT is the best-evidenced treatment for anxiety at this level and often works in ten to twelve sessions." },
      { min: 10, max: 14, label: "Moderate", tone: "moderate", advice: "Your answers suggest moderate anxiety — the range where it usually starts costing you things: sleep, opportunities, patience. Treatment is well worth it here." },
      { min: 15, max: 21, label: "Severe", tone: "high", advice: "Your answers suggest severe anxiety. Please call us at (610) 555-0142. Anxiety at this level responds to treatment, and it very rarely resolves by waiting." },
    ],
  },
];

export const getScreener = (slug: string) => screeners.find((s) => s.slug === slug);

export function scoreBand(screener: Screener, total: number) {
  return screener.bands.find((b) => total >= b.min && total <= b.max) ?? screener.bands[0];
}

export const maxScore = (s: Screener) => s.questions.length * 3;
