import React, { useState } from 'react';
import {
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  Building2,
  Theater,
  ArrowUpRight,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  period: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  category: 'work' | 'leadership' | 'education';
  categoryLabel: string;
  badgeColor: string;
  handwrittenNote?: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export const TimelineSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'work' | 'leadership' | 'education'>('all');

  const events: TimelineEvent[] = [
    {
      id: 'crystallite-2026',
      year: '2026',
      period: 'Aug – Sept 2026',
      title: 'Crystallite AAC Block Pvt. Ltd.',
      role: 'Designer & Developer',
      organization: 'Freelance / Website Project',
      location: 'Pune, India',
      category: 'work',
      categoryLabel: 'Freelance',
      badgeColor: '#0284C7',
      handwrittenNote: 'end-to-end design & launch',
      summary:
        'Designed and developed the website end-to-end, establishing a clear digital brand presence and structured product showcase with responsive layouts.',
      highlights: [
        'Designed and developed the website end-to-end, creating a clear digital brand presence and structured product showcase.',
        'Built responsive layouts with clear content hierarchy and product-focused navigation.',
        'Delivered production-ready web experience optimized across mobile and desktop breakpoints.'
      ],
      skills: ['Web Design', 'Responsive UI', 'Brand Hierarchy', 'Front-End Delivery']
    },
    {
      id: 'hooterbux-2026',
      year: '2026',
      period: 'May – July 2026',
      title: 'Hooterbux Venture Pvt Ltd',
      role: 'Product Strategy & UI/UX Intern',
      organization: 'Product Strategy Intern',
      location: 'Pune, India',
      category: 'work',
      categoryLabel: 'Internship',
      badgeColor: '#F4D000',
      handwrittenNote: 'CRM workflows & high-velocity UI',
      summary:
        'Contributed to the strategy and interface design of a B2B SaaS CRM, EdTech assessment tools, and professional networking conference concepts.',
      highlights: [
        'Contributed to the strategy and interface design of a B2B SaaS CRM, translating business requirements into structured user flows, dashboards, and product screens.',
        'Worked on an EdTech platform, shaping the product experience and interface for a client-facing digital solution.',
        'Explored concepts for professional networking and conference discovery, researching how people connect and engage before and during events.'
      ],
      skills: ['B2B SaaS CRM', 'EdTech Platform', 'User Flows', 'Dashboard UI', 'Design Systems']
    },
    {
      id: 'natakbitak-treasurer',
      year: '2025–2026',
      period: '2025 – 2026',
      title: 'Natak Bitak · Drama Club · MIT ID',
      role: 'Treasurer',
      organization: 'MIT Institute of Design',
      location: 'Pune, India',
      category: 'leadership',
      categoryLabel: 'College Leadership',
      badgeColor: '#E04F4F',
      handwrittenNote: 'budgets, logistics & team accountability',
      summary:
        'Managed club finances, fundraising drives, student volunteers, and cross-team production coordination for university theatre showcases.',
      highlights: [
        'Managed annual club budget, ticketing accounts, resource purchases, and production logistics.',
        'Coordinated fundraising, campus sponsorships, and volunteer rosters under strict rehearsal deadlines.'
      ],
      skills: ['Budget Management', 'Event Production', 'Resource Logistics', 'Team Leadership']
    },
    {
      id: 'natakbitak-member',
      year: '2024–2025',
      period: '2024 – 2025',
      title: 'Natak Bitak · Drama Club · MIT ID',
      role: 'ClubMember & Stage Crew',
      organization: 'MIT Institute of Design',
      location: 'Pune, India',
      category: 'leadership',
      categoryLabel: 'College Club',
      badgeColor: '#D97706',
      handwrittenNote: 'cueing lights & backstage pacing',
      summary:
        'Supported event planning, backstage stage-lighting cues, and student-team coordination across live college performances.',
      highlights: [
        'Managed live backstage cues, lighting transitions, and cast timing under high-pressure performances.',
        'Supported event planning, logistics, promotion, and cross-batch student-team coordination.'
      ],
      skills: ['Stage Management', 'Lighting Cues', 'Live Coordination', 'Backstage Operations']
    },
    {
      id: 'mit-adt-education',
      year: '2023–Present',
      period: '2023 – Present',
      title: 'Institute of Design, MIT ADT University',
      role: 'Bachelor of Design · UX Design',
      organization: 'Undergraduate Program',
      location: 'Pune, India',
      category: 'education',
      categoryLabel: 'Education',
      badgeColor: '#10B981',
      handwrittenNote: 'curious by default, grounded in research',
      summary:
        'Final-year UX / Product Design student focused on turning research and complex workflows into clear, usable digital products.',
      highlights: [
        'Comprehensive training in user research, cognitive walkthroughs, information architecture, and design systems.',
        'Conducted physical-digital experiments including RFID tangible computing interfaces and vernacular voice-first AI.',
        'Hands-on project work spanning B2B SaaS, educational assessment consoles, and tribal cultural heritage preservation.'
      ],
      skills: ['User Research', 'Information Architecture', 'Prototyping', 'Tangible UI', 'Design Systems']
    }
  ];

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter((e) => e.category === activeFilter);

  return (
    <section
      className="py-14 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="timeline"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-2">
            <Clock className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Timeline</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
              Experience &amp; Journey
            </h2>
            <span className="font-handwriting text-3xl sm:text-4xl text-[#605E59] dark:text-[#8E8D88] font-normal select-none">
              how the dots connect
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: 'All Milestones' },
              { id: 'work', label: 'Work & Projects' },
              { id: 'leadership', label: 'Involvement' },
              { id: 'education', label: 'Education' }
            ] as const
          ).map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#111111] dark:bg-[#F4D000] text-[#FFFFFF] dark:text-[#111111] shadow-xs scale-[1.02]'
                    : 'bg-[#FFFFFF] dark:bg-[#181818] text-[#605E59] dark:text-[#A09E96] border border-[#E5E2D6] dark:border-[#2C2C2C] hover:border-[#111111] dark:hover:border-[#F4D000] hover:text-[#111111] dark:hover:text-[#FFFFFF]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Timeline Spine & Cards */}
      <div className="relative">
        {/* Continuous Center-Left Spine (Desktop) */}
        <div className="hidden md:block absolute left-8 lg:left-9 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#F4D000] via-[#E5E2D6] dark:via-[#2A2A2A] to-transparent pointer-events-none" />

        <div className="space-y-6 sm:space-y-8">
          {filteredEvents.map((evt, idx) => (
            <div
              key={evt.id}
              className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 group"
            >
              {/* Timeline Node Marker on Spine (Desktop) */}
              <div className="hidden md:flex flex-col items-center shrink-0 w-16 lg:w-18 pt-4 z-10">
                <div className="w-5 h-5 rounded-full bg-[#FFFFFF] dark:bg-[#151515] border-3 border-[#F4D000] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-[#F4D000]" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#8E8D88] mt-2 whitespace-nowrap">
                  {evt.year}
                </span>
              </div>

              {/* Event Content Card */}
              <div className="flex-1 w-full p-5 sm:p-7 rounded-3xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-xs hover:shadow-md transition-all duration-300 hover:border-[#111111]/30 dark:hover:border-[#F4D000]/40 relative overflow-hidden">
                {/* Yellow Top-Corner Accent on Hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#F4D000]/15 to-transparent pointer-events-none rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Meta Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${evt.badgeColor}18`,
                        color: evt.badgeColor
                      }}
                    >
                      {evt.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-[#8E8D88] md:hidden">
                      {evt.period}
                    </span>
                  </div>

                  <span className="hidden md:inline-block text-xs font-mono text-[#8E8D88]">
                    {evt.period} · {evt.location}
                  </span>
                </div>

                {/* Title & Role */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF]">
                      {evt.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8] mt-0.5">
                      {evt.role}
                    </p>
                  </div>

                  {evt.handwrittenNote && (
                    <span className="font-handwriting text-sm sm:text-base text-[#D97706] dark:text-[#F59E0B] select-none shrink-0 -rotate-1">
                      ~ {evt.handwrittenNote}
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed mb-4">
                  {evt.summary}
                </p>

                {/* Highlights List */}
                <ul className="space-y-1.5 mb-4 text-xs text-[#333333] dark:text-[#D5D3CC] leading-relaxed">
                  {evt.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4D000] mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills / Focus Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-black/[0.05] dark:border-white/[0.06]">
                  {evt.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-sans font-medium bg-[#F7F6F0] dark:bg-[#202020] text-[#605E59] dark:text-[#A09E97] border border-[#E5E2D6]/80 dark:border-[#2C2C2C]/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
