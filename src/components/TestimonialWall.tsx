"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { testimonialTags, testimonials } from "@/lib/data/testimonials";

type Tag = (typeof testimonialTags)[number]["key"];

export function TestimonialWall() {
  const [tag, setTag] = useState<Tag | "all">("all");

  const shown = useMemo(
    () => (tag === "all" ? testimonials : testimonials.filter((t) => t.tags.includes(tag))),
    [tag],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip active={tag === "all"} onClick={() => setTag("all")}>
          Everyone
        </Chip>
        {testimonialTags.map((t) => (
          <Chip key={t.key} active={tag === t.key} onClick={() => setTag(t.key)}>
            {t.label}
          </Chip>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-ink-soft">
        {shown.length} {shown.length === 1 ? "testimonial" : "testimonials"}
      </p>

      {/* A masonry column layout keeps long and short quotes from creating
          ragged rows, and collapses to a single column on phones. */}
      <div className="mt-6 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {shown.map((t) => (
          <figure
            key={t.id}
            className={`ow-card break-inside-avoid p-6 ${t.childNote ? "border-clay/30 bg-clay-soft" : ""}`}
          >
            {t.childNote ? (
              <>
                <Icon name="spark" className="h-6 w-6 text-clay" />
                <blockquote className="mt-3 font-display text-xl leading-relaxed text-clay">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </>
            ) : (
              <blockquote className="leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="font-display text-3xl leading-none text-olive">
                  &ldquo;
                </span>
                {t.quote}
                <span aria-hidden="true" className="font-display text-3xl leading-none text-olive">
                  &rdquo;
                </span>
              </blockquote>
            )}

            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">{t.attribution}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{t.context}</p>
            </figcaption>
          </figure>
        ))}
      </div>
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
      className={`ow-tap rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-olive bg-olive text-white"
          : "border-line bg-surface text-ink-soft hover:border-olive/50 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
