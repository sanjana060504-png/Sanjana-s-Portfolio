import { Project, TriedDiscipline, ToolItem, PersonalProfile } from '../types.ts';

export const personalProfile: PersonalProfile = {
  name: "Sanjana Deshmukh",
  role: "UX / Product Designer",
  heroGreeting: "Hello! I’m Sanjana.",
  heroStatement: "I design digital experiences that feel simple, thoughtful, and useful and I’m always up for making something beyond a screen.",
  corePhilosophy: "Every experience is worth a try.",
  wittyLine: "Curiosity has questionable consequences, but I’d still choose it.",
  email: "Sanjana060504@gmail.com",
  linkedin: "https://www.linkedin.com/in/sanjana-deshmukh-ba9863276/$0",
  behance: "https://www.behance.net/sanjanad6",
  instagram: "https://www.instagram.com/sanjananaaaah/$0",
  resumeUrl: "#resume",
  location: "Pune, India",
  profilePhotos: [
    "/profile.jpeg",
    "/profile%202.jpeg",
    "/profile%203.jpeg"
  ],
  careAbout: [
    "Staying updated",
    "Listening well, talking better",
    "Usability testing",
    "Human psychology",
    "Thinking things through",
    "Making everyday life better",
    "Sensory interactions",
    "Tangible interfaces",
  ],
  bioSections: [
    {
      heading: "Who I am",
      text: "I’m a UX/Product Design student who loves exploring how people, technology, and everyday life come together. I’m curious by nature and tend to say yes to things because, somewhere along the way, I’ve learned along the way that there’s always something unexpected yet useful to take away."
    },
    {
      heading: "How I work",
      text: "I begin with honest observation. Before opening Figma, I talk to people, sketch messy thoughts on paper, deconstruct the problem, and look for the emotional core behind user habits. Then I prototype fast to test assumptions. There isn’t always a straight path through a project; sometimes flipping the process around is exactly what makes it work."
    },
    {
      heading: "What I’d love to work on",
      text: "I’m fascinated by why people behave the way they do, especially the habits and little decisions hiding behind everyday actions. I’d love to explore more work with niche audiences too, especially kids, where play, hands-on interaction, testing, and feedback can completely change the way something is designed."
    },
    {
      heading: "What I make",
      text: "I work across digital products, interactions, services, and physical prototypes. From a rough idea to something people can actually interact with, I like building, testing, learning, and figuring out what works."
    },
    {
      heading: "What else",
      text: "Exploring how different tools can work together, especially AI, and where they can genuinely make the process faster, smarter, or just better. Mostly by trying things out, figuring out what works, and finding ways to make them part of my process."
    }
  ]
};

export const triedDisciplines: TriedDiscipline[] = [
  {
    id: "photography",
    name: "Photography",
    shortNote: "Casual mobile & nature captures",
    description: "Casual mobile photography—especially capturing fleeting moments in nature, subtle sunlight, and organic textures.",
    lesson: "Observing quiet details and light without interrupting them",
    tag: "Mobile & Nature",
    colorBg: "#F4D000",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop",
    video: "/nature%20photography.mp4",
    rotation: "-rotate-2",
    tagline: "Finding patterns in the everyday"
  },
  {
    id: "fashion",
    name: "Fashion",
    shortNote: "Wearable structure",
    description: "Explored tactile textiles, silhouettes, and how personal identity is worn every single day.",
    lesson: "Form, drape & human context",
    tag: "Tactile & Identity",
    colorBg: "#E5D8B0",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    video: "/fashion.mp4",
    rotation: "rotate-3",
    tagline: "Textures you can feel"
  },
  {
    id: "drama",
    name: "Drama",
    shortNote: "Empathy on stage",
    description: "College theater taught me pacing, voice projection, vulnerability, and radical empathy for perspectives far from my own.",
    lesson: "Unspoken body language & empathy",
    tag: "Storytelling & Presence",
    colorBg: "#F4D000",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
    video: "/drama.mp4",
    rotation: "-rotate-1",
    tagline: "Stepping into other minds"
  },
  {
    id: "ai",
    name: "AI",
    shortNote: "Collaborative tools",
    description: "Experimenting with latent spaces, generative models, and how designers can steer intelligence without losing the soul.",
    lesson: "Human intent meets machine velocity",
    tag: "Generative Systems",
    colorBg: "#D1E293",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    rotation: "rotate-2",
    tagline: "Designing with latent space"
  },
  {
    id: "prototyping",
    name: "Prototyping",
    shortNote: "Fail fast, feel real",
    description: "Cardboard cutouts, rapid interactive code, and paper wireframes that bridge imagination with fingertips.",
    lesson: "Thinking through the hands",
    tag: "Physical & Digital",
    colorBg: "#F4D000",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
    rotation: "-rotate-3",
    tagline: "Tangible hypothesis testing"
  },
  {
    id: "physical-making",
    name: "Physical Making",
    shortNote: "Matter matters",
    description: "Woodwork, soldered circuits, and clay. When an object has weight and friction, you respect every millimeter.",
    lesson: "Friction, balance & physical limits",
    tag: "Craft & Material",
    colorBg: "#E3DFD2",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    video: "/physical%20making.mp4",
    rotation: "rotate-1",
    tagline: "Wood, wire, and honest grain"
  },
  {
    id: "experiments",
    name: "Experiments",
    shortNote: "No specific brief",
    description: "Little interactive web toys, generative soundscapes, and random visual tests done purely for curiosity’s sake.",
    lesson: "Play without fear of evaluation",
    tag: "Curiosity Driven",
    colorBg: "#F4D000",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    rotation: "-rotate-2",
    tagline: "The joy of 'what if?'"
  }
];

export const toolsData: ToolItem[] = [
  {
    name: "Figma",
    category: "Design",
    whatFor: "Core UI/UX screen design, component design systems & vector workflows",
    iconName: "figma",
    tagColor: "#F24E1E"
  },
  {
    name: "Google AI Studio",
    category: "AI & Code",
    whatFor: "Prompt experimentation, AI feature ideation & rapid agent prototyping",
    iconName: "google-ai",
    tagColor: "#1A73E8"
  },
  {
    name: "ChatGPT",
    category: "AI & Code",
    whatFor: "Concept exploration, user scenario synthesis & iterative design drafting",
    iconName: "chatgpt",
    tagColor: "#10A37F"
  },
  {
    name: "Claude",
    category: "AI & Code",
    whatFor: "Analytical reasoning, UX critique & documentation review",
    iconName: "claude",
    tagColor: "#D97706"
  },
  {
    name: "Stitch",
    category: "Prototyping",
    whatFor: "Early layout exploration & interactive wireframing workflows",
    iconName: "stitch",
    tagColor: "#3B82F6"
  },
  {
    name: "Notion",
    category: "Organization",
    whatFor: "Project documentation, research notes & sprint task tracking",
    iconName: "notion",
    tagColor: "#000000"
  },
  {
    name: "Miro",
    category: "Collab",
    whatFor: "Raw brainstorming, team workshops & collaborative canvas mapping",
    iconName: "miro",
    tagColor: "#FFD02F"
  }
];

export const projectsData: Project[] = [
  {
    id: "project-edsuite-crm",
    slug: "edsuite-crm",
    number: "01",
    title: "CRM",
    readTime: "6 min read",
    shortDescription: "A B2B SaaS CRM and management product focused on managing inquiries, follow-ups, and operational workflows.",
    fullDescription: "edsuit CRM is a B2B SaaS CRM and management product focused on managing inquiries, follow-ups and related workflows. My main involvement centered on UI/UX design, detailed screen design in Figma, working through iterations and redesigns, deployment, testing, and fixing/reworking issues after testing.",
    category: "Product & UI / Screen Design × B2B SaaS",
    year: "2026",
    tags: ["UI / Screen Design in Figma", "B2B SaaS CRM", "Iterations & Redesign", "Testing & Deployment"],
    thumbnail: "/edsuite/crm-frame-3s.png",
    hoverVideo: "/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4",
    heroImage: "/edsuite/CRM dash 1.png",
    role: "UX & UI Designer",
    duration: "Summer Internship · 2026",
    team: "Student Initiative",
    tools: ["Figma", "Design System", "Testing & QA", "Deployment Handoff"],
    prevProjectSlug: "special-needs",
    nextProjectSlug: "karagir",
    context: {
      title: "Context & Operational Scope",
      subtitle: "High-volume inquiry triage, scheduled follow-ups, and pipeline visibility",
      content: "B2B teams face high daily incoming volume across diverse channels. Without a structured workflow, inquiries slip through cracks, callback reminders are missed, and pipeline velocity drops.",
      keyPoints: [
        "Inquiry Ingestion: Centralizing incoming leads from forms, phone, and outreach campaigns.",
        "Follow-up Discipline: Providing teams with priority queues and instant callback logging.",
        "Operational Transparency: Clear pipeline stages to track deal movement and team productivity."
      ]
    },
    research: {
      title: "Design System Foundations",
      subtitle: "Reusable component tokens and data-dense patterns in Figma",
      content: "Created a comprehensive Figma design system tailored for operational clarity, consistent status pill taxonomy, responsive data tables, and modal triggers.",
      keyPoints: [
        "Consistent color tokens and typographic hierarchy for rapid row scanning",
        "Modular table row layouts supporting inline status updates and quick actions",
        "Form input states, validation badges, and high-contrast alert indicators"
      ]
    },
    exploration: {
      title: "UI Design & Screen Explorations",
      subtitle: "Balancing high information density with interface clarity",
      content: "Designed the complete dashboard, all-leads directory, and visual pipeline kanban in Figma to support power users throughout their full workday.",
      keyPoints: [
        "Dashboard overview with daily dispatch counters and activity charts",
        "Filterable lead tables with instant search and batch actions",
        "Multi-stage opportunity pipeline with drag-and-drop workflow"
      ]
    },
    process: {
      title: "Testing & User Feedback",
      subtitle: "Validating workflows under live team conditions",
      content: "Conducted usability testing with active users to identify bottlenecks in call logging, lead updates, and navigation during active phone calls.",
      keyPoints: [
        "Noticed context switching friction when navigating away from the active list",
        "Identified the need for immediate one-tap disposition logs after calls",
        "Refined status tags to prevent ambiguous lead states"
      ]
    },
    solution: {
      title: "Iterations, Redesign & Deployment",
      subtitle: "Reworking problem areas and shipping production fixes",
      content: "Reworked the lead inspection flow into a streamlined sliding panel, simplified follow-up creation, and collaborated closely with engineering through deployment and bug fixes.",
      keyPoints: [
        "Sliding inspection panel that preserves table scroll and active filter state",
        "Quick-entry follow-up drawer reducing callback scheduling time",
        "Post-deployment testing and design QA to fix edge-case UI regressions"
      ]
    },
    outcome: {
      title: "Production Workspace Delivery",
      subtitle: "A cohesive, dependable B2B operational tool",
      content: "Delivered a refined, complete CRM experience that keeps inquiries organized, clarifies daily follow-up responsibilities, and provides team leads with transparent activity metrics."
    },
    reflection: {
      title: "Product Walkthrough & Reflection",
      subtitle: "Designing for operational efficiency",
      content: "Working on edsuit CRM underscored that great B2B UI is measured by how seamlessly it supports repetitive daily work. Eliminating small frictions adds up to massive gains in team focus and reliability.",
      quote: "B2B software succeeds when it respects the user's focus and makes complex tasks feel second nature."
    }
  },
  {
    id: "project-karagir",
    slug: "karagir",
    number: "02",
    title: "KARAGIR",
    readTime: "8 min read",
    shortDescription: "A mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs and cultural organisations through craft, community and storytelling.",
    fullDescription: "A mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs and cultural organisations through craft, community and storytelling. The project explores how technology can help artisans present, promote and connect their work while keeping the maker and cultural story visible. Driven by Kala, an agentic AI working alongside artisans to bridge the gap between traditional craft and modern discovery.",
    category: "Cultural Studies × UX / Product Design × Agentic AI",
    year: "2026",
    tags: ["Cultural Studies", "UX / Product Design", "Agentic AI", "Mobile Ecosystem"],
    thumbnail: "/karagir/1. cover page.png",
    hoverVideo: "/karagir/karagir-intro.mp4",
    heroImage: "/karagir/1. cover page.png",
    role: "Lead UX / Product Designer & Researcher",
    duration: "Academic Project",
    team: "Solo UX Research & Product Design",
    tools: ["Figma", "Field Research", "Cultural Mapping", "Kala AI Architecture"],
    prevProjectSlug: "edsuite-crm",
    nextProjectSlug: "exam-portal",
    context: {
      title: "The Tension & Context",
      subtitle: "The craft exists. The audience does too. The connection doesn't.",
      content: "Tribal artisans across Maharashtra possess centuries of oral storytelling, ritual celebration, and ecological wisdom. Yet they remain invisible behind layers of commercial middlemen and are intimidated by complex digital portals.",
      keyPoints: [
        "Artisan Invisibility: Makers remain anonymous behind commercial trade labels.",
        "Market Fragmentation: Patrons lack access to authentic, verified tribal craft.",
        "Intermediary Dependency: High trade commissions dilute artisan livelihood."
      ],
      metrics: [
        { label: "Research Focus", value: "Maharashtra" },
        { label: "Core Problem", value: "Visibility" },
        { label: "Ecosystem Actors", value: "3 Groups" }
      ],
      image: "/karagir-cover.svg",
      imageCaption: "Tribes of Maharashtra cultural studies and Warli visual research."
    },
    research: {
      title: "Look Closer — Cultural Idioms",
      subtitle: "One culture. Many visual languages.",
      content: "Documented the rich visual vocabularies of Maharashtra tribes (Warli, Gond, Korku, Bhil). Every shape carries ritual and ecological significance.",
      keyPoints: [
        "Circle: Represents the sun, moon, and cyclical community Tarpa dance.",
        "Triangles: Two apex-joined triangles form the animated human figure.",
        "Chowk: The sacred ceremonial square enshrining the mother goddess."
      ]
    },
    exploration: {
      title: "Beyond the Screen",
      subtitle: "Field immersion across artisan padas",
      content: "Hands-on immersion documenting the preparation of geru mud wash, ground rice paste pigment, and the oral songs that accompany painting.",
      keyPoints: [
        "Artisans sing their lore rather than writing it.",
        "Traditional forms cause cognitive friction and rejection.",
        "Voice-first interaction preserves native dignity."
      ]
    },
    process: {
      title: "The Design Question & Enter Karagir",
      subtitle: "How might we create a bridge between artisans and the people who value their work?",
      content: "Designed a tri-partite ecosystem connecting Artisans (Studio App), Patrons (Discovery Portal), and NGOs (Facilitator Registry).",
      keyPoints: [
        "Voice and vernacular-first mobile studio",
        "Agentic partner Kala assisting in listing, storytelling, and pricing",
        "Transparent direct commissions and verified provenance certificates"
      ]
    },
    solution: {
      title: "Meet Kala & Product Flows",
      subtitle: "Not just an AI that answers. A working partner for the artisan.",
      content: "Kala assists the artisan with spoken Marathi product listing, computer vision craft categorization, folklore narrative weaving, and fair wage pricing.",
      keyPoints: [
        "Voice-to-Listing with Kala",
        "Living Artisan Heritage Profiles",
        "Interactive Motif Decoder for Patrons",
        "Proactive Opportunity Radar for exhibitions and grants"
      ]
    },
    outcome: {
      title: "Designing Through Testing",
      subtitle: "Field usability and iterative refinement",
      content: "Testing with rural artisans demonstrated that voice input removed form anxiety completely, while fair wage calculations gave makers confidence during pricing.",
      metrics: [
        { label: "Form Completion", value: "4x Increase" },
        { label: "Patron Engagement", value: "3.4x Longer" },
        { label: "Price Confidence", value: "100%" }
      ]
    },
    reflection: {
      title: "Final Experience",
      subtitle: "From preserving culture to making it discoverable",
      content: "KARAGIR demonstrates how agentic AI can champion indigenous culture rather than displacing it. When technology respects human craft, it becomes the bridge that keeps traditions alive.",
      quote: "From preserving culture to making it discoverable."
    }
  },
  {
    id: "project-exam-portal",
    slug: "exam-portal",
    number: "03",
    title: "Exam Portal",
    readTime: "5 min read",
    shortDescription: "A multi-tier assessment platform serving Institute Admin (web + mobile), Professors (mobile), and Students (mobile).",
    fullDescription: "The Exam Portal is an assessment platform designed for educational institutions, serving Institute Admin (web + mobile console), Professors (mobile authoring & grading), and Students (mobile exam room). My involvement encompassed rapid exploratory prototyping in Google Stitch, detailed UI design in Figma, design approvals, developer handoff, deployment, usability testing with real users, and redesigning points of friction.",
    category: "Product & UI Design × Assessment Platform",
    year: "2026",
    tags: ["UI / Screen Design in Figma", "Ed Tech", "Developer Handoff", "Testing & Deployment"],
    thumbnail: "/edsuite/exam-thumbnail.png?v=last-second",
    hoverVideo: "/edsuite/EXAMS.mp4",
    heroImage: "/edsuite/Admin.png",
    role: "UI & Product Designer",
    duration: "Product Cycle",
    team: "Cross-functional Team",
    tools: ["Google Stitch", "Figma", "Developer Handoff", "Testing & QA"],
    prevProjectSlug: "karagir",
    nextProjectSlug: "sustainability-ux",
    context: {
      title: "Context & Role Governance",
      subtitle: "High-stakes assessments across three dedicated institutional roles",
      content: "Educational examinations demand airtight security, unambiguous status tracking, and error-free evaluation flows across distinct constraints: Institute Admin (web console + mobile), Professors (mobile grading), and Students (mobile exam room).",
      keyPoints: [
        "Institute Admin (Web + Mobile): Schedule governance, batch oversight, exam dispatch, and seat allocations.",
        "Professors & Faculty (Mobile): Question bank creation, rubric configuration, and rapid inline submission grading.",
        "Students (Mobile): Calm, distraction-free timed testing interface with question palette and auto-save assurance."
      ]
    },
    research: {
      title: "Exploration & Prototyping in Google Stitch",
      subtitle: "Rapid wireframing of multi-role evaluation architectures",
      content: "Utilized Google Stitch for early structural wireframing, testing how role hierarchies and question-authoring trees would navigate across different device constraints.",
      keyPoints: [
        "Testing navigation models for dense question-type variations",
        "Exploring responsive layout structures for desktop admin and candidate devices",
        "Validating timer visibility and candidate reassurance cues"
      ]
    },
    exploration: {
      title: "Detailed Screen Design in Figma",
      subtitle: "Designing production-ready interfaces for each user tier",
      content: "Produced complete, high-fidelity mockups in Figma for Master Admin, Institute Admin, Faculty grading tables, and the clean Student examination screen.",
      keyPoints: [
        "Admin Portal: Global institution monitoring, seat allocation, and exam dispatch",
        "Faculty Portal: Question authoring, rubric setup, and submission grading",
        "Student Experience: Clear countdown clock, question palette, and review drawer"
      ]
    },
    process: {
      title: "Approvals, Handoff & Deployment",
      subtitle: "Bridging screen designs to functioning engineering builds",
      content: "Walked stakeholders through screen approvals, prepared detailed Figma specs with design tokens, and collaborated with developers during deployment.",
      keyPoints: [
        "Comprehensive component specifications and responsive breakpoints",
        "Clear interaction states for timed countdowns and auto-save triggers",
        "Active developer QA throughout initial staging deployment"
      ]
    },
    solution: {
      title: "Testing, Redesign & Fixes",
      subtitle: "Reworking points of friction discovered during candidate evaluations",
      content: "Live usability testing revealed critical edge cases in candidate navigation, question palette ambiguity, and faculty grading bottlenecks. Redesigned and shipped fixes to stabilize the experience.",
      keyPoints: [
        "Redesigned the question status palette for clearer answered/flagged contrast",
        "Simplified professor grading table with inline score entry and auto-summing",
        "Shipped final UI polish and layout fixes before institutional launch"
      ]
    },
    outcome: {
      title: "Final Deployed Assessment Platform",
      subtitle: "Reliable institutional examination workflows",
      content: "Successfully delivered the complete multi-tier system, giving administrators total oversight, empowering professors with intuitive authoring, and providing students with a calm, focused testing environment."
    },
    reflection: {
      title: "System Walkthrough & Takeaways",
      subtitle: "High-stakes design demands clarity and resilience",
      content: "Designing for examination environments taught me that high-stress interfaces require extreme clarity. When students and evaluators feel supported by predictable, transparent UI, they can focus entirely on knowledge and fair assessment.",
      quote: "In high-stakes interfaces, simplicity is not just an aesthetic choice—it is a functional necessity."
    }
  },
  {
    id: "project-sustainability-ux",
    slug: "sustainability-ux",
    number: "04",
    title: "Sustainable UX",
    readTime: "8 min read",
    shortDescription: "Designing digital behavioral nudges and circular economy loops that inspire mindful consumer habits.",
    fullDescription: "Exploration into how digital product design, cognitive framing, and behavioral nudges can motivate sustainable consumer practices and circular product lifecycle loops.",
    category: "Sustainable UX × Behavioral Design",
    year: "2025",
    tags: ["Circular Economy", "Behavioral Nudges", "Impact Metrics", "Sustainable Systems"],
    thumbnail: "/slides/sustainable-ux/slide-001.png",
    heroImage: "/slides/sustainable-ux/slide-001.png",
    pdfUrl: "/pdfs/sustainable-ux.pdf",
    accentColor: "#D3FA53",
    role: "Product & Behavioral Designer",
    duration: "Research & Prototyping",
    team: "UX & Sustainability Research",
    tools: ["Behavioral Nudges", "Lifecycle Analysis", "Figma", "System Dynamics"],
    prevProjectSlug: "exam-portal",
    nextProjectSlug: "service-design",
    context: {
      title: "Context & Ecological Imperative",
      subtitle: "Bridging the attitude-behavior gap in sustainability",
      content: "While many users express a strong desire to live sustainably, cognitive biases, convenience defaults, and opaque supply chains prevent consistent eco-conscious choices.",
      keyPoints: [
        "The Intention-Action Gap: Overcoming friction between environmental values and daily convenience.",
        "Invisible Impact: Making the hidden environmental cost of decisions tangible and understandable.",
        "Positive Reinforcement: Rewarding small regenerative choices without guilt or cognitive exhaustion."
      ]
    },
    research: {
      title: "Behavioral Economics & User Habits",
      subtitle: "Understanding consumer decision triggers",
      content: "Analyzed behavioral levers, default biases, and social proof mechanics to determine how micro-interactions can steer sustainable outcomes."
    },
    exploration: {
      title: "Designing Mindful Defaults",
      subtitle: "Prototyping circular loops and transparent impact feedback",
      content: "Designed interfaces that frame sustainable alternatives as the effortless, rewarding choice while providing instant visual impact feedback."
    },
    process: {
      title: "Testing Nudge Architectures",
      subtitle: "Validating user engagement and clarity",
      content: "Tested diverse framing mechanisms (carbon savings, longevity comparisons, social benchmarks) to discover the most empowering and non-preachy UX tone."
    },
    solution: {
      title: "The Sustainable Product Strategy",
      subtitle: "Actionable frameworks for regenerative design",
      content: "Synthesized the insights into a complete presentation deck featuring behavioral models, UI patterns, and circular product strategies."
    },
    outcome: {
      title: "Presentation & Strategic Framework",
      subtitle: "Complete sustainability UX deck",
      content: "Explore the complete multi-slide deck below outlining the research, behavioral models, circular loops, and UI experiments."
    },
    reflection: {
      title: "Reflection",
      subtitle: "Design as a regenerative tool",
      content: "Sustainability in design is not about restriction; it is about designing interactions that make care, stewardship, and circularity feel intuitive and delightful.",
      quote: "When sustainable actions become the most delightful choice, planetary care turns into everyday habit."
    }
  },
  {
    id: "project-service-design",
    slug: "service-design",
    number: "05",
    title: "Service Design",
    readTime: "7 min read",
    shortDescription: "Designing experiences and service blueprints for informal social gatherings — making hosting easier, smarter, and more engaging.",
    fullDescription: "A comprehensive service design study examining informal social gatherings. By mapping user personas, applying the Parasuraman Service Gap Model, and building a full Service Blueprint, HostMate was designed to reduce host mental load, bridge coordination gaps, and integrate AI with on-ground associates.",
    category: "Service Design × Systems UX",
    year: "2025",
    tags: ["Service Blueprint", "Parasuraman Gap Model", "HostMate System", "Informal Gatherings"],
    thumbnail: "/slides/service-design/slide-001.png",
    heroImage: "/slides/service-design/slide-001.png",
    pdfUrl: "/pdfs/service-design.pdf",
    accentColor: "#C8B6FF",
    role: "Lead Service & Systems Designer",
    duration: "Academic Project",
    team: "Service Design & Systems",
    tools: ["Service Blueprinting", "Figma", "Parasuraman Gap Model", "User Journey Mapping"],
    prevProjectSlug: "sustainability-ux",
    nextProjectSlug: "special-needs",
    context: {
      title: "Context & Research",
      subtitle: "Informal social gatherings: scale, friction, and unstructured support",
      content: "Informal social gatherings (10–50 people in home or community spaces) are where people build personal connections. However, hosts manage everything alone, creating high cognitive load and coordination pressure.",
      keyPoints: [
        "Referral Chain Problem: Word-of-mouth recommendations are unstructured with no price transparency or accountability.",
        "Market Mapping & Service Gaps: Existing platforms serve large-scale formal events, missing the informal 10-50 person format.",
        "Coordination Strain: Critical setup and arrival moments define gathering quality but overwhelm the host."
      ]
    },
    research: {
      title: "Service Gaps & User Persona",
      subtitle: "Applying the Parasuraman Gap Model to host frustrations",
      content: "Identified 4 critical service gaps (Knowledge, Standards, Delivery, Communication) and mapped host persona Aarohi to understand the emotional strain behind event coordination."
    },
    exploration: {
      title: "Ideation & 4 Core Opportunities",
      subtitle: "Designing intervention points across the hosting journey",
      content: "Framed 4 core opportunities: early vision support, single coordination layer, auto-generated brief, and a guaranteed 30-minute setup window so hosts can enjoy their own event."
    },
    process: {
      title: "Service Blueprint & HostMate Architecture",
      subtitle: "Translating journey maps into frontstage and backstage systems",
      content: "Developed a full Service Blueprint mapping customer actions, frontstage triggers, backstage algorithms, and physical touchpoints across ideation, setup, event flow, and post-gathering reflection."
    },
    solution: {
      title: "How It Works: HostMate Solution",
      subtitle: "AI-assisted planning and on-ground associate support",
      content: "HostMate provides AI-generated moodboards and checklists, matches verified task associates (decor, food, photos), and deploys on-ground support so the host remains a participant."
    },
    outcome: {
      title: "Impact & Reflection",
      subtitle: "Redistributing host responsibilities",
      content: "The HostMate service design framework proves that by combining smart AI coordination with trained on-ground associates, informal gatherings can be effortless, joyful, and memorable."
    },
    reflection: {
      title: "Reflection",
      subtitle: "Designing the invisible fabric of services",
      content: "Service design reminds us that interface screens are only the tip of the iceberg; the real magic happens when backstage processes work in harmonious sync with human needs.",
      quote: "Great services feel effortlessly simple because immense care was put into backstage harmony."
    }
  },
  {
    id: "project-special-needs",
    slug: "special-needs",
    number: "06",
    title: "Special Needs",
    readTime: "6 min read",
    shortDescription: "Sensory-conscious interfaces and assistive interaction paradigms designed for neurodiverse individuals.",
    fullDescription: "A human-centered design initiative focusing on accessibility, reduced cognitive load, sensory balance, and adaptive interaction paradigms for children and individuals with special needs.",
    category: "Assistive Tech × Inclusive Design",
    year: "2025",
    tags: ["Inclusive Design", "Neurodiversity UX", "Sensory Ergonomics", "Assistive Tech"],
    thumbnail: "/thumbnails/dance.jpg",
    heroImage: "/thumbnails/dance.jpg",
    pdfUrl: "/pdfs/special-needs.pdf",
    accentColor: "#3DBCF9",
    role: "Lead Inclusive Product Designer",
    duration: "Field Immersion & Prototyping",
    team: "Accessibility & Inclusive UX",
    tools: ["WCAG Standards", "Sensory Ergonomics", "Figma", "Adaptive Interfaces"],
    prevProjectSlug: "service-design",
    nextProjectSlug: "edsuite-crm",
    context: {
      title: "Context & Accessibility Focus",
      subtitle: "Digital spaces that welcome neurodiverse learners",
      content: "Traditional digital platforms overload neurodiverse individuals with loud sensory triggers, ambiguous visual hierarchies, and rigid interaction modalities.",
      keyPoints: [
        "Sensory Sensitivity: High visual clutter and abrupt sounds trigger cognitive overload.",
        "Motor & Cognitive Diversity: Interfaces requiring complex micro-gestures create unnecessary barriers.",
        "Adaptive Agency: Giving users and caretakers flexible control over sensory pacing and feedback."
      ]
    },
    research: {
      title: "Sensory Ergonomics & Field Immersion",
      subtitle: "Observing real interaction friction points",
      content: "Engaged with educators, occupational therapists, and neurodiverse children to identify sensory comfort zones and high-anxiety interface triggers."
    },
    exploration: {
      title: "Calm UI & Multi-Sensory Modalities",
      subtitle: "Prototyping gentle, predictable interactions",
      content: "Designed calm, high-contrast, distraction-free visual layouts with customizable sensory profiles, clear reassurance cues, and tangible feedback."
    },
    process: {
      title: "Co-Design & Usability Iteration",
      subtitle: "Refining with educators and students",
      content: "Conducted collaborative sessions to validate touch target scales, palette calming effects, and icon comprehension."
    },
    solution: {
      title: "Inclusive Interaction Design",
      subtitle: "Empowering every learner with dignity",
      content: "Created a comprehensive presentation deck capturing the inclusive design methodology, sensory audit, screen designs, and assistive interaction guidelines."
    },
    outcome: {
      title: "Complete Presentation Deck",
      subtitle: "Full design documentation and research",
      content: "Browse the full presentation deck below detailing the inclusive research, sensory testing, design tokens, and final assistive interfaces."
    },
    reflection: {
      title: "Reflection",
      subtitle: "Designing for edge cases elevates everyone",
      content: "When we design for the extremes of human ability and sensory perception, the resulting solutions are not only accessible—they are universally clearer, calmer, and more humane for all people.",
      quote: "Designing for inclusion doesn’t limit creativity; it reveals the deepest essence of empathy in product design."
    }
  }
];

export const playgroundStickers = [
  { id: "s1", label: "01 Question", x: 60, y: 30, color: "#111111", textColor: "#FFFFFF" },
  { id: "s2", label: "02 Explore", x: 230, y: 20, color: "#F4D000", textColor: "#111111" },
  { id: "s3", label: "03 Research", x: 400, y: 40, color: "#E04F4F", textColor: "#FFFFFF" },
  { id: "s4", label: "04 Build", x: 570, y: 25, color: "#FFFFFF", textColor: "#111111" },
  { id: "s5", label: "05 Ship", x: 730, y: 35, color: "#2B908F", textColor: "#FFFFFF" },
  { id: "s6", label: "Repeat ↺", x: 890, y: 20, color: "#111111", textColor: "#F4D000" }
];

export const readingBooks = [
  {
    id: "b1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    color: "#E04F4F",
    textColor: "#FFFFFF",
    quote: "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.",
    tag: "Foundational UX"
  },
  {
    id: "b2",
    title: "Designing Web Usability",
    author: "Jakob Nielsen",
    color: "#1E3A5F",
    textColor: "#FFFFFF",
    quote: "Users experience your site through their own eyes, not through your architectural diagrams. Respect their time.",
    tag: "Usability"
  },
  {
    id: "b3",
    title: "Productivity in the Time of AI",
    author: "Reflective Essays",
    color: "#8B5CF6",
    textColor: "#FFFFFF",
    quote: "When synthesis becomes instantaneous, the human value shifts entirely to the quality of the questions asked.",
    tag: "Future of AI"
  },
  {
    id: "b4",
    title: "This is Service Design Thinking",
    author: "Marc Stickdorn",
    color: "#10B981",
    textColor: "#FFFFFF",
    quote: "Service design is all about making the service you deliver useful, usable, efficient, and desirable.",
    tag: "Systems"
  },
  {
    id: "b5",
    title: "The Beauty of Everyday Objects",
    author: "Soetsu Yanagi",
    color: "#F4D000",
    textColor: "#111111",
    quote: "Only when an object is born of selfless devotion to daily life does it attain true dignity.",
    tag: "Craft & Material"
  }
];
