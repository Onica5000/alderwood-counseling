export const site = {
  name: "Olivewood Counseling",
  short: "Olivewood",
  tagline: "Accomplished Clinicians. Inviting Space. Genuine Respect.",
  founded: "April 2011",
  description:
    "Olivewood Counseling is a Bethlehem, PA practice offering evidence-based therapy for ages two through senior adulthood — CBT, DBT, ESFT and Filial Therapy — in a space built to feel like anything but a waiting room.",
  address: {
    street: "510 Delaware Avenue",
    city: "Bethlehem",
    state: "PA",
    zip: "18015",
  },
  phone: "(610) 417-0463",
  phoneHref: "tel:+16104170463",
  fax: "(610) 417-0471",
  email: "intake@olivewoodcounseling.com",
  hours: [
    { days: "Monday – Thursday", time: "8:00 am – 8:30 pm" },
    { days: "Friday", time: "8:00 am – 5:00 pm" },
    { days: "Saturday", time: "8:00 am – 1:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  crisis: [
    { label: "Suicide & Crisis Lifeline", value: "988", href: "tel:988" },
    { label: "Lehigh County Crisis", value: "610-782-3127", href: "tel:+16107823127" },
    { label: "Northampton County Crisis", value: "610-252-9060", href: "tel:+16102529060" },
    { label: "Crisis Text Line", value: "Text HOME to 741741", href: "sms:741741&body=HOME" },
    { label: "Emergency", value: "911", href: "tel:911" },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
