import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (desktop mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, [role="button"], input, textarea, .interactive-card, [data-cursor]');
      setIsHovered(Boolean(interactive));
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="cursor-follow pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Refined Frosted Glass Orb (~12px, 1.2x hover scale, completely free of any yellow centre dot) */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out select-none backdrop-blur-[2px] ${
          isHovered
            ? 'w-3 h-3 scale-[1.2] bg-white/55 dark:bg-white/40 border border-white/90 dark:border-white/75 shadow-[0_1px_5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.95),0_0_2px_rgba(244,208,0,0.2)]'
            : isClicking
            ? 'w-3 h-3 scale-90 bg-white/45 dark:bg-white/30 border border-white/80 dark:border-white/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
            : 'w-3 h-3 scale-100 bg-white/40 dark:bg-white/25 border border-white/75 dark:border-white/55 shadow-[0_1px_4px_rgba(0,0,0,0.08),inset_0_0.75px_1px_rgba(255,255,255,0.85),0_0_1.5px_rgba(244,208,0,0.12)]'
        }`}
      />
    </div>
  );
}
