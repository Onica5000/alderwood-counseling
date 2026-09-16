"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";
import { inputClass } from "./ui";
import { faqCategories, faqs } from "@/lib/data/faq";

/** The URL fragment, read as an external store so it needs no mirrored state. */
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => window.location.hash.replace("#", "");

export function FaqSearch() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  // Deep links like /faq/#what-it-costs open that answer. `undefined` means the
  // visitor has not touched an accordion yet, so the fragment still governs;
  // any click takes over from there.
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const [override, setOverride] = useState<string | null | undefined>(undefined);
  const open =
    override === undefined ? (faqs.some((f) => f.id === hash) ? hash : null) : override;
  const setOpen = (id: string | null) => setOverride(id);

  // Scrolling is a DOM side effect, not state — it belongs in an effect.
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() =>
      document.getElementById(`faq-${open}`)?.scrollIntoView({ block: "center" }),
    );
    // Runs on mount and whenever a fragment brings a new answer into view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      if (cat !== "all" && f.category !== cat) return false;
      if (!q) return true;
      return [f.question, ...f.answer, ...f.keywords].join(" ").toLowerCase().includes(q);
    });
  }, [query, cat]);

  return (
    <div>
      <div className="ow-card p-4 sm:p-5">
        <div className="relative">
          <label htmlFor="faq-search" className="sr-only">Search the FAQ</label>
          <Icon
            name="search"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — try 'deductible', 'my teenager', or 'cancel'"
            className={`${inputClass} pl-10`}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>
            All questions
          </FilterChip>
          {faqCategories.map((c) => (
            <FilterChip key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-ink-soft">
        {results.length === faqs.length
          ? `${faqs.length} questions`
          : `${results.length} of ${faqs.length} questions`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {results.map((f) => {
            const isOpen = open === f.id;
            return (
              <li key={f.id} id={`faq-${f.id}`} className="ow-card overflow-hidden">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${f.id}`}
                    className="ow-tap flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2 sm:px-6"
                  >
                    <span className="font-display text-lg leading-snug text-ink">{f.question}</span>
                    <Icon
                      name="chevron"
                      className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-panel-${f.id}`}
                    className="ow-prose space-y-3 border-t border-line px-5 py-5 text-sm leading-relaxed text-ink-soft sm:px-6"
                  >
                    {f.answer.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="ow-card mt-4 p-10 text-center">
          <p className="font-display text-xl">Nothing matches &ldquo;{query}&rdquo;</p>
          <p className="ow-prose mx-auto mt-2 text-sm text-ink-soft">
            Which may mean we have not written that answer yet. Call (610) 555-0142 and ask —
            and if it is a good question, it will end up on this page.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="ow-tap mt-5 inline-flex items-center gap-2 rounded-pill bg-clay px-5 py-2.5 text-sm font-semibold text-white"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
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
      className={`ow-tap rounded-pill border px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-olive bg-olive text-white"
          : "border-line bg-surface text-ink-soft hover:border-olive/50 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
