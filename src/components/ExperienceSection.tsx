import React from 'react';
import { Compass, GraduationCap, Briefcase, Laptop } from 'lucide-react';

interface Milestone {
  id: string;
  period: string;
  role: string;
  organization?: string;
  description: string;
  icon?: 'graduation' | 'briefcase' | 'laptop';
  isCurrent?: boolean;
}

export const ExperienceSection: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: 'student',
      period: '2023 – PRESENT',
      role: 'Student',
      organization: 'MIT Institute of Design',
      description: 'B.Des in UX Design',
      icon: 'graduation',
    },
    {
      id: 'internship',
      period: 'MAY – JUL 2026',
      role: 'Product Strategy Intern',
      organization: 'Hooterbux Ventures Pvt. Ltd.',
      description:
        'Learned product thinking, collaboration and working in a real business context.',
      icon: 'briefcase',
    },
    {
      id: 'freelance',
      period: 'AUG – SEPT 2026',
      role: 'Freelance / Website Project',
      organization: 'Crystallite AAC Block Pvt. Ltd.',
      description: 'End-to-end website design, development and deployment',
      icon: 'laptop',
    },
    {
      id: 'learning',
      period: 'NOW',
      role: 'Learning',
      description:
        'Studying, building, taking up projects and figuring out what’s next.',
      isCurrent: true,
    },
  ];

  return (
    <section
      className="py-14 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="experience"
    >
      {/* Eyebrow Label & Main Heading */}
      <div className="mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-3">
          <Compass className="w-3.5 h-3.5 text-[#F4D000]" />
          <span>EXPERIENCE</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
            My journey so far
          </h2>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#757470] dark:text-[#8E8D88] font-normal italic select-none">
            trying, doing, and exploring
          </span>
        </div>
      </div>

      {/* Horizontal Timeline Container */}
      <div className="overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
        <div className="min-w-[760px] md:min-w-0 relative pl-2 sm:pl-6 lg:pl-8">
          {/* Horizontal Dotted Connecting Line */}
          <div
            className="absolute top-6 left-8 sm:left-12 lg:left-14 right-0 border-t border-dashed border-[#D0CCC0] dark:border-[#2E2E2E] pointer-events-none z-0"
            aria-hidden="true"
          />

          {/* 4 Milestones */}
          <div className="grid grid-cols-4 gap-8 lg:gap-10 relative z-10">
            {milestones.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col items-start ${
                  index === 1 ? '-translate-x-3 sm:-translate-x-6 lg:-translate-x-8' : ''
                }`}
              >
                {/* Milestone Node */}
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] dark:bg-[#181818] border border-[#DDD9CD] dark:border-[#2E2E2E] flex items-center justify-center shrink-0 z-10 transition-transform duration-200">
                  {item.icon === 'graduation' && (
                    <GraduationCap
                      className="w-5 h-5 text-[#333333] dark:text-[#E0E0E0]"
                      strokeWidth={1.8}
                    />
                  )}
                  {item.icon === 'briefcase' && (
                    <Briefcase
                      className="w-5 h-5 text-[#333333] dark:text-[#E0E0E0]"
                      strokeWidth={1.8}
                    />
                  )}
                  {item.icon === 'laptop' && (
                    <Laptop
                      className="w-5 h-5 text-[#333333] dark:text-[#E0E0E0]"
                      strokeWidth={1.8}
                    />
                  )}
                  {item.isCurrent && (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F4D000] shadow-[0_0_10px_rgba(244,208,0,0.7)]" />
                  )}
                </div>

                {/* Date */}
                <div className="mt-7 sm:mt-8">
                  <span className="text-[11.5px] font-mono font-medium tracking-wider uppercase text-[#8E8D88] dark:text-[#7A7874]">
                    {item.period}
                  </span>
                </div>

                {/* Role / Title */}
                <h3 className="text-xl lg:text-[22px] font-bold text-[#111111] dark:text-[#FFFFFF] tracking-tight mt-1.5 mb-1">
                  {item.role}
                </h3>

                {/* Organization in Signature #F4D000 Yellow Accent */}
                {item.organization && (
                  <p className="text-sm sm:text-[15px] font-semibold text-[#F4D000] mb-2 leading-snug">
                    {item.organization}
                  </p>
                )}

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-[14.5px] text-[#605E59] dark:text-[#A09E96] leading-relaxed max-w-[240px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
