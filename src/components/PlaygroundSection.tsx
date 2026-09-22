import React, { useState } from 'react';
import { Sparkles, Dices, Puzzle, Music, Lightbulb } from 'lucide-react';

export const PlaygroundSection: React.FC = () => {
  const [activeSpark, setActiveSpark] = useState<number>(0);

  const sparks = [
    {
      theme: "Puzzles & Wordplay",
      prompt: "How might a crossword puzzle inspire navigation flows?",
      icon: Puzzle,
    },
    {
      theme: "Sound & Rhythm",
      prompt: "What if UI micro-animations had acoustic haptic frequencies?",
      icon: Music,
    },
    {
      theme: "Tangible Quirks",
      prompt: "Translating tactile dial resistance into digital gesture inertia.",
      icon: Lightbulb,
    },
    {
      theme: "Curiosity Loops",
      prompt: "Play without scoring: designing interfaces that reward aimless wandering.",
      icon: Sparkles,
    }
  ];

  const handleNextSpark = () => {
    setActiveSpark((prev) => (prev + 1) % sparks.length);
  };

  const CurrentIcon = sparks[activeSpark].icon;

  return (
    <section
      className="py-14 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="playground"
    >
      {/* Subtle Coordinate Tracker */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88]">
          <Sparkles className="w-3.5 h-3.5 text-[#F4D000]" />
          <span>Space For Curiosity</span>
        </div>
        <span className="text-xs font-sans text-[#8E8D88]">In Development</span>
      </div>

      {/* Main Minimal Placeholder Card */}
      <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-sm relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
          <span className="text-9xl font-black font-sans">PLAY</span>
        </div>

        <div className="max-w-2xl relative z-10 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F4D000]/20 border border-[#F4D000]/40 text-[#111111] dark:text-[#F4D000] text-xs font-sans font-bold uppercase tracking-wider">
            Playground
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-[1.1]">
            A small corner for the things I get curious about.
          </h2>

          <p className="text-base sm:text-lg text-[#605E59] dark:text-[#B0AEA8] leading-relaxed font-normal">
            An upcoming corner dedicated to playful experiments, word games, interactive puzzles, and ideas built purely for the joy of trying something new.
          </p>

          {/* Interactive Curiosity Sparklet */}
          <div className="pt-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F6F0] dark:bg-[#222222] border border-[#E5E2D6] dark:border-[#2C2C2C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F4D000] text-black flex items-center justify-center shrink-0 shadow-xs">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#8E8D88] block">
                    Curiosity Seed • {sparks[activeSpark].theme}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-[#111111] dark:text-[#F5F4EF] mt-0.5">
                    “{sparks[activeSpark].prompt}”
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextSpark}
                className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFECE3] dark:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F4EF] hover:bg-[#F4D000] hover:text-black transition-colors text-xs font-sans font-bold uppercase tracking-wider focus:outline-none cursor-pointer"
                id="playground-dice-btn"
                title="Roll for another curiosity prompt"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Next Spark</span>
              </button>
            </div>
          </div>

          {/* Subtle Future Categories */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {['Puzzles & Anagrams', 'Acoustic Sound Toys', 'Spatial Explorations', 'Generative Micro-Tools'].map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs font-sans font-medium rounded-full bg-[#FFFFFF] dark:bg-[#181818] text-[#8E8D88] border border-[#E5E2D6] dark:border-[#2C2C2C]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
