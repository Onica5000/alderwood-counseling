import type { IconName } from "@/lib/data/services";

type Extra =
  | "phone" | "mail" | "pin" | "clock" | "arrow" | "check" | "close" | "menu"
  | "sun" | "moon" | "search" | "exit" | "alert" | "chevron" | "spark" | "calendar"
  | "wallet" | "users" | "book" | "play" | "shield" | "print" | "external";

export type AnyIcon = IconName | Extra;

/**
 * A single stroked icon set. Everything is 24x24 on a 1.6 stroke so icons sit
 * evenly next to text at any size, and inherits `currentColor` so dark mode
 * needs no separate artwork.
 */
export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  name: AnyIcon;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

const paths: Record<AnyIcon, React.ReactNode> = {
  // Service marks
  blocks: <><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /><rect x="8" y="3" width="8" height="8" rx="1.5" /></>,
  backpack: <><path d="M6 9a6 6 0 0 1 12 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="M9 14h6" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  anchor: <><circle cx="12" cy="5" r="2.5" /><path d="M12 7.5V21" /><path d="M5 13a7 7 0 0 0 14 0" /><path d="M3 13h4M17 13h4" /></>,
  sunset: <><path d="M12 3v5M5 10l1.5 1.5M19 10l-1.5 1.5" /><path d="M3 17h18" /><path d="M7.5 17a4.5 4.5 0 0 1 9 0" /><path d="M6 21h12" /></>,
  rings: <><circle cx="9" cy="14" r="5.5" /><circle cx="15" cy="14" r="5.5" /></>,
  bridge: <><path d="M3 9h18" /><path d="M3 20V9M21 20V9" /><path d="M3 20c0-6 4-9 9-9s9 3 9 9" /><path d="M12 11v9" /></>,
  house: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" /><path d="M10 21v-6h4v6" /></>,
  leaf: <><path d="M4 20c0-9 6-15 16-16 0 11-6 16-13 16H4Z" /><path d="M9 16c2-4 5-6 9-7.5" /></>,
  circle: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>,
  screen: <><rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  shield: <><path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6Z" /><path d="m9 12 2 2 4-4" /></>,

  // UI
  phone: <><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4 5.2 2 2 0 0 1 6 3Z" /></>,
  mail: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  check: <><path d="m4.5 12.5 5 5 10-11" /></>,
  close: <><path d="M6 6 18 18M18 6 6 18" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></>,
  moon: <><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  exit: <><path d="M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17 5 12l5-5" /><path d="M5 12h11" /></>,
  alert: <><path d="M12 4 2.5 20h19Z" /><path d="M12 10v4M12 17.2v.1" /></>,
  chevron: <><path d="m7 10 5 5 5-5" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="17" cy="14.5" r="1.2" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17 14.4a6 6 0 0 1 4 5.6" /></>,
  book: <><path d="M4 4.5A2 2 0 0 1 6 3h13v15H6a2 2 0 0 0-2 2Z" /><path d="M4 18.5A2 2 0 0 0 6 21h13" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 8.5 6 3.5-6 3.5Z" /></>,
  print: <><path d="M7 8V3h10v5" /><rect x="3" y="8" width="18" height="8" rx="2" /><path d="M7 14h10v7H7Z" /></>,
  external: <><path d="M14 4h6v6" /><path d="m20 4-8 8" /><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></>,
};
