import React, { useState, useEffect } from 'react';
import { User, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { personalProfile } from '../data/portfolioData.ts';

export const AboutSection: React.FC = () => {
  const [activeBioTab, setActiveBioTab] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // The photo carousel (Profile 02 & Profile 03) in About section
  const carouselPhotos = [
    {
      src: "/profile%202.jpeg",
      label: "Profile 02",
    },
    {
      src: "/profile%203.jpeg",
      label: "Profile 03",
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselPhotos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, carouselPhotos.length]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + carouselPhotos.length) % carouselPhotos.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % carouselPhotos.length);
  };

  return (
    <section
      className="py-12 sm:py-16 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="about"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-2">
            <User className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>About me</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
              I somehow figure things out
            </h2>
            <span className="font-handwriting text-3xl sm:text-4xl text-[#605E59] dark:text-[#8E8D88] font-normal select-none">
              I really do (mostly)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Portrait Carousel */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start pt-2">
          <div className="relative w-full max-w-[270px] sm:max-w-[300px]">
            {/* Signature Organic Yellow Backdrop Accent */}
            <div className="absolute -top-3 -right-3 w-full h-full bg-[#F4D000] rounded-3xl -rotate-2 -z-0 opacity-85 transition-transform hover:rotate-0 duration-300" />

            {/* Photo Carousel Card with Crossfade */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNextSlide}
              className="relative z-10 rounded-3xl overflow-hidden border-2 border-[#FFFFFF] dark:border-[#181818] shadow-lg bg-[#EFECE3] dark:bg-[#222222] aspect-[4/5] w-full group cursor-pointer select-none"
              title="Click or use arrows to view next photo"
            >
              {/* Image Slides */}
              <div className="relative w-full h-full">
                {carouselPhotos.map((photo, idx) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={`Sanjana Deshmukh Portrait ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-105 ${
                      currentSlide === idx
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}
              </div>

              {/* Gradient Vignette for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none z-10" />

              {/* Carousel Dot Indicators */}
              <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs border border-white/15">
                {carouselPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? 'w-4 bg-[#F4D000]' : 'w-1.5 bg-white/50 hover:bg-white/90'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows on Hover */}
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
                <button
                  onClick={handlePrevSlide}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 pointer-events-auto cursor-pointer shadow-md"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 pointer-events-auto cursor-pointer shadow-md"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card Label & Photo Caption */}
              <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 text-white pointer-events-none z-20">
                <p className="text-xs sm:text-sm font-semibold text-white/95 leading-snug drop-shadow-md">
                  Sanjana Deshmukh · Pune, India
                </p>
              </div>
            </div>

            {/* Tactile Black Slate Note in TOP-LEFT corner */}
            <div className="absolute top-2 -left-2 sm:top-3 sm:-left-4 z-20 bg-[#121212] px-3.5 py-2 rounded-2xl shadow-lg border-2 border-white rotate-[-4deg] hover:rotate-0 transition-transform duration-300 select-none max-w-[210px]">
              <span className="font-handwriting text-sm sm:text-base text-[#F4D000] drop-shadow-[0_1px_2px_rgba(244,208,0,0.3)] leading-tight block">
                always observing something, someone, somewhere!!
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Narrative Bio & Story Sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabbed Narrative Bio */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5 pb-3 mb-4 border-b border-[#E5E2D6] dark:border-[#2C2C2C]">
              {personalProfile.bioSections.map((sec, idx) => {
                const isActive = activeBioTab === idx;
                return (
                  <button
                    key={sec.heading}
                    onClick={() => setActiveBioTab(idx)}
                    className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                      isActive
                        ? 'bg-[#111111] dark:bg-[#F4D000] text-[#FFFFFF] dark:text-[#111111] shadow-md ring-2 ring-[#F4D000]/60 -translate-y-0.5'
                        : 'bg-[#F2EFE7] dark:bg-[#202020] text-[#605E59] dark:text-[#B0AEA8] border border-[#DDD9CC] dark:border-[#353535] hover:border-[#111111] dark:hover:border-[#F4D000] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:-translate-y-0.5 hover:shadow-xs'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    title={`Click to read ${sec.heading}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive
                          ? 'bg-[#F4D000] dark:bg-[#111111] animate-pulse'
                          : 'bg-[#B0AEA8] group-hover:bg-[#111111] dark:group-hover:bg-[#F4D000]'
                      }`}
                    />
                    <span>{sec.heading}</span>
                    {isActive && (
                      <Sparkles className="w-3 h-3 text-[#F4D000] dark:text-[#111111]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] h-[230px] sm:h-[180px] md:h-[160px] lg:h-[155px] flex items-start shadow-xs overflow-hidden">
              <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed font-normal">
                {personalProfile.bioSections[activeBioTab]?.text ?? personalProfile.bioSections[0]?.text}
              </p>
            </div>
          </div>

          {/* Things I Care About */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F4EF]">
                Things I Care About
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {personalProfile.careAbout.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#FFFFFF] dark:bg-[#181818] text-[#605E59] dark:text-[#B0AEA8] border border-[#E5E2D6] dark:border-[#2C2C2C] select-none cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
