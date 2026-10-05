import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Maximize2, X } from 'lucide-react';
import { Project } from '../types.ts';
import { projectsData } from '../data/portfolioData.ts';
import { CaseStudyPagination } from '../components/CaseStudyPagination.tsx';

interface PresentationCaseStudyProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

// Generate the complete slide list for each project
const getProjectSlides = (slug: string): string[] => {
  if (slug === 'sustainability-ux') {
    return Array.from({ length: 48 }, (_, i) => {
      const num = String(i + 1).padStart(3, '0');
      return `/slides/sustainable-ux/slide-${num}.png`;
    });
  }
  if (slug === 'service-design') {
    return ['/slides/service-design/slide-001.png'];
  }
  if (slug === 'special-needs') {
    return ['/slides/special-needs/slide-001.png'];
  }
  return [];
};

export const PresentationCaseStudy: React.FC<PresentationCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);

  const slides = getProjectSlides(project.slug);
  const accentColor = project.accentColor || '#F4D000';

  // Navigation: Find previous and next projects
  const prevProject =
    projectsData.find((p) => p.slug === project.prevProjectSlug) ||
    projectsData[0];
  const nextProject =
    projectsData.find((p) => p.slug === project.nextProjectSlug) ||
    projectsData[1];

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  // Handle Escape key to close lightbox or go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedSlide) {
          setSelectedSlide(null);
        } else {
          onBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (selectedSlide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedSlide, onBack]);

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] transition-colors duration-200 relative pb-16">
      {/* ────────────────────────────────────────────────────────
          STICKY TOP NAVIGATION BAR
          Preserves the existing back button exactly: "Back to Selected Work"
          ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-[#F7F6F0]/90 dark:bg-[#101010]/90 backdrop-blur-md border-b border-[#E5E2D6] dark:border-[#222222] py-3.5 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#605E59] dark:text-[#B0AEA8] hover:text-[#111111] dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Selected Work</span>
          </button>

          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
            style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
          >
            Project {project.number}
          </span>
        </div>
      </nav>

      {/* ────────────────────────────────────────────────────────
          1) INTRODUCTORY INFORMATION (AT THE TOP)
          Project Title + Reading Time + Short Project Description
          ──────────────────────────────────────────────────────── */}
      <header className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 max-w-5xl mx-auto border-b border-black/[0.08] dark:border-white/[0.08]">
        {/* Category & Read Time Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
            style={{
              backgroundColor: `${accentColor}18`,
              borderColor: `${accentColor}40`,
              color: accentColor,
            }}
          >
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/5 dark:bg-white/5 text-[#8E8D88] border border-black/5 dark:border-white/5">
            {project.year}
          </span>
          {project.readTime && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#8E8D88] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <Clock className="w-3 h-3 text-[#F4D000]" />
              <span>{project.readTime}</span>
            </div>
          )}
        </div>

        {/* Project Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.08] mb-3">
          {project.title}
        </h1>

        {/* Short Project Description */}
        <p className="text-base sm:text-lg text-[#605E59] dark:text-[#B0AEA8] leading-relaxed max-w-3xl mb-6 font-normal">
          {project.shortDescription}
        </p>

        {/* Project Metadata Grid */}
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
              Duration
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.duration}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8D88] block mb-1">
              Team / Scope
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.team}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8E8D88] block mb-1">
              Key Methodologies
            </span>
            <span className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
              {project.tools[0] || 'Design Research'}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#EFECE3]/70 dark:bg-[#202020] text-[#605E59] dark:text-[#B0AEA8] border border-[#E5E2D6] dark:border-[#2C2C2C]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
          2) COMPLETE PPT DECK DISPLAYED DIRECTLY ON THE PAGE
          A clean sequence of individual full-width presentation slides,
          one after another, directly within the project page.
          Each slide retains its original proportions and visual quality,
          with natural spacing between slides.
          ──────────────────────────────────────────────────────── */}
      <section className="w-full py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-6 sm:gap-10">
          {slides.map((slideUrl, index) => (
            <div
              key={index}
              className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-black/[0.08] dark:border-white/[0.1] bg-[#141414] transition-transform duration-300 hover:scale-[1.003] group relative cursor-zoom-in"
              onClick={() => setSelectedSlide(slideUrl)}
              title="Click to view slide enlarged"
            >
              <img
                src={slideUrl}
                alt={`${project.title} - Slide ${index + 1}`}
                className="w-full h-auto object-contain block select-none"
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
              {/* Subtle hover affordance */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 pointer-events-none shadow-md">
                <Maximize2 className="w-3 h-3 text-[#F4D000]" />
                <span>Enlarge</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          INDIVIDUAL SLIDE ENLARGE LIGHTBOX MODAL
          Opens the actual slide in crystal-clear full resolution
          ──────────────────────────────────────────────────────── */}
      {selectedSlide && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedSlide(null)}
        >
          <button
            onClick={() => setSelectedSlide(null)}
            className="absolute top-5 right-5 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#F4D000] hover:text-black text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close (Esc)</span>
          </button>
          <div
            className="max-w-6xl max-h-[92vh] flex items-center justify-center overflow-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedSlide}
              alt="Enlarged Presentation Slide"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          3) EXISTING CLOSING SECTION WITH CONTEXT / LEARNINGS / CONTENT
          Sits directly after the complete sequence of slides
          ──────────────────────────────────────────────────────── */}
      {project.context && (
        <section className="px-4 sm:px-6 max-w-5xl mx-auto my-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#161616]/70 border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-md shadow-xs">
            <div className="md:col-span-4">
              <span className="text-xs font-mono uppercase text-[#8E8D88] tracking-wider block mb-2">
                01 · Systemic Scope
              </span>
              <h3 className="text-2xl font-black text-[#111111] dark:text-[#F5F4EF] leading-tight">
                {project.context.title}
              </h3>
              {project.context.subtitle && (
                <p className="text-xs sm:text-sm text-[#8E8D88] mt-1">
                  {project.context.subtitle}
                </p>
              )}
            </div>

            <div className="md:col-span-8">
              <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed mb-4">
                {project.context.content}
              </p>

              {project.context.keyPoints && project.context.keyPoints.length > 0 && (
                <div className="space-y-2 mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                  {project.context.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────
          BOTTOM PREVIOUS / NEXT PROJECT PAGINATION
          Consistent with existing CRM, Karagir, and Exam Portal project pages
          ──────────────────────────────────────────────────────── */}
      <footer className="px-4 sm:px-6 max-w-5xl mx-auto mt-10">
        <CaseStudyPagination
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={(p) => {
            onSelectProject(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </footer>
    </div>
  );
};
