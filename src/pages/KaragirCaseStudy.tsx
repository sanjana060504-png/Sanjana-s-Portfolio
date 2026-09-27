import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Maximize2,
  X
} from 'lucide-react';
import { Project } from '../types.ts';
import { projectsData } from '../data/portfolioData.ts';
import { CaseStudyNav, CaseStudyNavSection } from '../components/CaseStudyNav.tsx';
import { CaseStudyPagination } from '../components/CaseStudyPagination.tsx';
import karagirPrototypeHtml from '../data/karagirPrototype.html?raw';

interface KaragirCaseStudyProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

interface SectionData {
  id: string;
  number: string;
  title: string;
  slides: {
    filename: string;
    alt: string;
  }[];
}

// 7. Case Study Content Order exactly as specified:
// 01 Context
// 02 Secondary Research
// 03 Field Research
// 04 Ideation
// 05 Design (IA slides, Karagir concept, Introducing Karagir, Agentic AI, Low/Mid/High fidelity)
// 06 Testing (Usability testing material)
// 07 Prototype (Actual working prototype in phone mockup & fullscreen)
const SECTIONS: SectionData[] = [
  {
    id: 'context',
    number: '01',
    title: 'Context',
    slides: [
      { filename: '2. Overview.png', alt: 'Overview & Topic - Maharashtrian Tribal & Folk Art' },
      { filename: '3. Why it matters.png', alt: 'Why it matters today - Generational Continuity' },
      { filename: '4. Statistics.png', alt: 'Maharashtra Tribal Livelihoods & Statistics' },
    ],
  },
  {
    id: 'secondary-research',
    number: '02',
    title: 'Secondary Research',
    slides: [
      { filename: '5. Tribe map.png', alt: 'Mapping Maharashtra’s Tribes' },
      { filename: '6. Research.png', alt: 'Tracing the Threads of Knowledge' },
      { filename: '7. Research Literature Study.png', alt: 'Literature Study - Themes & Traditions' },
      { filename: '8. Literature Study.png', alt: 'Literature Study - Institutional Initiatives' },
      { filename: '9. Artefact analysis.png', alt: 'Artefact Analysis - Warli, Gond, Korku, Bhil' },
    ],
  },
  {
    id: 'field-research',
    number: '03',
    title: 'Field Research',
    slides: [
      { filename: '10. Primary research.png', alt: 'Documenting the visit - Tribal Cultural Museum, Pune' },
      { filename: '11. Interviews.png', alt: 'Artisan & Volunteer Interviews' },
      { filename: '12. Takeaways.png', alt: 'Key Takeaways from the Field' },
      { filename: '13. Personas.png', alt: 'User Personas & Journey Maps' },
    ],
  },
  {
    id: 'ideation',
    number: '04',
    title: 'Ideation',
    slides: [
      { filename: '14. Problem Statement.png', alt: 'The Problem Statement & Design Brief' },
      { filename: '15. Ideation.png', alt: 'Ideation & Divergent Exploration' },
      { filename: '16. Crazy 8.png', alt: 'Crazy 8s Sketches' },
    ],
  },
  {
    id: 'design',
    number: '05',
    title: 'Design',
    slides: [
      { filename: '18. Info Arch.png', alt: 'Information Architecture: Artisan App' },
      { filename: '19. User flows.png', alt: 'User Flows: Voice-to-Listing & Direct Order Communication' },
      { filename: '17. Concept.png', alt: 'The Karagir Concept' },
      { filename: '22. Concept.png', alt: 'Introducing Karagir: Mobile Experience' },
      { filename: '21 Ai Agents.png', alt: 'How Agentic AI Can Help (Kala & Specialized Agents)' },
      { filename: '20. Wireframes.png', alt: 'Wireframes: Low, Mid & High Fidelity Designs' },
    ],
  },
  {
    id: 'testing',
    number: '06',
    title: 'Testing',
    slides: [
      { filename: '23. Usability testing.png', alt: 'Usability Testing & Cognitive Walkthrough' },
    ],
  },
  {
    id: 'prototype',
    number: '07',
    title: 'Prototype',
    slides: [],
  },
];

export const KaragirCaseStudy: React.FC<KaragirCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('context');
  const [isFullscreenPrototype, setIsFullscreenPrototype] = useState<boolean>(false);
  const [fullscreenScale, setFullscreenScale] = useState<number>(1);
  const [isBottomReached, setIsBottomReached] = useState<boolean>(false);

  const coverVideoRef = useRef<HTMLVideoElement | null>(null);
  const thankYouRef = useRef<HTMLDivElement | null>(null);
  const isClickNavigatingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate safe in-memory Blob URL for the uploaded Karagir prototype HTML
  const prototypeBlobUrl = useMemo(() => {
    try {
      const blob = new Blob([karagirPrototypeHtml], { type: 'text/html;charset=utf-8' });
      return URL.createObjectURL(blob);
    } catch {
      return '';
    }
  }, []);

  useEffect(() => {
    return () => {
      if (prototypeBlobUrl) {
        URL.revokeObjectURL(prototypeBlobUrl);
      }
    };
  }, [prototypeBlobUrl]);

  // Handle Escape key to close fullscreen prototype modal & lock body scroll
  useEffect(() => {
    if (!isFullscreenPrototype) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreenPrototype(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isFullscreenPrototype]);

  // Scroll to top on initial mount and ensure cover video plays
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (coverVideoRef.current) {
      coverVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Compute fullscreen scale responsively so phone mockup has actual bigger screen presence
  useEffect(() => {
    const updateScale = () => {
      const availH = window.innerHeight - 48;
      const availW = window.innerWidth - 32;
      const scaleH = availH / 874;
      const scaleW = availW / 415;
      // Allow scale up to 1.15 on taller viewports so phone screen is significantly bigger
      const s = Math.min(1.15, Math.min(scaleH, scaleW));
      setFullscreenScale(Math.max(0.6, s));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Deterministic scroll spy that ensures the active section pill is consistently filled and never flickers
  useEffect(() => {
    const handleScroll = () => {
      if (isClickNavigatingRef.current) return;

      const scrollPosition = window.scrollY + 160;

      let currentSection = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(`section-${section.id}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = section.id;
          }
        }
      }

      setActiveSectionId(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Observe the final Thank You section: hides secondary navigation behind portfolio navbar
  useEffect(() => {
    if (!thankYouRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomReached(entry.isIntersecting);
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(thankYouRef.current);
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
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleJumpToOutput = () => {
    setActiveSectionId('prototype');
    isClickNavigatingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 900);

    const el = document.getElementById('karagir-prototype-device') || document.getElementById('section-prototype');
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreenPrototype) {
          setIsFullscreenPrototype(false);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenPrototype, onBack]);

  // Project navigation for bottom footer
  const prevProject = projectsData.find((p) => p.slug === 'roots') || projectsData[1];
  const nextProject = projectsData.find((p) => p.slug === 'beyond-the-brief') || projectsData[2];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#F4D000] selection:text-black relative">
      {/* 1. Hero Cover Slide Banner with Karagir Intro Video (Cards Moving) */}
      <section className="w-full bg-[#12100E] border-b border-black/10 dark:border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#161311] relative group">
            <video
              ref={coverVideoRef}
              src="/karagir/karagir-intro.mp4"
              poster="/karagir/1. cover page.png"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-auto object-contain block select-none"
            />
          </div>

          {/* Project Metadata Card */}
          <div className="mt-8 bg-white/70 dark:bg-[#1A1A1A]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-sans font-bold tracking-widest text-[#5C1D24] dark:text-[#F4D000] uppercase block mb-1">
                UX Research & Agentic AI
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
                KARAGIR — Tribes of Maharashtra
              </h1>
              <p className="text-sm font-sans text-[#605E59] dark:text-[#8E8D88] mt-1">
                Cultural Studies × UX / Product Design × Agentic AI
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5E2D6] dark:border-[#2A2A2A] md:pl-8 text-xs font-sans">
              <div>
                <span className="text-[#8E8D88] uppercase block mb-1">Role</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F4EF]">
                  UX Researcher / Designer
                </span>
              </div>
              <div>
                <span className="text-[#8E8D88] uppercase block mb-1">Team</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F4EF]">
                  5 members
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[#8E8D88] uppercase block mb-1">Duration</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F4EF]">
                  2026 Academic Project
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Project Navigation: Chevron + Plus/Tabs aligned directly below SANJANA */}
      <CaseStudyNav
        sections={SECTIONS}
        activeSectionId={activeSectionId}
        onSectionSelect={scrollToSection}
        accent="karagir"
        onJumpToOutput={handleJumpToOutput}
        onBack={onBack}
        isBottomReached={isBottomReached}
      />

      {/* 3. The Continuous Case Study Content: 7 Ordered Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="mb-20 scroll-mt-28"
          >
            {/* Section Header */}
            <div
              className={`flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222] ${
                section.id === 'prototype' ? 'pt-16 sm:pt-20 mt-8 sm:mt-12' : ''
              }`}
            >
              <span className="text-sm font-sans text-[#5C1D24] dark:text-[#F4D000] font-bold">
                {section.number}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
                {section.title}
              </h2>
            </div>

            {/* Slides in this section rendered at full readable size */}
            <div className="space-y-6">
              {section.slides.map((slide, idx) => (
                <div
                  key={slide.filename}
                  className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 bg-[#161311] relative group"
                >
                  <img
                    src={`/karagir/${slide.filename}`}
                    alt={slide.alt}
                    className="w-full h-auto object-contain block select-none"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}

              {/* Section 07 (Prototype): Actual Karagir prototype inside Phone Mockup */}
              {section.id === 'prototype' && (
                <div className="pt-2">
                  {/* Smaller Phone Mockup: Uses the actual uploaded Karagir prototype */}
                  <div id="karagir-prototype-device" className="flex flex-col items-center scroll-mt-28 py-2">
                    <div className="relative box-content w-[216px] h-[468px] rounded-[36px] border-[7px] border-[#1C1A17] dark:border-[#2C2A26] bg-[#0E0D0B] shadow-[0_16px_44px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/10 select-none overflow-hidden">
                      <iframe
                        srcDoc={karagirPrototypeHtml}
                        src={prototypeBlobUrl || undefined}
                        title="Karagir Interactive Prototype"
                        allow="autoplay"
                        className="w-[393px] h-[852px] border-none block"
                        style={{
                          transform: 'scale(0.549618)',
                          transformOrigin: '0 0',
                        }}
                      />
                    </div>

                    {/* Open Full Screen Button below Mockup */}
                    <button
                      type="button"
                      onClick={() => setIsFullscreenPrototype(true)}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C1D24] dark:bg-[#F4D000] text-white dark:text-black hover:bg-[#7D1B1B] dark:hover:bg-[#E5C200] text-xs font-sans font-bold shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                      id="prototype-fullscreen-btn"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Open Full Screen</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* 4. Thank You Section: Dedicated section observed to hide secondary navigation */}
        <section id="section-thank-you" ref={thankYouRef} className="pt-4 pb-12 scroll-mt-28">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-[#350A0B]">
            <img
              src="/karagir/24. thank you.png"
              alt="Thank you - Karagir"
              className="w-full h-auto object-contain block"
            />
          </div>
        </section>

        {/* 5. Footer Project Pagination & Transition Area */}
        <div id="case-study-bottom-area">
          <CaseStudyPagination
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        </div>
      </main>

      {/* In-Place Fullscreen Prototype Modal: Larger Phone Mockup using the EXACT same prototype source */}
      {isFullscreenPrototype && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-0 m-0 overflow-hidden"
          id="prototype-fullscreen-modal"
          onClick={() => setIsFullscreenPrototype(false)}
        >
          {/* Floating Top Close Button */}
          <div
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFullscreenPrototype(false)}
              className="p-2.5 rounded-full bg-black/80 hover:bg-black text-white transition-all cursor-pointer shadow-lg border border-white/20 hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-md"
              aria-label="Close full screen (Escape)"
              title="Close (Esc)"
              id="close-fullscreen-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Phone Mockup presentation */}
          <div
            className="relative flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `scale(${fullscreenScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="relative box-content w-[393px] h-[852px] rounded-[56px] border-[11px] border-[#1C1A17] bg-[#0D0C0A] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)] overflow-hidden">
              <iframe
                srcDoc={karagirPrototypeHtml}
                src={prototypeBlobUrl || undefined}
                title="Karagir Fullscreen Prototype"
                allow="autoplay"
                className="w-[393px] h-[852px] border-none block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
