import React, { useState } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface CaseStudyNavSection {
  id: string;
  number: string;
  title: string;
}

interface CaseStudyNavProps {
  sections: CaseStudyNavSection[];
  activeSectionId: string;
  onSectionSelect: (id: string) => void;
  accent: 'karagir' | 'crm' | 'exam';
  onJumpToOutput?: () => void;
}

export const CaseStudyNav: React.FC<CaseStudyNavProps> = ({
  sections,
  activeSectionId,
  onSectionSelect,
  accent,
  onJumpToOutput,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Project-specific accent color mappings
  const accentStyles = {
    karagir: {
      activeTab: 'bg-[#5C1D24] text-white shadow-xs font-bold',
      icon: 'text-[#5C1D24] dark:text-[#F4D000]',
      badge: 'text-[#5C1D24] dark:text-[#F4D000]',
    },
    crm: {
      activeTab: 'bg-[#0284C7] text-white shadow-xs font-bold',
      icon: 'text-[#0284C7] dark:text-[#38BDF8]',
      badge: 'text-[#0284C7] dark:text-[#38BDF8]',
    },
    exam: {
      activeTab: 'bg-[#01ABA7] text-white shadow-xs font-bold',
      icon: 'text-[#01ABA7] dark:text-[#22D3EE]',
      badge: 'text-[#01ABA7] dark:text-[#22D3EE]',
    },
  }[accent];

  const projectLogos = {
    karagir: (
      <span className="w-6 h-6 rounded-full bg-[#5C1D24] text-[#F4D000] flex items-center justify-center text-xs font-bold shadow-xs shrink-0 select-none" title="KARAGIR">
        ✹
      </span>
    ),
    crm: (
      <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-[9px] font-black tracking-tighter shadow-xs shrink-0 select-none" title="edsuite CRM">
        EdS
      </span>
    ),
    exam: (
      <span className="w-6 h-6 rounded-full bg-[#01ABA7] text-white flex items-center justify-center text-[9px] font-black shadow-xs shrink-0 select-none" title="Exam Portal">
        EP
      </span>
    ),
  };

  return (
    <nav
      className="sticky top-20 z-40 w-full py-3 pointer-events-none"
      aria-label="Case Study Section Navigation"
      id="case-study-nav"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-center">
        <div className="pointer-events-auto relative inline-flex items-center p-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-[#F7F6F0]/85 dark:bg-[#151515]/85 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-all">
          <AnimatePresence initial={false} mode="wait">
            {!isExpanded ? (
              <motion.button
                key="collapsed-plus"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsExpanded(true)}
                className="px-2 py-1 rounded-full text-[#111111] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-sans font-bold cursor-pointer"
                aria-label="Expand section navigation"
                title="Expand section navigation"
                id="nav-expand-control"
              >
                {projectLogos[accent]}
                <Plus className={`w-3.5 h-3.5 ${accentStyles.icon}`} />
              </motion.button>
            ) : (
              <motion.div
                key="expanded-navbar"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="inline-flex items-center gap-1 sm:gap-1.5 overflow-hidden"
              >
                {/* Real project logo icon on left of capsule */}
                <div className="pl-1 shrink-0 flex items-center">
                  {projectLogos[accent]}
                </div>

                {/* Navbar wrap control: X (taps to wrap the entire navbar into it) */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-full text-[#111111] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center text-xs font-sans font-bold cursor-pointer shrink-0"
                  aria-label="Wrap section navigation"
                  title="Wrap section navigation"
                  id="nav-expand-control"
                >
                  <X className={`w-3.5 h-3.5 ${accentStyles.icon}`} />
                </button>

                <span className="w-px h-4 bg-black/10 dark:bg-white/15 inline-block shrink-0" />

                {/* Major Sections Tabs with Clean Font-Sans Numbers */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[70vw] sm:max-w-none">
                  {sections.map((section) => {
                    const isActive = activeSectionId === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => onSectionSelect(section.id)}
                        className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                          isActive
                            ? accentStyles.activeTab
                            : 'text-[#605E59] dark:text-[#A09E96] hover:text-[#111111] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="text-xs font-sans font-bold opacity-85">{section.number}</span>
                        <span>{section.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Included Jump-to-Output Button right inside navbar */}
                {onJumpToOutput && (
                  <>
                    <span className="w-px h-4 bg-black/10 dark:bg-white/15 inline-block shrink-0" />
                    <button
                      onClick={onJumpToOutput}
                      className="p-2 rounded-full text-[#605E59] dark:text-[#A09E96] hover:text-[#111111] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                      aria-label="Jump to final output / prototype"
                      title="Jump to final output / prototype"
                      id="page-level-jump-output-btn"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
