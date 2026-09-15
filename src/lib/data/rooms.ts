export interface Room {
  slug: string;
  name: string;
  hue: number;
  /** Set once a photograph exists in /public/rooms; falls back to generated art. */
  image?: string;
  caption: string;
  bestFor: string[];
  /** Access notes, because "welcoming" is meaningless without specifics. */
  access: string[];
}

export const rooms: Room[] = [
  {
    slug: "playroom",
    name: "The Playroom",
    hue: 38,
    caption:
      "A sand tray, a dollhouse, art supplies within reach, and a floor you are meant to sit on. Nothing here is precious and nothing is off limits — that is the point.",
    bestFor: ["Young children 2–5", "Play & art therapy", "Filial sessions"],
    access: ["Ground floor", "Washable surfaces throughout", "Observation window with a curtain"],
  },
  {
    slug: "quiet-room",
    name: "The Quiet Room",
    hue: 200,
    caption:
      "Low, warm light on a dimmer, a door that shuts properly, and a chair positioned so you are never seated with your back to it. Built for trauma work.",
    bestFor: ["Trauma work", "EMDR", "Adults who find bright rooms difficult"],
    access: ["Dimmable lighting", "Sound-insulated wall", "Seating with a clear sightline to the door"],
  },
  {
    slug: "family-room",
    name: "The Family Room",
    hue: 110,
    caption:
      "Six seats that do not match, arranged so nobody is at the head of anything. The room where a family can actually all be in one place.",
    bestFor: ["Family counseling", "Co-parenting sessions", "Couples work"],
    access: ["Seats six comfortably", "Two doorways", "Table that can be moved out entirely"],
  },
  {
    slug: "group-room",
    name: "The Group Room",
    hue: 280,
    caption:
      "The largest space, set in a circle for the DBT skills group and the support groups. A whiteboard, a kettle, and no fluorescent tubes anywhere.",
    bestFor: ["DBT skills group", "Educator support", "Caregiver group"],
    access: ["Seats twelve", "Step-free access", "Hearing loop installed"],
  },
  {
    slug: "teen-room",
    name: "The Teen Room",
    hue: 340,
    caption:
      "Deliberately not decorated for children and deliberately not an office. Comfortable seating, a window, and nothing on the walls about feelings.",
    bestFor: ["Teenagers 13–18", "Young adults", "DBT individual sessions"],
    access: ["Separate from the playroom corridor", "Door with a privacy panel"],
  },
  {
    slug: "waiting",
    name: "The Waiting Area",
    hue: 70,
    caption:
      "No sliding glass window. No row of identical chairs facing a television. Nobody's full name is called out — you are collected by your clinician.",
    bestFor: ["Arriving", "Waiting for a family member", "Paperwork"],
    access: ["Step-free entrance", "Seating with and without arms", "Water and tea always out"],
  },
];
