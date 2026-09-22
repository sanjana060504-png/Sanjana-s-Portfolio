import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUpRight, Compass, Play, Film } from 'lucide-react';
import { triedDisciplines } from '../data/portfolioData.ts';
import { TriedDiscipline } from '../types.ts';

export const ThingsIveTried: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TriedDiscipline>(triedDisciplines[0]);
  const [hoveredItem, setHoveredItem] = useState<TriedDiscipline | null>(null);
  const [isWindowHovered, setIsWindowHovered] = useState(false);
  const [isManualPlaying, setIsManualPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeDisplay = hoveredItem || selectedItem;
  const isVideoActive = (hoveredItem?.id === activeDisplay.id || isWindowHovered) && Boolean(activeDisplay.video);

  useEffect(() => {
    if (activeDisplay.video && videoRef.current) {
      if (isVideoActive || isManualPlaying) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isVideoActive, isManualPlaying, activeDisplay]);

  return (
    <section
      className="py-14 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="things-ive-tried"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-2">
            <Compass className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Exploration</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
            Things I’ve Tried <br />
            <span className="font-handwriting text-3xl sm:text-4xl text-[#605E59] dark:text-[#8E8D88] font-normal">
              (and keep trying)
            </span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] max-w-md font-normal leading-relaxed">
          Every field opened a new cognitive door. These disciplines shaped how I solve product problems, build empathy, and test physical boundaries. Hover any field with a video to preview it in action.
        </p>
      </div>

      {/* Main Interactive Stage: Unified Dual-Column Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side: Harmonious Exploration Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 content-start">
          {triedDisciplines.map((item) => {
            const isSelected = selectedItem.id === item.id;
            const isHovered = hoveredItem?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  if (item.video) {
                    setIsManualPlaying(true);
                  }
                }}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group relative p-4 rounded-2xl text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D000] select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#F4D000] text-[#111111] shadow-md ring-2 ring-black/10 scale-[1.01]'
                    : isHovered
                    ? 'bg-[#111111] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#111111]'
                    : 'bg-[#FFFFFF] dark:bg-[#181818] text-[#111111] dark:text-[#F5F4EF] border border-[#E5E2D6] dark:border-[#2C2C2C] hover:border-[#F4D000]'
                }`}
                id={`tried-item-${item.id}`}
                data-cursor="explore"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg tracking-tight">{item.name}</span>
                    {item.video && (
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isSelected
                            ? 'bg-black'
                            : isHovered
                            ? 'bg-[#F4D000]'
                            : 'bg-[#F4D000] animate-pulse'
                        }`}
                        title="Video clip available"
                      />
                    )}
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                      isSelected || isHovered ? 'translate-x-0.5 -translate-y-0.5 opacity-100' : 'opacity-40'
                    }`}
                  />
                </div>
                <span className="text-xs font-sans block opacity-80 font-normal line-clamp-1">
                  {item.shortNote}
                </span>

                {item.video && (
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider mt-2 transition-opacity ${
                      isSelected
                        ? 'text-black/80 font-extrabold'
                        : isHovered
                        ? 'text-[#F4D000] dark:text-[#111111]'
                        : 'text-[#8E8D88] dark:text-[#A09E96]'
                    }`}
                  >
                    <Film className="w-2.5 h-2.5" />
                    <span>Hover for video clip</span>
                  </span>
                )}
              </button>
            );
          })}

          {/* Whimsical note card integrated into grid */}
          <div className="p-4 rounded-2xl bg-[#EFECE3]/70 dark:bg-[#222222]/70 border border-dashed border-[#8E8D88]/40 flex flex-col justify-center">
            <p className="font-handwriting text-xl text-[#111111] dark:text-[#F4D000] leading-tight">
              “Curiosity keeps me designing.”
            </p>
            <span className="text-[10px] font-sans font-bold text-[#8E8D88] uppercase tracking-wider block mt-1">
              Never stop exploring ✎
            </span>
          </div>
        </div>

        {/* Right Side: Showcase Preview Window with Hover Video */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative rounded-3xl p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-lg overflow-hidden transition-all duration-300">
            {/* Visual Media Showcase with Video on Hover */}
            <div
              onMouseEnter={() => setIsWindowHovered(true)}
              onMouseLeave={() => setIsWindowHovered(false)}
              onClick={() => {
                if (activeDisplay.video) {
                  setIsManualPlaying((prev) => !prev);
                }
              }}
              className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-5 bg-[#EFECE3] dark:bg-[#222222] group/preview cursor-pointer select-none"
              title={activeDisplay.video ? "Hover or tap to toggle video" : activeDisplay.name}
            >
              {/* Fallback / Poster Image */}
              <img
                src={activeDisplay.image}
                alt={activeDisplay.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  activeDisplay.video && (isVideoActive || isManualPlaying)
                    ? 'opacity-0 scale-105'
                    : 'opacity-100 group-hover/preview:scale-105'
                }`}
              />

              {/* Video Element (Plays on hover or manual tap) */}
              {activeDisplay.video && (
                <video
                  ref={videoRef}
                  src={activeDisplay.video}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isVideoActive || isManualPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Gradient Vignette for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              {/* Top Header Tags & Video Indicator */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none z-10">
                <span className="px-3 py-1 rounded-full text-xs font-sans font-bold bg-[#F4D000] text-[#111111] uppercase tracking-wider shadow-xs">
                  {activeDisplay.tag}
                </span>

                {activeDisplay.video && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider backdrop-blur-md shadow-xs transition-all duration-200 ${
                      isVideoActive || isManualPlaying
                        ? 'bg-[#F4D000] text-[#111111]'
                        : 'bg-black/60 text-white border border-white/15'
                    }`}
                  >
                    {isVideoActive || isManualPlaying ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                        <span>Video Playing</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-2.5 h-2.5 fill-current text-[#F4D000]" />
                        <span>Hover to play</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Bottom Discipline Tagline */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white pointer-events-none z-10">
                <span className="text-[11px] font-sans font-bold tracking-widest text-[#F4D000] uppercase block">
                  Discipline Focus
                </span>
                <p className="text-base sm:text-lg font-bold">{activeDisplay.tagline}</p>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#111111] dark:text-[#F5F4EF]">
                  {activeDisplay.name}
                </h3>
                <span className="text-xs font-sans font-semibold text-[#8E8D88]">
                  Sanjana's Notes
                </span>
              </div>

              <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                {activeDisplay.description}
              </p>

              {/* Lesson for UX Design */}
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] dark:bg-[#222222] border border-[#E5E2D6] dark:border-[#2C2C2C]">
                <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-[#111111] dark:text-[#F4D000] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4D000]" />
                  <span>The UX Takeaway</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F4EF]">
                  {activeDisplay.lesson}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cue */}
      <div className="mt-10 pt-6 border-t border-[#E5E2D6]/60 dark:border-[#252525]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-handwriting text-2xl text-[#111111] dark:text-[#F5F4EF]">
          “Different fields. Same curiosity.”
        </p>
        <div className="text-xs font-sans text-[#8E8D88]">
          Hover any discipline above (e.g. Drama, Fashion, Photography, Physical Making) to watch the video
        </div>
      </div>
    </section>
  );
};

