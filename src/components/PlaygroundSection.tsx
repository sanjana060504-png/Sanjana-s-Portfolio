import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Pin, Check, X } from 'lucide-react';
import {
  submitPlaygroundNote,
  getLocalPinnedNotes,
  type NotePayload,
} from '../services/notesService.ts';

export const PlaygroundSection: React.FC = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const result = await submitPlaygroundNote({
      name: name.trim() || undefined,
      message: message.trim(),
    });

    if (result.success) {
      // Tiny satisfying pinned interaction
      setJustPinned(true);
      setStatusMessage('Noted. ✦ Got it. Thanks for stopping by.');

      // Update local state to reflect the new note immediately
      const newNote: NotePayload = {
        name: name.trim() || undefined,
        message: message.trim(),
        page: 'Playground',
        timestamp: new Date().toISOString(),
      };
      setUserNotes((prev) => [newNote, ...prev]);

      // Reset form
      setMessage('');
      setName('');
      setIsWriting(false);
    } else {
      setStatusMessage(result.error || 'Could not pin the note right now.');
    }

    setIsSubmitting(false);
  };

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
        <span className="text-xs font-sans text-[#8E8D88]">Workspace Desk</span>
      </div>

      {/* Main Card Container */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-[#FFFFFF] dark:bg-[#181818] border border-[#E5E2D6] dark:border-[#2C2C2C] shadow-xs relative overflow-hidden">
        {/* Subtle decorative watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-[0.025] dark:opacity-[0.04] pointer-events-none select-none">
          <span className="text-9xl font-black font-sans">DESK</span>
        </div>

        {/* Section Heading & Framing */}
        <div className="max-w-2xl relative z-10 space-y-3 mb-8 sm:mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F4D000]/20 border border-[#F4D000]/40 text-[#111111] dark:text-[#F4D000] text-xs font-sans font-bold uppercase tracking-wider">
            Playground
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-[#F5F4EF] leading-tight">
            A small corner for thoughts, observations, and hello.
          </h2>

          <p className="text-sm sm:text-base text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
            Stepping into my workspace? Leave a quiet note on the desk before you go.
          </p>
        </div>

        {/* Status Confirmation Banner (Subtle & In-place) */}
        {justPinned && statusMessage && (
          <div className="mb-6 max-w-xl animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#F7F6F0] dark:bg-[#222222] border border-[#E5E2D6] dark:border-[#2C2C2C] text-xs sm:text-sm text-[#111111] dark:text-[#F5F4EF] shadow-xs">
              <span className="w-4 h-4 rounded-full bg-[#F4D000] text-black flex items-center justify-center shrink-0 text-[10px] font-bold">
                ✓
              </span>
              <span className="font-medium">{statusMessage}</span>
            </div>
          </div>
        )}

        {/* Desk Surface: Arrangement of Subtle Sticky Notes */}
        <div className="relative z-10 pt-2 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
            
            {/* Ambient Note 01: Welcome Note from Sanjana */}
            <div
              className="relative rounded-2xl p-6 sm:p-7 bg-[#FAF8F3] dark:bg-[#202020] border border-[#E7E3D6] dark:border-[#2E2E2E] shadow-[0_6px_20px_rgba(0,0,0,0.04)] rotate-[-1.5deg] transition-transform duration-300 hover:rotate-0 flex flex-col justify-between min-h-[220px]"
            >
              {/* Minimal Brass Pin Accent */}
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E5C330] dark:bg-[#F4D000] border border-black/20 shadow-xs"
                title="Pinned"
                aria-hidden="true"
              />

              <div className="space-y-3">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8E8D88] block">
                  Desk Note • From Sanjana
                </span>
                <p className="text-sm sm:text-base text-[#2C2A26] dark:text-[#DCD9D0] leading-relaxed">
                  Always open to design critique, book recommendations, interesting links, or a quick hello.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE6D9]/60 dark:border-[#2E2E2E] flex items-center justify-between text-xs text-[#8E8D88]">
                <span>Pune, India</span>
                <span className="font-handwriting text-base text-[#111111] dark:text-[#F5F4EF]">
                  — Sanjana
                </span>
              </div>
            </div>

            {/* Interactive Element: The Sticky Note Writing Surface / Cue */}
            {!isWriting ? (
              <div
                onClick={handleOpenNote}
                className="group relative rounded-2xl p-6 sm:p-7 bg-[#FFFDF9] dark:bg-[#232323] border-2 border-dashed border-[#DDD9CC] dark:border-[#383838] hover:border-[#111111] dark:hover:border-[#F4D000] shadow-[0_6px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] rotate-[1.5deg] hover:rotate-0 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
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
                {/* Minimal Pin Accent */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DDD9CC] group-hover:bg-[#F4D000] dark:bg-[#383838] dark:group-hover:bg-[#F4D000] border border-black/15 transition-colors shadow-xs"
                  aria-hidden="true"
                />

                <div className="space-y-3">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8E8D88] block">
                    Your Turn
                  </span>
                  <p className="text-sm sm:text-base text-[#8E8D88] dark:text-[#7A7873] leading-relaxed italic">
                    “Leave a thought, suggestion, hello, or anything you noticed…”
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F4EF] group-hover:text-[#111111] dark:group-hover:text-[#F4D000] transition-colors">
                    <span>+ Leave a note</span>
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                  <span className="text-[11px] text-[#8E8D88]">Sticky pad</span>
                </div>
              </div>
            ) : (
              /* Writing Surface: Real Digital Sticky Note Form */
              <div
                className="relative rounded-2xl p-6 sm:p-7 bg-[#FFFDF9] dark:bg-[#232323] border border-[#DDD9CC] dark:border-[#383838] shadow-[0_12px_32px_rgba(0,0,0,0.08)] rotate-[-1deg] transition-all duration-300 flex flex-col justify-between min-h-[260px] animate-in fade-in zoom-in-95"
              >
                {/* Brass Pin at Top */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#F4D000] border border-black/20 shadow-xs"
                  aria-hidden="true"
                />

                {/* Close / Cancel Button */}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="absolute top-4 right-4 text-[#8E8D88] hover:text-[#111111] dark:hover:text-[#F5F4EF] p-1 rounded-md transition-colors"
                  aria-label="Close note"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 space-y-4">
                  <div>
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
                      className="w-full bg-transparent resize-none text-sm sm:text-base text-[#111111] dark:text-[#F5F4EF] placeholder:text-[#8E8D88] dark:placeholder:text-[#6E6C67] focus:outline-none leading-relaxed"
                      required
                    />
                  </div>

                  <div className="pt-3 border-t border-[#EAE6D9]/70 dark:border-[#303030] space-y-3">
                    <div className="flex items-center gap-2">
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
                        className="flex-1 bg-transparent text-xs text-[#111111] dark:text-[#F5F4EF] placeholder:text-[#8E8D88] focus:outline-none border-b border-transparent focus:border-[#111111] dark:focus:border-[#F4D000] pb-0.5"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-xs text-[#8E8D88] hover:text-[#111111] dark:hover:text-white transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={!message.trim() || isSubmitting}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111111] dark:bg-[#F5F4EF] text-white dark:text-[#111111] hover:bg-[#F4D000] hover:text-black dark:hover:bg-[#F4D000] dark:hover:text-black transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs active:scale-95"
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

            {/* Pinned User Notes (if visitor already pinned notes during this session) */}
            {userNotes.length > 0 ? (
              userNotes.slice(0, 1).map((note, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl p-6 sm:p-7 bg-[#FFFDF8] dark:bg-[#202020] border border-[#E7E3D6] dark:border-[#2E2E2E] shadow-[0_6px_20px_rgba(0,0,0,0.04)] rotate-[1deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[220px]"
                >
                  {/* Brass Pin Accent */}
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#F4D000] border border-black/20 shadow-xs"
                    aria-hidden="true"
                  />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#F4D000] dark:text-[#F4D000]">
                        Just Pinned ✦
                      </span>
                      <span className="text-[10px] text-[#8E8D88]">Visitor Note</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#2C2A26] dark:text-[#DCD9D0] leading-relaxed break-words">
                      “{note.message}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAE6D9]/60 dark:border-[#2E2E2E] flex items-center justify-between text-xs text-[#8E8D88]">
                    <span>Playground</span>
                    <span className="font-semibold text-[#111111] dark:text-[#F5F4EF]">
                      — {note.name || 'A curious visitor'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              /* Ambient Note 02: Gentle Curiosity Prompt */
              <div
                className="relative rounded-2xl p-6 sm:p-7 bg-[#FAF8F3] dark:bg-[#202020] border border-[#E7E3D6] dark:border-[#2E2E2E] shadow-[0_6px_20px_rgba(0,0,0,0.04)] rotate-[2deg] hover:rotate-0 transition-transform duration-300 hidden lg:flex flex-col justify-between min-h-[220px]"
              >
                {/* Brass Pin Accent */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E5C330] dark:bg-[#F4D000] border border-black/20 shadow-xs"
                  aria-hidden="true"
                />

                <div className="space-y-3">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#8E8D88] block">
                    Workspace Thought
                  </span>
                  <p className="text-sm text-[#605E59] dark:text-[#B0AEA8] leading-relaxed">
                    “Good tools make work effortless. Playful tools make you forget you were working at all.”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE6D9]/60 dark:border-[#2E2E2E] flex items-center justify-between text-xs text-[#8E8D88]">
                  <span>Field note</span>
                  <span className="text-[#8E8D88]">Desk 02</span>
                </div>
              </div>
            )}

          </div>

          {/* Action to add another note if user already pinned one and note is closed */}
          {!isWriting && userNotes.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenNote}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFECE3] dark:bg-[#262626] hover:bg-[#F4D000] hover:text-black text-[#111111] dark:text-[#F5F4EF] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>+ Leave another note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
