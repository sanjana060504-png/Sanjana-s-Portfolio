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

  const prevProject = projectsData.find((p) => p.slug === 'karagir') || projectsData[0];
  const nextProject = projectsData.find((p) => p.slug === 'exam-portal') || projectsData[2];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#0284C7] selection:text-white transition-colors duration-200 relative">
      
      {/* ============================================================
          1. HERO VIEWPORT & IMMERSIVE PROJECT OPENING
          Clean cover video showcase + concise metadata card
          ============================================================ */}
      <section className="w-full pt-4 pb-8 px-4 sm:px-6 max-w-6xl mx-auto border-b border-black/[0.08] dark:border-white/[0.08]">
        {/* Cover Video Frame — Clean looping preview without controls */}
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-[#0B1420] aspect-video flex items-center justify-center relative">
          <video
            ref={coverVideoRef}
            src="/edsuite/CRM.mp4"
            poster="/edsuite/CRM dash 1.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-contain block select-none"
          >
            <source src="/edsuite/CRM.mp4" type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Project Metadata Card */}
        <div className="mt-8 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold tracking-widest text-[#0284C7] dark:text-[#38BDF8] uppercase block mb-1">
              Student Project · B2B SaaS
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              CRM
            </h1>
            <p className="text-sm font-sans text-[#605E59] dark:text-[#8E8D88] mt-1 max-w-xl">
              An operational workspace designed for rapid lead triage, scheduled callback tracking, and clear pipeline progression.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5E2D6] dark:border-[#2A2A2A] md:pl-8 text-xs font-sans">
            <div>
              <span className="text-[#8E8D88] uppercase block mb-1 font-medium">My Role</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F4EF] block">
                UX & UI Design
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
                Student Project (2026)
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

            {/* Visual Story Sequence: Situation → Need → Observation → Friction → Opportunity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {/* Step 1: Real-World Situation */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-[#8E8D88] uppercase tracking-wider">
                      Situation
                    </span>
                    <Filter className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">
                    Inbound Inquiries
                  </h4>
                  <p className="text-[11px] text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                    Leads stream in continuously across forms, inbound calls, and ad campaigns.
                  </p>
                </div>
                <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-1.5 text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                  <span>Multiple channels</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                </div>
              </div>

              {/* Step 2: Need */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-[#8E8D88] uppercase tracking-wider">
                      Need
                    </span>
                    <PhoneCall className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">
                    Track & Follow Up
                  </h4>
                  <p className="text-[11px] text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                    Counselors must assign reps, dial prospects, and progress stages to enroll.
                  </p>
                </div>
                <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-1.5 text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                  <span>Timely outreach</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                </div>
              </div>

              {/* Step 3: Observation */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-[#8E8D88] uppercase tracking-wider">
                      Observation
                    </span>
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">
                    Work Scatters
                  </h4>
                  <p className="text-[11px] text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                    As volume expands, notes, spreadsheets, and callbacks fragment across desks.
                  </p>
                </div>
                <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                  <span>Isolated tools</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                </div>
              </div>

              {/* Step 4: Friction */}
              <div className="p-4 rounded-2xl bg-[#F7F6F0] dark:bg-[#202020] border border-black/[0.06] dark:border-white/[0.08] space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-[#E04F4F] uppercase tracking-wider">
                      Friction
                    </span>
                    <AlertCircle className="w-3.5 h-3.5 text-[#E04F4F]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F4EF]">
                    Context Gets Lost
                  </h4>
                  <p className="text-[11px] text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                    Missed callbacks, repeated manual work, and zero shared visibility into pipeline health.
                  </p>
                </div>
                <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-1.5 text-[10px] text-[#E04F4F] font-bold">
                  <span>Dropped leads</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                </div>
              </div>

              {/* Step 5: Opportunity / Solution */}
              <div className="p-4 rounded-2xl bg-[#E0F2FE]/70 dark:bg-[#082F49]/40 border border-[#0284C7]/30 dark:border-[#38BDF8]/30 space-y-2 flex flex-col justify-between shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
                      Opportunity
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0369A1] dark:text-[#7DD3FC]">
                    Unified Workspace
                  </h4>
                  <p className="text-[11px] text-[#0369A1]/85 dark:text-[#7DD3FC]/85 leading-relaxed">
                    A dedicated CRM bringing intake, triage, scheduled callbacks, and pipeline into one flow.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#0284C7]/20 flex items-center gap-1.5 text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-bold">
                  <span>Single source of truth</span>
                  <CheckCircle2 className="w-3 h-3 ml-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Panoramic Storyboard: Multi-Channel Inflow → Scattered Tools → Need for Unified CRM
              Theme-aware visual: switches automatically with dark/light mode; preserved uncropped and pristine */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#FAF9F5] dark:bg-[#151515] shadow-sm">
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
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F7F6F0] dark:bg-[#252525] border border-black/[0.06] dark:border-white/[0.08] text-[10px] font-sans font-bold text-[#605E59] dark:text-[#A09E97]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Stitch & Claude
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
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F7F6F0] dark:bg-[#252525] border border-black/[0.06] dark:border-white/[0.08] text-[10px] font-sans font-bold text-[#605E59] dark:text-[#A09E97]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    Figma & ChatGPT
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
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F7F6F0] dark:bg-[#252525] border border-black/[0.06] dark:border-white/[0.08] text-[10px] font-sans font-bold text-[#605E59] dark:text-[#A09E97]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Gemini & Staging QA
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

          {/* Hero Demo Video Container — Supports Play, Seek, Volume, and Fullscreen */}
          <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-xl">
            <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-black/20 shadow-inner flex items-center justify-center">
              <video
                ref={demoVideoRef}
                src="/edsuite/CRM%20PDVid.mp4"
                controls
                playsInline
                preload="metadata"
                poster="/edsuite/CRM dash 1.png"
                className="w-full h-full object-contain"
                onPlay={() => setIsPlayingDemo(true)}
                onEnded={() => setIsPlayingDemo(false)}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('CRM-PDVid')) {
                    target.src = '/edsuite/CRM-PDVid.mp4';
                  }
                }}
              >
                <source src="/edsuite/CRM%20PDVid.mp4" type="video/mp4" />
                <source src="/edsuite/CRM-PDVid.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>

              {/* Product Demo Cover Overlay using the existing laptop/dashboard mockup */}
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
