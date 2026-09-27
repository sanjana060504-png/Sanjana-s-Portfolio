import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ExplorationItem {
  number: string;
  id: string;
  title: string;
  shortLabel: string;
  handwrittenNote: string;
  description: string;
  video?: string;
  image: string;
  badge: string;
  tilt: string;
}

const explorationItems: ExplorationItem[] = [
  {
    number: '01',
    id: 'nature',
    title: 'Nature / Travel / Photography',
    shortLabel: 'Nature',
    handwrittenNote: 'chasing quiet light & fleeting details on the way',
    description: 'Capturing nature, travel moments, fleeting details and things I notice without interrupting them.',
    video: '/nature%20photography.mp4',
    image: '/thumbnails/nature.jpg',
    badge: 'Photography',
    tilt: '-rotate-1',
  },
  {
    number: '02',
    id: 'fashion',
    title: 'Fashion / Photoshoots',
    shortLabel: 'Fashion',
    handwrittenNote: 'exploring silhouettes, textures & wearable shapes',
    description: 'Fashion shoots, styling, visual direction and fashion walks—exploring clothing and visual form as personal expression.',
    video: '/fashion.mp4',
    image: '/thumbnails/fashion.jpg',
    badge: 'Photoshoots',
    tilt: 'rotate-1.5',
  },
  {
    number: '03',
    id: 'stage',
    title: 'Stage',
    shortLabel: 'Stage',
    handwrittenNote: 'cueing lights & live pacing in the dark backstage',
    description: 'Stage management and theatre lighting. Managing the stage, coordinating behind the scenes and handling lighting cues in real time.',
    video: '/drama.mp4',
    image: '/thumbnails/stage.jpg',
    badge: 'Stage & Lighting',
    tilt: '-rotate-1',
  },
  {
    number: '04',
    id: 'clay-making',
    title: 'Clay & Making',
    shortLabel: 'Clay & Making',
    handwrittenNote: 'shaping raw clay with hands, wire & real patience',
    description: 'Hands-on making and experimentation, including a recent Ganpati clay-making workshop. Experimenting with making things by hand.',
    video: '/physical%20making.mp4',
    image: '/thumbnails/making.jpg',
    badge: 'Clay Workshop',
    tilt: 'rotate-1',
  },
  {
    number: '05',
    id: 'game',
    title: 'Year 1 Game',
    shortLabel: 'Year 1 Game',
    handwrittenNote: 'early physics, playful logic & interactive code',
    description: 'A game I made during my first year. Testing interactive physics, puzzle navigation, and the simple joy of playing with code.',
    video: '/game.mp4',
    image: '/thumbnails/game.svg',
    badge: 'First Year Game',
    tilt: '-rotate-1.5',
  },
];

export const CuriousByDefault: React.FC = () => {
  // Part 1: Exploration Philosophy Hover State
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const words = [
    { word: "Every", note: "Not just safe or predictable ones." },
    { word: "experience", note: "Digital flows, wire sculptures, late-night stage rehearsals." },
    { word: "is", note: "Right here, in front of us." },
    { word: "worth", note: "Because growth lives just outside comfort zones." },
    { word: "a", note: "Single honest attempt." },
    { word: "try.", note: "Even if it fails, you gain a perspective nobody can teach from slides." }
  ];

  // Part 2: Featured Exploration State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentItem = explorationItems[activeIndex];

  // Auto-play active video on selection change
  useEffect(() => {
    setVideoError(false);
    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [activeIndex]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + explorationItems.length) % explorationItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % explorationItems.length);
  };

  return (
    <section
      className="py-12 sm:py-16 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="exploration"
    >
      {/* ────────────────────────────────────────────────────────
          1. EXPLORATION PHILOSOPHY INTRO (KEEP EXACT CONTENT & HOVER)
          ──────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mb-10 sm:mb-12">
        {/* Small label: EXPLORATION */}
        <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-3">
          <Compass className="w-3.5 h-3.5 text-[#F4D000]" />
          <span>Exploration</span>
        </div>

        {/* Main heading: Every experience is worth a try. with interactive word hover */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.1] mb-5">
          {words.map((item, index) => (
            <span
              key={index}
              onMouseEnter={() => setActiveWord(item.note)}
              onMouseLeave={() => setActiveWord(null)}
              className="inline-block mr-2.5 sm:mr-3.5 cursor-pointer transition-all duration-200 relative group"
            >
              <span className="group-hover:text-black dark:group-hover:text-black relative z-10">
                {item.word}
              </span>
              <span className="absolute inset-x-0 bottom-1 sm:bottom-1.5 h-3 sm:h-4 bg-[#F4D000]/30 group-hover:bg-[#F4D000] group-hover:h-full -z-0 rounded-md transition-all duration-200" />
            </span>
          ))}
        </h2>

        {/* Dynamic Contextual Hint based on word hovered */}
        <div className="min-h-10 flex items-center mb-5">
          {activeWord ? (
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#F4D000]/20 border border-[#F4D000]/40 text-[#111111] dark:text-[#F4D000] text-sm font-medium animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-[#F4D000] shrink-0" />
              <span>{activeWord}</span>
            </div>
          ) : (
            <p className="text-xs font-sans text-[#8E8D88]">
              (Hover over any word to reveal why it matters)
            </p>
          )}
        </div>

        {/* Concise Personal Narrative (Unmodified) */}
        <p className="text-base sm:text-lg text-[#605E59] dark:text-[#B0AEA8] leading-relaxed font-normal max-w-3xl">
          During college, I explored fields I never expected to touch — from film photography and stage acting to physical prototyping and generative AI. This wasn’t aimless distraction; each medium gave me a fresh lens to understand user empathy, pacing, and human emotion.
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. FEATURED EXPLORATION AREA + COMPACT COLLECTION CAROUSEL
          One featured exploration at a time + uncropped media + small carousel
          ──────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <div className="w-full max-w-4xl mx-auto">
          {/* Featured Card Wrapper */}
          <div className="p-4 sm:p-7 rounded-3xl bg-[#FFFFFF] dark:bg-[#1A1A1A] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-sm">
            {/* Header info for currently featured exploration */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-wider text-[#8E8D88] mb-1">
                  <span className="text-[#111111] dark:text-[#F4D000] font-black">{currentItem.number}</span>
                  <span>/</span>
                  <span>05</span>
                  <span className="mx-1 opacity-40">·</span>
                  <span>{currentItem.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF]">
                  {currentItem.title}
                </h3>
              </div>
              <p className="font-handwriting text-xl sm:text-2xl text-[#111111] dark:text-[#F4D000] leading-tight">
                “{currentItem.handwrittenNote}”
              </p>
            </div>

            {/* Supporting description */}
            <p className="text-xs sm:text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed mb-4 max-w-2xl">
              {currentItem.description}
            </p>

            {/* Featured Media Container (Preserves ORIGINAL aspect ratio without aggressive cropping) */}
            <div className="relative w-full h-[360px] sm:h-[450px] md:h-[490px] rounded-2xl overflow-hidden bg-[#F5F4EE] dark:bg-[#121212] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center p-3 select-none">
              {/* Extremely subtle ambient backdrop blur */}
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-15 scale-110 pointer-events-none transition-all duration-500"
                style={{ backgroundImage: `url(${currentItem.image})` }}
              />

              {/* Uncropped Media Display */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {currentItem.video && !videoError ? (
                  <video
                    ref={videoRef}
                    src={currentItem.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-black/10 dark:border-white/10"
                  />
                ) : (
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-black/10 dark:border-white/10"
                  />
                )}
              </div>

              {/* Discreet Play / Pause Toggle Button */}
              {currentItem.video && !videoError && (
                <button
                  onClick={togglePlay}
                  className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4D000] animate-pulse" />
                      <Pause className="w-3 h-3 text-[#F4D000] fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#F4D000] fill-current" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* ────────────────────────────────────────────────────────
                COMPACT COLLECTION / CAROUSEL UNDERNEATH
                Small thumbnails acting like collected photographs/magnets
                ──────────────────────────────────────────────────────── */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {/* Previous Arrow */}
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] text-[#605E59] dark:text-[#A09E96] hover:bg-[#F4D000] hover:text-black hover:border-[#F4D000] transition-colors cursor-pointer shadow-xs shrink-0"
                  aria-label="Previous exploration"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Compact Thumbnail Row */}
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-1 scrollbar-none snap-x justify-center">
                  {explorationItems.map((item, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`group flex flex-col items-center cursor-pointer transition-all duration-200 snap-center shrink-0 focus:outline-none ${
                          isActive
                            ? 'scale-105'
                            : 'opacity-65 hover:opacity-100 hover:scale-102'
                        }`}
                        aria-label={`View ${item.shortLabel}`}
                      >
                        {/* Mini photograph card */}
                        <div
                          className={`p-1 bg-white dark:bg-[#202020] rounded-xl border transition-all duration-200 ${
                            isActive
                              ? 'border-[#F4D000] ring-2 ring-[#F4D000]/60 shadow-sm rotate-0'
                              : `border-black/10 dark:border-white/10 ${item.tilt} group-hover:rotate-0`
                          }`}
                        >
                          <div className="w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden bg-black/5 relative">
                            <img
                              src={item.image}
                              alt={item.shortLabel}
                              className="w-full h-full object-cover"
                            />
                            {isActive && (
                              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#F4D000] shadow-xs" />
                            )}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-sans font-semibold mt-1 truncate max-w-[64px] sm:max-w-[72px] text-center ${
                            isActive
                              ? 'text-[#111111] dark:text-[#F4D000] font-bold'
                              : 'text-[#8E8D88]'
                          }`}
                        >
                          {item.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Next Arrow */}
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] text-[#605E59] dark:text-[#A09E96] hover:bg-[#F4D000] hover:text-black hover:border-[#F4D000] transition-colors cursor-pointer shadow-xs shrink-0"
                  aria-label="Next exploration"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center mt-2.5">
                <span className="text-[11px] font-sans text-[#8E8D88]">
                  (Select a memory to explore · one featured at a time)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
