"use client";

import { useEffect, useRef } from "react";

/**
 * Fades and lifts a block the first time it enters the viewport.
 *
 * The hidden state lives in CSS (`.ow-reveal`, scoped to `html.js`) rather than
 * in React state, which keeps the effect free of `setState` and gives three
 * fallbacks for free: no JavaScript means no `js` class and nothing ever
 * hides; `prefers-reduced-motion` neutralises the rule in the stylesheet; and
 * a missing IntersectionObserver reveals immediately below.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-shown");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`ow-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
