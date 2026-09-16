"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { rooms, type Room } from "@/lib/data/rooms";
import { asset } from "@/lib/asset";

/**
 * Facility gallery with a keyboard-navigable lightbox.
 *
 * Each room falls back to generated art when no photograph has been supplied,
 * so the layout is identical whether or not `/public/rooms/*` exists yet.
 */
export function RoomGallery() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setActive((i) => (i === null ? null : (i + delta + rooms.length) % rooms.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // do not also trip the triple-Escape quick exit
        close();
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [active, close, step]);

  const room = active === null ? null : rooms[active];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r, i) => (
          <li key={r.slug}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setActive(i);
              }}
              className="ow-card group block w-full overflow-hidden p-0 text-left transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              aria-label={`View ${r.name}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <RoomArt room={r} />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Icon name="search" className="h-4 w-4" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg leading-snug">{r.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {r.caption}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {room && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={room.name}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />

          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-card bg-surface shadow-2xl">
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-surface-2">
              <RoomArt room={room} />
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="ow-tap absolute right-3 top-3 flex items-center justify-center rounded-full bg-surface/90 p-2 text-ink backdrop-blur"
                aria-label="Close"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => step(-1)}
                className="ow-tap absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 p-2 text-ink backdrop-blur"
                aria-label="Previous room"
              >
                <Icon name="chevron" className="h-5 w-5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="ow-tap absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 p-2 text-ink backdrop-blur"
                aria-label="Next room"
              >
                <Icon name="chevron" className="h-5 w-5 -rotate-90" />
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <h2 className="text-2xl">{room.name}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{room.caption}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="ow-eyebrow">Best for</h3>
                  <ul className="mt-2 space-y-1.5">
                    {room.bestFor.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-ink-soft">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="ow-eyebrow">Access notes</h3>
                  <ul className="mt-2 space-y-1.5">
                    {room.access.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-ink-soft">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">
                Room {active! + 1} of {rooms.length} · Use the arrow keys to move between rooms
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Photograph when one exists; otherwise a generated interior. */
function RoomArt({ room }: { room: Room }) {
  if (room.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(room.image)}
        alt={`${room.name} at Alderwood Counseling`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  const h = room.hue;
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={`Illustration of ${room.name}`}>
      <defs>
        <linearGradient id={`rg-wall-${h}`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor={`hsl(${h} 30% 88%)`} />
          <stop offset="100%" stopColor={`hsl(${h + 10} 26% 74%)`} />
        </linearGradient>
        <linearGradient id={`rg-floor-${h}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${h + 16} 26% 52%)`} />
          <stop offset="100%" stopColor={`hsl(${h + 20} 28% 38%)`} />
        </linearGradient>
        <linearGradient id={`rg-light-${h}`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#rg-wall-${h})`} />
      <rect y="196" width="400" height="104" fill={`url(#rg-floor-${h})`} />

      {/* Window */}
      <rect x="248" y="42" width="118" height="104" rx="4" fill={`hsl(${h + 34} 44% 90%)`} />
      <path d="M307 42v104M248 94h118" stroke={`hsl(${h} 22% 64%)`} strokeWidth="3" />
      <rect x="248" y="42" width="118" height="104" rx="4" fill="none" stroke={`hsl(${h} 20% 56%)`} strokeWidth="4" />
      <path d="M248 146 366 146 400 300 180 300Z" fill={`url(#rg-light-${h})`} />

      {/* Seating */}
      <g fill={`hsl(${h + 180} 24% 42%)`} opacity="0.85">
        <rect x="36" y="126" width="88" height="74" rx="14" />
        <rect x="42" y="196" width="10" height="24" rx="5" />
        <rect x="108" y="196" width="10" height="24" rx="5" />
      </g>
      <g fill={`hsl(${h + 40} 38% 46%)`} opacity="0.85">
        <rect x="150" y="146" width="66" height="54" rx="12" />
        <rect x="156" y="196" width="8" height="22" rx="4" />
        <rect x="202" y="196" width="8" height="22" rx="4" />
      </g>

      {/* Plant */}
      <g>
        <path d="M352 200h26l-4 32h-18Z" fill={`hsl(${h + 20} 30% 34%)`} />
        <path d="M365 200c-2-24 6-38 18-44-2 22-8 36-18 44Z" fill={`hsl(110 34% 40%)`} />
        <path d="M365 200c-6-18-16-26-28-28 4 16 14 26 28 28Z" fill={`hsl(110 30% 32%)`} />
      </g>

      {/* Rug */}
      <ellipse cx="150" cy="252" rx="130" ry="30" fill="#fff" opacity="0.14" />
    </svg>
  );
}
