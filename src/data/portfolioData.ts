import { Project, TriedDiscipline, ToolItem, PersonalProfile } from '../types.ts';

export const personalProfile: PersonalProfile = {
  name: "Sanjana Deshmukh",
  role: "UX / Product Designer",
  heroGreeting: "Hello! I’m Sanjana.",
  heroStatement: "I design digital and physical experiences, and I’m usually curious enough to try something new.",
  corePhilosophy: "Every experience is worth a try.",
  wittyLine: "Curiosity has questionable consequences, but I’d still choose it.",
  email: "sanjana060504@gmail.com",
  linkedin: "https://www.linkedin.com/in/sanjana-deshmukh-ba9863276/$0",
  behance: "https://www.behance.net/sanjanadeshmukh5$0",
  instagram: "https://www.instagram.com/sanjananaaaah/$0",
  resumeUrl: "#resume",
  location: "Pune, India",
  profilePhotos: [
    "/profile.jpeg",
    "/profile%202.jpeg",
    "/profile%203.jpeg"
  ],
  careAbout: [
    "Designing with empathy",
    "Trying new things",
    "Good conversations",
    "Art, culture & everyday life",
    "Making ideas real",
    "Sensory interactions",
    "Tangible interfaces",
  ],
  bioSections: [
    {
      heading: "Who I am",
      text: "I’m a UX/Product Design student who loves exploring how people, technology, and everyday life come together. I’m curious by nature and tend to say yes to things — because every experience teaches me something unexpected."
    },
    {
      heading: "How I work",
      text: "I begin with honest observation. Before opening Figma, I talk to people, sketch messy thoughts on paper, deconstruct the problem, and look for the emotional core behind user habits. Then I prototype fast to test assumptions."
    },
    {
      heading: "What I’m curious about",
      text: "I’m fascinated by tangible interfaces, agentic AI assistants that feel like calm collaborators rather than chat spam, and how digital products can inspire genuine real-world connection instead of screen addiction."
    },
    {
      heading: "What I make",
      text: "End-to-end digital products, micro-interaction systems, service design blueprints, physical wire-and-craft prototypes, and interactive experiences that invite genuine delight."
    },
    {
      heading: "Things I keep learning",
      text: "Creative coding, 3D modeling in Spline, darkroom film printing, and the subtle art of knowing when a layout is done versus when it’s just overthought."
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
    video: "/nature photography.mp4"
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
    id: "project-karagir",
    slug: "karagir",
    number: "01",
    title: "KARAGIR",
    shortDescription: "A mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs and cultural organisations through craft, community and storytelling.",
    fullDescription: "A mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs and cultural organisations through craft, community and storytelling. The project explores how technology can help artisans present, promote and connect their work while keeping the maker and cultural story visible. Driven by Kala, an agentic AI working alongside artisans to bridge the gap between traditional craft and modern discovery.",
    category: "Cultural Studies × UX / Product Design × Agentic AI",
    year: "2026",
    tags: ["Cultural Studies", "UX / Product Design", "Agentic AI", "Mobile Ecosystem"],
    thumbnail: "/karagir/1. cover page.png",
    heroImage: "/karagir/1. cover page.png",
    role: "Lead UX / Product Designer & Researcher",
    duration: "Academic Project",
    team: "Solo UX Research & Product Design",
    tools: ["Figma", "Field Research", "Cultural Mapping", "Kala AI Architecture"],
    prevProjectSlug: "exam-portal",
    nextProjectSlug: "edsuite-crm",
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
    id: "project-edsuite-crm",
    slug: "edsuite-crm",
    number: "02",
    title: "edsuit CRM",
    shortDescription: "A B2B SaaS CRM and management product focused on managing inquiries, follow-ups, and operational workflows.",
    fullDescription: "edsuit CRM is a B2B SaaS CRM and management product focused on managing inquiries, follow-ups and related workflows. My main involvement centered on UI/UX design, detailed screen design in Figma, working through iterations and redesigns, deployment, testing, and fixing/reworking issues after testing.",
    category: "Product & UI / Screen Design × B2B SaaS",
    year: "2026",
    tags: ["UI / Screen Design in Figma", "B2B SaaS CRM", "Iterations & Redesign", "Testing & Deployment"],
    thumbnail: "/edsuite/edsuite-thumbnail.png",
    hoverVideo: "/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4",
    heroImage: "/edsuite/CRM dash 1.png",
    role: "UI & Screen Designer",
    duration: "Product Cycle",
    team: "Product & Engineering Collaboration",
    tools: ["Figma", "Design System", "Testing & QA", "Deployment Handoff"],
    prevProjectSlug: "karagir",
    nextProjectSlug: "exam-portal",
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
    id: "project-exam-portal",
    slug: "exam-portal",
    number: "03",
    title: "Exam Portal",
    shortDescription: "A multi-tier assessment platform serving Institute Admin (web + mobile), Professors (mobile), and Students (mobile).",
    fullDescription: "The Exam Portal is an assessment platform designed for educational institutions, serving Institute Admin (web + mobile console), Professors (mobile authoring & grading), and Students (mobile exam room). My involvement encompassed rapid exploratory prototyping in Google Stitch, detailed UI design in Figma, design approvals, developer handoff, deployment, usability testing with real users, and redesigning points of friction.",
    category: "Product & UI Design × Assessment Platform",
    year: "2026",
    tags: ["UI / Screen Design in Figma", "Google Stitch", "Developer Handoff", "Testing & Deployment"],
    thumbnail: "/edsuite/Admin.png",
    hoverVideo: "/edsuite/edsuit EXAMS.mp4",
    heroImage: "/edsuite/Admin.png",
    role: "UI & Product Designer",
    duration: "Product Cycle",
    team: "Cross-functional Team",
    tools: ["Google Stitch", "Figma", "Developer Handoff", "Testing & QA"],
    prevProjectSlug: "edsuite-crm",
    nextProjectSlug: "karagir",
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
