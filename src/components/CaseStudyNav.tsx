import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, ChevronDown, ChevronLeft } from 'lucide-react';
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
  accent: 'karagir' | 'crm' | 'exam' | 'sustainability' | 'service-design' | 'special-needs';
  onJumpToOutput?: () => void;
  onBack?: () => void;
  isBottomReached?: boolean;
}

export const CaseStudyNav: React.FC<CaseStudyNavProps> = ({
  sections,
  activeSectionId,
  onSectionSelect,
  accent,
  onJumpToOutput,
  onBack,
  isBottomReached = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolled down into the project content, the nav docks to its sticky position
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly scroll active tab into view horizontally inside the capsule
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector<HTMLButtonElement>(
        `[data-section-id="${activeSectionId}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSectionId]);

  // Project-specific accent color mappings with high contrast in both light and dark modes
  const accentStyles = {
    karagir: {
      activeTab: 'bg-[#641722] text-white shadow-xs font-bold',
      icon: 'text-[#641722] dark:text-[#F4D000]',
      hover: 'hover:text-[#641722] dark:hover:text-[#F4D000]',
    },
    crm: {
      activeTab: 'bg-[#0284C7] text-white shadow-xs font-bold',
      icon: 'text-[#0284C7] dark:text-[#38BDF8]',
      hover: 'hover:text-[#0284C7] dark:hover:text-[#38BDF8]',
    },
    exam: {
      activeTab: 'bg-[#01ABA7] text-white shadow-xs font-bold',
      icon: 'text-[#01ABA7] dark:text-[#22D3EE]',
      hover: 'hover:text-[#01ABA7] dark:hover:text-[#22D3EE]',
    },
    sustainability: {
      activeTab: 'bg-[#B7E71C] dark:bg-[#D3FA53] text-[#111111] shadow-xs font-bold',
      icon: 'text-[#111111] dark:text-[#D3FA53]',
      hover: 'hover:text-[#111111] dark:hover:text-[#D3FA53]',
    },
    'service-design': {
      activeTab: 'bg-[#DC95FF] dark:bg-[#C8B6FF] text-[#111111] shadow-xs font-bold',
      icon: 'text-[#111111] dark:text-[#C8B6FF]',
      hover: 'hover:text-[#111111] dark:hover:text-[#C8B6FF]',
    },
    'special-needs': {
      activeTab: 'bg-[#3DBCF9] text-[#111111] shadow-xs font-bold',
      icon: 'text-[#111111] dark:text-[#3DBCF9]',
      hover: 'hover:text-[#111111] dark:hover:text-[#3DBCF9]',
    },
  }[accent];

  return (
    <>
      {/* 1. Initial Cover / Landing view: Standalone Chevron at top-left underneath SANJANA */}
      {!isSticky && onBack && (
        <div className="fixed top-[82px] left-0 right-0 z-30 pointer-events-none transition-opacity duration-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-start">
            <button
              onClick={onBack}
              className="pointer-events-auto p-2 rounded-full text-[#111111] dark:text-[#F5F4EF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-black/[0.08] dark:border-white/[0.12] bg-[#F7F6F0]/90 dark:bg-[#151515]/90 backdrop-blur-md shadow-xs"
              aria-label="Back to project overview"
              title="Back to project overview"
              id="initial-back-chevron"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Secondary Navigation Capsule */}
      <nav
        className={`sticky top-[72px] z-30 w-full py-2 pointer-events-none transition-all duration-300 ${
          isBottomReached
            ? 'opacity-0 -translate-y-8 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
        aria-label="Case Study Section Navigation"
        id="case-study-nav"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-start">
          <div className="pointer-events-auto relative inline-flex items-center p-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-[#F7F6F0]/90 dark:bg-[#151515]/90 backdrop-blur-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45)] max-w-[calc(100vw-2.5rem)] sm:max-w-[calc(100vw-4rem)] transition-all overflow-hidden">
            {/* When sticky: Chevron visually joins the capsule at the left */}
            {isSticky && onBack && (
              <>
                <button
                  onClick={onBack}
                  className="p-1.5 rounded-full text-[#111111] dark:text-[#F5F4EF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Back to projects"
                  title="Back to projects"
                  id="nav-back-chevron"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="w-px h-3.5 bg-black/10 dark:bg-white/15 inline-block shrink-0 mx-0.5" />
              </>
            )}

            <AnimatePresence initial={false} mode="wait">
              {!isExpanded ? (
                <motion.button
                  key="collapsed-plus"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setIsExpanded(true)}
                  className="p-1.5 rounded-full text-[#111111] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Expand section navigation"
                  title="Expand section navigation"
                  id="nav-expand-control"
                >
                  <Plus className={`w-3.5 h-3.5 ${accentStyles.icon}`} />
                </motion.button>
              ) : (
                <motion.div
                  key="expanded-navbar"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="inline-flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1 overflow-hidden"
                >
                  {/* Navbar wrap control: X (taps to collapse into +) */}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 rounded-full text-[#111111] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                    aria-label="Collapse section navigation"
                    title="Collapse section navigation"
                    id="nav-collapse-control"
                  >
                    <X className={`w-3.5 h-3.5 ${accentStyles.icon}`} />
                  </button>

                  <span className="w-px h-3.5 bg-black/10 dark:bg-white/15 inline-block shrink-0" />

                  {/* Major Sections Tabs with Clean Font-Sans Numbers, horizontally scrollable inside capsule */}
                  <div
                    ref={tabsContainerRef}
                    className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth min-w-0 flex-1 py-0.5"
                  >
                    {sections.map((section) => {
                      const isActive = activeSectionId === section.id;
                      return (
                        <button
                          key={section.id}
                          data-section-id={section.id}
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
                      <span className="w-px h-3.5 bg-black/10 dark:bg-white/15 inline-block shrink-0" />
                      <button
                        onClick={onJumpToOutput}
                        className="p-1.5 rounded-full text-[#605E59] dark:text-[#A09E96] hover:text-[#111111] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                        aria-label="Jump to final output / prototype"
                        title="Jump to final output / prototype"
                        id="page-level-jump-output-btn"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
};
