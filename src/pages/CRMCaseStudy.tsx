import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Monitor,
  Play,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Sparkles,
  ChevronDown,
  X,
  FileText,
  Eye,
  Clock,
  Filter,
  Kanban,
  PhoneCall,
  Users,
  Compass,
  ArrowUpRight,
  SplitSquareVertical,
  Workflow,
  Sparkle,
  Search,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Calendar,
  Phone,
  BarChart3,
  Flame,
  LayoutGrid,
  Maximize2
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
  { id: 'process', number: '02', title: 'Process' },
  { id: 'contributions', number: '03', title: 'What I Worked On' },
  { id: 'design-system', number: '04', title: 'Design System' },
  { id: 'design-decisions', number: '05', title: 'Design Decisions' },
  { id: 'testing', number: '06', title: 'Testing' },
  { id: 'iterations', number: '07', title: 'Iterations' },
  { id: 'final-output', number: '08', title: 'Final Output' },
];

export const CRMCaseStudy: React.FC<CRMCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [activeSection, setActiveSection] = useState<string>('context');
  const [activeDashScreen, setActiveDashScreen] = useState<number>(1);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const coverVideoRef = useRef<HTMLVideoElement | null>(null);
  const demoVideoRef = useRef<HTMLVideoElement | null>(null);
  const isClickNavigatingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to top on initial mount and ensure cover video plays
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (coverVideoRef.current) {
      coverVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Keyboard navigation: Escape key returns to portfolio overview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Deterministic scroll spy ensuring consistent active pill without flickering
  useEffect(() => {
    const handleScroll = () => {
      if (isClickNavigatingRef.current) return;

      const scrollPosition = window.scrollY + 160;

      let currentSection = CRM_SECTIONS[0].id;
      for (const section of CRM_SECTIONS) {
        const el = document.getElementById(`section-${section.id}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 20) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isClickNavigatingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 900);

    const el = document.getElementById(`section-${id}`);
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
    scrollToSection('final-output');
  };

  const prevProject = projectsData.find((p) => p.slug === 'exam-portal') || projectsData[2];
  const nextProject = projectsData.find((p) => p.slug === 'karagir') || projectsData[1];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#0284C7] selection:text-white transition-colors duration-200 relative">
      
      {/* ============================================================
          1. HERO VIEWPORT & IMMERSIVE PROJECT OPENING
          Clean cover video showcase + concise metadata card
          ============================================================ */}
      <section className="w-full pt-4 pb-8 px-4 sm:px-6 max-w-6xl mx-auto border-b border-black/[0.08] dark:border-white/[0.08]">
        {/* Cover Video Frame — CRM Intro Video looping preview */}
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-[#0B1420] aspect-video flex items-center justify-center relative">
          <video
            ref={coverVideoRef}
            src="/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4"
            poster="/edsuite/CRM dash 1.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('EdSuit_CRM_logo_intro')) {
                target.src = '/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4';
                target.play().catch(() => {});
              }
            }}
            className="w-full h-full object-contain block select-none"
          >
            <source src="/edsuite/EdSuit_CRM_logo_intro_202607131741.mp4" type="video/mp4" />
            <source src="/EdSuit_CRM_logo_intro_202607131741.mp4" type="video/mp4" />
            <source src="/edsuite/CRM.mp4" type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Project Metadata Card */}
        <div className="mt-8 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold tracking-widest text-[#0284C7] dark:text-[#38BDF8] uppercase block mb-1">
              PRODUCT & UI DESIGN · B2B SAAS
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              edsuit CRM
            </h1>
            <p className="text-sm font-sans text-[#605E59] dark:text-[#8E8D88] mt-1 max-w-xl">
              An operational workspace designed for rapid lead triage, scheduled callback tracking, and clear pipeline progression.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5E2D6] dark:border-[#2A2A2A] md:pl-8 text-xs font-sans">
            <div>
              <span className="text-[#8E8D88] uppercase block mb-1 font-medium">My Role</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">
                UX & UI Designer
              </span>
            </div>
            <div>
              <span className="text-[#8E8D88] uppercase block mb-1 font-medium">Key Deliverables</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">
                Figma Screens & Design System
              </span>
            </div>
            <div>
              <span className="text-[#8E8D88] uppercase block mb-1 font-medium">Industry</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">
                B2B SaaS
              </span>
            </div>
            <div>
              <span className="text-[#8E8D88] uppercase block mb-1 font-medium">Timeline</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">
                Summer Internship · 2026
              </span>
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
        onBack={onBack}
      />

      {/* ============================================================
          3. MAIN CASE STUDY CONTENT: VISUAL-FIRST STORYTELLING
          ============================================================ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-24">

        {/* ------------------------------------------------------------
            01. CONTEXT: WHY THIS EXISTS & THE OPERATIONAL BREAKDOWN
            ------------------------------------------------------------ */}
        <section id="section-context" className="scroll-mt-28 space-y-10">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">01</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Context
            </h2>
          </div>

          {/* THE HUMAN DESIGN CHALLENGE STATEMENT */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-6">
            {/* Split Layout: Large Hook Statement on Left, 3 Stacked Glass Cards on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left Column: Eyebrow Tag + Large 3-Line Hook Statement */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  WHY THIS EXISTS
                </span>
                <h3 className="text-2xl sm:text-3xl xl:text-[2rem] font-bold text-black dark:text-white leading-[1.3] tracking-tight">
                  Every day, new enquiries come in from multiple channels. Someone has to{' '}
                  <span className="text-[#0284C7] dark:text-[#38BDF8]">
                    capture, follow up, and move them through a pipeline
                  </span>{' '}
                  — and that’s where the challenge begins.
                </h3>
              </div>

              {/* Right Column: 3 Compact Glassmorphism Cards Stacked Vertically */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F7F6F0]/80 dark:bg-[#202020]/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                    What is CRM?
                  </span>
                  <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                    Customer Relationship Management (CRM) is a central workspace for teams to capture inbound leads, schedule callbacks, and guide inquiries to enrollment.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F7F6F0]/80 dark:bg-[#202020]/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    The problem
                  </span>
                  <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                    Leads were scattered across spreadsheets, paper registers, and loose notes. Callbacks got lost and leadership lacked visibility.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F7F6F0]/80 dark:bg-[#202020]/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    What I improved
                  </span>
                  <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                    Designed an operational interface that unites lead intake, scheduled callbacks, and visual stage progression on a single screen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Journey Stages: Situation · Need · Observation · Friction · Opportunity */}
          <div className="space-y-6 sm:space-y-8">
            {/* 5 Compact Stage Cards with Hand-drawn Doodle Connector Line */}
            <div className="relative">
              {/* Sequential Subtle Doodle Connector Arrows (Desktop SVG) */}
              <svg
                className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                {/* 1 -> 2: Situation to Need (Delicate micro-curve) */}
                <g className="opacity-60 hover:opacity-100 transition-opacity">
                  <path
                    d="M 191 30 C 194 27, 198 28, 201 30"
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="2 1.5"
                    className="dark:stroke-[#38BDF8]"
                  />
                  <path
                    d="M 197.5 28 L 201 30 L 197.5 32"
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-[#38BDF8]"
                  />
                </g>

                {/* 2 -> 3: Need to Observation (Delicate micro-dip) */}
                <g className="opacity-60 hover:opacity-100 transition-opacity">
                  <path
                    d="M 394 30 C 397 32.5, 401 32, 404 30"
                    stroke="#D97706"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="2 1.5"
                    className="dark:stroke-[#F59E0B]"
                  />
                  <path
                    d="M 400.5 28 L 404 30 L 400.5 32"
                    stroke="#D97706"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-[#F59E0B]"
                  />
                </g>

                {/* 3 -> 4: Observation to Friction (Delicate micro-curve) */}
                <g className="opacity-60 hover:opacity-100 transition-opacity">
                  <path
                    d="M 597 30 C 600 27.5, 604 28, 607 30"
                    stroke="#E04F4F"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="2 1.5"
                    className="dark:stroke-[#F87171]"
                  />
                  <path
                    d="M 603.5 28 L 607 30 L 603.5 32"
                    stroke="#E04F4F"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-[#F87171]"
                  />
                </g>

                {/* 4 -> 5: Friction to Opportunity (Delicate micro-dip) */}
                <g className="opacity-60 hover:opacity-100 transition-opacity">
                  <path
                    d="M 800 30 C 803 32.5, 807 32, 810 30"
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="2 1.5"
                    className="dark:stroke-[#38BDF8]"
                  />
                  <path
                    d="M 806.5 28 L 810 30 L 806.5 32"
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-[#38BDF8]"
                  />
                </g>
              </svg>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
                {/* Situation */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/85 dark:bg-[#161616]/85 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] shadow-xs flex items-center justify-between gap-2 hover:bg-white/95 dark:hover:bg-[#1b1b1b]/95 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <Filter className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                    <h4 className="text-sm sm:text-base font-bold text-[#0284C7] dark:text-[#38BDF8] leading-snug">
                      Situation
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#0284C7]/60 dark:text-[#38BDF8]/60 lg:hidden">→</span>
                </div>

                {/* Need */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/85 dark:bg-[#161616]/85 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] shadow-xs flex items-center justify-between gap-2 hover:bg-white/95 dark:hover:bg-[#1b1b1b]/95 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                    <h4 className="text-sm sm:text-base font-bold text-[#0284C7] dark:text-[#38BDF8] leading-snug">
                      Need
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#0284C7]/60 dark:text-[#38BDF8]/60 lg:hidden">→</span>
                </div>

                {/* Observation */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/85 dark:bg-[#161616]/85 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] shadow-xs flex items-center justify-between gap-2 hover:bg-white/95 dark:hover:bg-[#1b1b1b]/95 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B] shrink-0" />
                    <h4 className="text-sm sm:text-base font-bold text-[#D97706] dark:text-[#F59E0B] leading-snug">
                      Observation
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#D97706]/60 dark:text-[#F59E0B]/60 lg:hidden">→</span>
                </div>

                {/* Friction */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/85 dark:bg-[#161616]/85 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] shadow-xs flex items-center justify-between gap-2 hover:bg-white/95 dark:hover:bg-[#1b1b1b]/95 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#E04F4F] shrink-0" />
                    <h4 className="text-sm sm:text-base font-bold text-[#E04F4F] leading-snug">
                      Friction
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#E04F4F]/60 lg:hidden">→</span>
                </div>

                {/* Opportunity */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#E0F2FE]/80 dark:bg-[#082F49]/70 backdrop-blur-md border border-[#0284C7]/30 dark:border-[#38BDF8]/30 shadow-xs flex items-center gap-2.5 hover:bg-[#E0F2FE]/95 dark:hover:bg-[#082F49]/85 transition-all">
                  <Sparkles className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                  <h4 className="text-sm sm:text-base font-bold text-[#0284C7] dark:text-[#38BDF8] leading-snug">
                    Opportunity
                  </h4>
                </div>
              </div>
            </div>

            {/* Panoramic Storyboard Graphic */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#FAF9F5] dark:bg-[#151515] shadow-sm">
              <img
                src="/edsuite/crm-context-story-light.png"
                alt="Story of how inquiries scatter across spreadsheets and notes, creating the need for a unified CRM workspace"
                className="w-full h-auto block dark:hidden select-none"
              />
              <img
                src="/edsuite/crm-context-story-dark.png"
                alt="Story of how inquiries scatter across spreadsheets and notes, creating the need for a unified CRM workspace"
                className="w-full h-auto hidden dark:block select-none"
              />
            </div>
          </div>

          {/* Visual Progression Pipeline: Fragmented Inquiries → Scattered Follow-ups → Difficult Triage → Lost Context → Unified Workspace */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#0284C7] dark:text-[#38BDF8] flex items-center gap-2">
                <Workflow className="w-4 h-4" />
                The Operational Breakdown Chain
              </span>
              <span className="text-xs font-sans text-[#8E8D88]">Problem Evolution</span>
            </div>

            {/* 5-Node Visual Flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {/* Node 1 */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans font-bold text-[#E04F4F]">01 · Influx</span>
                  <Flame className="w-3.5 h-3.5 text-[#E04F4F]" />
                </div>
                <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">Fragmented Inquiries</h4>
                <div className="space-y-1">
                  <div className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-[#151515] border border-black/[0.08] dark:border-white/[0.08] text-[#605E59] dark:text-[#A09E97]">
                    Form #1042
                  </div>
                  <div className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-[#151515] border border-black/[0.08] dark:border-white/[0.08] text-[#605E59] dark:text-[#A09E97]">
                    Inbound Dial
                  </div>
                </div>
                <p className="text-[11px] text-[#8E8D88] leading-tight">Multi-source intake without centralized triage.</p>
              </div>

              {/* Node 2 */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans font-bold text-[#E04F4F]">02 · Reminders</span>
                  <Clock className="w-3.5 h-3.5 text-[#E04F4F]" />
                </div>
                <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">Scattered Follow-ups</h4>
                <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[10px] font-handwriting text-amber-800 dark:text-amber-300">
                  "Call back 2:30 PM"
                </div>
                <p className="text-[11px] text-[#8E8D88] leading-tight">Paper notes and personal calendars get misplaced.</p>
              </div>

              {/* Node 3 */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans font-bold text-[#E04F4F]">03 · Velocity</span>
                  <AlertCircle className="w-3.5 h-3.5 text-[#E04F4F]" />
                </div>
                <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">Difficult Triage</h4>
                <div className="px-2 py-1 rounded bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-[10px] font-mono text-red-700 dark:text-red-300">
                  50+ unassigned rows
                </div>
                <p className="text-[11px] text-[#8E8D88] leading-tight">Initial 15-minute high intent window missed.</p>
              </div>

              {/* Node 4 */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans font-bold text-[#E04F4F]">04 · UX Friction</span>
                  <SplitSquareVertical className="w-3.5 h-3.5 text-[#E04F4F]" />
                </div>
                <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">Lost Context</h4>
                <div className="px-2 py-1 rounded bg-white dark:bg-[#151515] border border-black/[0.08] dark:border-white/[0.08] text-[10px] text-red-600 dark:text-red-400 font-mono">
                  ❌ Table filter reset
                </div>
                <p className="text-[11px] text-[#8E8D88] leading-tight">Navigating away erases search and active filters.</p>
              </div>

              {/* Node 5: Solution Destination */}
              <div className="p-4 rounded-2xl bg-[#E0F2FE]/70 dark:bg-[#082F49]/40 border border-[#0284C7]/30 dark:border-[#38BDF8]/30 space-y-2.5 relative shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans font-bold text-[#0284C7] dark:text-[#38BDF8]">05 · Destination</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                </div>
                <h4 className="text-xs font-bold text-[#0369A1] dark:text-[#7DD3FC]">Unified Workspace</h4>
                <div className="px-2 py-1 rounded bg-white/90 dark:bg-[#0c1f33] border border-[#0284C7]/20 text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                  ✓ 1-Tap Triage Cockpit
                </div>
                <p className="text-[11px] text-[#0369A1]/80 dark:text-[#7DD3FC]/80 leading-tight">Persistent table, slide-over drawer, and visual pipeline.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------
            02. PROCESS: HOW I APPROACHED IT (Visual Journey & Tools)
            ------------------------------------------------------------ */}
        <section id="section-process" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">02</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Process
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              How I approached it: Visual thinking, AI co-pilots, and rapid screen iteration.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Rather than generic UX dogma, the design process paired domain research and product logic with modern AI modeling and Figma design tokens to ship a resilient production workspace.
            </p>
          </div>

          {/* Visual Step-by-Step Journey with Tool Markers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
                    Phase 01 · Discovery
                  </span>
                  <div
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#F7F6F0] dark:bg-[#252525] border border-black/[0.06] dark:border-white/[0.08]"
                    title="Stitch & Claude"
                  >
                    <span className="sr-only">Stitch & Claude</span>
                    {/* Stitch Logo */}
                    <div title="Stitch" className="flex items-center justify-center">
                      <img
                        src="/stitch-logo.png"
                        alt="Stitch"
                        className="w-4 h-4 rounded-[4px] object-cover shrink-0"
                      />
                    </div>
                    {/* Claude Logo */}
                    <div title="Claude" className="flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-[4px] shrink-0" fill="none">
                        <rect width="24" height="24" rx="4" fill="#CC785C"/>
                        <g transform="translate(4, 4)">
                          <path
                            d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Workflow & Ingestion Architecture
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Mapped counseling inquiry lifecycles and edge cases. Used Claude and Stitch to stress-test lead reassignment logic and stage definitions before touching Figma.
                </p>
              </div>
              <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] text-[11px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                → Lead routing & triage blueprint
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
                    Phase 02 · Screen Design
                  </span>
                  <div
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#F7F6F0] dark:bg-[#252525] border border-black/[0.06] dark:border-white/[0.08]"
                    title="Figma & ChatGPT"
                  >
                    <span className="sr-only">Figma & ChatGPT</span>
                    {/* Figma Logo */}
                    <div title="Figma" className="flex items-center justify-center">
                      <svg viewBox="0 0 38 57" className="w-2.5 h-4 shrink-0" fill="none">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                    </div>
                    {/* ChatGPT Logo */}
                    <div title="ChatGPT" className="flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 rounded-[4px] shrink-0 border border-black/10 dark:border-white/10" fill="none">
                        <rect width="24" height="24" rx="4" fill="#FFFFFF"/>
                        <g transform="translate(3.5, 3.5) scale(0.708)">
                          <path
                            d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                            fill="#000000"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  High-Density UI & Design Tokens
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Crafted complete views for Dashboard, All Leads, Pipeline, Follow-ups, and Team Activity. Established tokenized typography, row paddings, and status chips in Figma.
                </p>
              </div>
              <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] text-[11px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                → Production Figma screens & tokens
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
                    Phase 03 · Validation
                  </span>
                  <div
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#F7F6F0] dark:bg-[#252525] border border-black/[0.06] dark:border-white/[0.08]"
                    title="Gemini & Staging QA"
                  >
                    <span className="sr-only">Gemini & Staging QA</span>
                    {/* Gemini Logo */}
                    <div title="Gemini" className="flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                        <path
                          d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
                          fill="url(#gemini-sparkle-proc-step3)"
                        />
                        <defs>
                          <linearGradient id="gemini-sparkle-proc-step3" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#1B72E8" />
                            <stop offset="50%" stopColor="#8E24AA" />
                            <stop offset="100%" stopColor="#FF7769" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Staging QA Badge */}
                    <div
                      title="Staging QA"
                      className="px-1 py-0.5 rounded-[4px] bg-[#0284C7]/15 dark:bg-[#38BDF8]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center text-[9px] font-sans font-black tracking-tight leading-none shrink-0"
                    >
                      QA
                    </div>
                  </div>
                </div>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Interaction Fixes & Production Handoff
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Tested the live build with counseling reps under high daily inquiry velocity. Replaced full-page detours with non-blocking slide-over drawers and 1-tap call disposition bars.
                </p>
              </div>
              <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] text-[11px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                → Verified, deployed product
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------
            03. WHAT I WORKED ON: VISUAL OVERVIEW OF MY CONTRIBUTION
            ------------------------------------------------------------ */}
        <section id="section-contributions" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">03</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              What I Worked On
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Hands-on UI architecture across the entire operational lifecycle.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Every screen, interaction flow, and component state was designed to minimize clicks and eliminate lost context during high-speed triage.
            </p>
          </div>

          {/* Visual Grid of Core Contributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Dashboard */}
            <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between">
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  01 · Triage Cockpit
                </span>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Operations Dashboard
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">
                  High-level inquiry counters, overdue callback alarms, and today's team targets above the fold.
                </p>
              </div>
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141414] border-t border-black/[0.06] dark:border-white/[0.08]">
                <img
                  src="/edsuite/CRM dash 1.png"
                  alt="Operations Dashboard"
                  className="w-full h-40 object-cover object-top rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
                />
              </div>
            </div>

            {/* Card 2: Leads Management */}
            <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between">
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  02 · Data Density
                </span>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  All Leads Directory
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">
                  Compact data-table with persistent search, multi-parameter filters, and 1-click contact actions.
                </p>
              </div>
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141414] border-t border-black/[0.06] dark:border-white/[0.08]">
                <img
                  src="/edsuite/All leads.png"
                  alt="All Leads Management"
                  className="w-full h-40 object-cover object-top rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
                />
              </div>
            </div>

            {/* Card 3: Opportunity Pipeline */}
            <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between">
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  03 · Deal Velocity
                </span>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Visual Opportunity Pipeline
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">
                  Interactive kanban board to drag prospects across stages with instant revenue and conversion rollups.
                </p>
              </div>
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141414] border-t border-black/[0.06] dark:border-white/[0.08]">
                <img
                  src="/edsuite/Lead pipeline.png"
                  alt="Opportunity Kanban Pipeline"
                  className="w-full h-40 object-cover object-top rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
                />
              </div>
            </div>

            {/* Card 4: Scheduled Follow-ups */}
            <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between">
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  04 · Callback Discipline
                </span>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Scheduled Follow-ups Queue
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">
                  Time-stamped queue separating Overdue, Today, and Upcoming callbacks with 1-tap outcome logging.
                </p>
              </div>
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141414] border-t border-black/[0.06] dark:border-white/[0.08]">
                <img
                  src="/edsuite/Follow-ups 4.png"
                  alt="Scheduled Follow-ups Queue"
                  className="w-full h-40 object-cover object-top rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
                />
              </div>
            </div>

            {/* Card 5: Team Capacity */}
            <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between">
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  05 · Operations Oversight
                </span>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Team Capacity & Call Logs
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">
                  Lead allocation by counselor workload and aggregated daily connection metrics.
                </p>
              </div>
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141414] border-t border-black/[0.06] dark:border-white/[0.08]">
                <img
                  src="/edsuite/Team & agents.png"
                  alt="Team Workload Management"
                  className="w-full h-40 object-cover object-top rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
                />
              </div>
            </div>

            {/* Card 6: Design System */}
            <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between">
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  06 · Scalability
                </span>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Figma Component System
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">
                  Reusable status tags, dense data-table cells, button states, and modal layout specs.
                </p>
              </div>
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141414] border-t border-black/[0.06] dark:border-white/[0.08]">
                <img
                  src="/edsuite/Dsystem CRM.png"
                  alt="CRM Component System"
                  className="w-full h-40 object-cover object-top rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------
            04. DESIGN SYSTEM: CURATED COMPONENT SHOWCASE
            ------------------------------------------------------------ */}
        <section id="section-design-system" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">04</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Design System
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              The system behind the speed: Reusable tokens and micro-interactions.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Every token was engineered for data density and immediate recognition. Designed in Figma and mapped directly to front-end classes.
            </p>
          </div>

          {/* Curated Component Architecture Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-8">
            
            {/* Row 1: Color Tokens & Status Tag Taxonomy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Color Tokens */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-sans font-bold text-[#8E8D88] uppercase tracking-wider block">
                  Color Tokens & Semantic Roles
                </span>
                <div className="grid grid-cols-5 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#0284C7] text-white text-center">
                    <span className="text-[10px] font-mono font-bold block">#0284C7</span>
                    <span className="text-[9px] opacity-80 block">Primary</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B1420] text-white text-center">
                    <span className="text-[10px] font-mono font-bold block">#0B1420</span>
                    <span className="text-[9px] opacity-80 block">Canvas</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#10B981] text-white text-center">
                    <span className="text-[10px] font-mono font-bold block">#10B981</span>
                    <span className="text-[9px] opacity-80 block">Success</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F59E0B] text-white text-center">
                    <span className="text-[10px] font-mono font-bold block">#F59E0B</span>
                    <span className="text-[9px] opacity-80 block">Warning</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#EF4444] text-white text-center">
                    <span className="text-[10px] font-mono font-bold block">#EF4444</span>
                    <span className="text-[9px] opacity-80 block">Urgent</span>
                  </div>
                </div>
              </div>

              {/* Status Pill System */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-sans font-bold text-[#8E8D88] uppercase tracking-wider block">
                  Action-Driven Status Pill Taxonomy
                </span>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8] border border-[#0284C7]/20">
                    New Lead
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    Contacted
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    Needs Callback
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                    Docs in Review
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-500/20">
                    Ready for Offer
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                    Cold / Dropped
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Live High-Density Table Row Fragment */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-sans font-bold text-[#8E8D88] uppercase tracking-wider block">
                High-Density Data Row Component (Figma Token Spec)
              </span>
              <div className="rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#FAF9F5] dark:bg-[#141414] shadow-xs">
                {/* Header */}
                <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-[#F0EEE6] dark:bg-[#1E1E1E] text-[11px] font-sans font-bold text-[#605E59] dark:text-[#A09E97] uppercase tracking-wider">
                  <div className="col-span-4">Lead Contact</div>
                  <div className="col-span-3">Inquiry Source</div>
                  <div className="col-span-3">Current Status</div>
                  <div className="col-span-2 text-right">Quick Action</div>
                </div>

                {/* Sample Live Component Rows */}
                <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06] text-xs">
                  <div className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-4 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold text-[11px]">
                        AK
                      </div>
                      <div>
                        <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">Aarav Kulkarni</span>
                        <span className="text-[11px] text-[#8E8D88]">+91 98201 ••••</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
                        Admissions Form
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        Needs Callback
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button className="px-3 py-1 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-default">
                        <Phone className="w-3 h-3" /> Dial
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-4 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                        SP
                      </div>
                      <div>
                        <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">Sneha Patil</span>
                        <span className="text-[11px] text-[#8E8D88]">+91 94220 ••••</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/50">
                        Paid Ad Campaign
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-500/20">
                        Ready for Offer
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button className="px-3 py-1 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-default">
                        <Phone className="w-3 h-3" /> Dial
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Cropped Figma System Preview */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-sans font-bold text-[#8E8D88] uppercase tracking-wider block">
                Figma Component Architecture (Library Overview)
              </span>
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#FAF9F5] dark:bg-[#121212]">
                <img
                  src="/edsuite/Dsystem CRM.png"
                  alt="CRM Component Tokens"
                  className="w-full h-auto max-h-[380px] object-cover object-top block"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------
            05. DESIGN DECISIONS: SCREENS AS VISUAL HEROES
            ------------------------------------------------------------ */}
        <section id="section-design-decisions" className="scroll-mt-28 space-y-16">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">05</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Design Decisions
            </h2>
          </div>

          {/* Screen 1: Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
                Screen 01 · Triage Center
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Operations Dashboard
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Prioritized overdue callbacks and daily targets above the fold. Counselors open the CRM and immediately know their next required touchpoint without clicking into sub-menus.
              </p>

              {/* Interactive Multi-View Selector */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  { id: 1, label: 'Triage Overview', file: '/edsuite/dash-1.png' },
                  { id: 2, label: 'Inbound Feed', file: '/edsuite/dash-2.png' },
                  { id: 3, label: 'Performance Metrics', file: '/edsuite/dash-3.png' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveDashScreen(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                      activeDashScreen === item.id
                        ? 'bg-[#0284C7] text-white shadow-sm'
                        : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#605E59] dark:text-[#A09E97] hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → High-contrast counters cut morning planning from 20 minutes to seconds
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-md">
                <img
                  src={
                    activeDashScreen === 1
                      ? '/edsuite/dash-1.png'
                      : activeDashScreen === 2
                      ? '/edsuite/dash-2.png'
                      : '/edsuite/dash-3.png'
                  }
                  alt={`Operations Dashboard View ${activeDashScreen}`}
                  className="w-full h-auto object-cover object-top max-h-[460px] block transition-opacity duration-200"
                />
              </div>
            </div>
          </div>

          {/* Screen 2: All Leads Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-md">
                <img
                  src="/edsuite/All leads.png"
                  alt="All Leads Management"
                  className="w-full h-auto object-cover object-top max-h-[460px] block"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
                Screen 02 · Data Density
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                All Leads Directory
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Engineered a high-density data table with sticky headers, persistent filters, and row action triggers. Roster rows can be updated or called right from the list without losing table position.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Compact status pills eliminate visual clutter across 50+ rows
              </div>
            </div>
          </div>

          {/* Screen 3: Visual Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
                Screen 03 · Deal Velocity
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Visual Opportunity Pipeline
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Designed a kanban pipeline view where reps drag leads through qualification stages. Stage headers display deal counts and total potential value to maintain goal alignment.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Visual progression clarifies deal velocity at a glance
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-md">
                <img
                  src="/edsuite/Lead pipeline.png"
                  alt="Opportunity Kanban Pipeline"
                  className="w-full h-auto object-cover object-top max-h-[460px] block"
                />
              </div>
            </div>
          </div>

          {/* Screen 4: Scheduled Follow-ups Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-md">
                <img
                  src="/edsuite/Follow-ups 4.png"
                  alt="Scheduled Follow-ups Queue"
                  className="w-full h-auto object-cover object-top max-h-[460px] block"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
                Screen 04 · Execution Discipline
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Scheduled Follow-ups Queue
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                A calendar-ordered queue grouping callbacks by Overdue, Today, and Upcoming. Reps can dial, update disposition notes, or reschedule right from the row.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Eliminates forgotten callbacks with explicit time tags
              </div>
            </div>
          </div>

          {/* Screen 5: Team Capacity & Call Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
                Screen 05 · Team Oversight
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Team Capacity & Analytics
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Management views for assigning incoming inquiries, monitoring counselor workload distribution, and reviewing daily call connection statistics.
              </p>
              <div className="font-handwriting text-lg text-[#0284C7] dark:text-[#38BDF8] pt-1">
                → Balanced workload prevents counselor burnout
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-md">
                <img
                  src="/edsuite/Team & agents.png"
                  alt="Team Workload Management"
                  className="w-full h-auto object-cover object-top max-h-[300px] block"
                />
              </div>

              <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-md">
                <img
                  src="/edsuite/Call Activity Report.png"
                  alt="Daily Call Activity Report"
                  className="w-full h-auto object-cover object-top max-h-[220px] block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------
            06. TESTING & VALIDATION: VISUAL INTERACTION FLAWS & FIXES
            ------------------------------------------------------------ */}
        <section id="section-testing" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">06</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Testing & Validation
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Field testing: Uncovering real interaction bottlenecks on staging.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Watching counselors interact with the prototype under real inbound velocity uncovered three critical interaction flaws that traditional wireframing overlooked.
            </p>
          </div>

          {/* 3 Visual Interaction Flaw vs. Improved Interaction Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Flaw 1: Context Loss */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Flaw 01 · Context Loss</span>
                </div>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Full-page navigation broke triage flow
                </h4>
                
                {/* Visual Interaction Sequence */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300">
                    <span className="font-bold block mb-0.5">Original Flow:</span>
                    Lead Table → Navigate Page → ❌ Active filters and scroll position wiped out.
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold block mb-0.5">Tested Fix:</span>
                    Lead Table → Click Row → ✓ Slide-over drawer keeps table 100% visible behind.
                  </div>
                </div>
              </div>
            </div>

            {/* Flaw 2: Disposition Friction */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Flaw 02 · Disposition Friction</span>
                </div>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Multi-click call logging caused fatigue
                </h4>

                {/* Visual Interaction Sequence */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300">
                    <span className="font-bold block mb-0.5">Original Flow:</span>
                    Call Ends → Open Modal → 3 Dropdowns → ❌ Excessive clicks during rapid outreach.
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold block mb-0.5">Tested Fix:</span>
                    Call Ends → 1-Tap Disposition Bar (No Answer / Busy / Set Callback) → Auto-advances.
                  </div>
                </div>
              </div>
            </div>

            {/* Flaw 3: Status Ambiguity */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Flaw 03 · Status Ambiguity</span>
                </div>
                <h4 className="text-base font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Passive statuses caused handoff confusion
                </h4>

                {/* Visual Interaction Sequence */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300">
                    <span className="font-bold block mb-0.5">Original Flow:</span>
                    Status: "In Review" → ❌ Unclear next-action responsibility.
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold block mb-0.5">Tested Fix:</span>
                    Status: "Needs Callback" | "Docs Pending" → ✓ Explicit owner accountability.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------
            07. CHANGES & ITERATIONS: VISUAL UX REDESIGN JOURNEY
            ------------------------------------------------------------ */}
        <section id="section-iterations" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">07</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Changes & Iterations
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Transforming testing insights into high-velocity UI patterns.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Every major iteration followed a strict loop: Problem → Insight → Design Response → New Flow.
            </p>
          </div>

          {/* Iteration Journey Cards */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-8">
            
            {/* Iteration 1 */}
            <div className="space-y-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  Interaction Redesign 01
                </span>
                <span className="text-xs font-sans text-[#8E8D88]">Drawer vs. Page Detour</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-red-500 block">Problem</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Full-page lead detail view broke triage momentum.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-500 block">Insight</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Counselors only need 4 core fields during an active call.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#0284C7] dark:text-[#38BDF8] block">Design Response</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Replaced page transition with right-side slide-over drawer.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">New Flow</span>
                  <p className="text-emerald-800 dark:text-emerald-300 font-medium">100% table filter and scroll preservation.</p>
                </div>
              </div>
            </div>

            {/* Iteration 2 */}
            <div className="space-y-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  Interaction Redesign 02
                </span>
                <span className="text-xs font-sans text-[#8E8D88]">Single-Tap Disposition Bar</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-red-500 block">Problem</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Post-call dropdown modal required 4 non-standard clicks.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-500 block">Insight</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">90% of calls result in one of three standardized outcomes.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#0284C7] dark:text-[#38BDF8] block">Design Response</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Built a 1-tap outcome dock directly into the call footer.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">New Flow</span>
                  <p className="text-emerald-800 dark:text-emerald-300 font-medium">Instant 1-tap logging with auto-advance to next lead.</p>
                </div>
              </div>
            </div>

            {/* Iteration 3 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  Interaction Redesign 03
                </span>
                <span className="text-xs font-sans text-[#8E8D88]">Dual-View Paradigm</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-red-500 block">Problem</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Table view was great for dialing, terrible for deal tracking.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-500 block">Insight</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Reps operate in two modes: Rapid Dialing vs. Pipeline Review.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#0284C7] dark:text-[#38BDF8] block">Design Response</span>
                  <p className="text-[#605E59] dark:text-[#A09E97]">Created an instant toggle between Dense Table and Kanban.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">New Flow</span>
                  <p className="text-emerald-800 dark:text-emerald-300 font-medium">Seamless perspective switch without resetting active filters.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------
            08. FINAL OUTPUT & DEMO: LIVE PRODUCT DEMO PAYOFF
            With Play and Fullscreen enabled on the video
            ------------------------------------------------------------ */}
        <section id="section-final-output" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#0284C7] dark:text-[#38BDF8] font-bold">08</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Final Output & Demo
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              The delivered platform in action: A high-velocity operational workspace.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Watch the full recorded walkthrough of the live CRM interface below, exploring real inquiry triage, pipeline progression, and scheduled callback workflows.
            </p>
          </div>

          {/* Sleek, Professional iPad Pro Mockup Frame Housing the Walkthrough Demo */}
          <div className="relative mx-auto max-w-5xl rounded-[22px] sm:rounded-[30px] p-2 sm:p-2.5 bg-[#121215] border border-[#2c2c31] shadow-[0_24px_55px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/40">
            {/* Minimal Discreet Camera Dot on Top Bezel */}
            <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30" aria-hidden="true">
              <div className="w-1.5 h-1.5 rounded-full bg-[#050507] border border-white/10 ring-1 ring-white/5" />
            </div>

            {/* Inner iPad Display Screen */}
            <div className="relative aspect-video rounded-[16px] sm:rounded-[22px] overflow-hidden bg-black border border-white/5 shadow-inner flex items-center justify-center">
              <video
                ref={demoVideoRef}
                src="/edsuite/CRM%20New%20PDV-2.mp4"
                controls
                playsInline
                preload="metadata"
                poster="/edsuite/CRM dash 1.png"
                className="w-full h-full object-contain"
                onPlay={() => setIsPlayingDemo(true)}
                onEnded={() => setIsPlayingDemo(false)}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('CRM.mp4')) {
                    target.src = '/edsuite/CRM.mp4';
                  }
                }}
              >
                <source src="/edsuite/CRM%20New%20PDV-2.mp4" type="video/mp4" />
                <source src="/edsuite/CRM.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>

              {/* Product Demo Cover Overlay using CRM dash 1 mockup */}
              {!isPlayingDemo && (
                <div
                  onClick={() => {
                    setIsPlayingDemo(true);
                    demoVideoRef.current?.play().catch(() => {});
                  }}
                  className="absolute inset-0 z-10 cursor-pointer bg-black/40 flex items-center justify-center group"
                  title="Click to play CRM Product Demo"
                  data-cursor="play"
                >
                  <img
                    src="/edsuite/CRM dash 1.png"
                    alt="CRM Dashboard Mockup - Product Demo"
                    className="absolute inset-0 w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
                  <div className="relative z-20 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0284C7] text-white shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0369A1] transition-all duration-300">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-bold bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-lg tracking-wide">
                      Watch Product Demo
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            CLOSING: THANK YOU VISUAL
            Theme-aware visual showcase switching automatically with dark/light mode
            ============================================================ */}
        <section className="space-y-4">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#FAF9F5] dark:bg-[#151515] shadow-sm">
            <img
              src="/edsuite/thankyou-light-1.png"
              alt="Thank you for viewing the CRM case study"
              className="w-full h-auto block dark:hidden select-none"
            />
            <img
              src="/edsuite/thankyou-dark-1.png"
              alt="Thank you for viewing the CRM case study"
              className="w-full h-auto hidden dark:block select-none"
            />
          </div>
        </section>

        {/* ============================================================
            4. CLOSING: Card-Style Previous / Next Project Navigation
            Preserved generous vertical spacing before contact footer!
            ============================================================ */}
        <div className="pt-8 pb-24 sm:pb-32">
          <CaseStudyPagination
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        </div>
      </main>
    </div>
  );
};
