import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  ExternalLink,
  ChevronDown,
  Maximize2,
  X
} from 'lucide-react';
import { Project } from '../types.ts';
import { projectsData } from '../data/portfolioData.ts';
import { CaseStudyNav } from '../components/CaseStudyNav.tsx';
import { CaseStudyPagination } from '../components/CaseStudyPagination.tsx';

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

const SECTIONS: SectionData[] = [
  {
    id: 'context',
    number: '01',
    title: 'Context',
    slides: [
      { filename: '2. Overview.png', alt: 'Overview & Topic - Maharashtrian Tribal & Folk Art' },
      { filename: '3. Why it matters.png', alt: 'Why it matters today - Generational Continuity' },
      { filename: '4. Statistics.png', alt: 'Maharashtra Tribal Livelihoods & Statistics' }
    ]
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
      { filename: '9. Artefact analysis.png', alt: 'Artefact Analysis - Warli, Gond, Korku, Bhil' }
    ]
  },
  {
    id: 'field-research',
    number: '03',
    title: 'Field Research',
    slides: [
      { filename: '10. Primary research.png', alt: 'Documenting the visit - Tribal Cultural Museum, Pune' },
      { filename: '11. Interviews.png', alt: 'Artisan & Volunteer Interviews' },
      { filename: '12. Takeaways.png', alt: 'Key Takeaways from the Field' },
      { filename: '13. Personas.png', alt: 'User Personas & Journey Maps' }
    ]
  },
  {
    id: 'ideation',
    number: '04',
    title: 'Ideation',
    slides: [
      { filename: '14. Problem Statement.png', alt: 'The Problem Statement & Design Brief' },
      { filename: '15. Ideation.png', alt: 'Ideation & Divergent Exploration' },
      { filename: '16. Crazy 8.png', alt: 'Crazy 8s Sketches' }
    ]
  },
  {
    id: 'design',
    number: '05',
    title: 'Design',
    slides: [
      { filename: '17. Concept.png', alt: 'The Karagir Concept' },
      { filename: '18. Info Arch.png', alt: 'Information Architecture: Artisan App' },
      { filename: '19. User flows.png', alt: 'User Flows: Voice-to-Listing & Direct Order Communication' },
      { filename: '20. Wireframes.png', alt: 'Wireframes: Low to mid fidelity' }
    ]
  },
  {
    id: 'testing',
    number: '06',
    title: 'Testing',
    slides: [
      { filename: '23. Usability testing.png', alt: 'Usability Testing & Cognitive Walkthrough' }
    ]
  },
  {
    id: 'prototype',
    number: '07',
    title: 'Prototype',
    slides: [
      { filename: '21 Ai Agents.png', alt: 'How Agentic AI Can Help (Kala & Specialized Agents)' },
      { filename: '22. Concept.png', alt: 'Introducing Karagir: Mobile Experience' }
    ]
  }
];

export const KaragirCaseStudy: React.FC<KaragirCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('context');
  const [selectedLanguage, setSelectedLanguage] = useState<'marathi' | 'hindi' | 'english'>('marathi');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isFullscreenPrototype, setIsFullscreenPrototype] = useState<boolean>(false);

  // Scroll to top on initial mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Set up intersection observer to detect current active section during scrolling
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSectionId(section.id);
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleJumpToOutput = () => {
    const el = document.getElementById('karagir-prototype-device') || document.getElementById('section-prototype');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Previous & Next section helpers
  const currentSectionIndex = SECTIONS.findIndex((s) => s.id === activeSectionId);

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      scrollToSection(SECTIONS[currentSectionIndex - 1].id);
    }
  };

  const handleNextSection = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      scrollToSection(SECTIONS[currentSectionIndex + 1].id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (e.altKey || e.metaKey) {
          handleNextSection();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (e.altKey || e.metaKey) {
          handlePrevSection();
        }
      } else if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex]);

  // Project navigation for bottom footer
  const prevProject = projectsData.find((p) => p.slug === 'roots') || projectsData[1];
  const nextProject = projectsData.find((p) => p.slug === 'beyond-the-brief') || projectsData[2];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#F4D000] selection:text-black relative">
      {/* Top Left Back Navigation */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] text-[#111111] dark:text-[#F5F4EF] hover:bg-white dark:hover:bg-[#252525] text-xs font-bold font-sans shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer group"
        aria-label="Back"
        id="top-back-btn"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span className="inline">Back</span>
      </button>

      {/* 1. Hero Cover Slide Banner */}
      <section className="w-full bg-[#12100E] border-b border-black/10 dark:border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#161311]">
            <img
              src="/karagir/1. cover page.png"
              alt="Tribes of Maharashtra - Cultural Studies in UX Design"
              className="w-full h-auto object-contain block"
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

      {/* 2. Sticky Floating Capsule Navigation Bar */}
      <CaseStudyNav
        sections={SECTIONS}
        activeSectionId={activeSectionId}
        onSectionSelect={scrollToSection}
        accent="karagir"
        onJumpToOutput={handleJumpToOutput}
      />

      {/* 3. The Continuous Case Study Content: 7 Sections with Full Readable PNG Slides */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="mb-20 scroll-mt-28"
          >
            {/* Section Header Matching Video Reference */}
            <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
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

              {/* Special Addition in Section 07 (Prototype): Interactive Mobile Device & Thank You */}
              {section.id === 'prototype' && (
                <div className="pt-8 space-y-12">
                  {/* The Interactive Phone Device running Karagir Prototype */}
                  <div id="karagir-prototype-device" className="flex flex-col items-center scroll-mt-28">
                    <div className="w-full max-w-[380px] rounded-[48px] border-[8px] border-[#1C1B19] bg-[#111111] shadow-2xl p-2 relative overflow-hidden ring-1 ring-black/10 dark:ring-white/20">
                      {/* Dynamic Island Pill */}
                      <div className="w-24 h-4 bg-black rounded-full mx-auto my-2" />

                      <div className="w-full h-[680px] rounded-[36px] overflow-hidden bg-white">
                        <iframe
                          src="/karagir-prototype.html"
                          title="Karagir Interactive Prototype"
                          className="w-full h-full border-none block"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFullscreenPrototype(true)}
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5C1D24] dark:bg-[#F4D000] text-white dark:text-black hover:bg-[#7D1B1B] dark:hover:bg-[#E5C200] text-xs font-sans font-bold shadow-md cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                      id="prototype-fullscreen-btn"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Open full screen</span>
                    </button>
                  </div>

                  {/* Thank You Slide (Frame 00:35) */}
                  <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-[#350A0B]">
                    <img
                      src="/karagir/24. thank you.png"
                      alt="Thank you - Karagir"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* 4. Footer Project Pagination Cards */}
        <CaseStudyPagination
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={onSelectProject}
        />
      </main>

      {/* In-Place Fullscreen Prototype Modal (No Redirection) */}
      {isFullscreenPrototype && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          id="prototype-fullscreen-modal"
        >
          {/* Top Bar with Close / Exit Fullscreen */}
          <div className="w-full max-w-md flex items-center justify-between px-2 py-2 text-white mb-2">
            <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#F4D000]">
              <span className="w-2 h-2 rounded-full bg-[#F4D000] animate-pulse" />
              <span>Karagir Prototype</span>
            </div>
            <button
              onClick={() => setIsFullscreenPrototype(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-sans font-bold transition-colors cursor-pointer"
              aria-label="Close full screen"
              id="close-fullscreen-btn"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>

          <div className="w-full max-w-[400px] h-[85vh] max-h-[840px] rounded-[44px] overflow-hidden border-4 border-white/20 shadow-2xl bg-white relative">
            <iframe
              src="/karagir-prototype.html"
              title="Karagir Fullscreen Prototype"
              className="w-full h-full border-0 block"
            />
          </div>
        </div>
      )}
    </div>
  );
};
