/**
 * Resolves a path in /public against the deployment's base path.
 *
 * Next rewrites `basePath` into `next/link` hrefs and `next/image` sources, but
 * NOT into a plain `<img src>`. On a GitHub Pages project site the app is served
 * from /<repo>/, so a raw "/rooms/hero.jpg" resolves to the origin root and
 * 404s — while every link on the page keeps working, which makes it an easy
 * fault to miss locally, where the base path is empty.
 *
 * Every reference to a file in /public from raw HTML must go through this.
 */
export function asset(path: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
