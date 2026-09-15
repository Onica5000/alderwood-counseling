"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

/**
 * The theme lives on `<html data-theme>`, written before first paint by the
 * boot script below. This subscribes to that DOM attribute as an external
 * store rather than mirroring it into React state, so the button can never
 * disagree with the page it is sitting on and hydration has nothing to mismatch.
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getSnapshot = (): Theme =>
  (document.documentElement.dataset.theme as Theme) ?? "light";

// The server cannot know the visitor's preference; the boot script fixes up the
// DOM before paint, and the icon below renders only after mount regardless.
const getServerSnapshot = (): Theme => "light";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ow-theme", next);
    } catch {
      /* private mode — the choice just will not persist */
    }
    listeners.forEach((l) => l());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`ow-tap flex items-center justify-center rounded-full border border-line bg-surface p-2 text-ink-soft transition-colors hover:text-ink ${className}`}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} className="h-5 w-5" />
    </button>
  );
}

/**
 * Applied before first paint by layout.tsx: sets the theme so there is no
 * flash, and marks the document as JavaScript-capable so the CSS scroll-reveal
 * rules only engage when something can un-hide them.
 */
export const themeBootScript = `
(function(){
  var d = document.documentElement;
  d.classList.add('js');
  try {
    var stored = localStorage.getItem('ow-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    d.dataset.theme = stored || (prefersDark ? 'dark' : 'light');
  } catch (e) {
    d.dataset.theme = 'light';
  }
})();
`;
