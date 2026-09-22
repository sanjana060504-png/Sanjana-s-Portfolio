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
          card: 'hover:border-[#5C1D24] dark:hover:border-[#F4D000] hover:shadow-[0_8px_30px_rgba(92,29,36,0.12)]',
          text: 'group-hover:text-[#5C1D24] dark:group-hover:text-[#F4D000]',
        };
      case 'edsuite-crm':
        return {
          card: 'hover:border-[#0284C7] dark:hover:border-[#38BDF8] hover:shadow-[0_8px_30px_rgba(2,132,199,0.12)]',
          text: 'group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]',
        };
      case 'exam-portal':
        return {
          card: 'hover:border-[#01ABA7] dark:hover:border-[#22D3EE] hover:shadow-[0_8px_30px_rgba(1,171,167,0.12)]',
          text: 'group-hover:text-[#01ABA7] dark:group-hover:text-[#22D3EE]',
        };
      default:
        return {
          card: 'hover:border-[#F4D000]',
          text: 'group-hover:text-[#F4D000]',
        };
    }
  };

  return (
    <div className="pt-12 border-t border-[#E5E2D6] dark:border-[#252525] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevProject ? (
        <button
          onClick={() => onSelectProject(prevProject)}
          className={`p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl text-left transition-all duration-300 group shadow-sm hover:shadow-lg cursor-pointer ${
            getProjectHoverStyles(prevProject.slug).card
          }`}
        >
          <div
            className={`flex items-center gap-1.5 text-xs font-sans text-[#8E8D88] uppercase mb-1.5 font-bold tracking-wider transition-colors ${
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
          <div className="text-xs text-[#8E8D88] mt-1 line-clamp-1">
            {prevProject.category}
          </div>
        </button>
      ) : (
        <div />
      )}

      {nextProject ? (
        <button
          onClick={() => onSelectProject(nextProject)}
          className={`p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-[#181818]/70 backdrop-blur-xl text-right transition-all duration-300 group shadow-sm hover:shadow-lg cursor-pointer ${
            getProjectHoverStyles(nextProject.slug).card
          }`}
        >
          <div
            className={`flex items-center justify-end gap-1.5 text-xs font-sans text-[#8E8D88] uppercase mb-1.5 font-bold tracking-wider transition-colors ${
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
          <div className="text-xs text-[#8E8D88] mt-1 line-clamp-1">
            {nextProject.category}
          </div>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
