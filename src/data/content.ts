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

export interface ProgramDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  ctaText: string;
  ctaLink: string;
  imagePlaceholderColor: string; // Used to generate beautiful gradient backgrounds for placeholders
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

export const heroContent = {
  headline: "Hope, Made Visible.",
  supportingText: "We are dedicated to uplifting orphan families, destitute individuals, and vulnerable communities across Wayanad, Kerala. Through structured support in housing, education, healthcare, and livelihood training, we restore dignity and build futures.",
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
  leadership: [
    { name: "Dr. K. R. Madhavan", role: "President & Chief Trustee", bio: "A retired medical practitioner with over 35 years of public health service in Wayanad's tribal belts." },
    { name: "Siddique Valappil", role: "General Secretary & Founder", bio: "Social entrepreneur who has dedicated a decade to designing community housing and rehabilitation systems." },
    { name: "Anjali S. Nair", role: "Treasurer & Director of Education Programs", bio: "Academician and child development specialist managing scholarships and learning centers." },
    { name: "Father Sunny Joseph", role: "Advisory Board Member", bio: "Community worker actively coordinating rehabilitation projects for families affected by landslides and natural disasters." }
  ]
};

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
    description: "Securing the academic future of children from orphaned and destitute homes.",
    longDescription: "Under this initiative, we support children through custom scholarships, school kits (bags, books, uniforms), and digital learning aids. We also host free weekend tutoring and mentorship camps in rural Wayanad to ensure children do not drop out due to financial distress or lack of guidance.",
    ctaText: "Sponsor a Child's Education",
    ctaLink: "/partnership#education-promise",
    imagePlaceholderColor: "from-teal-800 to-emerald-600"
  },
  {
    id: "healthcare",
    title: "Medical Relief & Care",
    description: "Providing critical healthcare, life-saving medicines, and palliative support.",
    longDescription: "Wayanad's hilly terrain isolates many from quality healthcare. We provide chronic patients and destitute seniors with monthly medical pensions, essential medicines delivered to their doorsteps, and emergency surgery sponsorships. We work closely with local hospitals to coordinate diagnostics and palliative support.",
    ctaText: "Support Healthcare Relief",
    ctaLink: "/partnership#health-relief",
    imagePlaceholderColor: "from-emerald-900 to-teal-700"
  },
  {
    id: "food-clothing",
    title: "Nutritional Security",
    description: "Ensuring no family goes hungry with monthly survival grocery kits.",
    longDescription: "Malnutrition is a major challenge in tribal settlements and low-income single-mother households. Our food security drive delivers comprehensive grocery kits containing rice, lentils, spices, tea, toiletries, and seasonal clothing to families with zero earning members or bedridden breadwinners.",
    ctaText: "Sponsor a Family Ration",
    ctaLink: "/partnership#adopt-family",
    imagePlaceholderColor: "from-teal-700 to-emerald-800"
  },
  {
    id: "housing",
    title: "Safe Home Mission",
    description: "Building resilient homes for families living in dilapidated shacks.",
    longDescription: "During heavy monsoons in Wayanad, thousands of lives are endangered by fragile dwellings. The Safe Home Mission constructs robust, concrete houses featuring two rooms, a kitchen, and a toilet. We focus on single mothers, widows, and families with disabled members who are currently living under tarpaulins or decaying mud walls.",
    ctaText: "Partner in Housing Mission",
    ctaLink: "/partnership#safe-home",
    imagePlaceholderColor: "from-emerald-800 to-emerald-950"
  },
  {
    id: "recreation",
    title: "Children's Joy & Healing",
    description: "Creating spaces and programs for play, creativity, and mental wellness.",
    longDescription: "Orphaned children and those living in extreme poverty carry significant emotional weight. Through our Recreation initiative, we build community playground spaces, organize annual summer joy camps, take children on educational excursions, and run art and theater workshops to foster creativity, confidence, and psychological healing.",
    ctaText: "Sponsor Children's Joy",
    ctaLink: "/partnership#children-joy",
    imagePlaceholderColor: "from-teal-900 to-emerald-600"
  },
  {
    id: "training-faith",
    title: "Livelihood & Faith in Action",
    description: "Empowering single mothers and youth with vocational skills and resilience.",
    longDescription: "True dignity comes from self-reliance. We organize vocational training courses in tailoring, organic farming, livestock rearing, and computer literacy for single mothers and unemployed youth. Along with skills, we offer emotional counseling and motivational workshops to build internal resilience and faith in a brighter tomorrow.",
    ctaText: "Become a Capacity Builder",
    ctaLink: "/partnership#capacity-builder",
    imagePlaceholderColor: "from-emerald-950 to-teal-800"
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
  imagePlaceholderColor: "from-brand-forest to-brand-emerald-dark"
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

export const galleryData = [
  {
    id: "g1",
    category: "housing",
    title: "Safe Home Mission Handover",
    description: "Sunitha and her children receiving the key to their newly constructed concrete home in Meppadi.",
    imagePlaceholderColor: "from-teal-800 to-emerald-950"
  },
  {
    id: "g2",
    category: "education",
    title: "Annual Education Kit Distribution",
    description: "School bags, notebooks, and umbrella kits distributed to children at the starting of the academic year.",
    imagePlaceholderColor: "from-emerald-700 to-teal-800"
  },
  {
    id: "g3",
    category: "healthcare",
    title: "Palliative Care Home Visits",
    description: "Our volunteer medical team delivering medicines and check-ups to elderly bedridden patients in Muttil.",
    imagePlaceholderColor: "from-emerald-800 to-teal-900"
  },
  {
    id: "g4",
    category: "community",
    title: "Monthly Ration Drive",
    description: "Volunteers loading grocery kits for single-mother households in Vythiri tribal settlements.",
    imagePlaceholderColor: "from-teal-950 to-emerald-850"
  },
  {
    id: "g5",
    category: "education",
    title: "Weekend Mentorship Camp",
    description: "Volunteer teachers conducting creative learning and career guidance classes for high schoolers.",
    imagePlaceholderColor: "from-teal-800 to-emerald-600"
  },
  {
    id: "g6",
    category: "housing",
    title: "Safe Home Construction Site",
    description: "Volunteers and local masons joining hands to lay the foundation for a widow's new house.",
    imagePlaceholderColor: "from-emerald-900 to-emerald-750"
  },
  {
    id: "g7",
    category: "community",
    title: "Vocational Tailoring Graduation",
    description: "Socio-economically backward women receiving tailoring completion certificates and free sewing units.",
    imagePlaceholderColor: "from-emerald-850 to-teal-800"
  },
  {
    id: "g8",
    category: "community",
    title: "Annual Children's Joy Camp",
    description: "A day filled with games, music, and painting workshops for orphan children.",
    imagePlaceholderColor: "from-teal-900 to-emerald-700"
  }
];
