import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { projectsData } from '../data/portfolioData.ts';
import { Project } from '../types.ts';

interface SelectedWorkProps {
  onOpenProject: (project: Project) => void;
}

interface ProjectCardItemProps {
  project: Project;
  onOpenProject: (project: Project) => void;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({ project, onOpenProject }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Only enable hover video on devices that actually support cursor hover
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const handleMouseEnter = () => {
    if (project.hoverVideo && canHover) {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (project.hoverVideo) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Respective project hover styling (burgundy for karagir, blue for edsuit crm, cyan for exam portal)
  // Default states retain the signature yellow/black styling
  const projectTheme = {
    karagir: {
      cardHover: 'hover:border-[#5C1D24]/70 dark:hover:border-[#F4D000]/60 hover:bg-white/80 dark:hover:bg-[#1C1C1C]/80',
      titleHover: 'group-hover:text-[#5C1D24] dark:group-hover:text-[#F4D000]',
      arrowHover: 'group-hover:bg-[#5C1D24] group-hover:text-white',
      numberHover: 'group-hover:text-[#5C1D24] dark:group-hover:text-[#F4D000]',
      mobileNumberHover: 'group-hover:bg-[#5C1D24] group-hover:text-white',
      tagBorderHover: 'group-hover:border-[#5C1D24]/40',
    },
    'edsuite-crm': {
      cardHover: 'hover:border-[#0284C7]/70 dark:hover:border-[#38BDF8]/60 hover:bg-white/80 dark:hover:bg-[#1C1C1C]/80',
      titleHover: 'group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]',
      arrowHover: 'group-hover:bg-[#0284C7] group-hover:text-white',
      numberHover: 'group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]',
      mobileNumberHover: 'group-hover:bg-[#0284C7] group-hover:text-white',
      tagBorderHover: 'group-hover:border-[#0284C7]/40',
    },
    'exam-portal': {
      cardHover: 'hover:border-[#01ABA7]/70 dark:hover:border-[#22D3EE]/60 hover:bg-white/80 dark:hover:bg-[#1C1C1C]/80',
      titleHover: 'group-hover:text-[#01ABA7] dark:group-hover:text-[#22D3EE]',
      arrowHover: 'group-hover:bg-[#01ABA7] group-hover:text-white',
      numberHover: 'group-hover:text-[#01ABA7] dark:group-hover:text-[#22D3EE]',
      mobileNumberHover: 'group-hover:bg-[#01ABA7] group-hover:text-white',
      tagBorderHover: 'group-hover:border-[#01ABA7]/40',
    },
  }[project.slug] || {
    cardHover: 'hover:border-[#F4D000]/70 hover:bg-white/80 dark:hover:bg-[#1C1C1C]/80',
    titleHover: 'group-hover:text-[#F4D000]',
    arrowHover: 'group-hover:bg-[#F4D000] group-hover:text-black',
    numberHover: 'group-hover:text-[#F4D000]',
    mobileNumberHover: 'group-hover:bg-[#F4D000] group-hover:text-black',
    tagBorderHover: 'group-hover:border-[#F4D000]/40',
  };

  return (
    <article
      onClick={() => onOpenProject(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer rounded-3xl p-4 sm:p-6 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-xs hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden ${projectTheme.cardHover}`}
      id={`project-card-${project.slug}`}
      data-cursor="view"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 lg:gap-8">
        {/* Project Number (Default yellow, transitions to respective color on hover) */}
        <div className="hidden lg:flex flex-col items-center justify-center w-12 shrink-0 select-none">
          <span className={`text-3xl font-black font-sans text-[#F4D000] group-hover:scale-110 transition-all duration-300 ${projectTheme.numberHover}`}>
            {project.number}
          </span>
        </div>

        {/* Compact Contained Thumbnail / Hover Video */}
        <div className="relative w-full md:w-56 lg:w-64 h-48 md:h-38 rounded-2xl overflow-hidden bg-[#EFECE3] dark:bg-[#222222] shrink-0">
          <img
            src={
              project.thumbnail.startsWith('http') &&
              !project.thumbnail.match(/\.(png|jpg|jpeg|webp|svg)$/i)
                ? '/karagir-cover.svg'
                : project.thumbnail
            }
            alt={project.title}
            className={`w-full h-full object-cover object-center transition-all duration-300 ${
              isHovered && project.hoverVideo ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
            }`}
            loading="lazy"
          />

          {project.hoverVideo && (
            <video
              ref={videoRef}
              src={project.hoverVideo}
              muted
              playsInline
              loop
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

          {/* Floating Year Pill */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#111111]/85 backdrop-blur-sm text-white">
              {project.year}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10 lg:hidden pointer-events-none">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-black bg-[#F4D000] text-black transition-all duration-300 ${projectTheme.mobileNumberHover}`}>
              {project.number}
            </span>
          </div>
        </div>

        {/* Content & Metadata */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Title & Arrow */}
            <div className="flex items-center justify-between gap-4">
              <h3 className={`text-2xl sm:text-3xl font-extrabold text-[#111111] dark:text-[#F5F4EF] tracking-tight transition-colors duration-300 ${projectTheme.titleHover}`}>
                {project.title}
              </h3>
              <div className={`w-9 h-9 rounded-full bg-[#EFECE3] dark:bg-[#252525] text-[#111111] dark:text-white shrink-0 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${projectTheme.arrowHover}`}>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed line-clamp-2 mt-1.5 font-normal">
              {project.shortDescription}
            </p>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#F7F6F0]/80 dark:bg-[#222222]/80 text-[#605E59] dark:text-[#B0AEA8] border border-[#E5E2D6] dark:border-[#2C2C2C] transition-colors ${projectTheme.tagBorderHover}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenProject }) => {
  return (
    <section
      className="py-14 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="selected-work"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
            Built & Designed <br />
            <span className="font-handwriting text-3xl sm:text-4xl text-[#605E59] dark:text-[#8E8D88] font-normal">
              A few things I’m proud of (for now).
            </span>
          </h2>
        </div>

        <div className="text-xs font-sans font-semibold text-[#8E8D88] self-start sm:self-end">
          ({projectsData.length.toString().padStart(2, '0')}) Projects
        </div>
      </div>

      {/* Projects List - Compact Editorial Strip Cards */}
      <div className="space-y-4 sm:space-y-5">
        {projectsData.map((project) => (
          <ProjectCardItem
            key={project.id}
            project={project}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
};
