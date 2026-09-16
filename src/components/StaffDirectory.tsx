"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { TherapistCard } from "./TherapistCard";
import { inputClass } from "./ui";
import {
  ageBandLabels,
  allModalities,
  therapists,
  type AgeBand,
  type Modality,
} from "@/lib/data/staff";

type AvailFilter = "all" | "accepting";

/**
 * Client-side directory filtering.
 *
 * All eight records ship with the page, so filtering is instant and works with
 * JavaScript enabled; the server-rendered markup below already contains every
 * clinician, so the page is complete without it.
 */
export function StaffDirectory() {
  const [query, setQuery] = useState("");
  const [age, setAge] = useState<AgeBand | "all">("all");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [avail, setAvail] = useState<AvailFilter>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return therapists.filter((t) => {
      if (age !== "all" && !t.ages.includes(age)) return false;
      if (modality !== "all" && !t.modalities.includes(modality)) return false;
      if (avail === "accepting" && t.availability === "waitlist") return false;
      if (!q) return true;
      return [t.name, t.title, t.bio, ...t.focus, ...t.modalities, ...t.languages]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, age, modality, avail]);

  const reset = () => {
    setQuery("");
    setAge("all");
    setModality("all");
    setAvail("all");
  };

  const filtersActive = query !== "" || age !== "all" || modality !== "all" || avail !== "all";

  return (
    <div>
      <div className="ow-card p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <div className="relative">
            <label htmlFor="staff-search" className="sr-only">
              Search clinicians by name, focus area or approach
            </label>
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            />
            <input
              id="staff-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, concern or approach"
              className={`${inputClass} pl-9`}
            />
          </div>

          <div>
            <label htmlFor="staff-age" className="sr-only">Filter by age group</label>
            <select
              id="staff-age"
              value={age}
              onChange={(e) => setAge(e.target.value as AgeBand | "all")}
              className={inputClass}
            >
              <option value="all">Any age group</option>
              {(Object.keys(ageBandLabels) as AgeBand[]).map((k) => (
                <option key={k} value={k}>{ageBandLabels[k]}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="staff-modality" className="sr-only">Filter by approach</label>
            <select
              id="staff-modality"
              value={modality}
              onChange={(e) => setModality(e.target.value as Modality | "all")}
              className={inputClass}
            >
              <option value="all">Any approach</option>
              {allModalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="staff-avail" className="sr-only">Filter by availability</label>
            <select
              id="staff-avail"
              value={avail}
              onChange={(e) => setAvail(e.target.value as AvailFilter)}
              className={inputClass}
            >
              <option value="all">Any availability</option>
              <option value="accepting">Not waitlisted</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-ink-soft">
            Showing <strong className="text-ink">{results.length}</strong> of {therapists.length} clinicians
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={reset}
              className="ow-tap inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-semibold text-clay hover:bg-clay-soft"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <li key={t.slug}>
              <TherapistCard t={t} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="ow-card mt-6 p-10 text-center">
          <p className="font-display text-xl">No clinician matches that combination</p>
          <p className="ow-prose mx-auto mt-2 text-sm text-ink-soft">
            That does not mean we cannot help — it means the filters are narrower than our
            website data. Call (610) 555-0142 and describe it to a person.
          </p>
          <button
            type="button"
            onClick={reset}
            className="ow-tap mt-5 inline-flex items-center gap-2 rounded-pill bg-clay px-5 py-2.5 text-sm font-semibold text-white"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
