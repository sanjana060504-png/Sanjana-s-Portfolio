import React from 'react';
import { Wrench } from 'lucide-react';

interface Tool {
  name: string;
  category: string;
  whatFor: string;
}

const toolsList: Tool[] = [
  { name: 'Figma', category: 'Design & Prototyping', whatFor: 'Systems, UI design & interactive prototypes' },
  { name: 'Google AI Studio', category: 'AI Prototyping', whatFor: 'Prompt design & multimodal exploration' },
  { name: 'ChatGPT', category: 'AI & Research', whatFor: 'Synthesis, user scripts & early ideation' },
  { name: 'Claude', category: 'AI & Writing', whatFor: 'Analytical critique & documentation review' },
  { name: 'Stitch', category: 'Prototyping', whatFor: 'Rapid wireframing & responsive layouts' },
  { name: 'Notion', category: 'Documentation', whatFor: 'Research notes, project sprints & roadmaps' },
  { name: 'Miro', category: 'Collaboration', whatFor: 'Brainstorming workshops & canvas mapping' },
  { name: 'Gemini', category: 'Multimodal AI', whatFor: 'Vision analysis & real-time reasoning' },
];

export const ToolIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" className={className} fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
      );
    case 'Google AI Studio':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
            fill="url(#google-ai-grad-tools)"
          />
          <defs>
            <linearGradient id="google-ai-grad-tools" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1A73E8"/>
              <stop offset="35%" stopColor="#8AB4F8"/>
              <stop offset="68%" stopColor="#EA4335"/>
              <stop offset="100%" stopColor="#FBBC04"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'ChatGPT':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="#10A37F"/>
          <g transform="translate(3.5, 3.5) scale(0.708)">
            <path
              d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
              fill="white"
            />
          </g>
        </svg>
      );
    case 'Claude':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="#CC785C"/>
          <g transform="translate(4, 4)">
            <path
              d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212z"
              fill="white"
            />
          </g>
        </svg>
      );
    case 'Stitch':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="#2563EB"/>
          <path
            d="M7 8a4 4 0 0 1 7.2-2.4L18 9m-1 7a4 4 0 0 1-7.2 2.4L6 15"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 10l4 4"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'Notion':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.43-.84c1.12-.093 1.307-.466.933-1.026L17.514 1.22C16.955.474 16.115 0 14.995 0L2.78.84c-1.12.093-1.4.653-.933 1.307l2.612 2.06zm1.12 3.08v14.464c0 1.026.56 1.4 1.68 1.307l12.784-.933c1.12-.093 1.493-.84 1.493-1.773V5.888c0-.933-.467-1.307-1.493-1.213L7.259 5.514c-1.027.094-1.68.747-1.68 1.774zm11.385.933c.093.56.093 1.027-.373 1.027-.374 0-.654-.28-.747-.84l-.56-2.52-6.533.467v10.64l4.2-7.186c.467-.747.933-.934 1.587-.934.84 0 1.213.56 1.213 1.494v8.12c0 .84-.373 1.213-1.026 1.213-.654 0-.934-.373-.934-1.12V9.893l-4.573 7.746c-.466.747-.933 1.027-1.586 1.027-.84 0-1.214-.56-1.214-1.493V7.288c0-.747.374-1.12 1.027-1.12.653 0 .933.28 1.027.933l.466 2.334 5.04-.374V7.288c0-.747.373-1.12 1.027-1.12.653 0 .933.373 1.026 1.053v1z"/>
        </svg>
      );
    case 'Miro':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="#FFD02F"/>
          <g transform="translate(3.5, 3.5) scale(0.708)">
            <path
              d="M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z"
              fill="#050038"
            />
          </g>
        </svg>
      );
    case 'Gemini':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
            fill="url(#gemini-sparkle-tools)"
          />
          <defs>
            <linearGradient id="gemini-sparkle-tools" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1B72E8" />
              <stop offset="50%" stopColor="#8E24AA" />
              <stop offset="100%" stopColor="#FF7769" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return <Wrench className={className} />;
  }
};

export const ToolsSection: React.FC = () => {
  // Duplicate tools array for seamless infinite marquee loop
  const marqueeItems = [...toolsList, ...toolsList];

  return (
    <section className="py-12 sm:py-16 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525]">
      {/* Supporting Copy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88] mb-1.5">
            <Wrench className="w-3.5 h-3.5 text-[#F4D000]" />
            <span>Tools I work with</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] dark:text-[#F5F4EF]">
              Tools in my toolkit
            </h3>
            <span className="font-handwriting text-xl sm:text-2xl text-[#8E8D88] dark:text-[#A09E96]">
              “that help me explore, make and bring ideas to life”
            </span>
          </div>
        </div>
      </div>

      {/* Lightweight continuous horizontal moving toolkit strip */}
      <div className="relative w-full overflow-hidden py-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-xs">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-[#FFFFFF] dark:from-[#181818] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-[#FFFFFF] dark:from-[#181818] to-transparent z-10 pointer-events-none" />

        {/* Moving marquee track */}
        <div className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {marqueeItems.map((tool, idx) => (
            <div
              key={`${tool.name}-${idx}`}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#FDFBF7] dark:bg-[#202020] border border-[#EBE8DC] dark:border-[#2E2E2E] shrink-0 select-none transition-colors hover:border-[#F4D000]"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center p-1 bg-white dark:bg-[#151515] shadow-xs border border-black/5 dark:border-white/10 shrink-0">
                <ToolIcon name={tool.name} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F4EF] leading-tight">
                  {tool.name}
                </span>
                <span className="text-[10px] font-sans text-[#8E8D88] leading-tight">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
