export interface OrganizationDetails {
  name: string;
  shortName: string;
  tagline: string;
  established: string;
  location: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    district: string;
    state: string;
    pin: string;
  };
  phone: string;
  email: string;
  website: string;
  mapEmbedUrl: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  footerQuote: string;
}

export interface LeaderDetails {
  name: string;
  role: string;
  bio: string;
}

/** Compact roster entry: name and role only, no biography. */
export interface CommitteeMember {
  name: string;
  role: string;
}

export interface ProgramDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  ctaText: string;
  ctaLink: string;
  /** Filename of the real photograph this programme is waiting on. */
  imageFile: string;
  /** Alt text for that photograph. */
  imageAlt: string;
}

export interface PillarDetails {
  id: string;
  title: string;
  description: string;
  detailedText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
}

export interface CSRCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
}

export interface VolunteerFAQ {
  question: string;
  answer: string;
}

export interface VolunteerJourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface AnnualReportAchievement {
  year: string;
  title: string;
  description: string;
}

export const organizationDetails: OrganizationDetails = {
  name: "Pratheeksha Foundation Charitable Society",
  shortName: "Pratheeksha",
  tagline: "Hope, Made Visible",
  established: "2015",
  location: "Wayanad, Kerala",
  address: {
    line1: "Pratheeksha Bhavan, Near Civil Station",
    line2: "Kalpetta, Wayanad District",
    city: "Kalpetta",
    district: "Wayanad",
    state: "Kerala",
    pin: "673121"
  },
  phone: "+91 9496 123 456",
  email: "info@pratheekshafoundation.org",
  website: "www.pratheekshafoundation.org",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125134.61868351762!2d76.0125862661876!3d11.604245642646272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6063e52f55555%3A0x643194a28bc05bf8!2sKalpetta%2C%20Kerala%20673121!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  socials: {
    facebook: "https://facebook.com/pratheeksha.wayanad",
    instagram: "https://instagram.com/pratheeksha.wayanad",
    twitter: "https://twitter.com/pratheekshawayanad",
    youtube: "https://youtube.com/pratheekshawayanad"
  },
  footerQuote: "Together, we embrace one purpose: transforming lives and uplifting people."
};

/**
 * The single source for the public tagline. Used by the footer, the home hero
 * and the default page description, so the three can never drift apart.
 */
export const fullTagline =
  "Hope, Made Visible. Uplifting single-mother households, orphans, and chronic patients in the hill tracts of Wayanad.";

/** Pull quote shown near the top of /about. */
export const philosophyStatement =
  "Pratheeksha is not just charity; it is the beginning of a life transformation, holding families close with love, dignity, and care.";

export const heroContent = {
  headline: "Hope, Made Visible.",
  // The headline already carries the first sentence of fullTagline, so the
  // subheading takes the remainder rather than repeating it.
  supportingText: "Uplifting single-mother households, orphans, and chronic patients in the hill tracts of Wayanad.",
  primaryCtaText: "Become a Partner",
  primaryCtaLink: "/partnership",
  secondaryCtaText: "Volunteer",
  secondaryCtaLink: "/volunteer"
};

export const aboutContent = {
  whoWeAre: "Pratheeksha Foundation Charitable Society is a registered NGO based in the beautiful yet socio-economically challenging high ranges of Wayanad, Kerala. Founded by a group of passionate social workers and community volunteers, we work to address systemic poverty, lack of shelter, and educational backwardness among marginalized rural and tribal populations.",
  vision: "To establish a just, inclusive, and compassionate society where no family is left homeless, no child is denied education due to poverty, and every destitute individual lives with dignity and care.",
  mission: "To design and execute community-first interventions that provide safe housing, quality education, reliable healthcare, nutritious food, and professional skill development, enabling families to transition from dependency to self-reliance.",
  communityFirstModel: "We believe sustainable change starts with the community. Our unique outreach structure relies on localized grassroots networks to map vulnerabilities, verify needs with utmost transparency, and deliver support directly to the doorsteps of the needy.",
  ourStory: "Pratheeksha started in 2015 as a small volunteer group response to an orphaned family struggling to survive in a remote Wayanad hamlet. Seeing the compounding effects of lack of shelter, malnutrition, and zero educational support, we mobilized resources to construct a home. Since then, we have grown into a fully structured charitable society, driving impact across hundreds of families while preserving our deeply human, volunteer-led spirit.",
  coreValues: [
    { title: "Dignity First", description: "Every individual, regardless of their background, deserves to live a life free of shame, with food, shelter, and respect." },
    { title: "Radical Transparency", description: "Every rupee donated is carefully mapped, audited, and accounted for, with progress shared openly with partners." },
    { title: "Empowerment over Charity", description: "We provide immediate relief while actively building structures (education, training) that support long-term self-sufficiency." },
    { title: "Inclusive Care", description: "Our support reaches the most remote tribal colonies and marginalized groups, bridging the geographic barriers of Wayanad." }
  ],
  // Official board, per the 2025 Annual Report. Names, roles and the order in
  // which they appear are reproduced exactly as published and must not be
  // reformatted, reordered or transliterated.
  leadership: [
    {
      name: "F.M. Farook",
      role: "Founder",
      bio: "Visionary leader who laid the foundation for Pratheeksha's compassionate grassroots interventions across Wayanad."
    },
    {
      name: "Abdul Salam Mongam",
      role: "Chairman",
      bio: "Steering the strategic direction and governance of the foundation, ensuring transparency and long-term community impact."
    },
    {
      name: "Faheem Puthusseri",
      role: "President",
      bio: "Leading executive operations and community welfare projects with a focus on sustainable development and dignity."
    },
    {
      name: "Ali Kadavathooru",
      role: "Vice President",
      bio: "Overseeing program execution and field coordination across remote settlements in Wayanad."
    },
    {
      name: "Siddiq Davari",
      role: "General Secretary",
      bio: "Managing organizational administration, partnership coordination, and operational integrity across all wings."
    },
    {
      name: "Abdul Latheef",
      role: "Joint Secretary",
      bio: "Supporting administrative operations, event execution, and community engagement drives."
    },
    {
      name: "Abid CA",
      role: "Treasurer",
      bio: "Managing financial allocation, auditing compliance, and direct resource disbursements with complete transparency."
    }
  ] as LeaderDetails[]
};

export const executiveCommittee: CommitteeMember[] = [
  { name: "Abdul Gafoor Moulavi", role: "Executive Member (IT Department)" },
  { name: "Rajkumar", role: "Executive Member (Accounts Department)" },
  { name: "Samad Puliyampoyil", role: "Executive Member" },
  { name: "PC. Ibrahim", role: "Executive Member" },
  { name: "Safarullah Payanthoth", role: "Society Member" },
  { name: "Hamsa Koya", role: "Society Member" },
  { name: "Salman Faris", role: "Office Staff" }
];

export const ladiesWingLeadership: CommitteeMember[] = [
  { name: "Basima Teacher & Haseena Latheef", role: "Executive Members (Education Board)" },
  { name: "Shafeena Siddiq & Sajna Samad", role: "Executive Members (Noorul Qur’an)" },
  { name: "Shaharban Abid", role: "Executive Member (Noorul Qur’an & Medical)" },
  { name: "Ramla Safarullah", role: "Executive Member (Dress Distribution)" },
  { name: "Subaida Ibrahim", role: "Executive Member (Tour & Recreation)" },
  { name: "Jelisha Nazimudeen & Shareena Varadoor", role: "Educational Promoters" }
];

export interface MemorialEntry {
  name: string;
  /** Optional relation, shown smaller and lighter beneath the name. */
  relation?: string;
}

export const inLovingMemory: MemorialEntry[] = [
  { name: "Noufal Puthiyapadi" },
  { name: "Ramlath Palamukku" },
  { name: "Afsath Nelliyambam" },
  { name: "Thankachan Pulpally" },
  { name: "Amina", relation: "Mother of Aayisha Puthusserikadavu" },
  { name: "Andru", relation: "Husband of Aasya Kunnoth" }
];

export interface EnrollmentRow {
  level: string;
  students: number;
}

export const studentEnrollment: EnrollmentRow[] = [
  { level: "Kindergarten (KG)", students: 15 },
  { level: "Lower Primary (LP)", students: 50 },
  { level: "Upper Primary (UP)", students: 72 },
  { level: "High School (HS)", students: 75 },
  { level: "Higher Secondary (HSS)", students: 57 },
  { level: "Diploma Programs", students: 23 },
  { level: "Undergraduate (Degree)", students: 21 },
  { level: "Post-Graduate (PG)", students: 6 },
  { level: "Civil Service / Specialized Coaching", students: 7 }
];

/** Published total. Kept explicit rather than summed so the figure on the page
 *  always matches the report, and any mismatch with the rows is visible. */
export const studentEnrollmentTotal: EnrollmentRow = {
  level: "Total Enrolled Students",
  students: 326
};

export interface SuccessStory {
  id: string;
  name: string;
  /** What the person is currently doing, e.g. "Civil Service Aspirant". */
  role: string;
  /** Where they study. Shown after the role on the attribution line. */
  institution: string;
  quote: string;
}

// First-person accounts of bereavement and hardship. Reproduced verbatim.
// Deliberately carry no photograph, avatar or per-person donation CTA.
export const successStories: SuccessStory[] = [
  {
    id: "vismaya",
    name: "Vismaya",
    role: "Civil Service Aspirant",
    institution: "Lead IAS Academy, Trivandrum",
    quote: "My father passed away after a prolonged illness when I was young, leaving my mother to raise us alone with immense struggles. Pratheeksha Foundation didn't just fund my degree; they adopted me into their family. With their complete support, I am now training in Trivandrum to fulfill my dream of becoming an IPS officer. They proved to me that I am never alone."
  },
  {
    id: "muhammad-arshad",
    name: "Muhammad Arshad",
    role: "Post-Graduate Student",
    institution: "Central University of Tamil Nadu",
    quote: "I lost my father when I was in the 6th grade. From taking up part-time jobs alongside my studies to becoming a driver in Bangalore, my path was filled with hurdles. But Pratheeksha held my hand. Today, I am completing my final year in Library and Information Science at a Central University. The education they empowered me with is the greatest gift my family has ever received."
  },
  {
    id: "fathimathul-nishana",
    name: "Fathimathul Nishana",
    role: "Civil Service Aspirant",
    institution: "Fortune IAS Academy",
    quote: "I am from Mananthavady, and my biggest dream has always been to become an IAS officer. Pratheeksha Foundation made this a reality by securing a scholarship for my coaching in Trivandrum. The mental, emotional, and financial support they provide makes you feel like you are part of a massive, caring family."
  },
  {
    id: "shahana-sherin",
    name: "Shahana Sherin",
    role: "Undergraduate Student",
    institution: "Catholicate College, Pathanamthitta",
    quote: "For the past six years, Pratheeksha has been the backbone of my family's educational journey. My two siblings and I have received unwavering support. Thanks to their precise guidance and mentorship, I secured admission to a top-tier university based on merit. For a student willing to work hard, Pratheeksha ensures that financial barriers never stand in the way of their goals."
  }
];

export interface PartnerEntry {
  name: string;
  /** Optional descriptor, shown smaller and muted beneath the name. */
  descriptor?: string;
}

export interface PartnerGroup {
  heading: string;
  partners: PartnerEntry[];
}

// Third-party partners are listed as text only: we hold no logo usage rights,
// and the names are deliberately not linked to any external site.
export const partnerNetwork: PartnerGroup[] = [
  {
    heading: "Grocery Distribution Partners",
    partners: [
      { name: "Local authorized shops in Mananthavady, Taruvana, Kalpetta, and Vaduvanchal" }
    ]
  },
  {
    heading: "Apparel Partners",
    partners: [
      { name: "Family Wedding Centre, Meppadi" },
      { name: "E-Dress / S. Bharat, Kalpetta" },
      { name: "Family Weddings, Sulthan Bathery" }
    ]
  },
  {
    heading: "Education & Coaching Partners",
    partners: [
      { name: "Lead IAS Academy, Trivandrum" },
      { name: "Fortune IAS Academy, Trivandrum" },
      { name: "Labour India", descriptor: "High School academic partner" }
    ]
  },
  {
    heading: "Institutional & Healthcare Partners",
    partners: [
      { name: "Wayanad Muslim Orphanage (WMO), Muttil", descriptor: "Sahara Bharat Foundation collaboration" },
      { name: "Thanal", descriptor: "disability and rehabilitation care" },
      {
        name: "Meenangadi Charitable Trust",
        descriptor: "Centre for Medical & Social Research; land donated by DFO Moosa & Noorjahan Moosa"
      },
      { name: "E. Rahman Charitable Trust, Kochi" },
      { name: "Iqraa Hospital, Kozhikode", descriptor: "medical and palliative referral partner" }
    ]
  }
];

export interface MilestoneEntry {
  title: string;
  /** Venue, site or destination this entry took place at. */
  venue: string;
  /** Machine-readable date for <time datetime>; omitted for undated venues. */
  isoDate?: string;
  /** Human-readable date, e.g. "29 April 2026". */
  displayDate?: string;
  /** Optional cross-link to the related programme card on /programs. */
  link?: { to: string; label: string };
}

// Every entry below has already happened. This is a record of past gatherings
// and working sites, not a schedule — do not render it as upcoming events.
export const milestonesAndVenues: MilestoneEntry[] = [
  {
    title: "18th Annual Meet",
    venue: "Destiny Lounge, Kalpetta",
    isoDate: "2026-04-29",
    displayDate: "29 April 2026"
  },
  {
    title: "5th Noorul Qur’an Annual Meet",
    venue: "Rainbow Auditorium, Vengappally",
    isoDate: "2025-12-14",
    displayDate: "14 December 2025",
    link: { to: "/programs#noorul-quran", label: "Noorul Qur’an Initiative" }
  },
  {
    title: "Rehab Township Site",
    venue: "3.25 acres, Thrikkaipetta, Meppadi Panchayat",
    link: { to: "/programs#rehab", label: "Pratheeksha Rehab" }
  },
  {
    title: "Student Excursion Destinations",
    venue: "Wonderla Kochi and the Nefertiti cruise ship, Bolgatty Island",
    link: { to: "/programs#tours", label: "Recreational & Educational Tours" }
  }
];

export const howWeWorkSteps = [
  { step: "01", title: "Identify", description: "Field volunteers and local leaders report vulnerable families, destitute individuals, or orphans in remote areas." },
  { step: "02", title: "Verify", description: "Our social workers perform home visits and background verification checks to confirm structural and financial needs." },
  { step: "03", title: "Deliver", description: "Tailored assistance—ranging from monthly ration kits to housing construction plans—is implemented." },
  { step: "04", title: "Document", description: "We meticulously log resources spent, capture progress photos/videos, and prepare reports for transparency." },
  { step: "05", title: "Follow Up", description: "Regular monthly check-ins assess long-term recovery, educational progress of kids, and health improvements." }
];

export const programsList: ProgramDetails[] = [
  {
    id: "education",
    title: "Education Promise",
    description: "Securing Futures Through Academic Support",
    longDescription: "Believing that education is the greatest wealth, Pratheeksha allocates **35% of its total annual budget** directly to educational initiatives. We currently support **326 enrolled students** from Kindergarten to Post-Graduation and Civil Service (IAS) coaching. Beyond tuition aid, we distribute school bags, books, and supplies, while organizing career workshops, mentorship camps, and specialized coaching for high school and college students.",
    ctaText: "Sponsor a Child's Education",
    ctaLink: "/partnership#education-promise",
    imageFile: "education-kit-distribution.jpg",
    imageAlt: "Students receiving school kits at the start of the academic year"
  },
  {
    id: "healthcare",
    title: "Medical Relief & Care",
    description: "Critical Healthcare, Medicines & Palliative Support",
    longDescription: "We extend vital medical aid to families facing debilitating health crises. Our team provides continuous home care, specialized equipment (such as wheelchairs), and monthly financial assistance to **12 bedridden patients**. Furthermore, we cover travel and chemotherapy expenses for cancer patients, support ongoing dialysis for kidney patients, and donate medical equipment (including dialysis machines) to local healthcare centers.",
    ctaText: "Support Healthcare Relief",
    ctaLink: "/partnership#health-relief",
    imageFile: "palliative-care-home-visit.jpg",
    imageAlt: "Volunteer medical team visiting a bedridden patient at home"
  },
  {
    id: "food-clothing",
    title: "Nutritional Security",
    description: "Monthly Food Security & Family Ration",
    longDescription: "Malnutrition and financial insecurity remain major hurdles for low-income households. We provide monthly grocery kits valued between ₹2,000 and ₹3,000 to **190 categorized families** across Mananthavady, Kalpetta, and Vaduvanchal, empowering beneficiaries to select their own essential items from local partner stores. Additionally, top-tier vulnerable families receive a monthly cash stipend to ensure household stability.",
    ctaText: "Sponsor a Family Ration",
    ctaLink: "/partnership#adopt-family",
    imageFile: "monthly-ration-drive.jpg",
    imageAlt: "Volunteers loading monthly grocery kits for distribution"
  },
  {
    id: "housing",
    title: "Safe Home Mission",
    description: "Constructing Dignified & Resilient Housing",
    longDescription: "A secure home is the foundation of health and safety. To date, the Safe Home Mission has constructed and handed over **35 storm-resilient concrete houses** to widows, single mothers, and families with disabled members across Wayanad. Over **90 additional housing construction, repair, and maintenance projects** are currently underway, accompanied by complete legal, registration, and basic furnishing support.",
    ctaText: "Partner in Housing Mission",
    ctaLink: "/partnership#safe-home",
    imageFile: "safe-home-key-handover.jpg",
    imageAlt: "Family receiving keys to their new concrete home"
  },
  {
    id: "recreation",
    title: "Children's Joy & Healing",
    description: "Creating spaces and programs for play, creativity, and mental wellness.",
    longDescription: "Orphaned children and those living in extreme poverty carry significant emotional weight. Through our Recreation initiative, we build community playground spaces, organize annual summer joy camps, take children on educational excursions, and run art and theater workshops to foster creativity, confidence, and psychological healing.",
    ctaText: "Sponsor Children's Joy",
    ctaLink: "/partnership#children-joy",
    imageFile: "childrens-joy-camp.jpg",
    imageAlt: "Children taking part in a games and painting workshop"
  },
  {
    id: "training-faith",
    title: "Livelihood & Faith in Action",
    description: "Empowering single mothers and youth with vocational skills and resilience.",
    longDescription: "True dignity comes from self-reliance. We organize vocational training courses in tailoring, organic farming, livestock rearing, and computer literacy for single mothers and unemployed youth. Along with skills, we offer emotional counseling and motivational workshops to build internal resilience and faith in a brighter tomorrow.",
    ctaText: "Become a Capacity Builder",
    ctaLink: "/partnership#capacity-builder",
    imageFile: "vocational-tailoring-training.jpg",
    imageAlt: "Women at work during a tailoring training session"
  },
  {
    id: "rehab",
    title: "Pratheeksha Rehab (Wayanad Disaster Relief)",
    description: "Emergency Disaster Response & Township Project",
    longDescription: "In response to the devastating July 2024 Chooralmala landslide, Pratheeksha launched a major rehabilitation initiative. We purchased **3.25 acres of land in Thrikkaipetta** to construct a planned township featuring **33 modern homes** to safely relocate and rebuild the lives of displaced survivor families.",
    ctaText: "Support the Rehab Township",
    ctaLink: "/partnership",
    imageFile: "rehab-township-thrikkaipetta-site.jpg",
    imageAlt: "The Thrikkaipetta site where the rehabilitation township is being built"
  },
  {
    id: "sahara-bharat",
    title: "Sahara Bharat Foundation",
    description: "Care & Rehabilitation for Differently-Abled Individuals",
    longDescription: "Operated in collaboration with the Wayanad Muslim Orphanage (WMO), this specialized center provides housing, comprehensive education, vocational training, and medical rehabilitation for over **140 differently-abled residents**.",
    ctaText: "Partner with Sahara Bharat",
    ctaLink: "/partnership",
    imageFile: "sahara-bharat-care-centre.jpg",
    imageAlt: "Staff and residents at the Sahara Bharat care centre"
  },
  {
    id: "noorul-quran",
    title: "Noorul Qur’an Initiative",
    description: "Spiritual & Moral Education (5th Season)",
    longDescription: "Launched in 2020 to promote spiritual development and moral grounding, Noorul Qur’an conducts structured 45-day courses covering 4 *Juzhs* of the Qur’an across 30 modules. Top-performing students and families are recognized with cash awards and honors during annual community meets.",
    ctaText: "Support Noorul Qur’an",
    ctaLink: "/partnership",
    imageFile: "noorul-quran-class-session.jpg",
    imageAlt: "Students attending a Noorul Qur’an class session"
  },
  {
    id: "tours",
    title: "Recreational & Educational Tours",
    description: "Mental Well-being & Holistic Youth Exposure",
    longDescription: "To support emotional wellness and child development, Pratheeksha organizes multi-day educational excursions. Highlights include bringing **110 participants** — including students and volunteers — on trips to Wonderla Kochi and sea voyages aboard the Nefertiti ship.",
    ctaText: "Sponsor a Student Tour",
    ctaLink: "/partnership",
    imageFile: "educational-tour-group.jpg",
    imageAlt: "Students and volunteers on an educational excursion"
  },
  {
    id: "ladies-wing",
    title: "Ladies Wing Community Outreach",
    description: "Direct Grassroots Family Support & Counseling",
    longDescription: "Our dedicated Ladies Wing conducts direct home visits, family counseling, and dispute resolution to empower widows and isolated women. Beyond emotional support, the wing identifies critical household needs, such as supplying power inverters to off-grid families and organizing seasonal clothing distribution drives for **190 households**.",
    ctaText: "Support the Ladies Wing",
    ctaLink: "/partnership",
    imageFile: "ladies-wing-household-visit.jpg",
    imageAlt: "Ladies Wing members meeting a family during a household visit"
  }
];

export const sixPillars: PillarDetails[] = [
  {
    id: "dignity",
    title: "Human Dignity",
    description: "Every action we take restores self-respect, privacy, and personal dignity to those forgotten by society.",
    detailedText: "Charity shouldn't feel like a handout. We ensure that our distribution drives, medical pensions, and home building processes protect the privacy and self-esteem of our beneficiaries. We build beautiful homes, deliver food discreetly, and interact with families as equal partners in growth."
  },
  {
    id: "transparency",
    title: "Total Accountability",
    description: "Every single rupee donated is traceable, with detailed reports and verified impact details.",
    detailedText: "Trust is our currency. We maintain rigorous documentation for every housing project, medical purchase, and educational scholarship. Partners receive photographic proof, receipt audits, and direct verification options, ensuring that support goes precisely where it is promised."
  },
  {
    id: "continuity",
    title: "Sustained Support",
    description: "We don't do one-off donations. We walk with families until they can stand on their own feet.",
    detailedText: "Temporary relief doesn't cure generational poverty. When Pratheeksha adopts an orphan family, we commit to supporting them for years—from primary education until the children find stable livelihoods. This long-term relationship ensures real, multi-generational change."
  },
  {
    id: "inclusivity",
    title: "Tribal & Rural Focus",
    description: "Reaching deep into Wayanad's forest colonies and isolated hillsides to serve the most vulnerable.",
    detailedText: "Wayanad's geography creates pockets of extreme isolation. Indigenous tribal communities and remote forest hamlets suffer from poor access. We prioritize these geographic zones, using off-road transport and local tribal volunteers to bridge the last mile."
  },
  {
    id: "collaboration",
    title: "Community Alliance",
    description: "Working in tandem with local healthcare centers, schools, and local governance.",
    detailedText: "We don't work in a vacuum. By collaborating with local self-government institutions (Panchayats), government primary health centers, and public schools, we maximize the reach of our projects, prevent duplication, and integrate our beneficiaries into public welfare grids."
  },
  {
    id: "resilience",
    title: "Empowerment & Agency",
    description: "Providing skills, micro-grants, and vocational training to build financial independence.",
    detailedText: "Our ultimate goal is to see our supported families become independent. Through tailoring training, small animal husbandry projects, and youth computer education, we create local earning opportunities so that families can graduate from our support lists."
  }
];

export const housingHighlight = {
  headline: "Shelter Is Not a Building.\nIt Is a New Beginning.",
  description: "A home is the foundation of health, education, and safety. Under our Safe Home Mission, we replace leaky plastic-sheet shacks with storm-resilient concrete houses for widows, single mothers, and families with bedridden patients. Give a family the safety they deserve.",
  ctaText: "Support a Safe Home",
  ctaLink: "/partnership#safe-home",
  imageFile: "safe-home-key-handover.jpg",
  imageAlt: "Family receiving keys to their new concrete home"
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sunitha Rajesh",
    role: "Mother of Two, Safe Home Beneficiary",
    quote: "After my husband passed away, my two children and I lived under a tarpaulin tent for three years. Every monsoon, we slept in knee-deep water. Pratheeksha built us a concrete house. Now, my children can study safely, and I no longer lie awake at night fearing the wind and mudslides.",
    location: "Meppadi, Wayanad"
  },
  {
    id: "t2",
    name: "Devadasan K.",
    role: "Local School Headmaster",
    quote: "Pratheeksha's Education Promise has changed the landscape of our village school. Children who used to miss classes due to lack of notebooks, uniforms, or shoes now attend regularly with pride. They don't just provide supplies; their mentors follow up weekly on student progress.",
    location: "Muttil, Wayanad"
  },
  {
    id: "t3",
    name: "Mariyam V. O.",
    role: "Chronic Kidney Patient, Medical Pension Beneficiary",
    quote: "With dialysis costing everything we had, buying daily groceries and simple pain relief was impossible. Pratheeksha's monthly medical pension and ration kit saved my life. Knowing that clean food and essential medicines will arrive at my door every month gives me the strength to keep fighting.",
    location: "Mananthavady, Wayanad"
  },
  {
    id: "t4",
    name: "Thomas Kurian",
    role: "CSR Partner, Western Woods Exports",
    quote: "As a business, finding an organization that combines emotional commitment with professional-grade transparency is rare. Pratheeksha provides audited expense statements and photo-documented progress reports for every single housing project we sponsor. They are our trusted partners in impact.",
    location: "Kozhikode"
  }
];

export const csrCards: CSRCard[] = [
  {
    id: "adopt-family",
    title: "Adopt-a-Family Support",
    tagline: "Monthly Nutrition & Palliative Care",
    description: "Provide complete monthly grocery kits, health sanitation supplies, and basic medical support for a family with zero income source."
  },
  {
    id: "education-promise",
    title: "Education Promise Sponsor",
    tagline: "Scholarships & School Supplies",
    description: "Support a child's school uniform, textbooks, stationery, transport costs, and weekend tuition/mentorship classes for an entire year."
  },
  {
    id: "health-relief",
    title: "Health Relief & Care",
    tagline: "Lifesaving Medicines & Palliative Kits",
    description: "Sponsor monthly medical tests, medicines, dialyses, or palliative care kits for elderly, bedridden patients or terminally ill individuals."
  },
  {
    id: "safe-home",
    title: "Safe Home Mission Partner",
    tagline: "Permanent Concrete House Construction",
    description: "Sponsor or co-sponsor the construction of a permanent, weather-proof 2-room concrete home with a sanitary toilet and kitchen."
  },
  {
    id: "children-joy",
    title: "Children's Joy Sponsor",
    tagline: "Excursions, Camps & Mental Wellness",
    description: "Support the setup of community playgrounds, therapeutic art programs, and annual holiday camps for orphan and tribal children."
  },
  {
    id: "capacity-builder",
    title: "Capacity Builder & Livelihood",
    tagline: "Tailoring Units & Livestock Grants",
    description: "Fund vocational training, sewing machines, or livestock grants (cows, goats) to help single mothers launch home-based businesses."
  }
];

export const volunteerFAQs: VolunteerFAQ[] = [
  {
    question: "Do I need special skills to volunteer?",
    answer: "No! We welcome anyone with a compassionate heart. Whether you want to tutor kids, write reports, assist in medical drives, drive vehicles, design digital posters, or carry bricks for housing projects, we have a place for you."
  },
  {
    question: "What is the time commitment required?",
    answer: "It is highly flexible. Some volunteers contribute 2 hours every weekend by mentoring kids, while others join our field surveys once a month. You can choose a commitment level that matches your schedule."
  },
  {
    question: "Can I volunteer remotely?",
    answer: "Yes. If you have skills in graphic design, translation (English to Malayalam), social media writing, report drafting, or spreadsheet audit support, you can contribute from anywhere in the world."
  },
  {
    question: "Do you offer certificates for students?",
    answer: "Yes, we provide official volunteer completion certificates and reference letters detailing your hours, tasks, and project impact, which are highly recognized for university applications and jobs."
  },
  {
    question: "How does the selection process work?",
    answer: "Once you fill out the volunteer sign-up form, our coordinator will schedule a brief phone call to understand your interests and align you with an ongoing project. You will then be invited to our volunteer orientation session."
  }
];

export const volunteerJourney: VolunteerJourneyStep[] = [
  {
    step: "1",
    title: "Sign Up Online",
    description: "Submit a simple form expressing your interests, location, and available time."
  },
  {
    step: "2",
    title: "Orientation Call",
    description: "Speak with our volunteer coordinator to match your skills with current community needs."
  },
  {
    step: "3",
    title: "Orientation & Training",
    description: "Receive brief guidance on our values, safety protocols, and direct-to-home community model."
  },
  {
    step: "4",
    title: "Serve & Transform",
    description: "Engage in teaching, medical relief, housing construction, or remote support and make a visible impact."
  }
];

export const annualReportAchievements: AnnualReportAchievement[] = [
  {
    year: "2015",
    title: "Foundation & Setup",
    description: "Registered as a Charitable Society. Completed our first house construction for an orphaned family in Meppadi."
  },
  {
    year: "2017",
    title: "Launching Education Promise",
    description: "Began supporting local children with school supplies and established our monthly ration kit distribution system."
  },
  {
    year: "2019",
    title: "Disaster Relief & Housing Expansion",
    description: "Mobilized relief drives and constructed storm-resilient homes for landslide-affected families in Wayanad."
  },
  {
    year: "2021",
    title: "Healthcare Palliative Initiative",
    description: "Introduced the Medical Pension & Palliative Care Program, expanding to support bedridden seniors and kidney/cancer patients."
  },
  {
    year: "2023",
    title: "Livelihood & Tailoring Centers",
    description: "Established our first vocational training center for women, delivering sewing machines and livestock packages."
  },
  {
    year: "2025",
    title: "Milestone: Housing & Digital Education",
    description: "Successfully constructed permanent houses and configured smart learning aids for rural study centers."
  }
];

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  /** Caption shown on the card. */
  description: string;
  /** Filename of the real photograph this card is waiting on. */
  imageFile: string;
  imageAlt: string;
}

// The first four items are the set previewed on the Home page. Their captions
// are the approved 2025 Annual Report subtitles and are reproduced verbatim.
export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    category: "housing",
    title: "Safe Home Mission Handover",
    description: "35 secure, concrete homes completed and handed over to vulnerable families in Wayanad.",
    imageFile: "safe-home-key-handover.jpg",
    imageAlt: "Family receiving keys to their new concrete home"
  },
  {
    id: "g2",
    category: "education",
    title: "Annual Education Kit Distribution",
    description: "Providing academic kits, uniforms, and scholarships to 326 enrolled students.",
    imageFile: "education-kit-distribution.jpg",
    imageAlt: "Students receiving school kits at the start of the academic year"
  },
  {
    id: "g3",
    category: "healthcare",
    title: "Palliative Care & Bedridden Support",
    description: "Delivering continuous home visits, medical supplies, and wheelchairs to 12 bedridden patients.",
    imageFile: "palliative-care-home-visit.jpg",
    imageAlt: "Volunteer medical team visiting a bedridden patient at home"
  },
  {
    id: "g4",
    category: "community",
    title: "Monthly Ration & Stipend Drive",
    description: "Supplying dignity-first monthly groceries and stipends to 190 registered families.",
    imageFile: "monthly-ration-drive.jpg",
    imageAlt: "Volunteers loading monthly grocery kits for distribution"
  },
  {
    id: "g5",
    category: "education",
    title: "Weekend Mentorship Camp",
    description: "Volunteer teachers conducting creative learning and career guidance classes for high schoolers.",
    imageFile: "weekend-mentorship-camp.jpg",
    imageAlt: "Volunteer teacher leading a mentorship class for school students"
  },
  {
    id: "g6",
    category: "housing",
    title: "Safe Home Construction Site",
    description: "Volunteers and local masons joining hands to lay the foundation for a widow's new house.",
    imageFile: "safe-home-construction-site.jpg",
    imageAlt: "Masons and volunteers laying the foundation of a new house"
  },
  {
    id: "g7",
    category: "community",
    title: "Vocational Tailoring Graduation",
    description: "Women receiving tailoring completion certificates and sewing units.",
    imageFile: "vocational-tailoring-graduation.jpg",
    imageAlt: "Women receiving certificates at a tailoring course graduation"
  },
  {
    id: "g8",
    category: "community",
    title: "Annual Children's Joy Camp",
    description: "A day filled with games, music, and painting workshops for orphan children.",
    imageFile: "childrens-joy-camp.jpg",
    imageAlt: "Children taking part in a games and painting workshop"
  }
];
