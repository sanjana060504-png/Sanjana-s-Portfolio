import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CuriousByDefault } from './components/CuriousByDefault.tsx';
import { ToolsSection } from './components/ToolsSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { SelectedWork } from './components/SelectedWork.tsx';
import { PlaygroundSection } from './components/PlaygroundSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { KaragirCaseStudy } from './pages/KaragirCaseStudy.tsx';
import { CRMCaseStudy } from './pages/CRMCaseStudy.tsx';
import { CaseStudyView } from './pages/CaseStudyView.tsx';
import { Project } from './types.ts';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'case-study'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('case-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId?: string) => {
    if (currentView === 'case-study') {
      setCurrentView('home');
      setSelectedProject(null);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        onOpenResume={() => setIsResumeOpen(true)}
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
            {/* Section 01: Hero Intro */}
            <HeroSection
              onExploreClick={() => handleNavigate('selected-work')}
            />

            {/* Section 03: Selected Work (Projects Showcase with interactive hover cards) */}
            <SelectedWork onOpenProject={handleOpenProject} />

            {/* Section 04: About Me */}
            <AboutSection />

            {/* Section 02: Exploration (Intro & Visual Memory Stage) */}
            <CuriousByDefault />

            {/* Section 07: Tools I Work With (Compact Moving Toolkit Strip) */}
            <ToolsSection />

            {/* Section 08: Experience (Personal Journey Timeline) */}
            <ExperienceSection />

            {/* Playground Section: Leave a Note desk experience (just before contact) */}
            <PlaygroundSection />
          </>
        )}
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Resume Modal */}
      {isResumeOpen && (
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}

export default App;
