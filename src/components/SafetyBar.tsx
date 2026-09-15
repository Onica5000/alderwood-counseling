"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { site } from "@/lib/data/site";

/**
 * The always-reachable safety strip.
 *
 * Two things live here because both need to work before a visitor has read
 * anything: the crisis numbers, and a quick exit. Real mental-health and
 * domestic-violence sites carry a quick exit because a visitor may be browsing
 * on a device somebody else can reach, and the back button is a liability.
 */
export function SafetyBar() {
  const [open, setOpen] = useState(false);
  const escapes = useRef<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const quickExit = useCallback(() => {
    // Push filler entries so a single Back press does not land on this page,
    // then replace the current entry entirely. History cannot be erased from a
    // page, so we bury it rather than pretend otherwise.
    try {
      for (let i = 0; i < 4; i++) history.pushState(null, "", location.href);
      sessionStorage.clear();
    } catch {
      /* storage may be blocked; the redirect below still matters */
    }
    window.location.replace("https://www.weather.gov/");
  }, []);

  // Three Escape presses in two seconds also exits, for a visitor who cannot
  // safely move the mouse to the button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        setOpen(false);
        return;
      }
      const now = Date.now();
      escapes.current = [...escapes.current.filter((t) => now - t < 2000), now];
      if (escapes.current.length >= 3) quickExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, quickExit]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="no-print relative z-50 bg-crisis-soft text-ink">
      <div className="ow-shell flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="crisis-panel"
          className="ow-tap -ml-1 flex items-center gap-2 rounded px-1 py-1 text-left text-xs font-semibold text-crisis transition-opacity hover:opacity-80 sm:text-sm"
        >
          <Icon name="alert" className="h-4 w-4 shrink-0" />
          <span>
            In crisis? <span className="underline decoration-crisis/40 underline-offset-2">Get help now</span>
          </span>
          <Icon name="chevron" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <div className="flex items-center gap-3">
          <a
            href="tel:988"
            className="ow-tap hidden items-center gap-1.5 rounded px-1 text-xs font-semibold text-crisis sm:flex sm:text-sm"
          >
            <Icon name="phone" className="h-3.5 w-3.5" />
            Call or text 988
          </a>
          <button
            type="button"
            onClick={quickExit}
            title="Leaves this site immediately and buries it in your browser history. You can also press Escape three times."
            className="ow-tap flex items-center gap-1.5 rounded-pill border border-crisis/30 bg-surface px-3 py-1 text-xs font-semibold text-crisis transition-colors hover:bg-crisis hover:text-surface"
          >
            <Icon name="exit" className="h-3.5 w-3.5" />
            Quick exit
          </button>
        </div>
      </div>

      {open && (
        <div
          id="crisis-panel"
          ref={panelRef}
          className="absolute inset-x-0 top-full border-y border-crisis/20 bg-surface shadow-lg"
        >
          <div className="ow-shell py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg text-ink">If you need help right now</h2>
                <p className="mt-1 max-w-prose text-sm text-ink-soft">
                  Olivewood is an outpatient practice and does not provide 24-hour crisis
                  coverage. These lines do, every hour of every day.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ow-tap -mr-2 -mt-2 rounded-full p-2 text-ink-soft hover:bg-surface-2"
                aria-label="Close crisis panel"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {site.crisis.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="ow-tap flex items-center justify-between gap-3 rounded-lg border border-line bg-canvas px-3 py-2.5 transition-colors hover:border-crisis/40 hover:bg-crisis-soft"
                  >
                    <span className="text-sm text-ink-soft">{c.label}</span>
                    <span className="shrink-0 text-sm font-semibold text-crisis">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
