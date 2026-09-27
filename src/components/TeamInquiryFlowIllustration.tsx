import React from 'react';

/**
 * Editorial workspace scene: A real team dealing with a messy workday.
 * 3 colleagues collaborating at a shared desk under high inquiry influx:
 * - One handling an inbound call while trying to capture contact details.
 * - One hunched over a spreadsheet full of conflicting rows, surrounded by paper sticky notes.
 * - One standing/checking a physical inquiry register, puzzled by an untracked follow-up.
 *
 * Inquiries arrive from forms, campaigns, and inbound calls, getting lost across
 * spreadsheets, paper notes, and disconnected tools.
 *
 * 100% theme-adaptive in Light & Dark modes (responsive vector SVG).
 */
export const TeamInquiryFlowIllustration: React.FC = () => {
  return (
    <div className="w-full my-6 py-2 select-none">
      <div className="max-w-4xl mx-auto">
        <svg
          viewBox="0 0 880 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible text-[#111111] dark:text-[#F5F4EF]"
        >
          <defs>
            <filter id="deskDropShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.06" />
            </filter>
          </defs>

          {/* ============================================================
              SHARED WORKSPACE DESK SURFACE
              Continuous wooden/minimal surface tying the three people together
              ============================================================ */}
          {/* Main desk surface top */}
          <path
            d="M 120 230 L 760 230 C 770 230, 775 235, 770 240 L 750 252 C 746 254, 740 255, 730 255 L 150 255 C 140 255, 134 254, 130 252 L 110 240 C 105 235, 110 230, 120 230 Z"
            className="fill-black/[0.03] dark:fill-white/[0.04] stroke-current"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />
          {/* Desk edge horizon line */}
          <line
            x1="80"
            y1="230"
            x2="800"
            y2="230"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          {/* Desk legs */}
          <line x1="160" y1="255" x2="160" y2="295" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
          <line x1="720" y1="255" x2="720" y2="295" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />

          {/* ============================================================
              ATMOSPHERE: INCOMING INQUIRY SIGNALS
              Floating organically above the workspace without diagram lines
              ============================================================ */}

          {/* Inbound Signal 1: Web Form (Top Left) */}
          <g transform="translate(110, 48)" filter="url(#deskDropShadow)">
            <rect
              width="132"
              height="30"
              rx="8"
              className="fill-white dark:fill-[#1A1A1A] stroke-black/10 dark:stroke-white/15"
              strokeWidth="1"
            />
            <circle cx="16" cy="15" r="3.5" fill="#0284C7" />
            <text
              x="26"
              y="19"
              className="fill-[#111111] dark:fill-[#F5F4EF]"
              fontSize="9.5"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              Web Lead · #1042
            </text>
            <text
              x="100"
              y="19"
              className="fill-[#8E8D88]"
              fontSize="8"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              just now
            </text>
          </g>

          {/* Inbound Signal 2: Inbound Phone Ring (Far Left) */}
          <g transform="translate(65, 110)" filter="url(#deskDropShadow)">
            <rect
              width="122"
              height="28"
              rx="8"
              className="fill-white dark:fill-[#1A1A1A] stroke-[#0284C7]/30"
              strokeWidth="1"
            />
            {/* Phone handset icon */}
            <path
              d="M 14 10 C 14 9 15 8.5 16 9.5 L 17 11 C 17.5 11.5 17.5 12 17 12.5 L 16 13.5 C 17 15.5 18 16.5 20 17.5 L 21 16.5 C 21.5 16 22 16 22.5 16.5 L 24 17.5 C 25 18.5 24.5 19.5 23.5 19.5 C 19 19.5 14 14.5 14 10 Z"
              fill="#0284C7"
              transform="scale(0.85) translate(0, 0)"
            />
            <text
              x="26"
              y="18"
              className="fill-[#111111] dark:fill-[#F5F4EF]"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              Inbound Call ringing...
            </text>
            {/* Sound waves */}
            <path d="M 8 10 C 6 12, 6 16, 8 18" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
            <path d="M 5 8 C 2 11, 2 17, 5 20" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
          </g>

          {/* Inbound Signal 3: Ad Campaign Leads (Top Center-Right) */}
          <g transform="translate(540, 42)" filter="url(#deskDropShadow)">
            <rect
              width="128"
              height="28"
              rx="8"
              className="fill-white dark:fill-[#1A1A1A] stroke-black/10 dark:stroke-white/15"
              strokeWidth="1"
            />
            <circle cx="15" cy="14" r="3.5" fill="#F59E0B" />
            <text
              x="26"
              y="18"
              className="fill-[#111111] dark:fill-[#F5F4EF]"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              Ad Campaign · +14 leads
            </text>
          </g>

          {/* Inbound Signal 4: Direct Query / Message (Top Right) */}
          <g transform="translate(700, 78)" filter="url(#deskDropShadow)">
            <rect
              width="118"
              height="28"
              rx="8"
              className="fill-white dark:fill-[#1A1A1A] stroke-emerald-500/30"
              strokeWidth="1"
            />
            <circle cx="15" cy="14" r="3.5" fill="#10B981" />
            <text
              x="26"
              y="18"
              className="fill-[#111111] dark:fill-[#F5F4EF]"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              Query · "Follow-up?"
            </text>
          </g>


          {/* ============================================================
              PERSON 1 (LEFT): INTAKE COUNSELOR
              On telephone with one hand, scribbling prospect notes,
              looking over at colleagues with urgent inquiry.
              ============================================================ */}
          <g transform="translate(195, 95)">
            {/* Chair outline */}
            <path
              d="M 10 135 L 8 90 C 7 82, 14 76, 22 76 L 26 76"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line x1="38" y1="135" x2="38" y2="155" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />

            {/* Torso & Shirt */}
            <path
              d="M 32 82 C 24 90, 20 106, 22 135 L 60 135 C 60 106, 56 88, 48 82 Z"
              className="fill-[#0284C7]/10 dark:fill-[#38BDF8]/10 stroke-current"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />

            {/* Head & Hair */}
            <ellipse cx="40" cy="52" rx="11" ry="12.5" className="fill-white dark:fill-[#161616] stroke-current" strokeWidth="1.75" />
            <path
              d="M 31 47 C 31 38, 38 37, 47 37 C 53 37, 53 43, 53 48 C 48 47, 42 47, 37 50 Z"
              className="fill-current opacity-80"
            />
            {/* Eye / expression focused forward */}
            <circle cx="47" cy="52" r="1.2" className="fill-current" />
            <path d="M 44 47 L 49 48" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

            {/* Left Arm holding phone to ear */}
            <path
              d="M 32 86 C 20 90, 18 70, 30 58"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Phone Receiver */}
            <rect x="27" y="52" width="6" height="15" rx="3" className="fill-[#0284C7]" />

            {/* Right Arm forward writing on desk notepad */}
            <path
              d="M 46 88 C 58 98, 70 108, 85 114"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Pen */}
            <line x1="84" y1="112" x2="89" y2="120" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />

            {/* Desk Notepad with scribbled phone numbers */}
            <g transform="translate(80, 118)">
              <rect width="36" height="24" rx="2" className="fill-white dark:fill-[#1E1E1E] stroke-current" strokeWidth="1" />
              <line x1="6" y1="6" x2="26" y2="6" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="6" y1="11" x2="30" y2="11" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="6" y1="16" x2="20" y2="16" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
            </g>
          </g>


          {/* ============================================================
              DESK CENTER: LAPTOP WITH MESSY MULTI-ROW SPREADSHEET
              Surrounded by sticky notes stuck to bezel and desk
              ============================================================ */}
          <g transform="translate(365, 110)" filter="url(#deskDropShadow)">
            {/* Open Laptop display */}
            <path d="M 12 120 L 138 120 L 132 40 C 131 36, 127 34, 122 34 L 28 34 C 23 34, 19 36, 18 40 Z" className="fill-white dark:fill-[#1A1A1A] stroke-current" strokeWidth="1.5" />
            {/* Screen inner bezel */}
            <rect x="24" y="40" width="102" height="74" rx="3" className="fill-[#FAF9F5] dark:fill-[#121212] stroke-current" strokeWidth="0.8" strokeOpacity="0.2" />

            {/* Spreadsheet rows inside laptop screen */}
            {/* Header */}
            <rect x="27" y="43" width="96" height="11" rx="1.5" className="fill-black/[0.05] dark:fill-white/[0.08]" />
            <line x1="48" y1="43" x2="48" y2="111" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
            <line x1="82" y1="43" x2="82" y2="111" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />

            {/* Row lines */}
            <line x1="27" y1="58" x2="123" y2="58" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
            <line x1="27" y1="71" x2="123" y2="71" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
            <line x1="27" y1="84" x2="123" y2="84" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
            <line x1="27" y1="97" x2="123" y2="97" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />

            {/* Conflicting cell statuses */}
            <rect x="30" y="47" width="14" height="4" rx="1" className="fill-[#0284C7]/40" />
            <rect x="52" y="47" width="22" height="4" rx="1" className="fill-black/15 dark:fill-white/20" />
            <rect x="86" y="47" width="16" height="4" rx="1" className="fill-amber-400/60" />

            <rect x="30" y="62" width="16" height="4" rx="1" className="fill-[#0284C7]/40" />
            <rect x="52" y="62" width="26" height="4" rx="1" className="fill-black/15 dark:fill-white/20" />
            <rect x="86" y="62" width="22" height="4" rx="1" className="fill-red-400/60" />

            <rect x="30" y="75" width="12" height="4" rx="1" className="fill-black/15 dark:fill-white/20" />
            <rect x="52" y="75" width="18" height="4" rx="1" className="fill-black/15 dark:fill-white/20" />
            <rect x="86" y="75" width="18" height="4" rx="1" className="fill-amber-400/60" />

            {/* Laptop Base / Keyboard deck */}
            <path d="M 6 120 L 144 120 L 152 126 L -2 126 Z" className="fill-current opacity-20" />
            <line x1="-2" y1="126" x2="152" y2="126" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

            {/* STICKY NOTE stuck to left edge of laptop bezel */}
            <g transform="translate(-18, 55) rotate(-8)">
              <rect width="38" height="28" rx="2" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.8" />
              <line x1="4" y1="7" x2="28" y2="7" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="4" y1="13" x2="34" y2="13" stroke="#B45309" strokeWidth="1" strokeLinecap="round" />
              <line x1="4" y1="19" x2="22" y2="19" stroke="#B45309" strokeWidth="1" strokeLinecap="round" />
              <circle cx="32" cy="7" r="2.5" fill="#EF4444" />
            </g>

            {/* STICKY NOTE stuck to right desk area */}
            <g transform="translate(132, 85) rotate(12)">
              <rect width="40" height="30" rx="2" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.8" />
              <text x="5" y="11" fill="#92400E" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
                CALL BACK!
              </text>
              <line x1="5" y1="17" x2="32" y2="17" stroke="#78350F" strokeWidth="0.8" />
              <line x1="5" y1="22" x2="26" y2="22" stroke="#78350F" strokeWidth="0.8" />
            </g>
          </g>


          {/* ============================================================
              PERSON 2 (CENTER-RIGHT): SPREADSHEET COUNSELOR
              Hunched over laptop, hand on temple/forehead from cognitive overload,
              trying to figure out status discrepancies.
              ============================================================ */}
          <g transform="translate(485, 90)">
            {/* Chair outline */}
            <path
              d="M 12 140 L 10 95 C 9 86, 16 80, 24 80 L 28 80"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line x1="40" y1="140" x2="40" y2="160" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />

            {/* Torso hunched toward laptop */}
            <path
              d="M 30 84 C 22 92, 18 108, 20 140 L 58 140 C 60 110, 56 88, 46 84 Z"
              className="fill-amber-500/10 dark:fill-amber-400/10 stroke-current"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />

            {/* Head tilted down */}
            <ellipse cx="34" cy="50" rx="11" ry="12.5" className="fill-white dark:fill-[#161616] stroke-current" strokeWidth="1.75" />
            {/* Hair */}
            <path
              d="M 25 45 C 26 36, 35 35, 43 37 C 47 40, 46 45, 44 49 C 39 47, 31 47, 26 49 Z"
              className="fill-current opacity-80"
            />

            {/* Left Arm raised to forehead / temple (fatigue / strain) */}
            <path
              d="M 28 88 C 18 80, 14 64, 25 51"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Hand at temple */}
            <ellipse cx="25" cy="50" rx="3.5" ry="3" className="fill-current opacity-40" />

            {/* Right Arm resting on desk trackpad */}
            <path
              d="M 46 90 C 54 102, 60 115, 68 126"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>


          {/* ============================================================
              PERSON 3 (RIGHT): TEAM LEAD / SENIOR REP
              Standing behind the desk, holding paper inquiry folder,
              pointing at the spreadsheet questioning missing follow-up.
              ============================================================ */}
          <g transform="translate(640, 75)">
            {/* Standing body / posture */}
            <path
              d="M 32 78 C 24 88, 22 108, 22 155 L 54 155 C 54 110, 52 88, 44 78 Z"
              className="fill-red-500/10 dark:fill-red-400/10 stroke-current"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />

            {/* Standing Legs */}
            <line x1="30" y1="155" x2="30" y2="215" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="46" y1="155" x2="48" y2="215" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

            {/* Head & Expression */}
            <ellipse cx="38" cy="46" rx="11" ry="13" className="fill-white dark:fill-[#161616] stroke-current" strokeWidth="1.75" />
            {/* Hair */}
            <path
              d="M 29 42 C 30 34, 38 33, 46 34 C 50 36, 49 42, 47 45 C 42 43, 34 44, 30 45 Z"
              className="fill-current opacity-80"
            />
            {/* Eyebrow furrowed slightly */}
            <path d="M 35 44 L 41 46" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="37" cy="48" r="1.2" className="fill-current" />

            {/* Left Arm holding paper register / folder */}
            <path
              d="M 44 86 C 54 94, 62 88, 70 82"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Paper folder in hand */}
            <g transform="translate(68, 70) rotate(12)">
              <rect width="28" height="36" rx="2" className="fill-white dark:fill-[#202020] stroke-current" strokeWidth="1.2" />
              {/* Paper lines */}
              <line x1="5" y1="8" x2="22" y2="8" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="5" y1="14" x2="24" y2="14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="5" y1="20" x2="18" y2="20" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
              <circle cx="20" cy="27" r="3" fill="#EF4444" opacity="0.8" />
            </g>

            {/* Right Arm pointing across to the spreadsheet laptop */}
            <path
              d="M 28 86 C 16 92, -5 98, -25 106"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Pointing index finger */}
            <line x1="-25" y1="106" x2="-32" y2="108" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ============================================================
              DESK CLUTTER & DISCONNECTED OBJECTS
              Grounding details that show the everyday friction
              ============================================================ */}

          {/* Paper coffee cup with plastic lid */}
          <g transform="translate(325, 212)">
            <path d="M 4 5 L 8 22 L 18 22 L 22 5 Z" className="fill-white dark:fill-[#252525] stroke-current" strokeWidth="1" />
            <rect x="2" y="2" width="22" height="4" rx="1.5" className="fill-black/10 dark:fill-white/20 stroke-current" strokeWidth="0.8" />
          </g>

          {/* Scattered loose inquiry sheets on desk */}
          <g transform="translate(560, 222) rotate(-5)">
            <rect width="32" height="22" rx="1.5" className="fill-white dark:fill-[#1E1E1E] stroke-current" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="4" y1="5" x2="28" y2="5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
            <line x1="4" y1="10" x2="24" y2="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
          </g>
          <g transform="translate(575, 224) rotate(8)">
            <rect width="28" height="20" rx="1.5" className="fill-amber-50 dark:fill-amber-950/30 stroke-amber-400" strokeWidth="0.8" />
            <line x1="4" y1="5" x2="24" y2="5" stroke="#92400E" strokeOpacity="0.4" strokeWidth="0.8" />
            <line x1="4" y1="10" x2="18" y2="10" stroke="#92400E" strokeOpacity="0.4" strokeWidth="0.8" />
          </g>

          {/* Desk telephone base with coiled cord */}
          <g transform="translate(290, 216)">
            <rect width="24" height="16" rx="2" className="fill-current opacity-15 stroke-current" strokeWidth="1" />
            {/* Keypad dots */}
            <circle cx="295" cy="222" r="0.8" fill="currentColor" />
            <circle cx="299" cy="222" r="0.8" fill="currentColor" />
            <circle cx="303" cy="222" r="0.8" fill="currentColor" />
            {/* Coiled cord line going toward Person 1 */}
            <path
              d="M 292 222 C 285 220, 275 224, 268 215 C 260 205, 252 210, 240 195"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.35"
              fill="none"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
