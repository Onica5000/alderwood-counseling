/** The Olivewood mark: an olive sprig growing out of a rooted trunk. */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" className="fill-olive-soft" />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-olive"
      >
        <path d="M24 39V19" />
        <path d="M24 33c-5 0-8-2.5-9-7 5-1 8 1 9 4.5" />
        <path d="M24 26c5.5 0 8.5-3 9.5-8-5.5-.5-8.5 2-9.5 6" />
        <path d="M24 19c-4 0-6.5-2.5-7-6.5 4-.5 6.5 1.5 7 5" />
        <path d="M18 39h12" />
      </g>
      <circle cx="31" cy="15" r="2.6" className="fill-clay" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none tracking-tight ${className}`}>
      Olivewood
      <span className="block text-[0.58em] font-sans font-semibold uppercase tracking-[0.22em] text-ink-soft">
        Counseling
      </span>
    </span>
  );
}
