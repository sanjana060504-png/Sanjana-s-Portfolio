import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Monitor,
  Maximize2,
  Play,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Sparkles,
  ChevronDown,
  X
} from 'lucide-react';
import { Project } from '../types.ts';
import { projectsData } from '../data/portfolioData.ts';
import { CaseStudyNav, CaseStudyNavSection } from '../components/CaseStudyNav.tsx';
import { CaseStudyPagination } from '../components/CaseStudyPagination.tsx';

interface CRMCaseStudyProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

const CRM_SECTIONS: CaseStudyNavSection[] = [
  { id: 'context', number: '01', title: 'Context' },
  { id: 'brief', number: '02', title: 'Brief' },
  { id: 'what-i-worked-on', number: '03', title: 'What I Worked On' },
  { id: 'design-decisions', number: '04', title: 'Design Decisions' },
  { id: 'testing', number: '05', title: 'Testing' },
  { id: 'iterations', number: '06', title: 'Changes & Iterations' },
  { id: 'final-output', number: '07', title: 'Final Output & Demo' },
];

export const CRMCaseStudy: React.FC<CRMCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [activeSection, setActiveSection] = useState<string>('context');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [isIntroHovered, setIsIntroHovered] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll spy to highlight active section in capsule navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const section of CRM_SECTIONS) {
        const el = document.getElementById(`section-${section.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleJumpToOutput = () => {
    const el = document.getElementById('edsuite-product-demo') || document.getElementById('section-final-output');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleIntroMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches && introVideoRef.current) {
      setIsIntroHovered(true);
      introVideoRef.current.currentTime = 0;
      introVideoRef.current.play().catch(() => {});
    }
  };

  const handleIntroMouseLeave = () => {
    if (introVideoRef.current) {
      setIsIntroHovered(false);
      introVideoRef.current.pause();
      introVideoRef.current.currentTime = 0;
    }
  };

  const prevProject = projectsData.find((p) => p.slug === 'karagir') || projectsData[0];
  const nextProject = projectsData.find((p) => p.slug === 'exam-portal') || projectsData[2];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#0284C7] selection:text-white transition-colors duration-200 relative">
      {/* Lightbox Modal for Full View Screen Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <p className="mt-3 text-sm font-sans text-[#E0E0E0] text-center">
              {lightboxImage.title} — Click outside to close
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          1. COVER & SHORT PROJECT INTRO
          ============================================================ */}
      <section className="pt-10 pb-8 sm:pb-12 px-4 sm:px-8 max-w-6xl mx-auto border-b border-[#E5E2D6] dark:border-[#252525]">
        {/* Top Back Nav & Category Tag */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#605E59] dark:text-[#8E8D88] hover:text-[#111111] dark:hover:text-[#F5F4EF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
            <span>Work</span>
          </button>

          <span className="text-xs font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-widest bg-[#0284C7]/10 border border-[#0284C7]/20 px-3 py-1 rounded-full">
            B2B SaaS CRM
          </span>
        </div>

        {/* Project Title & Short Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.1]">
              edsuit <span className="text-[#0284C7]">CRM</span>
            </h1>

            <p className="text-base sm:text-lg text-[#605E59] dark:text-[#A8A59E] leading-relaxed font-normal">
              A B2B SaaS CRM product for managing high-volume incoming inquiries, scheduling daily follow-ups, and tracking deal pipeline workflows.
            </p>

            {/* Concise Role Card */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>My Involvement</span>
              </div>
              <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                UI & product design in Figma, detailed screen layouts, developer handoff, staging deployment, usability testing with internal teams, and redesigns based on feedback.
              </p>
            </div>
          </div>

          {/* Right: Intro / Cover Media (Plays Logo Video on Hover) */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-video rounded-2xl overflow-hidden bg-[#E2EEF8] dark:bg-[#15232D] border border-[#BAE6FD] dark:border-[#1E3A5F] shadow-lg group cursor-pointer"
              onMouseEnter={handleIntroMouseEnter}
              onMouseLeave={handleIntroMouseLeave}
            >
              <img
                src="/edsuite/edsuite-thumbnail.png"
                alt="edsuit CRM"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isIntroHovered ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <video
                ref={introVideoRef}
                src="/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4"
                muted
                playsInline
                loop
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isIntroHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-bold bg-[#111111]/80 backdrop-blur-sm text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  Hover to preview
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-sans bg-[#0284C7] text-white font-bold">
                  Cover
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. STICKY FLOATING CAPSULE NAVIGATION
          ============================================================ */}
      <CaseStudyNav
        sections={CRM_SECTIONS}
        activeSectionId={activeSection}
        onSectionSelect={scrollToSection}
        accent="crm"
        onJumpToOutput={handleJumpToOutput}
      />

      {/* ============================================================
          3. CASE STUDY FLOW: Context → Brief → What I Did → Design Decisions → Testing → Iterations → Final Output
          ============================================================ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-20">

        {/* 01. CONTEXT */}
        <section id="section-context" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">01</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Context
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-4">
              <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Counseling and sales teams handle high daily volumes of incoming inquiries arriving across multiple channels—campaign forms, direct phone inquiries, and web portals.
              </p>
              <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Without a unified operational tool, reps relied on disconnected spreadsheets and manual notebooks. This resulted in delayed response times, missed callback reminders, and lost pipeline visibility for team leaders.
              </p>
            </div>

            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12]">
                <span className="text-xs font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase block mb-1">
                  The Problem
                </span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Scattered inquiry data and lack of automated callback queues caused high drop-off rates during initial contact.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12]">
                <span className="text-xs font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase block mb-1">
                  The Goal
                </span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Provide an efficient operational CRM for triaging leads, logging call dispositions, and tracking deal movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02. BRIEF */}
        <section id="section-brief" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">02</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Brief
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-4">
            <h3 className="text-xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Create an intuitive B2B CRM workspace optimized for high-speed daily execution.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              The platform needed to give reps immediate access to their daily follow-up queue, enable quick status tagging without leaving the active list, and give team leads real-time oversight of inquiry distribution and response efficiency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020]">
                <span className="text-xs font-sans font-bold text-[#0284C7] block mb-1">Fast Triage</span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">Row-level actions to call, email, or change stage in one click.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020]">
                <span className="text-xs font-sans font-bold text-[#0284C7] block mb-1">Clear Pipeline</span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">Visual stages showing inquiry progression from New to Enrolled.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020]">
                <span className="text-xs font-sans font-bold text-[#0284C7] block mb-1">Activity Log</span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">Automatic recording of call outcomes and scheduled callback dates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 03. WHAT I WORKED ON */}
        <section id="section-what-i-worked-on" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">03</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              What I Worked On
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-4">
              <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                As the UI & product designer, my core responsibilities were focused on crafting the detailed screen designs in Figma and collaborating closely with engineering to see them accurately implemented:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#605E59] dark:text-[#B0AEA8]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span><strong>UI & Screen Design:</strong> Designed all screens in Figma across dashboard, leads table, pipeline kanban, and team views.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span><strong>Design System:</strong> Standardized typography tokens, status tag colors, button states, and data table rows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span><strong>Developer Handoff & Deployment:</strong> Prepared component specs in Figma, conducted visual QA during staging deployment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span><strong>Testing & Iteration:</strong> Tested live workflows with counseling staff to uncover usability bottlenecks and redesign problem areas.</span>
                </li>
              </ul>
            </div>

            {/* Side-by-side Asset: Design System */}
            <div className="md:col-span-7">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Dsystem CRM.png', title: 'edsuit CRM — Design System & Component Library' })}
              >
                <img
                  src="/edsuite/Dsystem CRM.png"
                  alt="edsuit CRM Design System"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Figma Design System Tokens & Component Grid</span>
                  <span className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04. DESIGN DECISIONS */}
        <section id="section-design-decisions" className="scroll-mt-28 space-y-12">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">04</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Design Decisions
            </h2>
          </div>

          {/* Screen 1: Dashboard Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8]">
                Screen 01
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Operations Dashboard
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Prioritized high-level triage counters above the fold so reps immediately see overdue follow-ups, new inquiries, and weekly target progression.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Quick action triggers keep focus on today's tasks
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/CRM dash 1.png', title: 'edsuit CRM — Operations Dashboard' })}
              >
                <img
                  src="/edsuite/CRM dash 1.png"
                  alt="Operations Dashboard"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Dashboard Overview Screen</span>
                  <span className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Screen 2: All Leads Management */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/All leads.png', title: 'edsuit CRM — All Leads Management Directory' })}
              >
                <img
                  src="/edsuite/All leads.png"
                  alt="All Leads Management"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Filterable Leads Directory</span>
                  <span className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8]">
                Screen 02
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                All Leads Directory
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Structured a high-density data table with persistent quick filters (source, stage, assigned counselor, priority). Inline row controls allow quick contact logging without navigating into full subpages.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Compact status pills prevent visual clutter across 50+ rows
              </div>
            </div>
          </div>

          {/* Screen 3: Visual Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8]">
                Screen 03
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Visual Opportunity Pipeline
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Designed a kanban pipeline view where reps can drag leads through qualification stages. Stage headers display deal counts and total potential value to keep goals front and center.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Visual progression clarifies deal velocity at a glance
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Lead pipeline.png', title: 'edsuit CRM — Opportunity Kanban Pipeline' })}
              >
                <img
                  src="/edsuite/Lead pipeline.png"
                  alt="Opportunity Kanban Pipeline"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Visual Pipeline Board</span>
                  <span className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Screen 4: Scheduled Follow-ups */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Follow-ups 4.png', title: 'edsuit CRM — Scheduled Follow-ups & Reminders' })}
              >
                <img
                  src="/edsuite/Follow-ups 4.png"
                  alt="Scheduled Follow-ups"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Scheduled Follow-ups View</span>
                  <span className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8]">
                Screen 04
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Scheduled Follow-ups Queue
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                A calendar-ordered queue grouping callbacks by Today, Overdue, and Upcoming. Reps can dial, update disposition notes, or reschedule right from the row.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Eliminates forgotten callbacks with explicit time tags
              </div>
            </div>
          </div>

          {/* Screen 5: Team & Agent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8]">
                Screen 05
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Team Capacity & Activity
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Management views for assigning incoming inquiries, monitoring rep workload distribution, and reviewing daily call connection statistics.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Balanced workload prevents counselor burnout
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Team & agents.png', title: 'edsuit CRM — Team Workload & Agent Reporting' })}
              >
                <img
                  src="/edsuite/Team & agents.png"
                  alt="Team & Agent Management"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Team Workload Overview</span>
                  <span className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05. TESTING */}
        <section id="section-testing" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">05</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Testing
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed max-w-3xl">
              During staging deployment, we tested the interface with active counseling staff who work through 60–100 calls daily. Observing their real interactions highlighted several critical friction points:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Issue 01: Context Loss</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Navigating to detail pages broke workflow
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Opening full lead detail pages lost the rep's scroll position and active table filters in the all-leads list, creating repetitive re-filtering fatigue.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Issue 02: Disposition Friction</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Logging call outcomes took too many clicks
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Counselors needed to log "No Answer", "Busy", or "Follow-up Scheduled" within 5 seconds before the next call. The initial form was too cumbersome.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Issue 03: Status Ambiguity</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Unclear lead state transitions
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Certain status tags like "In Review" were confusing to reps because they didn't clearly communicate who owned the next action step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06. CHANGES & ITERATIONS */}
        <section id="section-iterations" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">06</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Changes & Iterations
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-6">
            <h3 className="text-xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Reworking the interface based directly on user testing feedback.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-2 border-l-4 border-[#0284C7]">
                <span className="text-xs font-sans font-bold text-[#0284C7] uppercase block">Fix 01: Slide-Over Panel</span>
                <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                  Replaced full-page navigation with a quick slide-over drawer that slides in from the right. The background table retains exact scroll, filters, and selection.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-2 border-l-4 border-[#0284C7]">
                <span className="text-xs font-sans font-bold text-[#0284C7] uppercase block">Fix 02: 1-Tap Quick Dispositions</span>
                <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                  Added a single-tap disposition bar allowing reps to record call outcomes and automatically advance to the next lead in under 3 seconds.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-2 border-l-4 border-[#0284C7]">
                <span className="text-xs font-sans font-bold text-[#0284C7] uppercase block">Fix 03: Action-Oriented Statuses</span>
                <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                  Refined status nomenclature to reflect active responsibility: "Needs Callback", "Waiting on Documents", and "Ready for Offer".
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 07. FINAL OUTPUT & DEMO */}
        <section id="section-final-output" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">07</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Final Output & Demo
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed max-w-3xl">
              The delivered platform provides teams with a stable, high-velocity operational workspace. The video below demonstrates the live interface in action, walking through triage queues, pipeline navigation, and core interaction patterns.
            </p>
          </div>

          {/* Video Container — The Demo Video appears ONCE here */}
          <div id="edsuite-product-demo" className="rounded-2xl p-4 sm:p-6 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-[#BAE6FD] dark:border-[#1E3A5F] shadow-lg space-y-4 scroll-mt-28">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#0284C7]">
                <Play className="w-4 h-4 fill-[#0284C7]" />
                <span>Product Walkthrough</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans bg-[#E0F2FE] dark:bg-[#082F49] text-[#0369A1] dark:text-[#7DD3FC] font-bold">
                Interactive Recording
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-black/20 shadow-inner">
              <video
                src="/edsuite/CRM New PDV-2.mp4"
                controls
                playsInline
                preload="metadata"
                poster="/edsuite/CRM dash 1.png"
                className="w-full h-full object-contain"
              >
                <source src="/edsuite/CRM New PDV-2.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. CLOSING: Card-Style Previous / Next Project Navigation
            ============================================================ */}
        <CaseStudyPagination
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={onSelectProject}
        />
      </main>
    </div>
  );
};
