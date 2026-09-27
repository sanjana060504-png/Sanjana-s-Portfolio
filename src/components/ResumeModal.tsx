import React, { useState, useEffect } from 'react';
import { X, Download, Printer, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getResumeHtmlForPrint = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sanjana Deshmukh - Resume</title>
  <style>
    @page { margin: 12mm 15mm; size: A4 portrait; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111111;
      background: #FFFFFF;
      margin: 0;
      padding: 24px;
      font-size: 11px;
      line-height: 1.5;
    }
    h1 {
      margin: 0 0 2px 0;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      color: #111111;
    }
    .subtitle {
      font-size: 11px;
      font-weight: 700;
      color: #4A4843;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 6px;
    }
    .contact-row {
      font-size: 11px;
      color: #605E59;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 2.5px solid #F4D000;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .contact-row span { margin-right: 8px; }
    h2 {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #111111;
      border-bottom: 1px solid rgba(0,0,0,0.12);
      padding-bottom: 3px;
      margin: 14px 0 6px 0;
    }
    p { margin: 0 0 4px 0; color: #333333; font-size: 11px; }
    .row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
    .bold { font-weight: 700; color: #111111; font-size: 11.5px; }
    .role-sub { font-weight: 600; color: #444444; }
    .project-sub { font-weight: 400; color: #555555; }
    .subtext { color: #666666; font-size: 10.5px; }
    .date { color: #777777; font-size: 10.5px; font-weight: 500; }
    ul { margin: 2px 0 6px 18px; padding: 0; }
    li { margin-bottom: 2px; color: #333333; font-size: 11px; }
    .project-item { margin-bottom: 8px; }
    .footer-note { margin-top: 24px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.1); font-size: 9.5px; color: #888888; }
  </style>
</head>
<body>
  <h1>Sanjana Deshmukh</h1>
  <div class="subtitle">UX / Product Designer</div>
  <div class="contact-row">
    <span>sanjana060504@gmail.com</span>
    <span>·</span>
    <span>+91 9518720730</span>
    <span>·</span>
    <span>Pune, India</span>
  </div>

  <h2>Profile</h2>
  <p>UX / Product Design student focused on turning research and complex workflows into clear, usable digital products. Works across research, information architecture, interaction design, prototyping, and high-fidelity UI.</p>

  <h2>Education</h2>
  <div class="row">
    <div>
      <span class="bold">Bachelor of Design · UX Design</span>
      <div class="subtext">Institute of Design, MIT ADT University, Pune</div>
    </div>
    <span class="date">2023–present</span>
  </div>

  <h2>Experience</h2>
  <div class="row">
    <span class="bold">Hooterbux Ventures Pvt. Ltd. · <span class="role-sub">Product Strategy Intern</span></span>
    <span class="date">May–July 2026</span>
  </div>
  <ul>
    <li>Contributed to the strategy and interface design of a B2B SaaS CRM, translating business requirements into structured user flows, dashboards, and product screens.</li>
    <li>Worked on an EdTech platform, shaping the product experience and interface for a client-facing digital solution.</li>
    <li>Worked on concepts for professional networking and conference experiences, exploring how people could connect, discover relevant professionals, and engage before and during events.</li>
  </ul>
  <div class="row" style="margin-top: 6px;">
    <span class="bold">Crystallite AAC Block Pvt. Ltd. · <span class="role-sub">Freelance / Website Project</span></span>
    <span class="date">Aug–Sept 2026</span>
  </div>
  <ul>
    <li>Designed and developed the website end-to-end, creating a clear digital brand presence and structured product showcase. Built responsive layouts with clear content hierarchy and product-focused navigation.</li>
  </ul>

  <h2>Selected Work</h2>
  <div class="project-item">
    <div class="bold">Karagir · <span class="project-sub">Cultural Studies × UX / Product Design × Agentic AI</span></div>
    <ul>
      <li>Mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs, and cultural organisations.</li>
      <li>Worked across research, cultural context, information architecture, product flows, and agentic AI.</li>
    </ul>
  </div>
  <div class="project-item">
    <div class="bold">EdSuite CRM · <span class="project-sub">B2B × SaaS × Product UI × Screen Design</span></div>
    <ul>
      <li>Redesigned a B2B CRM focused on admissions, enquiries, follow-ups, team activity, and operational workflows.</li>
      <li>Created high-fidelity screens and a product-demo narrative.</li>
    </ul>
  </div>
  <div class="project-item">
    <div class="bold">Exam Portal · <span class="project-sub">Product & UI Design × Assessment Platform × Ed Tech</span></div>
    <ul>
      <li>Designed institute-admin web workflows and mobile experiences for different user roles, covering information architecture, interaction flows, interface design, and prototype-ready screens.</li>
    </ul>
  </div>
  <div class="project-item">
    <div class="bold">Interactive Tangible Learning Board · <span class="project-sub">Physical Product × UX × Interactive Learning</span></div>
    <ul>
      <li>Developed a physical-digital learning product that combines RFID-based interaction, embedded electronics, and a companion mobile experience for children.</li>
      <li>Took the concept from interaction design to a refined, functional, and manufacturable prototype.</li>
    </ul>
  </div>

  <h2>College Experience</h2>
  <div class="row">
    <span class="bold">Treasurer — NatakBitak</span>
    <span class="date">2025–2026</span>
  </div>
  <p class="subtext">Managed club finances, fundraising, volunteers, and event coordination.</p>
  <div class="row">
    <span class="bold">Club Member — NatakBitak</span>
    <span class="date">2024–2025</span>
  </div>
  <p class="subtext">Supported event planning, logistics, promotion, and student-team coordination.</p>

  <h2>Skills</h2>
  <p>UX Research · User Interviews · Journey Mapping · Personas · Information Architecture · Interaction Design · Wireframing · Prototyping · Usability Testing · Design Thinking · Storytelling · AI Integration</p>

  <h2>Tools</h2>
  <p>Figma · FigJam · Miro · Adobe XD · Canva · Photoshop · Google AI Studio · Claude · Stitch</p>

  <h2>Languages</h2>
  <p>English · Marathi · Hindi</p>

  <div class="footer-note">Sanjana Deshmukh • Resume (2026)</div>
</body>
</html>`;
  };

  const handlePrint = () => {
    try {
      const existingFrame = document.getElementById('resume-print-frame');
      if (existingFrame && document.body.contains(existingFrame)) {
        document.body.removeChild(existingFrame);
      }

      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      printFrame.id = 'resume-print-frame';
      document.body.appendChild(printFrame);

      const doc = printFrame.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(getResumeHtmlForPrint());
        doc.close();

        setTimeout(() => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
          } catch {
            window.print();
          }
          setTimeout(() => {
            if (document.body.contains(printFrame)) {
              document.body.removeChild(printFrame);
            }
          }, 2000);
        }, 250);
        return;
      }
    } catch (err) {
      console.error('Print iframe error:', err);
    }
    window.print();
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const docElement = document.getElementById('resume-printable-doc');
      if (docElement) {
        const canvas = await html2canvas(docElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#FFFFFF',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.96);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Sanjana_Deshmukh_Resume.pdf');
        setIsDownloading(false);
        return;
      }
    } catch (err) {
      console.error('PDF export error, falling back to direct HTML download:', err);
    }

    // Reliable Fallback: Standalone styled HTML document download
    try {
      const blob = new Blob([getResumeHtmlForPrint()], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sanjana_Deshmukh_Resume.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Direct download error:', err);
    }
    setIsDownloading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md p-3 sm:p-6 md:p-8 animate-fadeIn print:p-0 print:bg-white print:overflow-visible"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      {/* Outer wrapper: items-start prevents flex-center cutoff bug */}
      <div className="min-h-full flex flex-col items-center justify-start py-4 sm:py-8">
        {/* Top Control Bar above the document */}
        <div
          className="w-full max-w-3xl flex items-center justify-between mb-3 px-2 print:hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F4D000] inline-block" />
            <span className="text-xs font-semibold text-white/90 tracking-wide font-sans">
              Sanjana Deshmukh • Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F4D000] text-black hover:bg-white transition-all text-xs font-bold shadow-lg border border-black/10 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-wait"
              title="Download Resume as PDF"
              id="resume-download-btn"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold shadow-lg border border-white/20 cursor-pointer active:scale-95"
              title="Print Resume"
              id="resume-print-btn"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all shadow-lg border border-white/20 cursor-pointer"
              aria-label="Close resume view"
              id="resume-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Physical Paper Document */}
        <div
          id="resume-printable-doc"
          className="relative w-full max-w-3xl bg-[#FFFFFF] text-[#111111] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-[#E5E2D6] p-6 sm:p-10 md:p-12 transition-all transform animate-slideInUp print:shadow-none print:border-none print:my-0 print:p-0 select-text"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 20px 45px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)'
          }}
        >
          {/* RESUME HEADER */}
          <div className="border-b-2 border-[#F4D000] pb-4 mb-6">
            <div>
              <h1 id="resume-title" className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] uppercase font-sans">
                SANJANA DESHMUKH
              </h1>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-[#4A4843] uppercase mt-0.5">
                UX / PRODUCT DESIGNER
              </p>
            </div>

            <div className="text-xs text-[#605E59] mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-mono">sanjana060504@gmail.com</span>
              <span>·</span>
              <span>+91 9518720730</span>
              <span>·</span>
              <span>Pune, India</span>
            </div>
          </div>

          {/* RESUME BODY */}
          <div className="space-y-6 text-[#1A1A1A] text-xs leading-relaxed font-sans">
            {/* PROFILE */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                PROFILE
              </h2>
              <p className="text-[#333333] text-[11.5px] leading-normal">
                UX / Product Design student focused on turning research and complex workflows into clear, usable digital products. Works across research, information architecture, interaction design, prototyping, and high-fidelity UI.
              </p>
            </section>

            {/* EDUCATION */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[12px] text-[#111111]">Bachelor of Design · UX Design</span>
                  <p className="text-[#555555] text-[11px]">Institute of Design, MIT ADT University, Pune</p>
                </div>
                <span className="text-[11px] text-[#777777] font-medium shrink-0">2023–present</span>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-[12px] text-[#111111]">
                      Hooterbux Ventures Pvt. Ltd. · <span className="font-semibold text-[#444444]">Product Strategy Intern</span>
                    </span>
                    <span className="text-[11px] text-[#777777] font-medium shrink-0">May–July 2026</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[#333333] text-[11px]">
                    <li>Contributed to the strategy and interface design of a B2B SaaS CRM, translating business requirements into structured user flows, dashboards, and product screens.</li>
                    <li>Worked on an EdTech platform, shaping the product experience and interface for a client-facing digital solution.</li>
                    <li>Worked on concepts for professional networking and conference experiences, exploring how people could connect, discover relevant professionals, and engage before and during events.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-[12px] text-[#111111]">
                      Crystallite AAC Block Pvt. Ltd. · <span className="font-semibold text-[#444444]">Freelance / Website Project</span>
                    </span>
                    <span className="text-[11px] text-[#777777] font-medium shrink-0">Aug–Sept 2026</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[#333333] text-[11px]">
                    <li>Designed and developed the website end-to-end, creating a clear digital brand presence and structured product showcase. Built responsive layouts with clear content hierarchy and product-focused navigation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SELECTED WORK (Placed right after EXPERIENCE per request) */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                SELECTED WORK
              </h2>
              <div className="space-y-2.5">
                <div>
                  <span className="font-bold text-[11.5px] text-[#111111]">
                    Karagir · <span className="font-normal text-[#555555]">Cultural Studies × UX / Product Design × Agentic AI</span>
                  </span>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[#333333] text-[11px]">
                    <li>Mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs, and cultural organisations.</li>
                    <li>Worked across research, cultural context, information architecture, product flows, and agentic AI.</li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-[11.5px] text-[#111111]">
                    EdSuite CRM · <span className="font-normal text-[#555555]">B2B × SaaS × Product UI × Screen Design</span>
                  </span>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[#333333] text-[11px]">
                    <li>Redesigned a B2B CRM focused on admissions, enquiries, follow-ups, team activity, and operational workflows.</li>
                    <li>Created high-fidelity screens and a product-demo narrative.</li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-[11.5px] text-[#111111]">
                    Exam Portal · <span className="font-normal text-[#555555]">Product & UI Design × Assessment Platform × Ed Tech</span>
                  </span>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[#333333] text-[11px]">
                    <li>Designed institute-admin web workflows and mobile experiences for different user roles, covering information architecture, interaction flows, interface design, and prototype-ready screens.</li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-[11.5px] text-[#111111]">
                    Interactive Tangible Learning Board · <span className="font-normal text-[#555555]">Physical Product × UX × Interactive Learning</span>
                  </span>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[#333333] text-[11px]">
                    <li>Developed a physical-digital learning product that combines RFID-based interaction, embedded electronics, and a companion mobile experience for children.</li>
                    <li>Took the concept from interaction design to a refined, functional, and manufacturable prototype.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* COLLEGE EXPERIENCE */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                COLLEGE EXPERIENCE
              </h2>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[11.5px] text-[#111111]">Treasurer — NatakBitak</span>
                    <span className="text-[11px] text-[#777777]">2025–2026</span>
                  </div>
                  <p className="text-[#444444] text-[11px]">Managed club finances, fundraising, volunteers, and event coordination.</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[11.5px] text-[#111111]">Club Member — NatakBitak</span>
                    <span className="text-[11px] text-[#777777]">2024–2025</span>
                  </div>
                  <p className="text-[#444444] text-[11px]">Supported event planning, logistics, promotion, and student-team coordination.</p>
                </div>
              </div>
            </section>

            {/* SKILLS */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                SKILLS
              </h2>
              <p className="text-[#333333] text-[11px] leading-relaxed">
                UX Research · User Interviews · Journey Mapping · Personas · Information Architecture · Interaction Design · Wireframing · Prototyping · Usability Testing · Design Thinking · Storytelling · AI Integration
              </p>
            </section>

            {/* TOOLS */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                TOOLS
              </h2>
              <p className="text-[#333333] text-[11px]">
                Figma · FigJam · Miro · Adobe XD · Canva · Photoshop · Google AI Studio · Claude · Stitch
              </p>
            </section>

            {/* LANGUAGES */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                LANGUAGES
              </h2>
              <p className="text-[#333333] text-[11px]">
                English · Marathi · Hindi
              </p>
            </section>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-[10px] text-[#888888] print:hidden">
            <span>Sanjana Deshmukh • Resume (2026)</span>
          </div>
        </div>

        {/* Action buttons under resume for easy direct access */}
        <div
          className="w-full max-w-3xl flex flex-wrap items-center justify-center gap-3 mt-6 pb-4 print:hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4D000] text-black hover:bg-white transition-all text-xs font-bold shadow-lg border border-black/10 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-wait"
            title="Download Resume as PDF"
            id="resume-bottom-download-btn"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all text-xs font-bold shadow-lg border border-white/20 cursor-pointer active:scale-95"
            title="Print Resume"
            id="resume-bottom-print-btn"
          >
            <Printer className="w-4 h-4" />
            <span>Print Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};
