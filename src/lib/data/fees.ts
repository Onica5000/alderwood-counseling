export interface SessionType {
  key: string;
  label: string;
  minutes: number;
  /** Olivewood's self-pay rate, and the rate insurers are billed. */
  rate: number;
  cptCode: string;
  note?: string;
}

export const sessionTypes: SessionType[] = [
  { key: "individual", label: "Individual therapy", minutes: 50, rate: 160, cptCode: "90837" },
  { key: "individual-short", label: "Individual therapy (brief)", minutes: 30, rate: 110, cptCode: "90832" },
  { key: "couples", label: "Couples therapy", minutes: 80, rate: 210, cptCode: "90847", note: "Many plans do not cover couples work unless one partner has a qualifying diagnosis." },
  { key: "family", label: "Family therapy", minutes: 60, rate: 190, cptCode: "90847" },
  { key: "group", label: "DBT skills group", minutes: 120, rate: 90, cptCode: "90853" },
  { key: "intake", label: "Diagnostic intake", minutes: 60, rate: 225, cptCode: "90791", note: "Billed once, at your first appointment." },
];

export interface Plan {
  key: string;
  name: string;
  network: "in" | "out" | "none";
  /** Typical member cost share for a behavioral-health specialist visit. */
  copay: number | null;
  /** Percent the member pays after deductible, for coinsurance plans. */
  coinsurance: number | null;
  deductibleApplies: boolean;
  note: string;
}

export const plans: Plan[] = [
  { key: "highmark", name: "Highmark Blue Shield", network: "in", copay: 30, coinsurance: null, deductibleApplies: false, note: "Most commercial Highmark plans treat behavioral health as a specialist visit." },
  { key: "capital", name: "Capital BlueCross", network: "in", copay: 25, coinsurance: null, deductibleApplies: false, note: "Copay applies from the first visit on most plans." },
  { key: "aetna", name: "Aetna", network: "in", copay: 40, coinsurance: null, deductibleApplies: true, note: "Several Aetna plans apply the deductible to outpatient behavioral health." },
  { key: "cigna", name: "Cigna / Evernorth", network: "in", copay: 35, coinsurance: null, deductibleApplies: false, note: "Behavioral health is administered by Evernorth." },
  { key: "uhc", name: "UnitedHealthcare / Optum", network: "in", copay: null, coinsurance: 20, deductibleApplies: true, note: "Commonly a coinsurance plan — you pay a percentage after the deductible." },
  { key: "geisinger", name: "Geisinger Health Plan", network: "in", copay: 25, coinsurance: null, deductibleApplies: false, note: "Both commercial and Medicare Advantage lines." },
  { key: "medicare", name: "Medicare Part B", network: "in", copay: null, coinsurance: 20, deductibleApplies: true, note: "20% coinsurance after the Part B deductible. A supplement usually covers it." },
  { key: "healthchoices", name: "PA HealthChoices (Medicaid)", network: "in", copay: 0, coinsurance: null, deductibleApplies: false, note: "No cost share for covered outpatient behavioral health." },
  { key: "oon", name: "Other plan (out of network)", network: "out", copay: null, coinsurance: 40, deductibleApplies: true, note: "You pay us in full and submit our monthly superbill for reimbursement." },
  { key: "selfpay", name: "No insurance / self-pay", network: "none", copay: null, coinsurance: null, deductibleApplies: false, note: "You pay our published rate. Sliding-scale slots exist — ask." },
];

export interface Estimate {
  perSession: number;
  /** Sessions paid at full contracted rate before the deductible is satisfied. */
  deductibleSessions: number;
  firstYearTotal: number;
  explanation: string[];
}

/**
 * Produces a per-session estimate plus a plain-language explanation of the
 * arithmetic. Deliberately conservative: where a plan could go either way we
 * show the more expensive reading and say so.
 */
export function estimate(
  plan: Plan,
  session: SessionType,
  sessionsPlanned: number,
  deductibleRemaining: number,
  slidingScale: boolean,
): Estimate {
  const explanation: string[] = [];
  const baseRate = slidingScale ? Math.round(session.rate * 0.55) : session.rate;

  if (plan.network === "none") {
    const per = baseRate;
    if (slidingScale) {
      explanation.push(
        `Sliding-scale self-pay: our ${session.label.toLowerCase()} rate of $${session.rate} reduced to $${per}.`,
        "Sliding-scale slots are limited and allocated by need — this estimate assumes one is available.",
      );
    } else {
      explanation.push(`Self-pay rate for a ${session.minutes}-minute ${session.label.toLowerCase()} session: $${per}.`);
    }
    explanation.push("You will receive a written Good Faith Estimate before your first session, as required by the No Surprises Act.");
    return { perSession: per, deductibleSessions: 0, firstYearTotal: per * sessionsPlanned, explanation };
  }

  // Sessions absorbed by an unmet deductible are billed at the full rate.
  const deductibleSessions =
    plan.deductibleApplies && deductibleRemaining > 0
      ? Math.min(sessionsPlanned, Math.ceil(deductibleRemaining / session.rate))
      : 0;

  const afterDeductible =
    plan.copay !== null ? plan.copay : Math.round(session.rate * ((plan.coinsurance ?? 0) / 100));

  const deductibleCost = deductibleSessions * session.rate;
  const remainingSessions = Math.max(0, sessionsPlanned - deductibleSessions);
  const firstYearTotal = deductibleCost + remainingSessions * afterDeductible;

  if (deductibleSessions > 0) {
    explanation.push(
      `Your plan applies the deductible to outpatient behavioral health. With $${deductibleRemaining.toLocaleString()} still to meet, roughly the first ${deductibleSessions} session${deductibleSessions === 1 ? "" : "s"} are billed at our full $${session.rate} rate.`,
    );
  } else if (plan.deductibleApplies) {
    explanation.push("Your deductible is met, so cost sharing starts immediately.");
  } else {
    explanation.push("This plan does not apply a deductible to outpatient behavioral health — your cost share starts at visit one.");
  }

  if (plan.copay !== null) {
    explanation.push(
      plan.copay === 0
        ? "There is no member cost share for covered outpatient sessions on this plan."
        : `After that, a flat $${plan.copay} copay per session.`,
    );
  } else {
    explanation.push(`After that, ${plan.coinsurance}% coinsurance — ${plan.coinsurance}% of our $${session.rate} rate, about $${afterDeductible} per session.`);
  }

  if (plan.network === "out") {
    explanation.push("Out of network: you pay us in full at each visit and submit our monthly superbill to your insurer. Reimbursement is not guaranteed.");
  }

  explanation.push(plan.note);
  explanation.push(
    `Estimated first-year cost for ${sessionsPlanned} sessions: about $${firstYearTotal.toLocaleString()}. This is an estimate, not a quote — our intake coordinator will verify your actual benefits before your first session.`,
  );

  return { perSession: afterDeductible, deductibleSessions, firstYearTotal, explanation };
}
