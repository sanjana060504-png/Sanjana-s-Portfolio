import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, FolderGit2, Clock } from 'lucide-react';
import { projectsData } from '../data/portfolioData.ts';
import { Project } from '../types.ts';

interface SelectedWorkProps {
  onOpenProject: (project: Project) => void;
}

interface ProjectCardItemProps {
  project: Project;
  onOpenProject: (project: Project) => void;
}

const ProjectCardTile: React.FC<ProjectCardItemProps> = ({ project, onOpenProject }) => {
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
    }
  }, []);

  const handleMouseEnter = () => {
    if (canHover && project.hoverVideo) {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        try {
          if (videoRef.current.readyState >= 1) {
            videoRef.current.currentTime = 0;
          }
        } catch {
          // ignore
        }
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (project.hoverVideo) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        try {
          videoRef.current.currentTime = 0;
        } catch {
          // ignore
        }
      }
    }
  };

  // Distinct project hover styling preserving visual identity
  // Karagir: Burgundy (#641722), CRM: Blue (#0284C7), Exam Portal: Teal (#01ABA7)
  const projectTheme = {
    karagir: {
      cardHover: 'hover:border-[#641722] dark:hover:border-[#641722] hover:shadow-[0_12px_32px_rgba(100,23,34,0.18)] hover:bg-white/95 dark:hover:bg-[#1C1C1C]/95',
      titleHover: 'group-hover:text-[#641722] dark:group-hover:text-[#9A2838]',
      arrowHover: 'group-hover:bg-[#641722] group-hover:text-white',
      numberHover: 'group-hover:text-[#641722] dark:group-hover:text-[#9A2838]',
      numberBadgeHover: 'group-hover:bg-[#641722] group-hover:text-white',
      tagBorderHover: 'group-hover:border-[#641722]/40',
    },
    'edsuite-crm': {
      cardHover: 'hover:border-[#0284C7]/70 dark:hover:border-[#38BDF8]/60 hover:shadow-[0_12px_32px_rgba(2,132,199,0.18)] hover:bg-white/95 dark:hover:bg-[#1C1C1C]/95',
      titleHover: 'group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]',
      arrowHover: 'group-hover:bg-[#0284C7] group-hover:text-white',
      numberHover: 'group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]',
      numberBadgeHover: 'group-hover:bg-[#0284C7] group-hover:text-white',
      tagBorderHover: 'group-hover:border-[#0284C7]/40',
    },
    'exam-portal': {
      cardHover: 'hover:border-[#01ABA7]/70 dark:hover:border-[#22D3EE]/60 hover:shadow-[0_12px_32px_rgba(1,171,167,0.18)] hover:bg-white/95 dark:hover:bg-[#1C1C1C]/95',
      titleHover: 'group-hover:text-[#01ABA7] dark:group-hover:text-[#22D3EE]',
      arrowHover: 'group-hover:bg-[#01ABA7] group-hover:text-white',
      numberHover: 'group-hover:text-[#01ABA7] dark:group-hover:text-[#22D3EE]',
      numberBadgeHover: 'group-hover:bg-[#01ABA7] group-hover:text-white',
      tagBorderHover: 'group-hover:border-[#01ABA7]/40',
    },
  }[project.slug] || {
    cardHover: 'hover:border-[#F4D000]/70 hover:bg-white/95 dark:hover:bg-[#1C1C1C]/95',
    titleHover: 'group-hover:text-[#F4D000]',
    arrowHover: 'group-hover:bg-[#F4D000] group-hover:text-black',
    numberHover: 'group-hover:text-[#F4D000]',
    numberBadgeHover: 'group-hover:bg-[#F4D000] group-hover:text-black',
    tagBorderHover: 'group-hover:border-[#F4D000]/40',
  };

  return (
    <article
      onClick={() => onOpenProject(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer rounded-3xl p-4 sm:p-5 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-xs hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between overflow-hidden ${projectTheme.cardHover}`}
      id={`project-card-${project.slug}`}
      data-cursor="view"
    >
      <div>
        {/* Contained Media Thumbnail / Hover Video */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#EFECE3] dark:bg-[#222222] shrink-0 mb-4">
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover object-center transition-all duration-300 ${
              isHovered && project.hoverVideo ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
            }`}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (project.slug === 'edsuite-crm' && !target.src.includes('crm-frame-3s.png')) {
                target.src = '/edsuite/crm-frame-3s.png';
              }
            }}
          />

          {project.hoverVideo && (
            <video
              ref={videoRef}
              src={project.hoverVideo}
              muted
              playsInline
              loop
              preload="auto"
              onError={(e) => {
                const target = e.currentTarget;
                if (project.slug === 'edsuite-crm' && !target.src.includes('EdSuit_CRM_logo_intro')) {
                  target.src = '/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4';
                  target.play().catch(() => {});
                } else if (project.slug === 'exam-portal' && !target.src.includes('EXAMS.mp4')) {
                  target.src = '/edsuite/EXAMS.mp4';
                  target.play().catch(() => {});
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={project.hoverVideo} type="video/mp4" />
              {project.slug === 'edsuite-crm' && (
                <>
                  <source src="/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4" type="video/mp4" />
                  <source src="/EdSuit_CRM_logo_intro_202607131741.mp4" type="video/mp4" />
                </>
              )}
            </video>
          )}

          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

          {/* Floating Year Pill (Top-Left) */}
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-sans font-bold bg-[#111111]/85 backdrop-blur-sm text-white">
              {project.year}
            </span>
          </div>

          {/* Floating Number Badge (Top-Right) */}
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-black bg-[#F4D000] text-black transition-all duration-300 shadow-2xs ${projectTheme.numberBadgeHover}`}>
              {project.number}
            </span>
          </div>
        </div>

        {/* Title & Arrow */}
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <h3 className={`text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-[#F5F4EF] tracking-tight transition-colors duration-300 ${projectTheme.titleHover}`}>
            {project.title}
          </h3>
          <div className={`w-8 h-8 rounded-full bg-[#EFECE3] dark:bg-[#252525] text-[#111111] dark:text-white shrink-0 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${projectTheme.arrowHover}`}>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-[13px] text-[#605E59] dark:text-[#B0AEA8] leading-relaxed line-clamp-2 font-normal mb-3">
          {project.shortDescription}
        </p>
      </div>

      {/* Tags and Reading Time row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-[#F7F6F0]/80 dark:bg-[#222222]/80 text-[#605E59] dark:text-[#B0AEA8] border border-[#E5E2D6] dark:border-[#2C2C2C] truncate max-w-[130px] transition-colors ${projectTheme.tagBorderHover}`}
              title={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Reading Time Badge */}
        {project.readTime && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-[#FAF9F5] dark:bg-[#1C1C1C] text-[#111111] dark:text-[#F5F4EF] border border-black/[0.08] dark:border-white/[0.12] shadow-2xs transition-colors shrink-0 ${projectTheme.tagBorderHover}`}
            title={`Estimated reading depth: ${project.readTime}`}
          >
            <Clock className="w-2.5 h-2.5 text-[#F4D000] shrink-0" />
            <span>{project.readTime}</span>
          </div>
        )}
      </div>
    </article>
  );
};

interface MoreProjectCardProps {
  project: Project;
  onOpenProject: (project: Project) => void;
}

// Hover themes for the three More Projects:
// Sustainable UX: #D3FA53, Service Design: #C8B6FF, Special Needs: #2D61CB
const moreProjectThemes: Record<
  string,
  {
    cardHover: string;
    numberHover: string;
    titleHover: string;
    arrowHover: string;
    tagBorderHover: string;
  }
> = {
  'sustainability-ux': {
    cardHover:
      'hover:border-[#D3FA53] hover:shadow-[0_12px_32px_rgba(211,250,83,0.22)]',
    numberHover: 'group-hover:text-[#D3FA53]',
    titleHover: 'group-hover:text-[#D3FA53]',
    arrowHover: 'group-hover:bg-[#D3FA53] group-hover:text-black',
    tagBorderHover: 'group-hover:border-[#D3FA53]/50',
  },
  'service-design': {
    cardHover:
      'hover:border-[#C8B6FF] hover:shadow-[0_12px_32px_rgba(200,182,255,0.22)]',
    numberHover: 'group-hover:text-[#C8B6FF]',
    titleHover: 'group-hover:text-[#C8B6FF]',
    arrowHover: 'group-hover:bg-[#C8B6FF] group-hover:text-black',
    tagBorderHover: 'group-hover:border-[#C8B6FF]/50',
  },
  'special-needs': {
    cardHover:
      'hover:border-[#3DBCF9] hover:shadow-[0_12px_32px_rgba(61,188,249,0.22)]',
    numberHover: 'group-hover:text-[#3DBCF9]',
    titleHover: 'group-hover:text-[#3DBCF9]',
    arrowHover: 'group-hover:bg-[#3DBCF9] group-hover:text-black',
    tagBorderHover: 'group-hover:border-[#3DBCF9]/50',
  },
};

const MoreProjectCard: React.FC<MoreProjectCardProps> = ({ project, onOpenProject }) => {
  const theme = moreProjectThemes[project.slug] || {
    cardHover: 'hover:border-[#F4D000]',
    numberHover: 'group-hover:text-[#F4D000]',
    titleHover: 'group-hover:text-[#F4D000]',
    arrowHover: 'group-hover:bg-[#F4D000] group-hover:text-black',
    tagBorderHover: 'group-hover:border-[#F4D000]/40',
  };

  return (
    <article
      onClick={() => onOpenProject(project)}
      className={`p-4 sm:p-5 rounded-3xl bg-white/70 dark:bg-[#181818]/70 border border-black/[0.08] dark:border-white/[0.12] shadow-xs flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 cursor-pointer backdrop-blur-xl relative overflow-hidden ${theme.cardHover}`}
      data-cursor="view"
      title={`Open ${project.title}`}
    >
      <div>
        {/* Top Row: Number (default yellow, switches to project highlight on hover) and Arrow Circle */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <span
            className={`text-base sm:text-lg font-mono font-black text-[#F4D000] transition-colors duration-300 ${theme.numberHover}`}
          >
            {project.number}
          </span>

          <div
            className={`w-8 h-8 rounded-full bg-[#EFECE3] dark:bg-[#252525] text-[#111111] dark:text-white shrink-0 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.arrowHover}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Title: default text, switches to project highlight on hover */}
        <h4
          className={`text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-[#F5F4EF] tracking-tight transition-colors duration-300 ${theme.titleHover}`}
        >
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#605E59] dark:text-[#B0AEA8] mt-1.5 line-clamp-2 leading-relaxed font-normal">
          {project.shortDescription}
        </p>
      </div>

      {/* Bottom Row: Tags only (No PPT Deck label) */}
      <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] overflow-hidden">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={`px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-[#F7F6F0]/80 dark:bg-[#222222]/80 text-[#605E59] dark:text-[#B0AEA8] border border-[#E5E2D6] dark:border-[#2C2C2C] truncate max-w-[130px] transition-colors ${theme.tagBorderHover}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenProject }) => {
  // Primary 3 Selected Work projects with CRM 1st
  const mainProjects: Project[] = [
    {
      ...(projectsData.find((p) => p.slug === 'edsuite-crm') || projectsData[0]),
      number: '01',
    },
    {
      ...(projectsData.find((p) => p.slug === 'karagir') || projectsData[1]),
      number: '02',
    },
    {
      ...(projectsData.find((p) => p.slug === 'exam-portal') || projectsData[2]),
      number: '03',
    },
  ];

  // Sequence requested: 04 Sustainable UX, 05 Service Design, 06 Special Needs
  const moreProjects: Project[] = [
    projectsData.find((p) => p.slug === 'sustainability-ux'),
    projectsData.find((p) => p.slug === 'service-design'),
    projectsData.find((p) => p.slug === 'special-needs'),
  ].filter(Boolean) as Project[];

  return (
    <section
      className="py-10 sm:py-14 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="selected-work"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
            Built & Designed <br />
            <span className="font-handwriting text-2xl sm:text-3xl text-[#605E59] dark:text-[#8E8D88] font-normal">
              A few things I’m proud of (for now).
            </span>
          </h2>
        </div>

        <div className="text-xs font-sans font-semibold text-[#8E8D88] self-start sm:self-end">
          (03) Selected Projects
        </div>
      </div>

      {/* Projects Row - 3 Compact Horizontal Tiles in One Clean Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {mainProjects.map((project) => (
          <ProjectCardTile
            key={project.id}
            project={project}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>

      {/* More Projects Entry: 04 Sustainable UX, 05 Service Design, 06 Special Needs */}
      <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8E8D88]">
            More Projects
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4D000]" />
        </div>

        {/* 3 Responsive Tiles in consistent style with custom hover highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {moreProjects.map((project) => (
            <MoreProjectCard
              key={project.id}
              project={project}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
