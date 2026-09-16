export interface Testimonial {
  id: string;
  quote: string;
  /** Rendered as a handwritten-style note when true. */
  childNote?: boolean;
  attribution: string;
  context: string;
  /** Used for the filter chips on the testimonials page. */
  tags: ("adult" | "teen" | "child" | "family" | "couples" | "group")[];
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "alyssa",
    quote:
      "I have had experience with a few other local counseling agencies and none compare to my experience at Alderwood. From the moment you walk in it feels like somebody's home rather than a clinic — there is no sliding glass window, nobody says your full name out loud in front of a room. My therapist has a positive attitude that never once tipped over into telling me my problems were small. Counseling here has genuinely changed the shape of my life.",
    attribution: "Alyssa, 29",
    context: "Individual counseling, two years",
    tags: ["adult"],
    featured: true,
  },
  {
    id: "deb",
    quote:
      "Counseling is not a sign of weakness, but a sign of strength to look inside and change your life.",
    attribution: "Deb, 62",
    context: "Individual counseling",
    tags: ["adult"],
    featured: true,
  },
  {
    id: "child-note",
    quote: "my theripist Dr. Marian would allways be there to cheer me up. She is so spcial to me",
    childNote: true,
    attribution: "Client, age 8",
    context: "Play therapy · Marian is an LCSW, not a doctor — we left the spelling alone",
    tags: ["child"],
    featured: true,
  },
  {
    id: "toolbox",
    quote:
      "Come as you are. Leave with encouragement, empowerment, and a bag of tools to utilize. You will not leave every session feeling fixed — some weeks you leave more tired than you came. But you leave with something in your hands, and after a while you notice you are the one holding it.",
    attribution: "Adult client",
    context: "Individual counseling",
    tags: ["adult"],
    featured: true,
  },
  {
    id: "collin",
    quote:
      "Life has been much more livable with the help of Alderwood. I'm not that depressed and I can handle my problems much easier now.",
    attribution: "Collin, 17",
    context: "Adolescent counseling",
    tags: ["teen"],
    featured: true,
  },
  {
    id: "parents",
    quote:
      "We came in convinced our son was the problem and left understanding that the four of us had built a pattern around him. That was not a comfortable thing to hear and it was said to us kindly. Eight months on, the house is quieter — not because he changed, but because we all did.",
    attribution: "Parents of a 10-year-old",
    context: "Family counseling",
    tags: ["family"],
  },
  {
    id: "dbt-group",
    quote:
      "The DBT group was the hardest thing I have ever committed to and the only thing that has worked. Twenty-four weeks, diary cards every day, Ingrid refusing to let anything slide. I have not been in a hospital since I finished.",
    attribution: "Group member, 24",
    context: "DBT Skills Program",
    tags: ["group", "adult"],
  },
  {
    id: "couple",
    quote:
      "We were told in session four that they thought this could work, and told exactly what would have to change for it to. Nobody had been that straight with us before. We are still here, three years later.",
    attribution: "Married couple, together 14 years",
    context: "Couples counseling",
    tags: ["couples"],
  },
  {
    id: "caregiver",
    quote:
      "I did not think I was allowed to be the one struggling. My mother was the one who was ill. Daniel was the first person to say the word caregiver to me out loud and it undid something.",
    attribution: "Nancy, 58",
    context: "Caregiver support group",
    tags: ["adult", "group"],
  },
  {
    id: "veteran",
    quote:
      "I did not have to explain what a deployment cycle is, or translate anything. That saved about six sessions and a lot of patience I did not have.",
    attribution: "Veteran, 41",
    context: "First responder & veteran services",
    tags: ["adult"],
  },
  {
    id: "teen-two",
    quote:
      "In the first session she told me exactly what she would tell my parents and exactly what she wouldn't. Nobody had done that before. That's the only reason I said anything real.",
    attribution: "Client, 16",
    context: "Adolescent counseling",
    tags: ["teen"],
  },
  {
    id: "front-desk",
    quote:
      "Trish called my insurance for me. I had been putting off making the appointment for four months because I could not face that phone call. That is the whole reason I am in therapy.",
    attribution: "Adult client",
    context: "Intake & insurance",
    tags: ["adult"],
  },
];

export const testimonialTags = [
  { key: "adult", label: "Adults" },
  { key: "teen", label: "Teens" },
  { key: "child", label: "Children" },
  { key: "family", label: "Families" },
  { key: "couples", label: "Couples" },
  { key: "group", label: "Groups" },
] as const;
