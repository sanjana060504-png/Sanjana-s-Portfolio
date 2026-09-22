import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Monitor,
  Smartphone,
  Maximize2,
  Play,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Sparkles,
  ChevronDown,
  X,
  GraduationCap,
  Users,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../types.ts';
import { projectsData } from '../data/portfolioData.ts';
import { CaseStudyNav, CaseStudyNavSection } from '../components/CaseStudyNav.tsx';
import { CaseStudyPagination } from '../components/CaseStudyPagination.tsx';

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

const EXAM_SECTIONS: CaseStudyNavSection[] = [
  { id: 'context', number: '01', title: 'Context & Roles' },
  { id: 'brief', number: '02', title: 'Brief' },
  { id: 'starting-point', number: '03', title: 'Starting Point' },
  { id: 'what-i-did', number: '04', title: 'What I Did' },
  { id: 'design-decisions', number: '05', title: 'Design Decisions' },
  { id: 'testing', number: '06', title: 'Testing' },
  { id: 'iterations', number: '07', title: 'What Changed & Fixed' },
  { id: 'prototype', number: '08', title: 'Prototype Walkthrough' },
];

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [activeSection, setActiveSection] = useState<string>('context');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [activeRoleTab, setActiveRoleTab] = useState<'admin' | 'faculty' | 'student'>('admin');

  // Scroll spy to highlight active section in capsule navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const section of EXAM_SECTIONS) {
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
    const el = document.getElementById('exam-prototype-walkthrough') || document.getElementById('section-prototype');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const prevProject = projectsData.find((p) => p.slug === 'edsuite-crm') || projectsData[1];
  const nextProject = projectsData.find((p) => p.slug === 'karagir') || projectsData[0];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#01ABA7] selection:text-white transition-colors duration-200 relative">
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
            <ArrowLeft className="w-4 h-4 text-[#01ABA7]" />
            <span>Work</span>
          </button>

          <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE] uppercase tracking-widest bg-[#01ABA7]/10 border border-[#01ABA7]/20 px-3 py-1 rounded-full">
            Academic Assessment Platform
          </span>
        </div>

        {/* Project Title & Short Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.1]">
              Exam <span className="text-[#01ABA7] dark:text-[#22D3EE]">Portal</span>
            </h1>

            <p className="text-base sm:text-lg text-[#605E59] dark:text-[#A8A59E] leading-relaxed font-normal">
              An institutional examination system engineered to coordinate secure test scheduling, question authoring, real-time proctored test taking, and automated evaluation across academic institutions.
            </p>

            {/* Concise Role Card */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#01ABA7] dark:text-[#22D3EE]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>My Involvement</span>
              </div>
              <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                Initial prototyping in Google Stitch, detailed UI design in Figma across Web & Mobile, approval of design screens, developer handoff, deployment, usability testing, and redesign fixes.
              </p>
            </div>
          </div>

          {/* Right: Clean Cover Visual Card */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-video rounded-2xl overflow-hidden bg-white dark:bg-[#181818] border border-[#CFFAFE] dark:border-[#164E63] shadow-lg group cursor-pointer"
              onClick={() => setLightboxImage({ url: '/edsuite/Admin.png', title: 'Exam Portal — Institute Admin Hub' })}
            >
              <img
                src="/edsuite/Admin.png"
                alt="Exam Portal Admin"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-bold bg-[#111111]/80 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                  Institute Admin View
                </span>
                <span className="flex items-center gap-1 text-[10px] font-sans font-bold text-[#22D3EE]">
                  <Maximize2 className="w-3 h-3" /> Inspect
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
        sections={EXAM_SECTIONS}
        activeSectionId={activeSection}
        onSectionSelect={scrollToSection}
        accent="exam"
        onJumpToOutput={handleJumpToOutput}
      />

      {/* ============================================================
          3. CASE STUDY FLOW: Context & Roles → Brief → Starting Point → What I Did → Design Decisions → Testing → Iterations → Prototype
          ============================================================ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-20">

        {/* 01. CONTEXT & ROLES */}
        <section id="section-context" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">01</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Context & Roles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            <div className="md:col-span-6 space-y-4">
              <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Academic institutions manage thousands of students, recurring term assessments, and diverse question formats. Traditional paper tests and legacy software suffered from security vulnerabilities, slow paper grading, and scheduling bottlenecks.
              </p>
              <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                The platform was architected around three clearly bounded user experiences to prevent operational overlap:
              </p>
            </div>

            <div className="md:col-span-6 space-y-3">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#ECFEFF] dark:bg-[#164E63]/40 text-[#01ABA7] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Institute Admin</h4>
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                      Web + Mobile
                    </span>
                  </div>
                  <p className="text-xs text-[#605E59] dark:text-[#A09E97] mt-1 leading-relaxed">
                    Institutional oversight, term-wide test scheduling, batch student registrations, and campus-wide grading analytics.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#ECFEFF] dark:bg-[#164E63]/40 text-[#01ABA7] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Professor</h4>
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                      Mobile
                    </span>
                  </div>
                  <p className="text-xs text-[#605E59] dark:text-[#A09E97] mt-1 leading-relaxed">
                    Question bank creation, rubric configuration, live proctoring checks, and mobile-first paper evaluation.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#ECFEFF] dark:bg-[#164E63]/40 text-[#01ABA7] shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Student</h4>
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                      Mobile
                    </span>
                  </div>
                  <p className="text-xs text-[#605E59] dark:text-[#A09E97] mt-1 leading-relaxed">
                    Clear test schedules, low-latency live test environment with question palette, and transparent results breakdown.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. BRIEF */}
        <section id="section-brief" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">02</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Brief
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-4">
            <h3 className="text-xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Build a reliable assessment interface that removes candidate anxiety and simplifies grading.
            </h3>
            <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
              Assessment software has zero room for error: a confusing submission button, an unresponsive timer, or an accidental navigation tap can invalidate months of student preparation. The brief called for unambiguous states, transparent auto-saving, and streamlined grading on mobile devices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020]">
                <span className="text-xs font-sans font-bold text-[#01ABA7] block mb-1">Zero Anxiety UX</span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">Unambiguous progress indicators and reliable local state sync.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020]">
                <span className="text-xs font-sans font-bold text-[#01ABA7] block mb-1">Multi-Role Security</span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">Distinct access privileges across admin, faculty, and candidates.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#202020]">
                <span className="text-xs font-sans font-bold text-[#01ABA7] block mb-1">Mobile Grading</span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97]">Enabling professors to review submissions on the go.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 03. STARTING POINT (STITCH PROTOTYPING) */}
        <section id="section-starting-point" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">03</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Starting Point (Google Stitch)
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-4">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#111111] dark:text-[#F5F4EF]">
                Rapid Flow Validation with Google Stitch
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Before designing final visual components in Figma, I mapped candidate question progression and mobile faculty rubrics using Google Stitch. This allowed rapid testing of critical branch flows—such as timed-out submissions, multi-section navigation, and offline recovery states—without premature visual friction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE] uppercase">
                  Flow Verification
                </span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Verified candidate progression across question review palettes and confirmed faculty could review student answers in under 60 seconds per question on mobile.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-1">
                <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE] uppercase">
                  Transition to Figma
                </span>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Once wireframe logic was approved by academic stakeholders, the flow schemas were carried directly into high-fidelity component libraries in Figma.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 04. WHAT I DID */}
        <section id="section-what-i-did" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">04</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              What I Did
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed max-w-3xl">
              My hands-on execution spanned the complete design and delivery lifecycle:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE]">Step 01</span>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Stitch Prototyping</h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Rapid wireflow modeling to test branch conditions and question navigation before committing to high-fidelity UI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE]">Step 02</span>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Figma UI Design</h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Component-driven screens for Admin web, Professor mobile, and Student mobile interfaces with high-contrast states.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE]">Step 03</span>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Handoff & QA</h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Design screen approval from institute heads, token specifications, and visual QA across test environments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <span className="text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE]">Step 04</span>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">Testing & Redesign</h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Proctored trial sessions with students and faculty to identify submission anxiety and implement rapid UI fixes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 05. DESIGN DECISIONS */}
        <section id="section-design-decisions" className="scroll-mt-28 space-y-12">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">05</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Design Decisions (3 User Experiences)
            </h2>
          </div>

          {/* Role 1: Institute Admin (Web + Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE]">
                Experience 01 • Institute Admin
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Centralized Assessment Oversight
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Admins needed bird's-eye visibility over all concurrent campus exams. The interface groups assessments into Active, Scheduled, and Under Evaluation, with instant audit trails and candidate seating status.
              </p>
              <div className="font-handwriting text-lg text-[#01ABA7] dark:text-[#22D3EE] pt-1">
                → High-density layout prevents navigating multiple sub-menus
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Admin.png', title: 'Exam Portal — Institute Admin Dashboard' })}
              >
                <img
                  src="/edsuite/Admin.png"
                  alt="Institute Admin Dashboard"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Institute Admin Interface</span>
                  <span className="flex items-center gap-1 text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Role 2: Professor (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Faculty.png', title: 'Exam Portal — Faculty & Professor Mobile Interface' })}
              >
                <img
                  src="/edsuite/Faculty.png"
                  alt="Faculty Mobile Interface"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Professor Mobile Evaluation</span>
                  <span className="flex items-center gap-1 text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE]">
                Experience 02 • Professor (Mobile)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Quick Mobile Evaluation & Rubrics
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                Faculty frequently grade test papers between classes. The mobile interface provides split-pane question review, quick tap score incrementors, and predefined rubric feedback chips.
              </p>
              <div className="font-handwriting text-lg text-[#01ABA7] dark:text-[#22D3EE] pt-1">
                → Mobile-first gestures streamline repetitive paper evaluation
              </div>
            </div>
          </div>

          {/* Role 3: Student (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE]">
                Experience 03 • Student (Mobile)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F4EF]">
                Anxiety-Free Test Taking Experience
              </h3>
              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                The student interface strips out all non-essential elements during active exams. A persistent bottom question palette shows Answered, Marked for Review, and Unvisited items at a glance with prominent auto-save cues.
              </p>
              <div className="font-handwriting text-lg text-[#01ABA7] dark:text-[#22D3EE] pt-1">
                → Visual reassurance reduces student test panic
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setLightboxImage({ url: '/edsuite/Student.png', title: 'Exam Portal — Student Mobile Experience' })}
              >
                <img
                  src="/edsuite/Student.png"
                  alt="Student Mobile Experience"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
                <div className="p-3 bg-[#FBFBFA] dark:bg-[#151515] border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between text-xs font-sans text-[#8E8D88]">
                  <span>Student Examination Screen</span>
                  <span className="flex items-center gap-1 text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06. TESTING */}
        <section id="section-testing" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">06</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Testing
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed max-w-3xl">
              We conducted simulated test trials with batches of 40 students and 5 grading faculty. Observing actual timed behavior revealed critical design flaws:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Issue 01: Submission Panic</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Countdown timer caused rushed clicks
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  When the timer dropped below 5 minutes, silent auto-save left students terrified that their last selected options were lost if the time elapsed.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Issue 02: Question Palette Ambiguity</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Color blind issues on status badges
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Initial palette indicators relied only on subtle pastel dots, confusing students under high stress when distinguishing visited vs. answered questions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E04F4F] uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Issue 03: Faculty Thumb Fatigue</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] dark:text-[#F5F4EF]">
                  Tiny grading controls on mobile
                </h4>
                <p className="text-xs text-[#605E59] dark:text-[#A09E97] leading-relaxed">
                  Professors had to pinch-zoom to tap score numbers on smaller phone screens, slowing down evaluation speeds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 07. WHAT CHANGED & FIXED */}
        <section id="section-iterations" className="scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">07</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              What Changed & Fixed
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] space-y-6">
            <h3 className="text-xl font-bold text-[#111111] dark:text-[#F5F4EF]">
              Iterative refinements deployed before final institutional release.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-2 border-l-4 border-[#01ABA7]">
                <span className="text-xs font-sans font-bold text-[#01ABA7] uppercase block">Fix 01: Live Save Micro-Feed</span>
                <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                  Added a clear status pill beside the countdown: "Saved locally • Cloud synced 2s ago", turning into an explicit confirmation modal on time expiry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-2 border-l-4 border-[#01ABA7]">
                <span className="text-xs font-sans font-bold text-[#01ABA7] uppercase block">Fix 02: Dual-Coded Question Palette</span>
                <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                  Paired color cues with distinct geometric shapes (circles for answered, squares for flagged, outlines for unvisited) ensuring WCAG accessibility under stress.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F6F0] dark:bg-[#202020] space-y-2 border-l-4 border-[#01ABA7]">
                <span className="text-xs font-sans font-bold text-[#01ABA7] uppercase block">Fix 03: 48px Touch Grading Pad</span>
                <p className="text-xs text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                  Redesigned faculty grading into an ergonomic bottom numeric strip with generous 48px touch targets for rapid single-handed score entry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 08. PROTOTYPE WALKTHROUGH */}
        <section id="section-prototype" className="scroll-mt-28 space-y-8">
          <div id="exam-prototype-walkthrough" className="scroll-mt-28" />
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#E5E2D6] dark:border-[#222222]">
            <span className="text-sm font-sans text-[#01ABA7] dark:text-[#22D3EE] font-bold">08</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF]">
              Prototype Walkthrough
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed max-w-3xl">
              A dedicated walkthrough showing the live Exam Portal interface, mobile student test interactions, and responsive faculty grading experience.
            </p>
          </div>

          {/* Video Prototype Container */}
          <div className="rounded-2xl p-4 sm:p-6 bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl border border-[#CFFAFE] dark:border-[#164E63] shadow-lg space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#01ABA7] dark:text-[#22D3EE]">
                <Play className="w-4 h-4 fill-[#01ABA7] dark:fill-[#22D3EE]" />
                <span>Recorded Interface Walkthrough</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans bg-[#ECFEFF] dark:bg-[#164E63] text-[#01ABA7] dark:text-[#22D3EE] font-bold">
                Live Prototype
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-black/20 shadow-inner">
              <video
                src="/edsuite/edsuit EXAMS.mp4"
                controls
                playsInline
                preload="metadata"
                poster="/edsuite/Admin.png"
                className="w-full h-full object-contain"
              >
                <source src="/edsuite/edsuit EXAMS.mp4" type="video/mp4" />
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
