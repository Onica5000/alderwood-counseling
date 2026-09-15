import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PostArt } from "@/components/PostArt";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb, PageHeader, Pill, Section } from "@/components/ui";
import { formatDate, sortedPosts } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Practice updates from Olivewood Counseling — new groups, telehealth, DBT cohorts, recognition and the move to Delaware Avenue.",
};

export default function NewsPage() {
  const [lead, ...rest] = sortedPosts;

  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "News" }]} />
      <PageHeader
        eyebrow="Resources"
        title="From the practice"
        lede="New groups, changes to how we work, and the occasional piece of recognition we were talked into publishing."
      />

      <Section>
        <Reveal>
          <Link
            href={`/news/${lead.slug}/`}
            className="ow-card group grid overflow-hidden transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-olive-soft lg:aspect-auto">
              <PostArt seed={lead.slug} />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Pill tone="clay">{lead.category}</Pill>
                <time dateTime={lead.date} className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {formatDate(lead.date)}
                </time>
              </div>
              <h2 className="mt-4 text-2xl leading-tight sm:text-3xl">{lead.title}</h2>
              <p className="ow-prose mt-4 leading-relaxed text-ink-soft">{lead.excerpt}</p>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-clay">
                Read the post
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
              <p className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">
                {lead.author} · {lead.readingMinutes} min read
              </p>
            </div>
          </Link>
        </Reveal>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60}>
              <Link
                href={`/news/${p.slug}/`}
                className="ow-card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-olive-soft">
                  <PostArt seed={p.slug} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="muted">{p.category}</Pill>
                    <time dateTime={p.date} className="text-xs text-ink-soft">
                      {formatDate(p.date)}
                    </time>
                  </div>
                  <h2 className="mt-3 text-lg leading-snug transition-colors group-hover:text-olive">
                    {p.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                  <p className="mt-4 border-t border-line pt-3 text-xs text-ink-soft">
                    {p.author} · {p.readingMinutes} min read
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
