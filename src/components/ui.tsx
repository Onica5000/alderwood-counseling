import Link from "next/link";
import { Icon, type AnyIcon } from "./Icon";

/* ------------------------------------------------------------------ Buttons */

type ButtonTone = "primary" | "secondary" | "ghost";

const toneClasses: Record<ButtonTone, string> = {
  primary:
    "bg-clay text-white shadow-sm hover:brightness-105 active:brightness-95",
  secondary:
    "border border-line bg-surface text-ink hover:border-olive/50 hover:bg-olive-soft",
  ghost: "text-ink-soft hover:bg-surface-2 hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  tone = "primary",
  icon,
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: ButtonTone;
  icon?: AnyIcon;
  className?: string;
  external?: boolean;
}) {
  const cls = `ow-tap inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-semibold transition-all ${toneClasses[tone]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <Icon name={icon ?? "external"} className="h-4 w-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </Link>
  );
}

/* ------------------------------------------------------------------- Layout */

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-olive/10 blur-3xl"
      />
      <div className="ow-shell relative py-12 sm:py-16 lg:py-20">
        {eyebrow && <p className="ow-eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">{title}</h1>
        {lede && (
          <p className="ow-prose mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">{lede}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`ow-shell py-14 sm:py-16 lg:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="ow-eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 max-w-2xl text-2xl sm:text-3xl lg:text-4xl">{title}</h2>
        {lede && <p className="ow-prose mt-3 text-ink-soft">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------- Atoms */

export function Pill({
  children,
  tone = "olive",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "olive" | "clay" | "gold" | "muted" | "crisis";
  className?: string;
}) {
  const tones = {
    olive: "bg-olive-soft text-olive-deep",
    clay: "bg-clay-soft text-clay",
    gold: "bg-gold/15 text-gold",
    muted: "bg-surface-2 text-ink-soft",
    crisis: "bg-crisis-soft text-crisis",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-olive sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

export function Callout({
  title,
  children,
  tone = "olive",
  icon = "spark",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "olive" | "crisis" | "clay";
  icon?: AnyIcon;
}) {
  const tones = {
    olive: "border-olive/25 bg-olive-soft",
    crisis: "border-crisis/25 bg-crisis-soft",
    clay: "border-clay/25 bg-clay-soft",
  } as const;
  const iconTone = { olive: "text-olive", crisis: "text-crisis", clay: "text-clay" } as const;

  return (
    <aside className={`rounded-card border p-5 ${tones[tone]}`}>
      <p className={`flex items-center gap-2 font-display text-base ${iconTone[tone]}`}>
        <Icon name={icon} className="h-5 w-5 shrink-0" />
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
    </aside>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="ow-shell pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-olive hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A labelled field wrapper that keeps the error and hint wiring consistent. */
export function Field({
  label,
  hint,
  htmlFor,
  required,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-clay" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="mt-1 text-xs text-ink-soft">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-olive";
