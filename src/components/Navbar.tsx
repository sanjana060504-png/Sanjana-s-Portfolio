import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'case-study';
  activeSection: string;
  onNavigate: (sectionId?: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  activeSection,
  onNavigate,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeNotice, setResumeNotice] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("sanjanadeshmukh.design@gmail.com");
    setResumeNotice(true);
    setTimeout(() => setResumeNotice(false), 3000);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#F7F6F0]/80 dark:bg-[#101010]/80 border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
        {/* Logo / Name */}
        <button
          onClick={() => handleNavClick()}
          className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000]"
          aria-label="Sanjana Deshmukh Home"
          id="nav-logo-btn"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-[#111111] dark:text-[#F5F4EF] uppercase group-hover:opacity-80 transition-opacity">
              SANJANA
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F4D000] inline-block transition-transform duration-300 group-hover:scale-150" />
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('selected-work')}
            className={`text-sm font-semibold tracking-normal transition-colors hover:text-[#111111] dark:hover:text-[#F5F4EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000] py-1 relative ${
              currentView === 'home' && activeSection === 'selected-work'
                ? 'text-[#111111] dark:text-[#F5F4EF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F4D000]'
                : 'text-[#605E59] dark:text-[#8E8D88]'
            }`}
            id="nav-work-btn"
          >
            Work
          </button>

          <button
            onClick={() => handleNavClick('playground')}
            className={`text-sm font-semibold tracking-normal transition-colors hover:text-[#111111] dark:hover:text-[#F5F4EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000] py-1 relative ${
              currentView === 'home' && activeSection === 'playground'
                ? 'text-[#111111] dark:text-[#F5F4EF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F4D000]'
                : 'text-[#605E59] dark:text-[#8E8D88]'
            }`}
            id="nav-playground-btn"
          >
            Playground
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`text-sm font-semibold tracking-normal transition-colors hover:text-[#111111] dark:hover:text-[#F5F4EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000] py-1 relative ${
              currentView === 'home' && activeSection === 'about'
                ? 'text-[#111111] dark:text-[#F5F4EF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F4D000]'
                : 'text-[#605E59] dark:text-[#8E8D88]'
            }`}
            id="nav-about-btn"
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`text-sm font-semibold tracking-normal transition-colors hover:text-[#111111] dark:hover:text-[#F5F4EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000] py-1 relative ${
              currentView === 'home' && activeSection === 'contact'
                ? 'text-[#111111] dark:text-[#F5F4EF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F4D000]'
                : 'text-[#605E59] dark:text-[#8E8D88]'
            }`}
            id="nav-contact-btn"
          >
            Contact
          </button>
        </nav>

        {/* Right side controls: Theme Toggle & Resume Action */}
        <div className="hidden md:flex items-center gap-3.5">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.06] backdrop-blur-md text-[#111111] dark:text-[#F5F4EF] hover:border-[#F4D000] hover:bg-white/90 dark:hover:bg-white/[0.12] transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000] flex items-center justify-center"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            id="theme-toggle-btn"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#F4D000] shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-[#111111] shrink-0" />
            )}
          </button>

          <a
            href="mailto:sanjanadeshmukh.design@gmail.com?subject=Resume%20Request%20-%20Sanjana%20Deshmukh"
            onClick={handleResumeClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-black/[0.12] dark:border-white/[0.15] bg-white/40 dark:bg-white/[0.04] backdrop-blur-md hover:border-[#F4D000] hover:bg-[#F4D000] hover:text-black dark:hover:text-black transition-all duration-200 focus:outline-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]"
            id="nav-resume-link"
            title="Click to copy email / request resume"
          >
            <span>{resumeNotice ? "Email Copied!" : "Resume"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2.5 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.06] backdrop-blur-md text-[#111111] dark:text-[#F5F4EF] hover:border-[#F4D000] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle theme"
            id="mobile-theme-toggle"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#F4D000]" />
            ) : (
              <Moon className="w-4 h-4 text-[#111111]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#111111] dark:text-[#F5F4EF] border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.06] backdrop-blur-md hover:bg-white dark:hover:bg-white/[0.12] transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-[#F7F6F0]/95 dark:bg-[#101010]/95 backdrop-blur-xl px-6 py-6 space-y-5 animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('selected-work')}
              className="py-2.5 text-xl font-bold text-left text-[#111111] dark:text-[#F5F4EF] hover:text-[#F4D000] transition-colors flex items-center justify-between"
              id="mobile-nav-work"
            >
              <span>Work</span>
              <span className="text-xs font-sans font-semibold text-[#8E8D88]">(03)</span>
            </button>

            <button
              onClick={() => handleNavClick('playground')}
              className="py-2.5 text-xl font-bold text-left text-[#111111] dark:text-[#F5F4EF] hover:text-[#F4D000] transition-colors flex items-center justify-between"
              id="mobile-nav-playground"
            >
              <span>Playground</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F4D000]/20 text-[#111111] dark:text-[#F4D000] font-sans font-semibold">Curiosity</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="py-2.5 text-xl font-bold text-left text-[#111111] dark:text-[#F5F4EF] hover:text-[#F4D000] transition-colors"
              id="mobile-nav-about"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="py-2.5 text-xl font-bold text-left text-[#111111] dark:text-[#F5F4EF] hover:text-[#F4D000] transition-colors"
              id="mobile-nav-contact"
            >
              Contact
            </button>
          </div>

          <div className="pt-4 border-t border-[#E5E2D6] dark:border-[#252525] flex items-center justify-between">
            <span className="text-xs font-sans text-[#8E8D88]">Sanjana Deshmukh</span>
            <button
              onClick={handleResumeClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F4EF] underline underline-offset-4 decoration-[#F4D000] decoration-2"
            >
              <span>{resumeNotice ? "Copied!" : "Request Resume"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
