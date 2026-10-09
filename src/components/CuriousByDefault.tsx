import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface ExplorationItem {
  id: string;
  title: string;
  pillTitle: string;
  quote: string;
  video?: string;
  image: string;
}

const explorationItems: ExplorationItem[] = [
  {
    id: 'travel',
    title: 'Travel & Nature',
    pillTitle: 'TRAVEL & NATURE',
    quote: '"chasing places & little moments"',
    video: '/nature%20photography.mp4',
    image: '/thumbnails/nature.jpg',
  },
  {
    id: 'fashion',
    title: 'Photo Shoot',
    pillTitle: 'PHOTOSHOOT',
    quote: '"posing, framing & exploring"',
    video: '/fashion.mp4',
    image: '/thumbnails/fashion.jpg',
  },
  {
    id: 'stage',
    title: 'Stage Lighting',
    pillTitle: 'STAGE LIGHTING',
    quote: '"playing with light & mood"',
    video: '/stage%20lighting%20.mp4',
    image: '/stage%20light.jpeg',
  },
  {
    id: 'workshop',
    title: 'Workshop',
    pillTitle: 'WORKSHOP',
    quote: '"getting hands dirty"',
    video: '/physical%20making.mp4',
    image: '/thumbnails/making.jpg',
  },
  {
    id: 'board-game',
    title: 'Board Game',
    pillTitle: 'BOARD GAME',
    quote: '"making, playing & figuring out"',
    video: '/boardgame_reel.mp4',
    image: '/thumbnails/boardgame_reel.jpg',
  },
  {
    id: 'dance',
    title: 'Dance',
    pillTitle: 'DANCE',
    quote: '"finding my place on stage"',
    video: '/drama.mp4',
    image: '/thumbnails/dance-1.jpg',
  },
];

export const CuriousByDefault: React.FC = () => {
  // Exploration Philosophy Hover State
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  const words = [
    { word: "Every", note: "Not just safe or predictable ones." },
    { word: "experience", note: "Digital flows, wire sculptures, late-night stage rehearsals." },
    { word: "is", note: "Right here, in front of us." },
    { word: "worth", note: "Because growth lives just outside comfort zones." },
    { word: "a", note: "Single honest attempt." },
    { word: "try.", note: "Even if it fails, you gain a perspective nobody can teach from slides." },
  ];

  // Default to Workshop (index 3) to match screenshot reference
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [showCenterFeedback, setShowCenterFeedback] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const total = explorationItems.length;
  const currentItem = explorationItems[activeIndex];

  // Circular loop indices for 3-card carousel
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prevItem = explorationItems[prevIndex];
  const nextItem = explorationItems[nextIndex];

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

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    setShowCenterFeedback(true);
    setTimeout(() => setShowCenterFeedback(false), 800);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex(prevIndex);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex(nextIndex);
  };

  return (
    <section
      className="pt-6 pb-10 sm:pt-10 sm:pb-14 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative overflow-hidden"
      id="exploration"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
        {/* ────────────────────────────────────────────────────────
            LEFT COLUMN: HEADING & NARRATIVE
            Aligned at top with the phone mockup
            ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col justify-start pt-1 sm:pt-2">
          {/* Eyebrow: EXPLORATION */}
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-2.5">
            <Compass className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Exploration</span>
          </div>

          {/* Main Heading with per-word expanding highlighter accents */}
          <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.18] mb-3">
            <div className="inline-block relative mb-1.5 sm:mb-2">
              {words.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  onMouseEnter={() => {
                    setActiveWord(item.note);
                    setHoveredWordIndex(index);
                  }}
                  onMouseLeave={() => {
                    setActiveWord(null);
                    setHoveredWordIndex(null);
                  }}
                  className="relative inline-block mr-2.5 sm:mr-3.5 cursor-pointer group select-none"
                >
                  {/* Highlight behind that expands only for this specific word */}
                  <span
                    aria-hidden="true"
                    className={`absolute -inset-x-1 sm:-inset-x-1.5 bottom-0.5 sm:bottom-1 rounded-sm transition-all duration-300 ease-out pointer-events-none ${
                      hoveredWordIndex === index
                        ? 'h-[92%] sm:h-[95%] bg-[#F4D000] dark:bg-[#F4D000] opacity-95 shadow-[0_2px_12px_rgba(244,208,0,0.35)]'
                        : 'h-2 sm:h-2.5 bg-[#F4D000]/40 dark:bg-[#F4D000]/30 group-hover:h-[92%] sm:group-hover:h-[95%] group-hover:bg-[#F4D000] dark:group-hover:bg-[#F4D000] group-hover:opacity-95'
                    }`}
                  />
                  {/* Word text */}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      hoveredWordIndex === index
                        ? 'text-[#111111] dark:text-[#111111]'
                        : 'text-[#111111] dark:text-[#F5F4EF] group-hover:text-[#111111] dark:group-hover:text-[#111111]'
                    }`}
                  >
                    {item.word}
                  </span>
                </span>
              ))}
            </div>
            <br />
            <div className="inline-block relative">
              {words.slice(3).map((item, idx) => {
                const globalIndex = idx + 3;
                return (
                  <span
                    key={globalIndex}
                    onMouseEnter={() => {
                      setActiveWord(item.note);
                      setHoveredWordIndex(globalIndex);
                    }}
                    onMouseLeave={() => {
                      setActiveWord(null);
                      setHoveredWordIndex(null);
                    }}
                    className="relative inline-block mr-2.5 sm:mr-3.5 cursor-pointer group select-none"
                  >
                    {/* Highlight behind that expands only for this specific word */}
                    <span
                      aria-hidden="true"
                      className={`absolute -inset-x-1 sm:-inset-x-1.5 bottom-0.5 sm:bottom-1 rounded-sm transition-all duration-300 ease-out pointer-events-none ${
                        hoveredWordIndex === globalIndex
                          ? 'h-[92%] sm:h-[95%] bg-[#F4D000] dark:bg-[#F4D000] opacity-95 shadow-[0_2px_12px_rgba(244,208,0,0.35)]'
                          : 'h-2 sm:h-2.5 bg-[#F4D000]/40 dark:bg-[#F4D000]/30 group-hover:h-[92%] sm:group-hover:h-[95%] group-hover:bg-[#F4D000] dark:group-hover:bg-[#F4D000] group-hover:opacity-95'
                      }`}
                    />
                    {/* Word text */}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        hoveredWordIndex === globalIndex
                          ? 'text-[#111111] dark:text-[#111111]'
                          : 'text-[#111111] dark:text-[#F5F4EF] group-hover:text-[#111111] dark:group-hover:text-[#111111]'
                      }`}
                    >
                      {item.word}
                    </span>
                  </span>
                );
              })}
            </div>
          </h2>

          {/* Interactive Contextual Hint based on word hovered */}
          <div className="min-h-6 flex items-center mb-3">
            {activeWord ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#F4D000]/20 border border-[#F4D000]/40 text-[#111111] dark:text-[#F4D000] text-xs font-medium animate-fadeIn">
                <Sparkles className="w-3 h-3 text-[#F4D000] shrink-0" />
                <span>{activeWord}</span>
              </div>
            ) : (
              <p className="text-xs font-sans text-[#8E8D88]">
                (Hover over any word to reveal why it matters)
              </p>
            )}
          </div>

          {/* Narrative Paragraph */}
          <p className="text-base sm:text-[16px] text-[#605E59] dark:text-[#B0AEA8] leading-relaxed font-normal max-w-lg">
            During college, I explored fields I never expected to touch — from film photography and stage acting to physical prototyping and generative AI. This wasn’t aimless distraction; each medium gave me a fresh lens to understand user empathy, pacing, and human emotion.
          </p>
        </div>

        {/* ────────────────────────────────────────────────────────
            RIGHT COLUMN: PHONE MOCKUP WITH SURROUNDING YELLOW DOODLES
            Exact recreation of each panel from reference image
            ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col items-center justify-start pt-1 sm:pt-2 select-none">
          {/* Main Container with Doodles Flanking the Phone */}
          <div
            className="relative flex items-center justify-center w-full max-w-[540px]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* ══════════════════════════════════════════════════════
                LEFT DOODLES (Exact match to reference image)
                ══════════════════════════════════════════════════════ */}
            <div className="hidden sm:flex flex-col justify-between absolute -left-2 sm:-left-4 lg:-left-6 top-2 bottom-5 w-28 pointer-events-none z-20">
              {/* 1. Travel & Nature */}
              {currentItem.id === 'travel' && (
                <>
                  <div className="flex flex-col items-end pr-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight text-right -rotate-6">
                      <div>quiet</div>
                      <div>light</div>
                    </div>
                    {/* Curved arrow from under light swooping down-right towards phone */}
                    <svg className="w-8 h-7 text-[#F4D000] mt-0.5 -mr-1" viewBox="0 0 36 28" fill="none">
                      <path d="M6 6 C 16 10, 24 16, 30 22 M30 22 L 22 20 M30 22 L 25 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Mountain line peaks with sun arc */}
                    <svg className="w-16 h-11 text-[#F4D000] mt-0.5 -mr-1" viewBox="0 0 60 40" fill="none">
                      <path d="M22 10 A 9 9 0 0 1 34 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M4 34 L 18 16 L 28 26 L 38 12 L 56 34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-end pr-1 mt-auto">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight text-right -rotate-3">
                      <div>random</div>
                      <div>stops</div>
                    </div>
                    {/* Curved arrow swooping down-right towards camper van */}
                    <svg className="w-8 h-6 text-[#F4D000] my-0.5" viewBox="0 0 36 24" fill="none">
                      <path d="M6 4 C 14 8, 22 12, 28 18 M28 18 L 20 16 M28 18 L 24 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Camper van / bus doodle */}
                    <svg className="w-13 h-9 text-[#F4D000]" viewBox="0 0 54 36" fill="none">
                      <rect x="4" y="8" width="44" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
                      <line x1="16" y1="8" x2="16" y2="28" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="22" y="12" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="35" y="12" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="14" cy="28" r="4" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="38" cy="28" r="4" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </div>
                </>
              )}

              {/* 2. Photo Shoot */}
              {currentItem.id === 'fashion' && (
                <>
                  <div className="flex flex-col items-end pr-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight text-right -rotate-6">
                      <div>framing</div>
                      <div>moments</div>
                    </div>
                    {/* Polaroid frame doodle */}
                    <svg className="w-12 h-13 text-[#F4D000] mt-1 rotate-6" viewBox="0 0 46 52" fill="none">
                      <rect x="4" y="4" width="38" height="44" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <rect x="8" y="8" width="30" height="26" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-end pr-1 mt-auto">
                    {/* Dashed curved arrow swooping down-right towards behind the lens */}
                    <svg className="w-8 h-8 text-[#F4D000] mb-0.5" viewBox="0 0 36 36" fill="none">
                      <path d="M4 6 C 14 10, 22 18, 28 26 M28 26 L 20 24 M28 26 L 24 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                    </svg>
                    <div className="font-handwriting text-[16px] text-[#F4D000] leading-tight text-right -rotate-3">
                      <div>behind</div>
                      <div>the lens</div>
                    </div>
                    {/* Sparkle stars */}
                    <div className="flex gap-1 mt-0.5 text-[#F4D000]">
                      <span className="text-xs">✦</span>
                      <span className="text-sm">✦</span>
                    </div>
                  </div>
                </>
              )}

              {/* 3. Stage Lighting */}
              {currentItem.id === 'stage' && (
                <>
                  <div className="flex flex-col items-end pr-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight text-right -rotate-6">
                      <div>light</div>
                      <div>+</div>
                      <div>timing</div>
                    </div>
                    {/* Radiating tick marks + arrow to spotlight */}
                    <svg className="w-13 h-13 text-[#F4D000] mt-0.5" viewBox="0 0 48 48" fill="none">
                      {/* Radiating tick marks */}
                      <path d="M6 10 L 2 8 M10 6 L 8 2 M18 8 L 20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      {/* Arrow to spotlight */}
                      <path d="M12 14 C 18 16, 26 22, 32 26 M32 26 L 24 24 M32 26 L 28 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Spotlight projector with barndoors */}
                      <circle cx="24" cy="28" r="9" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M15 20 L 10 16 M33 20 L 38 16 M15 36 L 10 40 M33 36 L 38 40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-end pr-1 mt-auto">
                    {/* Curved arrow swooping down-left */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5" viewBox="0 0 32 28" fill="none">
                      <path d="M4 6 C 12 8, 20 14, 26 22 M26 22 L 18 20 M26 22 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight text-right -rotate-3">
                      <div>turning</div>
                      <div>spaces</div>
                      <div>into stories</div>
                    </div>
                  </div>
                </>
              )}

              {/* 4. Workshop */}
              {currentItem.id === 'workshop' && (
                <>
                  <div className="flex flex-col items-end pr-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight text-right -rotate-6">
                      <div>hands</div>
                      <div>in clay</div>
                    </div>
                    {/* Open hand palm doodle with tick marks */}
                    <svg className="w-12 h-12 text-[#F4D000] mt-0.5" viewBox="0 0 46 46" fill="none">
                      <path d="M6 10 L 2 8 M8 5 L 8 1 M14 6 L 16 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M12 24 C 10 18, 14 14, 18 16 C 20 12, 24 12, 26 16 C 28 13, 32 14, 33 18 C 35 15, 38 18, 37 23 C 36 30, 28 34, 22 34 C 16 34, 12 29, 12 24 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-end pr-1 mt-auto">
                    {/* Dashed curved arrow swooping down-right towards messy process */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5" viewBox="0 0 32 28" fill="none">
                      <path d="M4 6 C 12 8, 20 14, 26 22 M26 22 L 18 20 M26 22 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                    </svg>
                    <div className="font-handwriting text-[16px] text-[#F4D000] leading-tight text-right -rotate-3">
                      <div>messy</div>
                      <div>process</div>
                    </div>
                    {/* 4 Clay specks */}
                    <div className="flex gap-1 mt-0.5 text-[#F4D000]">
                      <svg className="w-9 h-5 text-[#F4D000]" viewBox="0 0 36 20" fill="none">
                        <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
                        <circle cx="16" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                        <circle cx="26" cy="14" r="2" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {/* 5. Board Game */}
              {currentItem.id === 'board-game' && (
                <>
                  <div className="flex flex-col items-end pr-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight text-right -rotate-6">
                      <div>rules</div>
                      <div>(or not)</div>
                    </div>
                    {/* 3D isometric dice doodle + arrow */}
                    <svg className="w-12 h-12 text-[#F4D000]" viewBox="0 0 46 46" fill="none">
                      <path d="M12 4 L 8 1 M22 4 L 22 0 M32 6 L 36 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M22 10 L 36 18 L 22 26 L 8 18 Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M8 18 L 8 32 L 22 40 L 22 26" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M36 18 L 36 32 L 22 40" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="22" cy="18" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="27" r="1.5" fill="currentColor" />
                      <circle cx="30" cy="27" r="1.5" fill="currentColor" />
                    </svg>
                    {/* Curved arrow pointing down-right to phone */}
                    <svg className="w-8 h-6 text-[#F4D000]" viewBox="0 0 32 24" fill="none">
                      <path d="M4 6 C 12 10, 20 14, 26 20 M26 20 L 18 18 M26 20 L 22 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-end pr-1 mt-auto">
                    {/* Curved arrow swooping down-left */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5" viewBox="0 0 32 28" fill="none">
                      <path d="M24 4 C 16 6, 10 12, 4 18 M4 18 L 10 14 M4 18 L 8 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight text-right -rotate-3">
                      <div>fun</div>
                      <div>little</div>
                      <div>experiments</div>
                    </div>
                    {/* Radiating burst lines \ | / */}
                    <svg className="w-11 h-4 text-[#F4D000] mt-0.5" viewBox="0 0 44 20" fill="none">
                      <line x1="12" y1="4" x2="6" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="22" y1="2" x2="22" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="32" y1="4" x2="38" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </>
              )}

              {/* 6. Dance */}
              {currentItem.id === 'dance' && (
                <>
                  <div className="flex flex-col items-end pr-1">
                    <div className="font-handwriting text-[16px] text-[#F4D000] leading-tight text-right -rotate-6">
                      <div>movement</div>
                      <div>=</div>
                      <div>mood</div>
                    </div>
                    {/* Curved arrow pointing down to dancing figure */}
                    <svg className="w-7 h-6 text-[#F4D000] mt-0.5" viewBox="0 0 32 24" fill="none">
                      <path d="M6 4 C 14 8, 20 14, 24 20 M24 20 L 16 18 M24 20 L 20 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Dancing figure doodle */}
                    <svg className="w-12 h-13 text-[#F4D000]" viewBox="0 0 46 50" fill="none">
                      <circle cx="23" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 18 C 18 16, 28 16, 34 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M23 12 L 23 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M23 28 L 14 42 M23 28 L 32 40" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-end pr-1 mt-auto">
                    {/* Curved arrow swooping down-right towards rhythm */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5" viewBox="0 0 32 28" fill="none">
                      <path d="M4 6 C 12 8, 20 14, 26 22 M26 22 L 18 20 M26 22 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight text-right -rotate-3">
                      <div>rhythm</div>
                      <div>in</div>
                      <div>everything</div>
                    </div>
                    {/* Musical beamed eighth note */}
                    <svg className="w-5 h-5 text-[#F4D000] mt-0.5 mr-2" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18 A 3 3 0 1 1 6 15 L 6 4 L 18 4 L 18 14 A 3 3 0 1 1 15 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </>
              )}
            </div>

            {/* ══════════════════════════════════════════════════════
                SIDE BACKWARD BUTTON (<) ON LEFT OF PHONE
                ══════════════════════════════════════════════════════ */}
            <button
              onClick={handlePrev}
              className="mr-2 sm:mr-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-[#1A1A1A]/90 dark:bg-[#1C1C1C]/90 text-white/80 hover:text-white border border-white/10 shadow-[0_3px_12px_rgba(0,0,0,0.4)] backdrop-blur-md hover:bg-[#F4D000] hover:text-black hover:border-[#F4D000] transition-all duration-200 cursor-pointer shrink-0 z-30 active:scale-95 group"
              aria-label="Previous experience"
              title="Previous experience"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* ══════════════════════════════════════════════════════
                THE PHONE MOCKUP (Scaled down slightly in height)
                Dimensions: 215px × 415px (sm: 230px × 440px)
                ══════════════════════════════════════════════════════ */}
            <div
              onClick={() => togglePlay()}
              className="relative w-[215px] sm:w-[230px] h-[415px] sm:h-[440px] rounded-[38px] bg-[#0A0A0A] p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65)] border-[5px] border-[#222222] ring-1 ring-white/10 select-none cursor-pointer group transition-transform duration-200 shrink-0"
              title="Click anywhere on screen to play/pause"
            >
              {/* Dynamic Island Pill Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-40 flex items-center justify-between px-2 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-[#181822] ring-1 ring-[#222230]" />
                <div className="w-1 h-1 rounded-full bg-[#151515]" />
              </div>

              {/* Inner Screen */}
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-[#111111] flex items-center justify-center">
                {/* Media Element: Video or Image */}
                {currentItem.video && !videoError ? (
                  <video
                    ref={videoRef}
                    src={currentItem.video}
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Subtle Glare Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none z-10" />

                {/* Dark Vignette Scrim at top & bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none z-10" />

                {/* Top Overlay: Left Pill Badge, Right Sound Button */}
                <div className="absolute top-3 left-2.5 right-2.5 z-30 flex items-center justify-between pointer-events-none">
                  {/* Left: Category Pill */}
                  <span className="px-2.5 py-0.5 rounded-full text-[8.5px] font-sans font-bold uppercase tracking-wider bg-black/65 text-white backdrop-blur-md border border-white/15">
                    {currentItem.pillTitle}
                  </span>

                  {/* Right: Audio Mute Toggle Button */}
                  <div className="pointer-events-auto">
                    <button
                      onClick={toggleSound}
                      className="w-5.5 h-5.5 rounded-full bg-black/65 hover:bg-black/90 text-white/90 flex items-center justify-center backdrop-blur-md border border-white/15 transition-transform hover:scale-105 cursor-pointer"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Click to unmute' : 'Click to mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-2.5 h-2.5 text-white/80" />
                      ) : (
                        <Volume2 className="w-2.5 h-2.5 text-[#F4D000]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Center Glass Play/Pause Button */}
                <div
                  className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                    !isPlaying || showCenterFeedback
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-90 group-hover:opacity-60'
                  }`}
                >
                  <div className="w-13 h-13 rounded-full backdrop-blur-md bg-white/20 dark:bg-black/45 border border-white/40 shadow-2xl flex items-center justify-center text-white ring-1 ring-white/30">
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#F4D000] fill-current" />
                    ) : (
                      <Play className="w-5.5 h-5.5 text-[#F4D000] fill-current ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Bottom Screen Quote: Hand-written quote in yellow Caveat font */}
                <div className="absolute bottom-5 left-3 right-3 z-20 pointer-events-none text-left">
                  <p className="font-handwriting text-[14.5px] sm:text-[15.5px] text-[#F4D000] leading-snug drop-shadow-md">
                    {currentItem.quote}
                  </p>
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-22 h-1 bg-white/50 rounded-full z-20 pointer-events-none" />
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                SIDE FORWARD BUTTON (>) ON RIGHT OF PHONE
                ══════════════════════════════════════════════════════ */}
            <button
              onClick={handleNext}
              className="ml-2 sm:ml-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-[#1A1A1A]/90 dark:bg-[#1C1C1C]/90 text-white/80 hover:text-white border border-white/10 shadow-[0_3px_12px_rgba(0,0,0,0.4)] backdrop-blur-md hover:bg-[#F4D000] hover:text-black hover:border-[#F4D000] transition-all duration-200 cursor-pointer shrink-0 z-30 active:scale-95 group"
              aria-label="Next experience"
              title="Next experience"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* ══════════════════════════════════════════════════════
                RIGHT DOODLES (Exact match to reference image)
                ══════════════════════════════════════════════════════ */}
            <div className="hidden sm:flex flex-col justify-between absolute -right-2 sm:-right-4 lg:-right-6 top-2 bottom-5 w-28 pointer-events-none z-20">
              {/* 1. Travel & Nature */}
              {currentItem.id === 'travel' && (
                <>
                  <div className="flex flex-col items-start pl-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight rotate-3">
                      <div>fleeting</div>
                      <div>details</div>
                    </div>
                    {/* Curved arrow from under details down-left to camera */}
                    <svg className="w-7 h-7 text-[#F4D000] mt-0.5 -ml-1" viewBox="0 0 32 32" fill="none">
                      <path d="M26 6 C 18 8, 10 16, 6 24 M6 24 L 14 20 M6 24 L 8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Camera doodle */}
                    <svg className="w-12 h-9 text-[#F4D000] mt-0.5" viewBox="0 0 48 36" fill="none">
                      <rect x="4" y="8" width="40" height="24" rx="4" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M16 8 L 18 4 L 30 4 L 32 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="24" cy="20" r="7" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="38" cy="13" r="1.5" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start pl-1 mt-auto">
                    {/* Curved arrow pointing down-left towards noticing */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5 -ml-1" viewBox="0 0 32 28" fill="none">
                      <path d="M26 6 C 18 8, 10 14, 4 22 M4 22 L 12 18 M4 22 L 8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[16px] text-[#F4D000] leading-tight rotate-3">
                      <div>noticing</div>
                      <div>along</div>
                      <div>the way,</div>
                    </div>
                    {/* Sprout branch doodle */}
                    <svg className="w-9 h-9 text-[#F4D000] ml-1 mt-0.5" viewBox="0 0 36 36" fill="none">
                      <path d="M12 30 C 12 20, 20 14, 26 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M18 20 C 24 16, 28 20, 26 24 C 22 24, 18 22, 18 20 Z" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M15 16 C 12 10, 16 6, 20 8 C 20 12, 18 15, 15 16 Z" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </div>
                </>
              )}

              {/* 2. Photo Shoot */}
              {currentItem.id === 'fashion' && (
                <>
                  <div className="flex flex-col items-start pl-1">
                    <div className="flex items-center gap-1 font-handwriting text-[17px] text-[#F4D000] leading-tight rotate-3">
                      <div>
                        <div>new</div>
                        <div>angles</div>
                      </div>
                      <span className="text-sm">♡</span>
                    </div>
                    <span className="text-xs text-[#F4D000] ml-2 mt-0.5">✦</span>
                    {/* Curved arrow swooping down-left towards phone */}
                    <svg className="w-7 h-7 text-[#F4D000] mt-0.5 -ml-1" viewBox="0 0 32 32" fill="none">
                      <path d="M26 6 C 18 8, 10 16, 4 24 M4 24 L 12 20 M4 24 L 8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start pl-1 mt-auto">
                    {/* Curved arrow pointing down-left towards seeing myself */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5 -ml-1" viewBox="0 0 32 28" fill="none">
                      <path d="M26 6 C 18 8, 10 14, 4 22 M4 22 L 12 18 M4 22 L 8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-5 h-7 text-[#F4D000]" viewBox="0 0 24 32" fill="none">
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M4 28 C 4 20, 8 17, 12 17 C 16 17, 20 20, 20 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight rotate-3">
                        <div>seeing</div>
                        <div>myself</div>
                        <div>differently</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 3. Stage Lighting */}
              {currentItem.id === 'stage' && (
                <>
                  <div className="flex flex-col items-start pl-1">
                    <div className="flex items-center gap-1 font-handwriting text-[17px] text-[#F4D000] leading-tight rotate-3">
                      <div>
                        <div>mood</div>
                        <div>&</div>
                        <div>atmosphere</div>
                      </div>
                    </div>
                    {/* Upward curved arrow swooping up-right */}
                    <svg className="w-8 h-8 text-[#F4D000] ml-1 mt-0.5" viewBox="0 0 32 32" fill="none">
                      <path d="M8 26 C 12 18, 18 10, 26 6 M26 6 L 18 8 M26 6 L 24 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start pl-1 mt-auto">
                    {/* Curved arrow pointing down-left towards finding */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5 -ml-1" viewBox="0 0 32 28" fill="none">
                      <path d="M26 6 C 18 8, 10 14, 4 22 M4 22 L 12 18 M4 22 L 8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight rotate-3">
                      <div>finding</div>
                      <div>character</div>
                      <div>depth</div>
                    </div>
                    {/* Theater curtain stage proscenium doodle */}
                    <svg className="w-12 h-9 text-[#F4D000] mt-0.5" viewBox="0 0 48 36" fill="none">
                      <rect x="4" y="4" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M4 6 C 12 12, 12 24, 4 28" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M44 6 C 36 12, 36 24, 44 28" stroke="currentColor" strokeWidth="1.6" />
                      <line x1="8" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M1 18 L 4 18 M44 18 L 47 18 M1 24 L 4 24 M44 24 L 47 24" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                </>
              )}

              {/* 4. Workshop */}
              {currentItem.id === 'workshop' && (
                <>
                  <div className="flex flex-col items-start pl-1">
                    <div className="font-handwriting text-[17px] text-[#F4D000] leading-tight rotate-3">
                      <div>shaping</div>
                      <div>slowly</div>
                    </div>
                    {/* Squiggly doodle underline */}
                    <svg className="w-10 h-4 text-[#F4D000] mt-1" viewBox="0 0 44 16" fill="none">
                      <path d="M2 8 C 8 2, 14 14, 20 8 C 26 2, 32 14, 38 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start pl-1 mt-auto">
                    {/* Curved arrow pointing down-left towards patience */}
                    <svg className="w-7 h-7 text-[#F4D000] mb-0.5 -ml-1" viewBox="0 0 32 32" fill="none">
                      <path d="M26 6 C 18 8, 10 16, 4 24 M4 24 L 12 20 M4 24 L 8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[16px] text-[#F4D000] leading-tight rotate-3">
                      <div>patience</div>
                      <div>&</div>
                      <div>curiosity,</div>
                    </div>
                    {/* Stacked clay pot coils on wheel */}
                    <svg className="w-10 h-9 text-[#F4D000] mt-0.5" viewBox="0 0 44 40" fill="none">
                      <ellipse cx="22" cy="12" rx="13" ry="3.5" stroke="currentColor" strokeWidth="1.8" />
                      <ellipse cx="22" cy="20" rx="14" ry="4" stroke="currentColor" strokeWidth="1.8" />
                      <ellipse cx="22" cy="28" rx="12" ry="3.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M8 12 L 9 28 M36 12 L 35 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </>
              )}

              {/* 5. Board Game */}
              {currentItem.id === 'board-game' && (
                <>
                  <div className="flex flex-col items-start pl-1">
                    <div className="flex items-center gap-1">
                      {/* 3 radiating lines on the left */}
                      <svg className="w-4 h-6 text-[#F4D000] shrink-0" viewBox="0 0 16 24" fill="none">
                        <path d="M2 6 L 10 9 M2 12 L 10 12 M2 18 L 10 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight rotate-3">
                        <div>same</div>
                        <div>game,</div>
                        <div>new stories</div>
                      </div>
                    </div>
                    {/* 3 people heads doodle */}
                    <svg className="w-12 h-6 text-[#F4D000] mt-1 ml-1" viewBox="0 0 48 24" fill="none">
                      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="24" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="36" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M6 22 C 6 17, 9 15, 12 15 C 15 15, 18 17, 18 22" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M18 21 C 18 16, 21 14, 24 14 C 27 14, 30 16, 30 21" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M30 22 C 30 17, 33 15, 36 15 C 39 15, 42 17, 42 22" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    {/* Arrow pointing left to phone */}
                    <svg className="w-7 h-5 text-[#F4D000] -ml-1 mt-0.5" viewBox="0 0 28 20" fill="none">
                      <path d="M24 10 C 16 10, 8 10, 2 10 M2 10 L 8 4 M2 10 L 8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start pl-1 mt-auto">
                    {/* Curved arrow */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5 -ml-1" viewBox="0 0 32 28" fill="none">
                      <path d="M26 6 C 18 8, 10 14, 4 22 M4 22 L 12 18 M4 22 L 8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight rotate-3">
                      <div>trial</div>
                      <div>&</div>
                      <div>chaos</div>
                    </div>
                    {/* Loopy spiral flourish with sparkle */}
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg className="w-9 h-5 text-[#F4D000]" viewBox="0 0 40 24" fill="none">
                        <path d="M4 8 C 12 24, 20 24, 26 12 C 30 2, 36 6, 36 14 C 36 20, 32 22, 28 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <span className="text-xs text-[#F4D000]">✦</span>
                    </div>
                  </div>
                </>
              )}

              {/* 6. Dance */}
              {currentItem.id === 'dance' && (
                <>
                  <div className="flex flex-col items-start pl-1">
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight rotate-3">
                      <div>becoming</div>
                      <div>someone</div>
                      <div>else ✦</div>
                    </div>
                    {/* Curved arrow curving down-left to phone */}
                    <svg className="w-7 h-7 text-[#F4D000] mt-0.5 -ml-1" viewBox="0 0 32 32" fill="none">
                      <path d="M26 6 C 18 8, 10 16, 4 24 M4 24 L 12 20 M4 24 L 8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start pl-1 mt-auto">
                    {/* Curved arrow pointing down-right */}
                    <svg className="w-8 h-7 text-[#F4D000] mb-0.5 -ml-1" viewBox="0 0 32 28" fill="none">
                      <path d="M4 6 C 12 8, 20 14, 26 22 M26 22 L 18 20 M26 22 L 22 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-handwriting text-[15.5px] text-[#F4D000] leading-tight rotate-3">
                      <div>expression</div>
                      <div>freedom</div>
                      <div>joy</div>
                    </div>
                    <div className="flex gap-1.5 mt-0.5 text-[#F4D000]">
                      <span className="text-xs">✦</span>
                      <span className="text-sm">✦</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              BOTTOM 3-CARD CAROUSEL + SINGLE LABEL BELOW
              Matches each panel in user's image exactly
              ══════════════════════════════════════════════════════ */}
          <div
            className="mt-3 flex flex-col items-center touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* The 3 Cards */}
            <div className="flex items-center justify-center gap-3">
              {/* Left Card: PREVIOUS */}
              <button
                onClick={handlePrev}
                className="w-14 h-9 sm:w-16 sm:h-10 rounded-xl overflow-hidden bg-[#181818] border border-white/10 relative p-0.5 shadow-xs cursor-pointer group transition-all duration-200 opacity-60 hover:opacity-100 hover:scale-105"
                aria-label={`Previous: ${prevItem.title}`}
                title={`View ${prevItem.title}`}
              >
                <img
                  src={prevItem.image}
                  alt={prevItem.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>

              {/* Middle Card: ACTIVE (Yellow Border / Ring) */}
              <div
                className="w-16 h-10 sm:w-18 sm:h-11 rounded-xl overflow-hidden bg-[#202020] border-2 border-[#F4D000] ring-3 ring-[#F4D000]/30 relative p-0.5 shadow-md scale-105 transition-all duration-200"
                aria-label={`Active: ${currentItem.title}`}
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right Card: NEXT */}
              <button
                onClick={handleNext}
                className="w-14 h-9 sm:w-16 sm:h-10 rounded-xl overflow-hidden bg-[#181818] border border-white/10 relative p-0.5 shadow-xs cursor-pointer group transition-all duration-200 opacity-60 hover:opacity-100 hover:scale-105"
                aria-label={`Next: ${nextItem.title}`}
                title={`View ${nextItem.title}`}
              >
                <img
                  src={nextItem.image}
                  alt={nextItem.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            </div>

            {/* Title of Active Item directly below the cards (as in reference image) */}
            <span className="text-xs sm:text-[13px] font-sans font-bold text-[#111111] dark:text-[#F5F4EF] mt-2 tracking-wide text-center">
              {currentItem.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
