import React, { useState } from 'react';
import { ArrowUpRight, Mail, Sparkles, Copy, Check } from 'lucide-react';
import { personalProfile } from '../data/portfolioData.ts';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="mt-14 sm:mt-20 border-t border-[#E5E2D6] dark:border-[#252525]" id="contact">
      {/* Single Strong, Unified Closing Section */}
      <div className="bg-[#F4D000] text-[#111111] py-14 sm:py-20 px-5 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Clear Invitation & Role Scope */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-xs font-sans font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let’s Connect</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
                Let’s make <br />
                something real.
              </h2>

              <p className="text-base sm:text-xl text-black/80 font-normal max-w-xl leading-relaxed">
                Open to UX and Product Design roles, internships, design systems work, or simply a good conversation about interfaces and human habits.
              </p>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${personalProfile.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white font-bold text-sm tracking-tight hover:bg-white hover:text-black transition-all shadow-sm focus:outline-none"
                  id="footer-email-btn"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 text-black font-bold text-sm tracking-tight hover:bg-white transition-all border border-black/10 shadow-xs cursor-pointer"
                  id="footer-copy-email-btn"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : personalProfile.email}</span>
                </button>
              </div>
            </div>

            {/* Right: Tactile Black Slate with Signature Yellow & White Chalk Typography */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              <div
                className="bg-[#121212] p-6 sm:p-7 rounded-3xl shadow-lg border-2 sm:border-[3px] border-white/90 relative overflow-hidden select-none transition-transform duration-300 hover:scale-[1.01]"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              >
                <p className="font-handwriting text-2xl sm:text-3xl leading-snug tracking-wide py-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  <span className="text-white">“common sense + smart work would win in an AI era”</span>{' '}
                  <span className="text-[#F4D000]">is what I believe</span>
                </p>
              </div>

              {/* Social Navigation Links */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={personalProfile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-black/10 hover:bg-black hover:text-white transition-colors text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={personalProfile.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-black/10 hover:bg-black hover:text-white transition-colors text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Behance</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.instagram.com/sanjananaaaah/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-black/10 hover:bg-black hover:text-white transition-colors text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://wa.me/917296565407?text=Hi%20Sanjana%2C%20saw%20your%20portfolio!"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-black/10 hover:bg-black hover:text-white transition-colors text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Clean Unified Footer Baseline */}
          <div className="mt-12 pt-6 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-black/70">
            <div className="flex items-center gap-2">
              <img
                src="/profile.jpeg"
                alt={personalProfile.name}
                className="w-6 h-6 rounded-full object-cover border border-black/20"
              />
              <span>{personalProfile.name} • UX / Product Designer</span>
            </div>
            <div>
              © 2026. Designed with intent and curiosity.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
