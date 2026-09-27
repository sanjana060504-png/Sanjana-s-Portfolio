import React from 'react';

interface HandwrittenSmileyProps {
  className?: string;
  variant?: 'regular' | 'wink';
}

export const HandwrittenSmiley: React.FC<HandwrittenSmileyProps> = ({
  className = 'w-5 h-5',
  variant = 'wink',
}) => {
  return (
    <svg
      className={`inline-block shrink-0 align-middle ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="handwritten smiley"
    >
      {variant === 'wink' ? (
        <>
          {/* Left eye: handwritten pen dot */}
          <ellipse cx="8" cy="8.5" rx="1.3" ry="1.5" fill="currentColor" transform="rotate(-6 8 8.5)" />
          {/* Right eye: winked, inverted 'v' / < chevron shape */}
          <path
            d="M 17.5 6.8 L 14.2 8.5 L 17.5 10.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          {/* Left eye: handwritten pen dot */}
          <ellipse cx="8" cy="8.5" rx="1.2" ry="1.4" fill="currentColor" transform="rotate(-6 8 8.5)" />
          {/* Right eye: handwritten pen dot */}
          <ellipse cx="16" cy="8.5" rx="1.2" ry="1.4" fill="currentColor" transform="rotate(6 16 8.5)" />
        </>
      )}

      {/* Extra curvy, joyful smile */}
      <path
        d="M 6 13 C 8 18.5 15.5 18.5 17.5 13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
