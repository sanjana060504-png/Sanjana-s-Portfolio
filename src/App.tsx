import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CuriousByDefault } from './components/CuriousByDefault.tsx';
import { ThingsIveTried } from './components/ThingsIveTried.tsx';
import { SelectedWork } from './components/SelectedWork.tsx';
import { PlaygroundSection } from './components/PlaygroundSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { CaseStudyView } from './pages/CaseStudyView.tsx';
import { KaragirCaseStudy } from './pages/KaragirCaseStudy.tsx';
import { CRMCaseStudy } from './pages/CRMCaseStudy.tsx';
import { Project } from './types.ts';
import { projectsData } from './data/portfolioData.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'case-study'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectsData[0]);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sanjana_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Dark mode class sync on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('sanjana_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sanjana_theme', 'light');
    }
  }, [isDark]);

  // Track active section for navigation
  useEffect(() => {
    if (currentView !== 'home') return;

    const sections = ['hero-section', 'selected-work', 'playground', 'about', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNavigate = (sectionId?: string) => {
    if (currentView === 'case-study') {
      setCurrentView('home');
      // Wait for layout to mount home view before scrolling
      setTimeout(() => {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            const yOffset = -72;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -72;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('case-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#101010] text-[#111111] dark:text-[#F5F4EF] selection:bg-[#F4D000] selection:text-black transition-colors duration-200">
      {/* Desktop Refined Custom Cursor */}
      <CustomCursor />

      {/* Global Minimal Navigation */}
      <Navbar
        currentView={currentView}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        {/* VIEW: CASE STUDY DETAIL */}
        {currentView === 'case-study' && selectedProject && (
          selectedProject.slug === 'karagir' ? (
            <KaragirCaseStudy
              project={selectedProject}
              onBack={() => {
                setCurrentView('home');
                handleNavigate('selected-work');
              }}
              onSelectProject={(p) => handleOpenProject(p)}
            />
          ) : selectedProject.slug === 'edsuite-crm' ? (
            <CRMCaseStudy
              project={selectedProject}
              onBack={() => {
                setCurrentView('home');
                handleNavigate('selected-work');
              }}
              onSelectProject={(p) => handleOpenProject(p)}
            />
          ) : (
            <CaseStudyView
              project={selectedProject}
              onBack={() => {
                setCurrentView('home');
                handleNavigate('selected-work');
              }}
              onSelectProject={(p) => handleOpenProject(p)}
            />
          )
        )}

        {/* VIEW: COMPLETE HOMEPAGE INTEGRATED EXPERIENCE */}
        {currentView === 'home' && (
          <>
            {/* Section 01: Arrival */}
            <HeroSection onExploreClick={() => handleNavigate('selected-work')} />

            {/* Work: Built & Designed */}
            <SelectedWork onOpenProject={handleOpenProject} />

            {/* Section 02: Curious By Default */}
            <CuriousByDefault />

            {/* Section 03: Things I've Tried */}
            <ThingsIveTried />

            {/* Section 05: The Playground (Placeholder) */}
            <PlaygroundSection />

            {/* Section 06 & 07: About & Practical Toolkit */}
            <AboutSection />
          </>
        )}
      </main>

      {/* Unified Final Closing Section & Footer */}
      <FooterSection />
    </div>
  );
}
