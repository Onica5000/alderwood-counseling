/**
 * The practice's identity.
 *
 * Alderwood Counseling is FICTIONAL. Everything here — the name, address,
 * phone, fax, email and founding date — is invented so the demo cannot be
 * mistaken for, or confused with, any real practice.
 *
 * Three deliberate choices:
 * - The phone numbers use the 555-01xx range, reserved for fictional use, so
 *   the site cannot send anyone to a stranger's line.
 * - The email uses the .example TLD, reserved by RFC 2606, so it can never
 *   resolve to a real mailbox.
 * - The street address is invented. The city and region are real, because
 *   grounding the design somewhere specific is part of what it demonstrates,
 *   and a city is not tied to any one practice.
 *
 * The crisis numbers below are the ONLY real contact details on this site, and
 * they must stay real — someone in distress should never be sent to a dead line
 * because the rest of the page is a demo.
 */
export const site = {
  name: "Alderwood Counseling",
  short: "Alderwood",
  tagline: "Serious clinicians. An unclinical space. Respect that isn't optional.",
  founded: "March 2012",
  description:
    "Alderwood Counseling is a Lehigh Valley practice offering evidence-based therapy for ages two through senior adulthood — CBT, DBT, ESFT and Filial Therapy — in a space built to feel like anything but a waiting room.",
  address: {
    street: "215 Alder Court",
    city: "Bethlehem",
    state: "PA",
    zip: "18018",
  },
  phone: "(610) 555-0142",
  phoneHref: "tel:+16105550142",
  fax: "(610) 555-0143",
  email: "intake@alderwoodcounseling.example",
  hours: [
    { days: "Monday – Thursday", time: "8:00 am – 8:30 pm" },
    { days: "Friday", time: "8:00 am – 5:00 pm" },
    { days: "Saturday", time: "8:00 am – 1:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  /** Real, current, and not to be fictionalised. */
  crisis: [
    { label: "Suicide & Crisis Lifeline", value: "988", href: "tel:988" },
    { label: "Lehigh County Crisis", value: "610-782-3127", href: "tel:+16107823127" },
    { label: "Northampton County Crisis", value: "610-252-9060", href: "tel:+16102529060" },
    { label: "Crisis Text Line", value: "Text HOME to 741741", href: "sms:741741&body=HOME" },
    { label: "Emergency", value: "911", href: "tel:911" },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
