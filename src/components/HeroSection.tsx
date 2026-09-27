import React, { useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { personalProfile } from '../data/portfolioData.ts';
import { HandwrittenSmiley } from './HandwrittenSmiley.tsx';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [blobWiggle, setBlobWiggle] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE3] dark:bg-[#222222] border border-[#E5E2D6] dark:border-[#2C2C2C] mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F4D000] animate-pulse shrink-0" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#605E59] dark:text-[#B0AEA8]">
              UX &amp; Product Designer · Student at MIT Institute of Design
            </span>
          </div>

          {/* Main Statement with "hello!" instead of "hi!" */}
          <div className="relative mb-4 sm:mb-5">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.05]">
              hello! <br />
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

          {/* Handwritten Annotation */}
          <div className="flex items-center gap-2 font-handwriting text-2xl text-[#605E59] dark:text-[#B0AEA8] select-none -rotate-2">
            <span>let’s see where this goes</span>
            <Sparkles className="w-5 h-5 text-[#F4D000] inline-block animate-pulse shrink-0" />
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

            {/* Main Portrait Card (Photo with adjusted object position to move person up) */}
            <div
              className="absolute inset-4 sm:inset-5 rounded-3xl overflow-hidden shadow-xl border-4 border-[#F7F6F0] dark:border-[#181818] bg-[#EFECE3] dark:bg-[#222222] group select-none"
            >
              <img
                src="/profile.jpeg"
                alt="Sanjana Deshmukh"
                className="w-full h-full object-cover object-[center_35%] transition-all duration-500 group-hover:scale-105"
              />

              {/* Gradient Vignette for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-10" />

              {/* Photo Caption */}
              <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 z-20 pointer-events-none">
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug drop-shadow-md">
                  Making things make sense.
                </p>
              </div>
            </div>

            {/* Slate Note: Moved upwards with new text */}
            <div
              className="absolute top-1 -left-2 sm:top-2 sm:-left-4 bg-[#121212] text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-white rotate-[-5deg] hover:rotate-0 transition-transform duration-300 select-none max-w-[230px] z-20 pointer-events-auto"
            >
              <p className="font-handwriting text-base sm:text-lg text-[#F4D000] leading-tight drop-shadow-[0_1px_2px_rgba(244,208,0,0.25)]">
                Same person who says “it’s probably fine” and still <span className="inline-block whitespace-nowrap">fixes it. <HandwrittenSmiley className="w-4 h-4 text-[#F4D000] inline-block align-baseline -translate-y-0.5 ml-0.5" variant="regular" /></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="pt-8 flex items-center border-t border-[#E5E2D6]/60 dark:border-[#252525]/60 mt-8">
        <button
          onClick={onExploreClick}
          className="group flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#8E8D88] hover:text-[#111111] dark:hover:text-[#F5F4EF] transition-colors focus:outline-none cursor-pointer"
          id="hero-scroll-cue"
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#F4D000] animate-bounce" />
          <span>keep scrolling</span>
        </button>
      </div>
    </section>
  );
};
