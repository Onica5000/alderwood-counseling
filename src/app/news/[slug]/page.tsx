import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { Breadcrumb, ButtonLink, Pill, Section } from "@/components/ui";
import { PostArt } from "@/components/PostArt";
import { formatDate, getPost, posts, sortedPosts, type Block } from "@/lib/data/news";
import { getTherapist } from "@/lib/data/staff";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Post not found" };
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", publishedTime: p.date, authors: [p.author] },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = post.authorSlug ? getTherapist(post.authorSlug) : null;
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/news/", label: "News" },
          { label: post.title },
        ]}
      />

      <article>
        <header className="ow-shell pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="clay">{post.category}</Pill>
            <time dateTime={post.date} className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {formatDate(post.date)}
            </time>
            <span className="text-xs text-ink-soft">{post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="ow-prose mt-5 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>

          {author && (
            <div className="mt-8 flex items-center gap-3 border-y border-line py-4">
              <Avatar initials={author.initials} hue={author.hue} size={44} />
              <div>
                <p className="text-sm font-semibold text-ink">
                  <Link href={`/about/staff/${author.slug}/`} className="hover:text-olive">
                    {author.name}, {author.credentials}
                  </Link>
                </p>
                <p className="text-xs text-ink-soft">{author.title}</p>
              </div>
            </div>
          )}

          <div className="ow-card mt-8 aspect-[16/7] overflow-hidden p-0">
            <PostArt seed={post.slug} />
          </div>
        </header>

        <Section className="!pt-10">
          <div className="ow-prose mx-auto">
            {post.body.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>
        </Section>
      </article>

      <section className="border-t border-line bg-surface">
        <Section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl sm:text-3xl">More from the practice</h2>
            <ButtonLink href="/news/" tone="secondary" icon="arrow">All posts</ButtonLink>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/news/${p.slug}/`}
                  className="ow-card group flex h-full flex-col p-5 transition-colors hover:border-olive/40"
                >
                  <time dateTime={p.date} className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {formatDate(p.date)}
                  </time>
                  <h3 className="mt-2 text-base leading-snug transition-colors group-hover:text-olive">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {p.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </section>
    </>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl sm:text-3xl">{block.text}</h2>;
    case "p":
      return <p className="mt-4 leading-relaxed text-ink-soft">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 leading-relaxed text-ink-soft">
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-olive" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="my-8 border-l-4 border-olive pl-6">
          <blockquote className="font-display text-xl leading-snug text-ink">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-sm text-ink-soft">— {block.cite}</figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-card border border-olive/25 bg-olive-soft p-5">
          <p className="flex items-center gap-2 font-display text-base text-olive-deep">
            <Icon name="spark" className="h-5 w-5" />
            {block.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{block.text}</p>
        </aside>
      );
  }
}
