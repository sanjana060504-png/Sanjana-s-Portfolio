import React from 'react';
import { Compass, GraduationCap, Briefcase, Laptop } from 'lucide-react';

interface Milestone {
  period: string;
  role: string;
  organization: string;
  detail: string;
  isCurrent?: boolean;
}

const milestones: Milestone[] = [
  {
    period: '2023 – Present',
    role: 'Student',
    organization: 'MIT Institute of Design',
    detail: 'B.Des in UX Design',
    isCurrent: false,
  },
  {
    period: 'May – Jul 2026',
    role: 'Product Strategy Intern',
    organization: 'Hooterbux Ventures Pvt. Ltd.',
    detail: 'Learned product thinking, collaboration and working in a real business context.',
    isCurrent: false,
  },
  {
    period: 'Aug – Sept 2026',
    role: 'Freelance / Website Project',
    organization: 'Crystallite AAC Block Pvt. Ltd.',
    detail: 'End-to-end website design, development and deployment',
    isCurrent: false,
  },
  {
    period: 'Now',
    role: 'Learning',
    organization: '',
    detail: 'Studying, building, taking up projects and figuring out what’s next.',
    isCurrent: true,
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-1.5">
            <Compass className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Experience</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] dark:text-[#F5F4EF]">
              My journey so far
            </h3>
            <span className="font-handwriting text-xl sm:text-2xl text-[#8E8D88] dark:text-[#A09E96]">
              trying, doing, and exploring
            </span>
          </div>
        </div>
      </div>

      {/* Clean horizontal timeline / journey on desktop, stacked on mobile */}
      <div className="relative">
        {/* Horizontal connector line for desktop */}
        <div className="hidden md:block absolute top-[19px] left-4 right-10 h-[2px] border-t-2 border-dashed border-[#DDD9CC] dark:border-[#333333] -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative z-10">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col items-start ${
                idx === 1 ? 'md:-translate-x-3 lg:-translate-x-5' : ''
              } ${
                idx === 2 ? 'md:-translate-x-1 lg:-translate-x-2' : ''
              }`}
            >
              {/* Timeline marker node with custom icons for student, intern, project */}
              <div className="flex items-center gap-3 mb-3 md:mb-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 bg-[#FFFFFF] dark:bg-[#1C1C1C] border-[#DDD9CC] dark:border-[#353535] shrink-0 shadow-2xs">
                  {item.isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F4D000] ring-2 ring-[#F4D000]/40" />
                  ) : idx === 0 ? (
                    <GraduationCap className="w-4 h-4 text-[#111111] dark:text-[#F5F4EF]" />
                  ) : idx === 1 ? (
                    <Briefcase className="w-4 h-4 text-[#111111] dark:text-[#F5F4EF]" />
                  ) : idx === 2 ? (
                    <Laptop className="w-4 h-4 text-[#111111] dark:text-[#F5F4EF]" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#111111] dark:bg-white" />
                  )}
                </div>

                {/* Period tag for mobile */}
                <span className="md:hidden text-xs font-sans font-bold text-[#111111] dark:text-white bg-[#EFECE3] dark:bg-[#252525] px-2.5 py-0.5 rounded-full">
                  {item.period}
                </span>
              </div>

              {/* Desktop Period Tag */}
              <span className="hidden md:inline-block text-[11px] font-sans font-bold tracking-wider uppercase text-[#8E8D88] mb-1.5">
                {item.period}
              </span>

              {/* Role / Milestone Title */}
              <h4 className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F4EF] leading-snug">
                {item.role}
              </h4>

              {/* Organization */}
              {item.organization && (
                <p className="text-xs sm:text-sm font-bold text-[#111111]/80 dark:text-[#F4D000] mt-0.5">
                  {item.organization}
                </p>
              )}

              {/* Detail narrative */}
              <p className="text-xs sm:text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed mt-1.5 max-w-xs">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
