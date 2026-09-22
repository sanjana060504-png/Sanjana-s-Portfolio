export interface ProjectCaseStudySection {
  title: string;
  subtitle?: string;
  content: string;
  keyPoints?: string[];
  metrics?: { label: string; value: string }[];
  image?: string;
  imageCaption?: string;
  layout?: 'split' | 'full' | 'quote' | 'gallery';
  galleryImages?: { url: string; caption: string }[];
  quote?: string;
  quoteAuthor?: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  year: string;
  tags: string[];
  thumbnail: string;
  hoverVideo?: string;
  heroImage: string;
  role: string;
  duration: string;
  team: string;
  tools: string[];
  liveLink?: string;
  prototypeUrl?: string;
  context: ProjectCaseStudySection;
  research: ProjectCaseStudySection;
  exploration: ProjectCaseStudySection;
  process: ProjectCaseStudySection;
  solution: ProjectCaseStudySection;
  outcome: ProjectCaseStudySection;
  reflection: ProjectCaseStudySection;
  prevProjectSlug?: string;
  nextProjectSlug?: string;
}

export interface TriedDiscipline {
  id: string;
  name: string;
  shortNote: string;
  description: string;
  lesson: string;
  tag: string;
  colorBg: string;
  image: string;
  video?: string;
  rotation: string;
  tagline: string;
}

export interface ToolItem {
  name: string;
  category: 'Design' | 'Research' | 'Prototyping' | 'AI & Code' | 'Organization' | 'Collab';
  whatFor: string;
  iconName: string;
  tagColor?: string;
}

export interface PlaygroundExperiment {
  id: string;
  title: string;
  category: string;
  description: string;
  type: 'sticker-board' | 'doodle-canvas' | 'bookshelf' | 'color-lens';
}

export interface PersonalProfile {
  name: string;
  role: string;
  heroGreeting: string;
  heroStatement: string;
  corePhilosophy: string;
  wittyLine: string;
  email: string;
  linkedin: string;
  behance: string;
  instagram: string;
  resumeUrl: string;
  location: string;
  careAbout: string[];
  profilePhotos?: string[];
  bioSections: {
    heading: string;
    text: string;
  }[];
}
