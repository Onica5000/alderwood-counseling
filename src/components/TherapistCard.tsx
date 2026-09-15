import Link from "next/link";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { Pill } from "./ui";
import { availabilityMeta, type Therapist } from "@/lib/data/staff";

const availabilityTone = {
  accepting: "olive",
  limited: "gold",
  waitlist: "muted",
} as const;

export function TherapistCard({
  t,
  compact = false,
}: {
  t: Therapist;
  compact?: boolean;
}) {
  return (
    // `relative` anchors the stretched link overlay on the heading below, so the
    // whole card is one target without nesting interactive elements.
    <article className="ow-card group relative flex h-full flex-col p-5 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <Avatar initials={t.initials} hue={t.hue} size={compact ? 56 : 72} />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-tight">
            <Link href={`/about/staff/${t.slug}/`} className="after:absolute after:inset-0">
              {t.name}
            </Link>
            <span className="ml-1.5 text-sm font-sans font-medium text-ink-soft">
              {t.credentials}
            </span>
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">{t.title}</p>
          <div className="mt-2">
            <Pill tone={availabilityTone[t.availability]}>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  t.availability === "accepting"
                    ? "bg-olive"
                    : t.availability === "limited"
                      ? "bg-gold"
                      : "bg-ink-soft"
                }`}
                aria-hidden="true"
              />
              {availabilityMeta[t.availability].label}
            </Pill>
          </div>
        </div>
      </div>

      {!compact && (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{t.bio}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.modalities.slice(0, 4).map((m) => (
          <Pill key={m} tone="muted">
            {m}
          </Pill>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 text-xs text-ink-soft">
        {t.evenings && (
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5 text-olive" />
            Evenings
          </span>
        )}
        {t.saturdays && (
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" className="h-3.5 w-3.5 text-olive" />
            Saturdays
          </span>
        )}
        {t.formats.includes("telehealth") && (
          <span className="flex items-center gap-1.5">
            <Icon name="screen" className="h-3.5 w-3.5 text-olive" />
            Telehealth
          </span>
        )}
        {t.languages.length > 1 && (
          <span className="flex items-center gap-1.5">
            <Icon name="users" className="h-3.5 w-3.5 text-olive" />
            {t.languages.join(", ")}
          </span>
        )}
      </div>
    </article>
  );
}
