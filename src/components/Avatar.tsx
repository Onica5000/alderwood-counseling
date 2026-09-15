/**
 * A generated portrait mark.
 *
 * Staff photographs are the one asset a redesign cannot invent, so each
 * clinician gets a deterministic abstract mark instead: a hue from their
 * record, a soft gradient field, a horizon that shifts with the hue, and their
 * initials. It reads as intentional rather than as a missing image, and it
 * never shows a face that does not belong to the person named beside it.
 */
export function Avatar({
  initials,
  hue,
  size = 96,
  className = "",
  ring = true,
}: {
  initials: string;
  hue: number;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  const id = `av-${hue}-${initials.replace(/\W/g, "")}`;
  const horizon = 62 + ((hue % 7) - 3) * 2;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${ring ? "ring-1 ring-line" : ""} shrink-0 rounded-full ${className}`}
      role="img"
      aria-label={`Illustrated portrait mark for ${initials}`}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 42% 78%)`} />
          <stop offset="100%" stopColor={`hsl(${hue + 18} 34% 58%)`} />
        </linearGradient>
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue + 8} 30% 40%)`} />
          <stop offset="100%" stopColor={`hsl(${hue + 14} 34% 26%)`} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        <rect width="100" height="100" fill={`url(#${id}-sky)`} />
        <circle cx="72" cy="30" r="13" fill={`hsl(${hue + 40} 60% 88%)`} opacity="0.55" />
        <path
          d={`M0 ${horizon} Q 25 ${horizon - 12}, 50 ${horizon - 2} T 100 ${horizon - 8} L100 100 L0 100 Z`}
          fill={`url(#${id}-land)`}
        />
        <path
          d={`M0 ${horizon + 16} Q 30 ${horizon + 6}, 60 ${horizon + 14} T 100 ${horizon + 10} L100 100 L0 100 Z`}
          fill={`hsl(${hue + 20} 32% 20%)`}
          opacity="0.5"
        />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="30"
          fontWeight="500"
          fontFamily="var(--font-display), Georgia, serif"
          fill="#fff"
          opacity="0.92"
          letterSpacing="1"
        >
          {initials}
        </text>
      </g>
    </svg>
  );
}
