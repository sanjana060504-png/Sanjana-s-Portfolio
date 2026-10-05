import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '../types.ts';

interface CaseStudyPaginationProps {
  prevProject?: Project;
  nextProject?: Project;
  onSelectProject: (project: Project) => void;
}

export const CaseStudyPagination: React.FC<CaseStudyPaginationProps> = ({
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const getProjectHoverStyles = (slug: string) => {
    switch (slug) {
      case 'karagir':
        return {
          card: 'hover:border-[#5C1D24]/40 dark:hover:border-[#F4D000]/40 hover:shadow-[0_16px_36px_-6px_rgba(92,29,36,0.12)]',
          text: 'group-hover:text-[#5C1D24] dark:group-hover:text-[#F4D000]',
        };
      case 'edsuite-crm':
        return {
          card: 'hover:border-[#0284C7]/40 dark:hover:border-[#38BDF8]/40 hover:shadow-[0_16px_36px_-6px_rgba(2,132,199,0.12)]',
          text: 'group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]',
        };
      case 'exam-portal':
        return {
          card: 'hover:border-[#01ABA7]/40 dark:hover:border-[#22D3EE]/40 hover:shadow-[0_16px_36px_-6px_rgba(1,171,167,0.12)]',
          text: 'group-hover:text-[#01ABA7] dark:group-hover:text-[#22D3EE]',
        };
      case 'sustainability-ux':
        return {
          card: 'hover:border-[#D3FA53] hover:shadow-[0_16px_36px_-6px_rgba(211,250,83,0.18)]',
          text: 'group-hover:text-[#D3FA53]',
        };
      case 'service-design':
        return {
          card: 'hover:border-[#C8B6FF] hover:shadow-[0_16px_36px_-6px_rgba(200,182,255,0.18)]',
          text: 'group-hover:text-[#C8B6FF]',
        };
      case 'special-needs':
        return {
          card: 'hover:border-[#3DBCF9] hover:shadow-[0_16px_36px_-6px_rgba(61,188,249,0.18)]',
          text: 'group-hover:text-[#3DBCF9]',
        };
      default:
        return {
          card: 'hover:border-[#F4D000]/40 hover:shadow-[0_16px_36px_-6px_rgba(244,208,0,0.12)]',
          text: 'group-hover:text-[#F4D000]',
        };
    }
  };

  return (
    <div className="pt-12 border-t border-[#E5E2D6] dark:border-[#252525] grid grid-cols-1 sm:grid-cols-2 gap-5" id="case-study-pagination-cards">
      {prevProject ? (
        <button
          onClick={() => onSelectProject(prevProject)}
          className={`p-6 sm:p-7 rounded-3xl border border-black/[0.07] dark:border-white/[0.12] bg-white/40 dark:bg-white/[0.05] hover:bg-white/60 dark:hover:bg-white/[0.09] backdrop-blur-xl text-left transition-all duration-300 group shadow-[0_10px_30px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.35)] hover:-translate-y-1 cursor-pointer relative overflow-hidden ${
            getProjectHoverStyles(prevProject.slug).card
          }`}
        >
          {/* Subtle light reflection on glass surface */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

          <div
            className={`flex items-center gap-1.5 text-xs font-sans text-[#8E8D88] uppercase mb-2 font-bold tracking-wider transition-colors ${
              getProjectHoverStyles(prevProject.slug).text
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS PROJECT</span>
          </div>
          <div
            className={`text-lg font-bold text-[#111111] dark:text-[#F5F4EF] transition-colors ${
              getProjectHoverStyles(prevProject.slug).text
            }`}
          >
            {prevProject.title}
          </div>
          <div className="text-xs text-[#73716A] dark:text-[#9A9890] mt-1 line-clamp-1 font-sans">
            {prevProject.category}
          </div>
        </button>
      ) : (
        <div />
      )}

      {nextProject ? (
        <button
          onClick={() => onSelectProject(nextProject)}
          className={`p-6 sm:p-7 rounded-3xl border border-black/[0.07] dark:border-white/[0.12] bg-white/40 dark:bg-white/[0.05] hover:bg-white/60 dark:hover:bg-white/[0.09] backdrop-blur-xl text-right transition-all duration-300 group shadow-[0_10px_30px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.35)] hover:-translate-y-1 cursor-pointer relative overflow-hidden ${
            getProjectHoverStyles(nextProject.slug).card
          }`}
        >
          {/* Subtle light reflection on glass surface */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

          <div
            className={`flex items-center justify-end gap-1.5 text-xs font-sans text-[#8E8D88] uppercase mb-2 font-bold tracking-wider transition-colors ${
              getProjectHoverStyles(nextProject.slug).text
            }`}
          >
            <span>NEXT PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <div
            className={`text-lg font-bold text-[#111111] dark:text-[#F5F4EF] transition-colors ${
              getProjectHoverStyles(nextProject.slug).text
            }`}
          >
            {nextProject.title}
          </div>
          <div className="text-xs text-[#73716A] dark:text-[#9A9890] mt-1 line-clamp-1 font-sans">
            {nextProject.category}
          </div>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
