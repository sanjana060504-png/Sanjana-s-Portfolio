import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Pin, X } from 'lucide-react';
import {
  submitPlaygroundNote,
  getLocalPinnedNotes,
  FIGJAM_PASTELS,
  type FigJamPastelColor,
  type NotePayload,
} from '../services/notesService.ts';

export const PlaygroundSection: React.FC = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState<FigJamPastelColor>('yellow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justPinned, setJustPinned] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState<NotePayload[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load any previously pinned notes for this visitor's session
  useEffect(() => {
    const existing = getLocalPinnedNotes();
    setUserNotes(existing);
  }, []);

  // Auto-focus textarea when opening the sticky note
  useEffect(() => {
    if (isWriting && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isWriting]);

  const handleOpenNote = () => {
    setIsWriting(true);
    setJustPinned(false);
    setStatusMessage(null);
  };

  const handleCancel = () => {
    setIsWriting(false);
    setMessage('');
    setName('');
    setSelectedColor('yellow');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const result = await submitPlaygroundNote({
      name: name.trim() || undefined,
      message: message.trim(),
      color: selectedColor,
    });

    if (result.success) {
      setJustPinned(true);
      setStatusMessage('Noted. ✦ Sent to Sanjana’s mail & pinned on the desk.');

      const newNote: NotePayload = {
        name: name.trim() || undefined,
        message: message.trim(),
        color: selectedColor,
        page: 'Playground',
        timestamp: new Date().toISOString(),
      };
      setUserNotes((prev) => [newNote, ...prev]);

      setMessage('');
      setName('');
      setSelectedColor('yellow');
      setIsWriting(false);
    } else {
      setStatusMessage(result.error || 'Could not pin the note right now.');
    }

    setIsSubmitting(false);
  };

  const currentColorStyle = FIGJAM_PASTELS[selectedColor];

  return (
    <section
      className="pt-14 pb-28 sm:pt-20 sm:pb-36 lg:pb-44 px-5 sm:px-8 max-w-7xl mx-auto border-t border-[#E5E2D6] dark:border-[#252525] relative"
      id="playground"
    >
      {/* Subtle Coordinate Tracker */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8E8D88]">
          <Sparkles className="w-3.5 h-3.5 text-[#F4D000]" />
          <span>stepping into my workspace?</span>
        </div>
        <span className="text-xs font-sans text-[#8E8D88]">Workspace Desk</span>
      </div>

      {/* Main Section Card: Authentic FigJam Dotted Canvas Background */}
      <div
        className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-[#F8F8F7] dark:bg-[#161616] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-xs relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(var(--figjam-dot, rgba(0, 0, 0, 0.12)) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      >
        {/* Dark mode dot color adjustment */}
        <style>{`
          .dark #playground > div:nth-of-type(2) {
            --figjam-dot: rgba(255, 255, 255, 0.12);
          }
        `}</style>

        {/* Section Framing (h2 removed per user request) */}
        <div className="max-w-2xl relative z-10 mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
            Leave a quiet note on the desk before you go....
          </p>
        </div>

        {/* Status Confirmation Banner */}
        {justPinned && statusMessage && (
          <div className="mb-6 max-w-xl animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#FFFFFF] dark:bg-[#222222] border border-[#E5E2D6] dark:border-[#2C2C2C] text-xs sm:text-sm text-[#111111] dark:text-[#F5F4EF] shadow-xs">
              <span className="w-4 h-4 rounded-full bg-[#F4D000] text-black flex items-center justify-center shrink-0 text-[10px] font-bold">
                ✓
              </span>
              <span className="font-medium">{statusMessage}</span>
            </div>
          </div>
        )}

        {/* Desk Surface: Arrangement of FigJam Pastel Sticky Notes */}
        <div className="relative z-10 pt-2 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* Sanjana's Note: Pin only (no tape), entire note in Caveat font, just the note and name */}
            <div
              className="relative rounded-2xl p-6 sm:p-7 rotate-[-1.8deg] transition-all duration-300 hover:rotate-0 flex flex-col justify-between min-h-[230px] select-none"
              style={{
                backgroundColor: FIGJAM_PASTELS.yellow.bg,
                color: FIGJAM_PASTELS.yellow.text,
                border: `1px solid ${FIGJAM_PASTELS.yellow.border}`,
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px -4px rgba(0,0,0,0.09), 0 16px 32px -8px rgba(0,0,0,0.06)',
              }}
            >
              {/* Minimal Brass Pin Accent (pin only, not tape) */}
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                style={{ backgroundColor: FIGJAM_PASTELS.yellow.pinColor }}
                aria-hidden="true"
              />

              {/* Bottom lift shadow */}
              <div
                className="absolute inset-x-3 bottom-0 h-4 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none rounded-b-2xl"
                aria-hidden="true"
              />

              {/* Note Content: Entire note in Caveat handwriting font */}
              <div className="space-y-3 pt-2">
                <p className="font-handwriting text-xl sm:text-2xl font-medium leading-snug">
                  Always up for constructive design critique, movie recommendations, interesting pov or a quick hello.
                </p>
              </div>

              {/* Note Signature: Just the name in Caveat */}
              <div className="pt-3 border-t border-black/10 flex items-center justify-end">
                <span className="font-handwriting text-2xl font-bold">
                  — Sanjana
                </span>
              </div>
            </div>

            {/* Interactive Element: The Sticky Note Writing Surface / Creation Cue */}
            {!isWriting ? (
              <div
                onClick={handleOpenNote}
                className="group relative rounded-2xl p-6 sm:p-7 bg-[#FFFDF8] dark:bg-[#202020] border-2 border-dashed border-[#DDD9CC] dark:border-[#383838] hover:border-[#111111] dark:hover:border-[#F4D000] rotate-[1.5deg] hover:rotate-0 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[230px]"
                style={{
                  boxShadow:
                    '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -4px rgba(0,0,0,0.06)',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenNote();
                  }
                }}
                aria-label="Leave a note on the desk"
              >
                {/* Minimal Brass Pin Accent */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#E5C330] group-hover:scale-110 border border-black/20 shadow-xs transition-transform"
                  aria-hidden="true"
                />

                <div className="space-y-3">
                  {/* Pastel swatches preview */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {(['yellow', 'green', 'blue', 'purple', 'pink', 'peach', 'gray'] as FigJamPastelColor[]).map((c) => (
                      <span
                        key={c}
                        className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: FIGJAM_PASTELS[c].bg }}
                      />
                    ))}
                  </div>

                  <p className="font-handwriting text-xl sm:text-2xl text-[#8E8D88] dark:text-[#8E8D88] leading-snug">
                    “Leave a thought, suggestion, hello, or anything you noticed…”
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F4EF] group-hover:text-[#111111] dark:group-hover:text-[#F4D000] transition-colors">
                    <span>+ Leave a note</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            ) : (
              /* Writing Surface: Entire note in Caveat, clean swatches without text label */
              <div
                className="relative rounded-2xl p-6 sm:p-7 rotate-[-1deg] transition-all duration-300 flex flex-col justify-between min-h-[300px] animate-in fade-in zoom-in-95"
                style={{
                  backgroundColor: currentColorStyle.bg,
                  color: currentColorStyle.text,
                  border: `1.5px solid ${currentColorStyle.border}`,
                  boxShadow:
                    '0 2px 5px rgba(0,0,0,0.06), 0 12px 32px -4px rgba(0,0,0,0.12), 0 20px 40px -8px rgba(0,0,0,0.08)',
                }}
              >
                {/* Pin at Top */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: currentColorStyle.pinColor }}
                  aria-hidden="true"
                />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="absolute top-3.5 right-3.5 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Close note"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 space-y-3">
                  {/* Color Swatches Only (Text labels removed per user request) */}
                  <div className="pt-1">
                    <div className="flex items-center gap-2">
                      {(Object.keys(FIGJAM_PASTELS) as FigJamPastelColor[]).map((cKey) => {
                        const pastel = FIGJAM_PASTELS[cKey];
                        const isSelected = selectedColor === cKey;
                        return (
                          <button
                            type="button"
                            key={cKey}
                            onClick={() => setSelectedColor(cKey)}
                            title={`${pastel.name} pastel`}
                            aria-label={`${pastel.name} note`}
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-all cursor-pointer ${
                              isSelected
                                ? 'scale-115 ring-2 ring-black/40 shadow-sm'
                                : 'hover:scale-105 opacity-80 hover:opacity-100'
                            }`}
                            style={{
                              backgroundColor: pastel.bg,
                              borderColor: pastel.border,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Input in Caveat Font */}
                  <div className="flex-1">
                    <label htmlFor="sticky-note-message" className="sr-only">
                      Your note
                    </label>
                    <textarea
                      id="sticky-note-message"
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a thought, suggestion, hello, or anything you noticed…"
                      rows={4}
                      maxLength={600}
                      className="w-full bg-transparent resize-none font-handwriting text-xl sm:text-2xl font-medium placeholder:text-black/40 focus:outline-none leading-snug"
                      required
                    />
                  </div>

                  {/* Footer with Name in Caveat & Submit Button */}
                  <div className="pt-2 border-t border-black/10 space-y-2.5">
                    <div>
                      <label htmlFor="sticky-note-name" className="sr-only">
                        Your name (optional)
                      </label>
                      <input
                        id="sticky-note-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name (optional)"
                        maxLength={50}
                        className="w-full bg-transparent font-handwriting text-lg sm:text-xl font-medium placeholder:text-black/40 focus:outline-none border-b border-black/15 focus:border-black/50 pb-0.5"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer font-sans"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={!message.trim() || isSubmitting}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black text-white hover:bg-black/80 transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs active:scale-95 font-sans"
                      >
                        {isSubmitting ? (
                          <span>Pinning...</span>
                        ) : (
                          <>
                            <Pin className="w-3 h-3" />
                            <span>Pin it</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Pinned User Notes: Pin only, entire note in Caveat, just note and name */}
            {userNotes.length > 0 ? (
              userNotes.slice(0, 1).map((note, idx) => {
                const noteColor = FIGJAM_PASTELS[note.color || 'yellow'] || FIGJAM_PASTELS.yellow;
                return (
                  <div
                    key={idx}
                    className="relative rounded-2xl p-6 sm:p-7 rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[230px]"
                    style={{
                      backgroundColor: noteColor.bg,
                      color: noteColor.text,
                      border: `1px solid ${noteColor.border}`,
                      boxShadow:
                        '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px -4px rgba(0,0,0,0.09), 0 16px 32px -8px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Pin Accent (pin only) */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                      style={{ backgroundColor: noteColor.pinColor }}
                      aria-hidden="true"
                    />

                    {/* Bottom lift shadow */}
                    <div
                      className="absolute inset-x-3 bottom-0 h-4 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none rounded-b-2xl"
                      aria-hidden="true"
                    />

                    {/* Just the note message in Caveat */}
                    <div className="space-y-2 pt-2 flex-1">
                      <p className="font-handwriting text-xl sm:text-2xl font-medium leading-snug break-words">
                        “{note.message}”
                      </p>
                    </div>

                    {/* Just the name in Caveat */}
                    <div className="pt-3 border-t border-black/10 flex items-center justify-end">
                      <span className="font-handwriting text-2xl font-bold">
                        — {note.name || 'A curious visitor'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Ambient Note in FigJam Pastel Blue: Pin only, entire note in Caveat, just note and name */
              <div
                className="relative rounded-2xl p-6 sm:p-7 rotate-[2deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[230px]"
                style={{
                  backgroundColor: FIGJAM_PASTELS.blue.bg,
                  color: FIGJAM_PASTELS.blue.text,
                  border: `1px solid ${FIGJAM_PASTELS.blue.border}`,
                  boxShadow:
                    '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px -4px rgba(0,0,0,0.09), 0 16px 32px -8px rgba(0,0,0,0.06)',
                }}
              >
                {/* Pin Accent */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: FIGJAM_PASTELS.blue.pinColor }}
                  aria-hidden="true"
                />

                {/* Bottom lift shadow */}
                <div
                  className="absolute inset-x-3 bottom-0 h-4 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none rounded-b-2xl"
                  aria-hidden="true"
                />

                <div className="space-y-2 pt-2 flex-1">
                  <p className="font-handwriting text-xl sm:text-2xl font-medium leading-snug">
                    “There’s no perfect decision. Make one, then make it work.”
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-end">
                  <span className="font-handwriting text-2xl font-bold">
                    — Sanjana’s Pappa
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
