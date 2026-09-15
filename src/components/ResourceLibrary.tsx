"use client";

import { useMemo, useState } from "react";
import { Icon, type AnyIcon } from "./Icon";
import { Pill, inputClass } from "./ui";
import {
  resourceAudiences,
  resourceTypes,
  resources,
  type Resource,
} from "@/lib/data/programs";

const typeIcon: Record<Resource["type"], AnyIcon> = {
  worksheet: "print",
  guide: "book",
  reading: "book",
  video: "play",
  hotline: "alert",
};

export function ResourceLibrary() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [audience, setAudience] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (audience !== "all" && !r.audience.includes(audience as "parents")) return false;
      if (!q) return true;
      return [r.title, r.description, ...r.topics].join(" ").toLowerCase().includes(q);
    });
  }, [query, type, audience]);

  const active = query !== "" || type !== "all" || audience !== "all";

  return (
    <div>
      <div className="ow-card p-4 sm:p-5">
        <div className="relative">
          <label htmlFor="res-search" className="sr-only">Search resources</label>
          <Icon
            name="search"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          />
          <input
            id="res-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — try 'school', 'sleep', or 'safety plan'"
            className={`${inputClass} pl-10`}
          />
        </div>

        <div className="mt-4 space-y-3">
          <Row label="Format">
            <Chip active={type === "all"} onClick={() => setType("all")}>All</Chip>
            {resourceTypes.map((t) => (
              <Chip key={t.key} active={type === t.key} onClick={() => setType(t.key)}>
                {t.label}
              </Chip>
            ))}
          </Row>
          <Row label="For">
            <Chip active={audience === "all"} onClick={() => setAudience("all")}>Anyone</Chip>
            {resourceAudiences.map((a) => (
              <Chip key={a.key} active={audience === a.key} onClick={() => setAudience(a.key)}>
                {a.label}
              </Chip>
            ))}
          </Row>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
          <p aria-live="polite" className="text-sm text-ink-soft">
            <strong className="text-ink">{results.length}</strong> of {resources.length} resources
          </p>
          {active && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setType("all");
                setAudience("all");
              }}
              className="ow-tap inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-semibold text-clay hover:bg-clay-soft"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <li key={r.slug}>
              <article className="ow-card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      r.type === "hotline" ? "bg-crisis-soft text-crisis" : "bg-olive-soft text-olive"
                    }`}
                  >
                    <Icon name={typeIcon[r.type]} className="h-5 w-5" />
                  </span>
                  <Pill tone={r.type === "hotline" ? "crisis" : "muted"}>
                    {r.minutes ? `${r.minutes} min` : "Reference"}
                  </Pill>
                </div>

                <h3 className="mt-4 text-lg leading-snug">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{r.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.topics.map((t) => (
                    <Pill key={t} tone="muted">{t}</Pill>
                  ))}
                </div>

                <button
                  type="button"
                  className="ow-tap mt-5 inline-flex items-center justify-center gap-2 rounded-pill border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-olive/50 hover:bg-olive-soft"
                >
                  {r.type === "video" ? "Watch" : r.type === "worksheet" ? "Download PDF" : "Read"}
                  <Icon name={r.type === "video" ? "play" : "arrow"} className="h-4 w-4" />
                </button>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="ow-card mt-6 p-10 text-center">
          <p className="font-display text-xl">Nothing matches that yet</p>
          <p className="ow-prose mx-auto mt-2 text-sm text-ink-soft">
            The library grows out of what clients actually ask for. If there is something you
            wanted and could not find, tell us and it will probably get written.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="ow-eyebrow w-12 shrink-0">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`ow-tap rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-olive bg-olive text-white"
          : "border-line bg-surface text-ink-soft hover:border-olive/50 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
