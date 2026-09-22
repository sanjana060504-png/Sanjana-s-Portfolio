import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { personalProfile } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [blobWiggle, setBlobWiggle] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // The remaining 2 profile photos of Sanjana for this hero carousel
  const remainingPhotos = [
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
      setCurrentSlide((prev) => (prev + 1) % remainingPhotos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, remainingPhotos.length]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + remainingPhotos.length) % remainingPhotos.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % remainingPhotos.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between pt-6 pb-8 sm:py-10 px-5 sm:px-8 max-w-7xl mx-auto"
      id="hero-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
        {/* Left Column: Personality-First Typography */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Subtle Tag / Greeting */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE3] dark:bg-[#222222] border border-[#E5E2D6] dark:border-[#2C2C2C] mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F4D000] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#605E59] dark:text-[#B0AEA8]">
              {personalProfile.role}
            </span>
          </div>

          {/* Main Statement */}
          <div className="relative mb-4 sm:mb-5">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.05]">
              hi! <br />
              <span className="relative inline-block">
                I’m Sanjana.
                {/* Underline gesture */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full text-[#F4D000]"
                  viewBox="0 0 250 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 11.5C54.5 4.5 163.5 2.5 247 13"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </div>

          {/* Supporting Statement */}
          <p className="text-base sm:text-xl md:text-2xl text-[#605E59] dark:text-[#B0AEA8] font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
            {personalProfile.heroStatement}
          </p>

          {/* Action Row & Handwritten Annotation */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-8">
            <button
              onClick={onExploreClick}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#111111] dark:bg-[#F4D000] text-[#FFFFFF] dark:text-[#111111] font-bold text-sm sm:text-base tracking-tight hover:bg-[#F4D000] hover:text-[#111111] dark:hover:bg-[#FFFFFF] dark:hover:text-[#111111] transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F4D000]/50"
              id="hero-explore-btn"
              data-cursor="explore"
            >
              <span>See what I’ve been making</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Handwritten note pointing to action */}
            <div className="hidden sm:flex items-center gap-2 font-handwriting text-2xl text-[#605E59] dark:text-[#B0AEA8] select-none -rotate-2">
              <span>always up for something new</span>
              <Sparkles className="w-4 h-4 text-[#F4D000]" />
            </div>
          </div>
        </div>

        {/* Right Column: Organic Signature Yellow Element & Collage Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
          {/* Dynamic Interactive Yellow Blob */}
          <div
            className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-92 lg:h-92 transition-transform duration-500 ease-out cursor-pointer ${
              blobWiggle ? 'scale-105 rotate-3' : ''
            }`}
            onClick={() => setBlobWiggle(!blobWiggle)}
            style={{
              transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
            }}
            title="Click or move cursor to feel the shape"
            data-cursor="curious"
          >
            {/* Organic SVG Yellow Shape */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-[#F4D000] drop-shadow-md transition-all duration-700 hover:scale-105"
              fill="currentColor"
            >
              <path
                d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,87.6,-1.4C85.1,13.5,77.7,27,68.9,39.3C60.1,51.6,49.9,62.7,37.3,70.5C24.7,78.3,9.7,82.8,-4.2,80C-18.1,77.2,-31,67,-42.6,56.7C-54.2,46.4,-64.5,36,-71.9,23.3C-79.3,10.6,-83.8,-4.4,-81.2,-18.8C-78.6,-33.2,-68.9,-47,-56.3,-54.6C-43.7,-62.2,-28.2,-63.6,-13.7,-67.2C0.8,-70.8,30.6,-83.6,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>

            {/* Carousel Portrait Inside / In Front */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNextSlide}
              className="absolute inset-4 sm:inset-5 rounded-3xl overflow-hidden shadow-xl border-4 border-[#F7F6F0] dark:border-[#181818] bg-[#EFECE3] dark:bg-[#222222] group cursor-pointer select-none"
              title="Click or use arrows to view next photo"
            >
              {/* Image Slides with smooth crossfade */}
              <div className="relative w-full h-full">
                {remainingPhotos.map((photo, idx) => (
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

              {/* Bottom Subtle Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none z-10" />

              {/* Carousel Dot Indicators in TOP-RIGHT */}
              <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs border border-white/15">
                {remainingPhotos.map((_, idx) => (
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
                    title={`Photo ${idx + 1} of ${remainingPhotos.length}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows (visible on hover) */}
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
                <button
                  onClick={handlePrevSlide}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 pointer-events-auto cursor-pointer shadow-md"
                  aria-label="Previous photo"
                  title="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 pointer-events-auto cursor-pointer shadow-md"
                  aria-label="Next photo"
                  title="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Caption Overlay without 'Pune, India' */}
              <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none z-20">
                <span className="text-xs font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  Designing with intent & curiosity
                </span>
              </div>
            </div>

            {/* Tactile Black Slate Note in TOP-LEFT Corner */}
            <div
              className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 bg-[#121212] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl border-2 border-[#242424] rotate-[-5deg] hover:rotate-0 transition-transform duration-300 select-none max-w-[210px] z-20 pointer-events-auto"
              style={{
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4D000]" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#B0AEA8]">
                  SLATE
                </span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-[#F4D000] leading-tight drop-shadow-[0_1px_2px_rgba(244,208,0,0.25)]">
                Same person who overthinks and says “let's try it!” ◡̈
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="pt-8 flex items-center justify-between border-t border-[#E5E2D6]/60 dark:border-[#252525]/60 mt-8">
        <button
          onClick={onExploreClick}
          className="group flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#8E8D88] hover:text-[#111111] dark:hover:text-[#F5F4EF] transition-colors focus:outline-none"
          id="hero-scroll-cue"
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#F4D000] animate-bounce" />
          <span>keep scrolling</span>
        </button>

        <div className="text-xs font-sans text-[#8E8D88]">
          Work & Experiments (2025–2026)
        </div>
      </div>
    </section>
  );
};
