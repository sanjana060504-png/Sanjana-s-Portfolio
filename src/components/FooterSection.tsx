import React from 'react';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { personalProfile } from '../data/portfolioData.ts';
import { HandwrittenSmiley } from './HandwrittenSmiley.tsx';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative z-10" id="contact">
      {/* Background layer: Extends upward by roughly half the navbar height (36px / -top-9) behind the glass navbar */}
      <div
        className="absolute inset-x-0 bottom-0 -top-9 sm:-top-9 bg-[#F4D000] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main section content container: exactly preserved padding, margins, alignment & dimensions */}
      <div className="text-[#111111] min-h-[calc(100vh-4.5rem)] flex flex-col justify-between pt-5 sm:pt-7 pb-5 sm:pb-6 px-5 sm:px-8 relative">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
          {/* Main Content Grid: centered nicely with preserved spacing */}
          <div className="my-auto py-2 sm:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Clear Invitation & Call to Action */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 text-xs font-sans font-bold uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5" />
                  <span>YOUR MOVE</span>
                </div>

                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98]">
                  Let’s make <br />
                  something real.
                </h2>

                <p className="text-base sm:text-lg text-black/80 font-normal max-w-xl leading-relaxed">
                  Open to UX and Product Design roles, internships, design systems work, or simply a good conversation about interfaces and human habits.
                </p>

                {/* Handwritten note right before the four buttons: aligned baseline with winking curvier smiley */}
                <div className="flex items-center gap-2 font-handwriting text-2xl sm:text-3xl text-black/90 select-none -rotate-1 pt-0.5">
                  <span className="leading-normal">come on four ways, so no excuses</span>
                  <span className="inline-flex items-center translate-y-0.5">
                    <HandwrittenSmiley className="w-6 h-6 text-black/90" variant="wink" />
                  </span>
                </div>

                {/* Final Contact Redirection Buttons: Email (direct to Gmail), WhatsApp, LinkedIn, Behance */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {/* Email: Redirect directly to Gmail with arrow */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=Sanjana060504@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm font-bold text-sm tracking-tight group cursor-pointer focus:outline-none"
                    id="footer-email-btn"
                    title="Compose email to Sanjana on Gmail"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919518720730?text=Hi%20Sanjana%2C%20saw%20your%20portfolio!"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm font-bold text-sm tracking-tight group cursor-pointer focus:outline-none"
                    id="footer-whatsapp-btn"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalProfile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm font-bold text-sm tracking-tight group cursor-pointer focus:outline-none"
                    id="footer-linkedin-btn"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  {/* Behance: keep previous simple Bē mark */}
                  <a
                    href={personalProfile.behance}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm font-bold text-sm tracking-tight group cursor-pointer focus:outline-none"
                    id="footer-behance-btn"
                  >
                    <span className="font-extrabold text-[15px] leading-none tracking-tight font-sans">Bē</span>
                    <span>Behance</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>

              {/* Right: Tactile Black Slate with Signature Chalk Typography, Slightly Tilted - Clean Solid Surface Without Dotted Pattern */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
                <div
                  className="bg-[#121212] p-6 sm:p-7 rounded-3xl shadow-2xl border-2 sm:border-[3px] border-white/95 relative overflow-hidden select-none rotate-[-3deg] hover:rotate-0 transition-transform duration-300 w-full max-w-md"
                >
                  <p className="font-handwriting text-2xl sm:text-3xl leading-snug tracking-wide py-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    <span className="text-[#F4D000]">“common sense + smart work,</span>
                    <br />
                    <span className="text-white">would win in this paced AI era”</span>
                    <br />
                    <span className="text-white/90 text-xl sm:text-2xl">is what I believe.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Unified Footer Baseline: perfectly at the bottom */}
          <div className="pt-4 sm:pt-5 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-black/75">
            <div className="flex items-center gap-2.5">
              <img
                src="/profile.jpeg"
                alt={personalProfile.name}
                className="w-6 h-6 rounded-full object-cover border border-black/25 shadow-2xs"
              />
              <span className="font-medium">{personalProfile.name} • UX / Product Designer</span>
            </div>
            <div>
              © 2026. Designed with intent and chaotic patience.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
