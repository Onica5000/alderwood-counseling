import {
  therapists,
  type AgeBand,
  type Format,
  type Modality,
  type Therapist,
  type DayKey,
} from "./data/staff";
import { services, type Service } from "./data/services";

export interface MatchAnswers {
  who: "self" | "child" | "teen" | "couple" | "family" | "parent" | null;
  age: AgeBand | null;
  concerns: string[];
  format: Format | null;
  times: ("weekday" | "evening" | "saturday")[];
  language: string | null;
  urgency: "soon" | "flexible" | null;
}

export const emptyAnswers: MatchAnswers = {
  who: null,
  age: null,
  concerns: [],
  format: null,
  times: [],
  language: null,
  urgency: null,
};

export interface MatchResult {
  therapist: Therapist;
  score: number;
  /** Normalised 0–100 for display. */
  percent: number;
  /** Human-readable justification — the point of the whole exercise. */
  reasons: string[];
  /** Honest caveats, shown alongside the reasons. */
  caveats: string[];
  services: Service[];
}

const WEIGHTS = {
  age: 30,
  concern: 14,
  concernCap: 42,
  format: 8,
  evening: 7,
  saturday: 7,
  language: 6,
  availability: { accepting: 12, limited: 5, waitlist: 0 },
  urgencyPenalty: 14,
} as const;

/**
 * Scores every clinician against the intake answers and returns them ranked.
 *
 * The scoring is deliberately legible rather than clever: each contribution has
 * a fixed weight and produces a sentence, so the results page can show its
 * work instead of asking the visitor to trust a number.
 */
export function matchTherapists(a: MatchAnswers): MatchResult[] {
  const results = therapists.map((t) => {
    let score = 0;
    const reasons: string[] = [];
    const caveats: string[] = [];

    // Age band — the hardest constraint. A mismatch here is disqualifying.
    if (a.age) {
      if (t.ages.includes(a.age)) {
        score += WEIGHTS.age;
        reasons.push(`Works with ${ageWord(a.age)}.`);
      } else {
        caveats.push(`Does not currently see ${ageWord(a.age)}.`);
        score -= 100;
      }
    }

    // Presenting concerns, capped so a long checklist cannot dominate the rank.
    const hits = a.concerns.filter((c) =>
      t.focus.some((f) => f.toLowerCase() === c.toLowerCase()),
    );
    if (hits.length) {
      score += Math.min(hits.length * WEIGHTS.concern, WEIGHTS.concernCap);
      reasons.push(
        hits.length === 1
          ? `Specializes in ${hits[0].toLowerCase()}.`
          : `Specializes in ${listWords(hits.map((h) => h.toLowerCase()))}.`,
      );
    }
    const missed = a.concerns.filter((c) => !hits.includes(c));
    if (missed.length && hits.length) {
      caveats.push(`Does not list ${listWords(missed.map((m) => m.toLowerCase()))} as a focus area.`);
    }

    if (a.format) {
      if (t.formats.includes(a.format)) {
        score += WEIGHTS.format;
        reasons.push(a.format === "telehealth" ? "Offers secure video sessions." : "Sees clients in the Delaware Avenue office.");
      } else {
        caveats.push(a.format === "telehealth" ? "Does not offer telehealth." : "In-person availability is limited.");
      }
    }

    if (a.times.includes("evening")) {
      if (t.evenings) {
        score += WEIGHTS.evening;
        reasons.push("Has evening appointments through 8:30pm.");
      } else {
        caveats.push("Does not hold evening appointments.");
      }
    }
    if (a.times.includes("saturday")) {
      if (t.saturdays) {
        score += WEIGHTS.saturday;
        reasons.push("Works Saturday mornings.");
      } else {
        caveats.push("Does not work Saturdays.");
      }
    }

    if (a.language && a.language !== "English") {
      if (t.languages.includes(a.language)) {
        score += WEIGHTS.language;
        reasons.push(`Speaks ${a.language}.`);
      } else {
        caveats.push(`Does not speak ${a.language}.`);
        score -= 20;
      }
    }

    score += WEIGHTS.availability[t.availability];
    if (t.availability === "accepting") {
      reasons.push("Accepting new clients now.");
    } else if (t.availability === "limited") {
      caveats.push("Limited openings — expect a short wait.");
    } else {
      caveats.push("Currently waitlist only.");
      if (a.urgency === "soon") score -= WEIGHTS.urgencyPenalty;
    }

    const matchedServices = services.filter(
      (s) =>
        (!a.age || s.ageBands.includes(a.age)) &&
        (a.concerns.length === 0 ||
          s.concerns.some((c) => a.concerns.some((x) => x.toLowerCase() === c.toLowerCase()))),
    );

    return { therapist: t, score, reasons, caveats, services: matchedServices.slice(0, 3), percent: 0 };
  });

  const eligible = results.filter((r) => r.score > 0);
  const pool = eligible.length ? eligible : results;
  const top = Math.max(...pool.map((r) => r.score), 1);

  return pool
    .map((r) => ({ ...r, percent: Math.max(35, Math.round((r.score / top) * 100)) }))
    .sort((a, b) => b.score - a.score);
}

function ageWord(band: AgeBand) {
  return {
    "young-children": "young children aged 2–5",
    children: "children aged 6–12",
    teens: "teenagers",
    adults: "adults",
    seniors: "older adults",
  }[band];
}

function listWords(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Concern options shown in the wizard, grouped so the list stays scannable. */
export const concernGroups: { label: string; options: string[] }[] = [
  {
    label: "Mood & anxiety",
    options: ["Anxiety", "Depression", "OCD", "Bipolar disorder", "Emotion regulation"],
  },
  {
    label: "Trauma & safety",
    options: ["Trauma", "PTSD", "Abuse recovery", "Self-harm", "Chronic suicidality", "Disaster & critical incident"],
  },
  {
    label: "Relationships & family",
    options: ["Couples", "Co-parenting", "Family conflict", "Blended families", "Communication", "Boundaries", "Parenting support"],
  },
  {
    label: "Children & school",
    options: ["School issues", "School refusal", "Behavioral challenges", "Autism spectrum", "Social skills", "Early intervention"],
  },
  {
    label: "Life stage & circumstance",
    options: ["Life transitions", "Grief & loss", "Aging & later life", "Caregiver strain", "Chronic illness", "Isolation", "College stress", "Identity"],
  },
  {
    label: "Work & service",
    options: ["Occupational stress", "First responders", "Veterans & military families", "Men's issues", "Body image & eating concerns"],
  },
];

export const wizardDays: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
];

export const modalityFor = (m: Modality) => m;
