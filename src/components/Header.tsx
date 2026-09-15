"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Logo, Wordmark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { nav } from "./nav";
import { site } from "@/lib/data/site";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Any navigation closes everything. Adjusting during render rather than in an
  // effect means the menus are already closed on the first paint of the new
  // route, instead of flashing open for a frame.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setDrawer(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile drawer without losing scroll position.
  useEffect(() => {
    if (!drawer) return;
    const y = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href?: string) =>
    !!href && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  const sectionActive = (item: (typeof nav)[number]) =>
    item.href ? isActive(item.href) : !!item.children?.some((c) => isActive(c.href));

  return (
    <header
      className={`no-print sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "border-line bg-canvas/90 backdrop-blur-md" : "border-transparent bg-canvas"
      }`}
    >
      <div className="ow-shell flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link
          href="/"
          className="ow-tap flex items-center gap-2.5 rounded-lg py-1 pr-2"
          aria-label={`${site.name} — home`}
        >
          <Logo className="h-9 w-9 lg:h-10 lg:w-10" />
          <Wordmark className="text-lg lg:text-xl" />
        </Link>

        {/* ---------- Desktop nav ---------- */}
        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  onMouseEnter={() => setOpenMenu(item.label)}
                  aria-expanded={openMenu === item.label}
                  aria-haspopup="true"
                  className={`ow-tap flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    sectionActive(item) ? "text-olive" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  <Icon
                    name="chevron"
                    className={`h-4 w-4 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>

                {openMenu === item.label && (
                  <div
                    onMouseLeave={() => setOpenMenu(null)}
                    className="ow-card absolute left-0 top-full z-50 mt-1 w-[22rem] overflow-hidden p-1.5"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-lg px-3 py-2.5 transition-colors ${
                          isActive(child.href) ? "bg-olive-soft" : "hover:bg-surface-2"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-ink">{child.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                          {child.blurb}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`ow-tap flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-olive" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="ow-tap hidden items-center gap-2 rounded-pill px-3 py-2 text-sm font-semibold text-ink xl:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-olive" />
            {site.phone}
          </a>
          <ThemeToggle className="hidden sm:flex" />
          <Link
            href="/book/"
            className="ow-tap hidden items-center gap-2 rounded-pill bg-clay px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-100 sm:flex"
          >
            Request an appointment
          </Link>

          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="ow-tap flex items-center justify-center rounded-lg border border-line bg-surface p-2 text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-canvas shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <div className="flex items-center gap-2.5">
                <Logo className="h-8 w-8" />
                <Wordmark className="text-base" />
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setDrawer(false)}
                  className="ow-tap rounded-lg border border-line bg-surface p-2 text-ink"
                  aria-label="Close menu"
                >
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setSection(section === item.label ? null : item.label)}
                          aria-expanded={section === item.label}
                          className="ow-tap flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-ink hover:bg-surface-2"
                        >
                          {item.label}
                          <Icon
                            name="chevron"
                            className={`h-5 w-5 text-ink-soft transition-transform ${
                              section === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {section === item.label && (
                          <ul className="mb-2 ml-3 space-y-0.5 border-l border-line pl-3">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`ow-tap flex flex-col justify-center rounded-lg px-3 py-2.5 ${
                                    isActive(child.href) ? "bg-olive-soft" : "hover:bg-surface-2"
                                  }`}
                                >
                                  <span className="text-sm font-semibold text-ink">{child.label}</span>
                                  <span className="text-xs leading-snug text-ink-soft">{child.blurb}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className="ow-tap flex items-center rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-surface-2"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 space-y-2 border-t border-line bg-surface p-4">
              <Link
                href="/book/"
                className="ow-tap flex items-center justify-center gap-2 rounded-pill bg-clay px-4 py-3 text-sm font-semibold text-white"
              >
                Request an appointment
              </Link>
              <a
                href={site.phoneHref}
                className="ow-tap flex items-center justify-center gap-2 rounded-pill border border-line px-4 py-3 text-sm font-semibold text-ink"
              >
                <Icon name="phone" className="h-4 w-4 text-olive" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
