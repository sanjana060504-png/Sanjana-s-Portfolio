import React, { useState } from 'react';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';
import { personalProfile } from '../data/portfolioData.ts';

export const CuriousByDefault: React.FC = () => {
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const words = [
    { word: "Every", note: "Not just safe or predictable ones." },
    { word: "experience", note: "Digital flows, wire sculptures, late-night stage rehearsals." },
    { word: "is", note: "Right here, in front of us." },
    { word: "worth", note: "Because growth lives just outside comfort zones." },
    { word: "a", note: "Single honest attempt." },
    { word: "try.", note: "Even if it fails, you gain a perspective nobody can teach from slides." }
  ];

  const quotes = [
    {
      text: personalProfile.wittyLine,
      author: "Sanjana’s Notebook, 2025"
    },
    {
      text: "Curiosity isn't asking to be fearless. It’s being fascinated enough to step forward anyway.",
      author: "Studio Reflection"
    },
    {
      text: "The best product design starts when you put down the template and look at how people actually live.",
      author: "Fieldwork observation"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  return (
    <section className="py-14 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative" id="philosophy">
      {/* Background Subtle Coordinate Decor */}
      <div className="absolute top-8 right-8 text-[11px] font-sans font-semibold text-[#8E8D88] select-none hidden md:block uppercase tracking-wider">
        PHILOSOPHY
      </div>

      <div className="max-w-4xl">
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] block mb-4">
          Curious By Default
        </span>

        {/* Large Statement with Interactive Hover Words */}
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
        <div className="min-h-10 flex items-center mb-6">
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

        {/* Concise Personal Narrative */}
        <p className="text-base sm:text-xl text-[#605E59] dark:text-[#B0AEA8] leading-relaxed font-normal max-w-3xl mb-8">
          During college, I explored fields I never expected to touch — from film photography and stage acting to physical prototyping and generative AI. This wasn't aimless distraction; each medium gave me a fresh lens to understand user empathy, pacing, and human emotion.
        </p>

        {/* Witty Quote Card with Carousel */}
        <div className="p-5 sm:p-7 rounded-3xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <Quote className="w-6 h-6 text-[#F4D000] mb-1" />
              <p className="text-lg sm:text-xl font-bold tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-snug">
                “{quotes[currentQuoteIndex].text}”
              </p>
              <span className="text-xs font-sans text-[#8E8D88] block pt-1">
                — {quotes[currentQuoteIndex].author}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <span className="text-xs font-sans font-medium text-[#8E8D88]">
                0{currentQuoteIndex + 1} / 0{quotes.length}
              </span>
              <button
                onClick={() => setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)}
                className="p-2.5 rounded-full bg-[#EFECE3] dark:bg-[#252525] text-[#111111] dark:text-[#F5F4EF] hover:bg-[#F4D000] hover:text-black transition-colors focus:outline-none"
                aria-label="Next quote"
                title="Next reflection"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
