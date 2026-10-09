import React, { useState, useEffect, useRef } from 'react';
import { Clock, UserCheck } from 'lucide-react';
import { Project } from '../types.ts';
import { projectsData } from '../data/portfolioData.ts';
import { CaseStudyNav } from '../components/CaseStudyNav.tsx';
import { CaseStudyPagination } from '../components/CaseStudyPagination.tsx';

interface PresentationCaseStudyProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

interface ProjectSectionConfig {
  id: string;
  number: string;
  title: string;
  slideIndices: number[]; // 1-based indices into slides
}

// Map sections strictly according to the slides present in each project
const getProjectSectionMap = (slug: string): ProjectSectionConfig[] => {
  if (slug === 'sustainability-ux') {
    return [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        slideIndices: [2, 3, 4, 5],
      },
      {
        id: 'research',
        number: '02',
        title: 'Research',
        slideIndices: [6, 7, 8, 9, 10],
      },
      {
        id: 'exploration',
        number: '03',
        title: 'Exploration',
        slideIndices: [11, 12, 13, 14, 15],
      },
      {
        id: 'process',
        number: '04',
        title: 'Process',
        slideIndices: [16, 17, 18, 19, 20],
      },
      {
        id: 'solution',
        number: '05',
        title: 'Solution',
        slideIndices: [21, 22, 23, 24, 25, 26, 27, 28, 29],
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        slideIndices: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      },
    ];
  }

  if (slug === 'service-design') {
    return [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        slideIndices: [2, 3, 4, 5],
      },
      {
        id: 'research',
        number: '02',
        title: 'Research',
        slideIndices: [6, 7],
      },
      {
        id: 'exploration',
        number: '03',
        title: 'Exploration',
        slideIndices: [8, 9, 10],
      },
      {
        id: 'process',
        number: '04',
        title: 'Process',
        slideIndices: [11, 12, 13, 14],
      },
      {
        id: 'solution',
        number: '05',
        title: 'Solution',
        slideIndices: [15, 16, 17, 18],
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        slideIndices: [19, 20],
      },
    ];
  }

  if (slug === 'special-needs') {
    return [
      {
        id: 'context',
        number: '01',
        title: 'Context & Accessibility',
        slideIndices: [2, 3],
      },
      {
        id: 'sensory-research',
        number: '02',
        title: 'Sensory Ergonomics',
        slideIndices: [4, 5],
      },
      {
        id: 'calm-ui',
        number: '03',
        title: 'Calm Interaction Patterns',
        slideIndices: [6, 7, 8],
      },
      {
        id: 'adaptive-modes',
        number: '04',
        title: 'Adaptive Modes & Feedback',
        slideIndices: [9, 10],
      },
      {
        id: 'outcomes',
        number: '05',
        title: 'Outcomes & Design System',
        slideIndices: [11, 12, 13],
      },
    ];
  }

  return [];
};

// Return slide image paths
const getSlidePath = (slug: string, index1Based: number): string => {
  const num = String(index1Based).padStart(3, '0');
  if (slug === 'sustainability-ux') {
    return `/slides/sustainable-ux/slide-${num}.png`;
  }
  if (slug === 'service-design') {
    return `/slides/service-design/slide-${num}.png`;
  }
  if (slug === 'special-needs') {
    return `/slides/special-needs/slide-${num}.png`;
  }
  return '';
};

export const PresentationCaseStudy: React.FC<PresentationCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const sections = getProjectSectionMap(project.slug);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[0]?.id || 'context'
  );
  const [isBottomReached, setIsBottomReached] = useState<boolean>(false);

  const footerRef = useRef<HTMLDivElement | null>(null);
  const isClickNavigatingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Map slug to CaseStudyNav accent
  const navAccent: 'sustainability' | 'service-design' | 'special-needs' =
    project.slug === 'sustainability-ux'
      ? 'sustainability'
      : project.slug === 'service-design'
      ? 'service-design'
      : 'special-needs';

  // Accent hex colors with user-provided light mode overrides: #B7E71C & #DC95FF
  const pillStyle =
    project.slug === 'sustainability-ux'
      ? 'bg-[#B7E71C] dark:bg-[#D3FA53] text-[#111111] border-black/10'
      : project.slug === 'service-design'
      ? 'bg-[#DC95FF] dark:bg-[#C8B6FF] text-[#111111] border-black/10'
      : 'bg-[#3DBCF9] text-[#111111] border-black/10';

  const coverSlidePath = getSlidePath(project.slug, 1);

  // Previous & next project lookup for bottom pagination
  const prevProject =
    projectsData.find((p) => p.slug === project.prevProjectSlug) ||
    projectsData[0];
  const nextProject =
    projectsData.find((p) => p.slug === project.nextProjectSlug) ||
    projectsData[1];

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (sections.length > 0) {
      setActiveSectionId(sections[0].id);
    }
  }, [project.slug]);

  // Deterministic scroll spy for section navigation
  useEffect(() => {
    const handleScroll = () => {
      if (isClickNavigatingRef.current) return;

      const scrollPosition = window.scrollY + 180;
      let currentSection = sections[0]?.id || '';

      for (const section of sections) {
        const el = document.getElementById(`section-${section.id}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = section.id;
          }
        }
      }

      if (currentSection) {
        setActiveSectionId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [sections]);

  // Bottom detection to hide floating capsule when reaching pagination
  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomReached(entry.isIntersecting);
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    isClickNavigatingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 900);

    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      const yOffset = -95;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#111111] selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200 relative pb-16">
      {/* ────────────────────────────────────────────────────────
          1) COVER PAGE (FIRST ELEMENT)
          Exact cover slide shared by the user, displayed at top
          ──────────────────────────────────────────────────────── */}
      <section className="pt-6 sm:pt-8 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08] dark:border-white/[0.12] bg-[#141414]">
          <img
            src={coverSlidePath}
            alt={`${project.title} Cover Page`}
            className="w-full h-auto object-contain block select-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          2) A LITTLE BIT ABOUT THE PROJECT
          Title, short description & concise metadata
          ──────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-6 sm:pb-8 px-4 sm:px-8 max-w-6xl mx-auto border-b border-[#E5E2D6] dark:border-[#252525]">
        {/* Category & Read Time Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full border shadow-2xs ${pillStyle}`}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono font-medium text-[#8E8D88] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-2.5 py-1 rounded-full">
              {project.year}
            </span>
          </div>

          {project.readTime && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#605E59] dark:text-[#A8A59E] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <Clock className="w-3.5 h-3.5 text-[#8E8D88]" />
              <span>{project.readTime}</span>
            </div>
          )}
        </div>

        {/* Title & Short Description */}
        <div className="space-y-3 mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#605E59] dark:text-[#A8A59E] leading-relaxed font-normal max-w-4xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/70 dark:bg-[#161616]/70 border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-md shadow-xs">
          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8D88] block mb-1">
              Role
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.role}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8D88] block mb-1">
              Timeline
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.duration}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8D88] block mb-1">
              Team Scope
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.team}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8D88] block mb-1">
              Primary Focus
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.tools[0] || 'Design Research'}
            </span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          3) FLOATING CASE-STUDY NAVIGATION
          Reuses exact component and interaction pattern
          ──────────────────────────────────────────────────────── */}
      <CaseStudyNav
        sections={sections.map((s) => ({
          id: s.id,
          number: s.number,
          title: s.title,
        }))}
        activeSectionId={activeSectionId}
        onSectionSelect={scrollToSection}
        accent={navAccent}
        onBack={onBack}
        isBottomReached={isBottomReached}
      />

      {/* ────────────────────────────────────────────────────────
          4) PROJECT CONTENT: THE PRESENTATION FRAMES
          Directly rendered without extra middle paragraphs or modals
          ──────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-4 pb-12 space-y-16">
        {sections.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="scroll-mt-28"
          >
            {/* Clean Section Header */}
            <div className="flex items-baseline gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
              <span className="text-sm font-sans font-bold text-[#8E8D88]">
                {section.number}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
                {section.title}
              </h2>
            </div>

            {/* Slides/Frames belonging to this section */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {section.slideIndices.map((slideIndex) => {
                const slideUrl = getSlidePath(project.slug, slideIndex);
                return (
                  <div
                    key={slideIndex}
                    className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-black/[0.08] dark:border-white/[0.1] bg-[#141414]"
                  >
                    <img
                      src={slideUrl}
                      alt={`${project.title} - ${section.title} Slide ${slideIndex}`}
                      className="w-full h-auto object-contain block select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* ────────────────────────────────────────────────────────
          5) BOTTOM PREVIOUS / NEXT PROJECT PAGINATION
          ──────────────────────────────────────────────────────── */}
      <div ref={footerRef} className="px-4 sm:px-8 max-w-6xl mx-auto mt-8">
        <CaseStudyPagination
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={(p) => {
            onSelectProject(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};
