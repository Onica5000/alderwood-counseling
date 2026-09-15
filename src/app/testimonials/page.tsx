import type { Metadata } from "next";
import { TestimonialWall } from "@/components/TestimonialWall";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about counseling at Olivewood — adults, teenagers, children, families, couples and group members, in their own words.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Testimonials" }]} />
      <PageHeader
        eyebrow="In their words"
        title="What clients say when nobody is editing"
        lede="Shared with permission. We have left the spelling and the ambivalence alone — a testimonial that has been tidied into a slogan tells you nothing about what the work is like."
      />

      <Section>
        <TestimonialWall />
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Callout title="What we did not do" icon="shield">
            No testimonial here was solicited in exchange for anything, and none has been
            rewritten. Where a quote is partial it is because the client asked us to cut it,
            not because the rest was unflattering.
          </Callout>
          <Callout title="Would you like to add one?" tone="clay" icon="spark">
            Current and former clients are welcome to, and equally welcome not to. Nobody is
            asked twice, and declining changes nothing about your care.
            <div className="mt-4">
              <ButtonLink href="/contact/" icon="arrow">Get in touch</ButtonLink>
            </div>
          </Callout>
        </div>
      </Section>
    </>
  );
}
