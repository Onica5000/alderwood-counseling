export interface NavChild {
  href: string;
  label: string;
  blurb: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const nav: NavItem[] = [
  {
    label: "About",
    children: [
      { href: "/about/mission/", label: "Mission", blurb: "What we believe people are capable of." },
      { href: "/about/founders/", label: "Founders", blurb: "A mother and daughter, since March 2012." },
      { href: "/about/staff/", label: "Our Clinicians", blurb: "Eight therapists and the people at the front desk." },
      { href: "/about/facility/", label: "The Facility", blurb: "Seven rooms, deliberately unlike a clinic." },
    ],
  },
  {
    label: "Services",
    children: [
      { href: "/services/", label: "All Services", blurb: "Ages two to ninety, individual through family." },
      { href: "/services/dbt-program/", label: "DBT Program", blurb: "The full model: group, individual, coaching." },
      { href: "/services/telehealth/", label: "Telehealth", blurb: "Any service by secure video." },
      { href: "/groups/", label: "Groups & Workshops", blurb: "Current cohorts and open seats." },
    ],
  },
  {
    label: "Get Started",
    children: [
      { href: "/find-a-therapist/", label: "Find a Therapist", blurb: "Answer six questions; see the reasoning." },
      { href: "/book/", label: "Request an Appointment", blurb: "Pick a clinician, day and time." },
      { href: "/first-visit/", label: "Your First Visit", blurb: "Exactly what the first hour contains." },
      { href: "/fees/", label: "Fees & Insurance", blurb: "Estimate your cost before you call." },
      { href: "/self-check/", label: "Self-Check", blurb: "Two-minute depression and anxiety screeners." },
    ],
  },
  {
    label: "Resources",
    children: [
      { href: "/resources/", label: "Resource Library", blurb: "Worksheets, guides and crisis cards." },
      { href: "/faq/", label: "FAQ", blurb: "Searchable, including the money questions." },
      { href: "/news/", label: "News", blurb: "Practice updates and new groups." },
      { href: "/testimonials/", label: "Testimonials", blurb: "In clients' own words." },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

export const footerColumns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "About",
    links: [
      { href: "/about/mission/", label: "Mission" },
      { href: "/about/founders/", label: "Founders" },
      { href: "/about/staff/", label: "Our Clinicians" },
      { href: "/about/facility/", label: "The Facility" },
      { href: "/news/", label: "News" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/", label: "All Services" },
      { href: "/services/adults/", label: "Adults" },
      { href: "/services/teens/", label: "Teenagers" },
      { href: "/services/children/", label: "Children" },
      { href: "/services/couples/", label: "Couples" },
      { href: "/groups/", label: "Groups & Workshops" },
    ],
  },
  {
    title: "Get started",
    links: [
      { href: "/find-a-therapist/", label: "Find a Therapist" },
      { href: "/book/", label: "Request an Appointment" },
      { href: "/first-visit/", label: "Your First Visit" },
      { href: "/fees/", label: "Fees & Insurance" },
      { href: "/self-check/", label: "Self-Check" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq/", label: "FAQ" },
      { href: "/resources/", label: "Resource Library" },
      { href: "/testimonials/", label: "Testimonials" },
      { href: "/contact/", label: "Contact" },
      { href: "/accessibility/", label: "Accessibility" },
      { href: "/privacy/", label: "Privacy & HIPAA" },
    ],
  },
];
