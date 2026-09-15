/** A deterministic abstract header image derived from a post slug. */
export function PostArt({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;

  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`pa-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 40% 74%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 48) % 360} 36% 48%)`} />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#pa-${seed})`} />
      <g fill="#fff" opacity="0.14">
        <circle cx={40 + (h % 60)} cy={50 + (h % 40)} r={34 + (h % 22)} />
        <circle cx={230 - (h % 50)} cy={120 - (h % 30)} r={48 + (h % 18)} />
      </g>
      <path
        d={`M0 ${130 + (h % 20)} Q 80 ${100 + (h % 30)}, 160 ${126 + (h % 16)} T 320 ${112 + (h % 24)} L320 180 L0 180 Z`}
        fill="#fff"
        opacity="0.18"
      />
    </svg>
  );
}
