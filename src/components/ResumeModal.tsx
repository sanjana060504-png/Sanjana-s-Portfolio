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
    @page { margin: 10mm 14mm; size: A4 portrait; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111111;
      background: #FFFFFF;
      margin: 0;
      padding: 16px 20px;
      font-size: 11px;
      line-height: 1.45;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 8px;
    }
    .header-table td {
      vertical-align: top;
      padding: 0;
    }
    h1 {
      margin: 0 0 2px 0;
      font-size: 24px;
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
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .contact-row {
      font-size: 10.5px;
      color: #555555;
    }
    .contact-row span { margin-right: 6px; }
    .header-links {
      text-align: right;
      font-size: 10.5px;
      line-height: 1.6;
    }
    .header-links a {
      color: #111111;
      text-decoration: underline;
      display: block;
    }
    .yellow-bar {
      height: 3.5px;
      background-color: #F4D000;
      margin: 8px 0 14px 0;
      width: 100%;
    }
    h2 {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #111111;
      border-bottom: 1px solid rgba(0,0,0,0.15);
      padding-bottom: 2px;
      margin: 12px 0 6px 0;
    }
    p { margin: 0 0 4px 0; color: #333333; font-size: 11px; }
    .row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
    .bold { font-weight: 700; color: #111111; font-size: 11.5px; }
    .role-sub { font-weight: 500; color: #444444; }
    .project-sub { font-weight: 400; color: #555555; }
    .subtext { color: #555555; font-size: 10.5px; }
    .date { color: #666666; font-size: 10.5px; font-weight: 500; white-space: nowrap; }
    ul { margin: 2px 0 6px 16px; padding: 0; }
    li { margin-bottom: 2px; color: #333333; font-size: 10.5px; line-height: 1.4; }
    .project-item { margin-bottom: 7px; }
    .skills-row { display: flex; margin-bottom: 3px; font-size: 10.5px; }
    .skills-label { width: 70px; font-weight: 700; color: #111111; shrink: 0; }
    .skills-content { flex: 1; color: #333333; line-height: 1.4; }
  </style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td>
        <h1>SANJANA DESHMUKH</h1>
        <div class="subtitle">UX / PRODUCT DESIGNER</div>
        <div class="contact-row">
          <span>sanjana060504@gmail.com</span>
          <span>·</span>
          <span>+91 9518720730</span>
          <span>·</span>
          <span>Pune, India</span>
        </div>
      </td>
      <td style="width: 140px;">
        <div class="header-links">
          <a href="#">MyPortfolio</a>
          <a href="https://linkedin.com">linkedin.com</a>
          <a href="https://behance.net">behance.net</a>
        </div>
      </td>
    </tr>
  </table>

  <div class="yellow-bar"></div>

  <h2>PROFILE</h2>
  <p>UX / Product Designer and final-year student focused on turning research and complex workflows into clear, usable digital products. Works across research, information architecture, interaction design, prototyping, and high-fidelity UI.</p>

  <h2>EXPERIENCE</h2>
  <div class="row">
    <span class="bold">Hooterbux Venture Pvt Ltd · <span class="role-sub">Product Strategy Intern</span></span>
    <span class="date">May-July 2026</span>
  </div>
  <ul>
    <li>Contributed to the strategy and interface design of a B2B SaaS CRM, translating business requirements into structured user flows, dashboards, and product screens.</li>
    <li>Worked on an EdTech platform, shaping the product experience and interface for a client-facing digital solution.</li>
    <li>Worked on concepts for professional networking and conference experiences, exploring how people could connect, discover relevant professionals, and engage before and during events.</li>
  </ul>
  <div class="row" style="margin-top: 4px;">
    <span class="bold">Crystallite AAC Block Pvt. Ltd. · <span class="role-sub">Freelance / Website Project</span></span>
    <span class="date">Aug-Sept 2026</span>
  </div>
  <ul>
    <li>Designed and developed the website end-to-end, creating a clear digital brand presence and structured product showcase. Built responsive layouts with clear content hierarchy and product-focused navigation.</li>
  </ul>

  <h2>SELECTED WORK</h2>
  <div class="project-item">
    <div class="bold">CRM platform · <span class="project-sub">B2B × SaaS × Product UI × ScreenDesign</span></div>
    <ul>
      <li>Redesigned a B2B CRM focused on admissions, enquiries, follow-ups, team activity, and operational workflows.</li>
      <li>Created high-fidelity screens and a product-demo narrative.</li>
    </ul>
  </div>
  <div class="project-item">
    <div class="bold">Karagir · <span class="project-sub">CulturalStudies × UX / ProductDesign × AgenticAI</span></div>
    <ul>
      <li>Mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs, and cultural organisations.</li>
      <li>Worked across research, cultural context, information architecture, product flows, and agentic AI.</li>
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

  <h2>EDUCATION</h2>
  <div class="row">
    <div>
      <span class="bold">Bachelor of Design · UX Design</span>
      <div class="subtext">Institute of Design, MIT ADT University, Pune</div>
    </div>
    <span class="date">2023–present</span>
  </div>

  <h2>SKILLS</h2>
  <div class="skills-row">
    <div class="skills-label">Design</div>
    <div class="skills-content">Product Design · Interaction Design · User-Centered Design · Information Architecture · User Flows · Wireframing · Prototyping · High-Fidelity UI · Design Systems</div>
  </div>
  <div class="skills-row">
    <div class="skills-label">Research</div>
    <div class="skills-content">User Research · User Interviews · Usability Testing · Journey Mapping · Personas · Heuristic Evaluation · Competitor Analysis</div>
  </div>
  <div class="skills-row">
    <div class="skills-label">AI</div>
    <div class="skills-content">Agentic AI Experiences · Human-AI Interaction · Conversational UI</div>
  </div>
  <div class="skills-row">
    <div class="skills-label">Web</div>
    <div class="skills-content">Visual Design · Responsive Design · Web Design</div>
  </div>

  <h2>COLLEGE INVOLVEMENT</h2>
  <div class="row">
    <span class="bold">Treasurer — Natak Bitak <span style="font-weight: 600; color: #444444;">· Drama Club · MIT ID</span></span>
    <span class="date">2025–2026</span>
  </div>
  <p class="subtext">Managed club finances, fundraising, volunteers, and event coordination.</p>
  <div class="row" style="margin-top: 3px;">
    <span class="bold">ClubMember — Natak Bitak <span style="font-weight: 600; color: #444444;">· Drama Club · MIT ID</span></span>
    <span class="date">2024–2025</span>
  </div>
  <p class="subtext">Supported event planning, logistics, promotion, and student-team coordination.</p>

  <h2>TOOLS</h2>
  <p style="font-size: 10.5px; line-height: 1.4;">Figma · FigJam · Framer · Miro · Sketch · Procreate · Google AI Studio · Claude · Stitch · GitHub · Vercel · WordPress</p>
</body>
</html>`;
  };

  const handlePrint = () => {
    // Restore body overflow for print capture
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'visible';

    try {
      const existingFrame = document.getElementById('resume-print-frame');
      if (existingFrame && document.body.contains(existingFrame)) {
        document.body.removeChild(existingFrame);
      }

      const printFrame = document.createElement('iframe');
      printFrame.id = 'resume-print-frame';
      // Set visible dimensions off-screen so Chrome/WebKit renders it cleanly
      printFrame.style.position = 'fixed';
      printFrame.style.left = '-9999px';
      printFrame.style.top = '0';
      printFrame.style.width = '850px';
      printFrame.style.height = '1200px';
      printFrame.style.border = '0';
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
            if (isOpen) {
              document.body.style.overflow = 'hidden';
            } else {
              document.body.style.overflow = prevOverflow;
            }
          }, 1500);
        }, 300);
        return;
      }
    } catch {
      window.print();
      setTimeout(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = prevOverflow;
        }
      }, 500);
    }
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

    // Fallback: Standalone styled HTML document download
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
      {/* Outer wrapper */}
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
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 id="resume-title" className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] uppercase font-sans">
                SANJANA DESHMUKH
              </h1>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-[#4A4843] uppercase mt-0.5">
                UX / PRODUCT DESIGNER
              </p>
              <div className="text-xs text-[#555555] mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans">
                <span>sanjana060504@gmail.com</span>
                <span>·</span>
                <span>+91 9518720730</span>
                <span>·</span>
                <span>Pune, India</span>
              </div>
            </div>

            {/* Top-Right Portfolio Links */}
            <div className="text-xs text-[#111111] sm:text-right space-y-0.5 shrink-0 font-sans">
              <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} className="block underline hover:text-[#0284C7] transition-colors">
                MyPortfolio
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block underline hover:text-[#0284C7] transition-colors">
                linkedin.com
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="block underline hover:text-[#0284C7] transition-colors">
                behance.net
              </a>
            </div>
          </div>

          {/* Yellow Accent Bar */}
          <div className="w-full h-1 bg-[#F4D000] mt-3.5 mb-5" />

          {/* RESUME BODY */}
          <div className="space-y-5 text-[#1A1A1A] text-xs leading-relaxed font-sans">
            {/* PROFILE */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                PROFILE
              </h2>
              <p className="text-[#333333] text-[11.5px] leading-normal">
                UX / Product Designer and final-year student focused on turning research and complex workflows into clear, usable digital products. Works across research, information architecture, interaction design, prototyping, and high-fidelity UI.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                EXPERIENCE
              </h2>
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-[12px] text-[#111111]">
                      Hooterbux Venture Pvt Ltd · <span className="font-medium text-[#444444]">Product Strategy Intern</span>
                    </span>
                    <span className="text-[11px] text-[#666666] font-medium shrink-0 ml-2">May-July 2026</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-1 text-[#333333] text-[11px] leading-relaxed">
                    <li>Contributed to the strategy and interface design of a B2B SaaS CRM, translating business requirements into structured user flows, dashboards, and product screens.</li>
                    <li>Worked on an EdTech platform, shaping the product experience and interface for a client-facing digital solution.</li>
                    <li>Worked on concepts for professional networking and conference experiences, exploring how people could connect, discover relevant professionals, and engage before and during events.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-[12px] text-[#111111]">
                      Crystallite AAC Block Pvt. Ltd. · <span className="font-medium text-[#444444]">Freelance / Website Project</span>
                    </span>
                    <span className="text-[11px] text-[#666666] font-medium shrink-0 ml-2">Aug-Sept 2026</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-1 text-[#333333] text-[11px] leading-relaxed">
                    <li>Designed and developed the website end-to-end, creating a clear digital brand presence and structured product showcase. Built responsive layouts with clear content hierarchy and product-focused navigation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SELECTED WORK */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                SELECTED WORK
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="font-bold text-[11.5px] text-[#111111]">
                    CRM platform · <span className="font-normal text-[#555555]">B2B × SaaS × Product UI × ScreenDesign</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-0.5 text-[#333333] text-[11px] leading-relaxed mt-0.5">
                    <li>Redesigned a B2B CRM focused on admissions, enquiries, follow-ups, team activity, and operational workflows.</li>
                    <li>Created high-fidelity screens and a product-demo narrative.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-[11.5px] text-[#111111]">
                    Karagir · <span className="font-normal text-[#555555]">CulturalStudies × UX / ProductDesign × AgenticAI</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-0.5 text-[#333333] text-[11px] leading-relaxed mt-0.5">
                    <li>Mobile-first cultural ecosystem connecting Maharashtra's tribal artisans, customers, NGOs, and cultural organisations.</li>
                    <li>Worked across research, cultural context, information architecture, product flows, and agentic AI.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-[11.5px] text-[#111111]">
                    Exam Portal · <span className="font-normal text-[#555555]">Product & UI Design × Assessment Platform × Ed Tech</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-0.5 text-[#333333] text-[11px] leading-relaxed mt-0.5">
                    <li>Designed institute-admin web workflows and mobile experiences for different user roles, covering information architecture, interaction flows, interface design, and prototype-ready screens.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-[11.5px] text-[#111111]">
                    Interactive Tangible Learning Board · <span className="font-normal text-[#555555]">Physical Product × UX × Interactive Learning</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-0.5 text-[#333333] text-[11px] leading-relaxed mt-0.5">
                    <li>Developed a physical-digital learning product that combines RFID-based interaction, embedded electronics, and a companion mobile experience for children.</li>
                    <li>Took the concept from interaction design to a refined, functional, and manufacturable prototype.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                EDUCATION
              </h2>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11.5px] text-[#111111]">Bachelor of Design · UX Design</span>
                  <span className="text-[11px] text-[#666666] font-medium shrink-0 ml-2">2023–present</span>
                </div>
                <p className="text-[#555555] text-[11px]">Institute of Design, MIT ADT University, Pune</p>
              </div>
            </section>

            {/* SKILLS */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                SKILLS
              </h2>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-bold text-[#111111] w-20 shrink-0">Design</span>
                  <span className="text-[#333333] leading-relaxed">
                    Product Design · Interaction Design · User-Centered Design · Information Architecture · User Flows · Wireframing · Prototyping · High-Fidelity UI · Design Systems
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-bold text-[#111111] w-20 shrink-0">Research</span>
                  <span className="text-[#333333] leading-relaxed">
                    User Research · User Interviews · Usability Testing · Journey Mapping · Personas · Heuristic Evaluation · Competitor Analysis
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-bold text-[#111111] w-20 shrink-0">AI</span>
                  <span className="text-[#333333] leading-relaxed">
                    Agentic AI Experiences · Human-AI Interaction · Conversational UI
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-bold text-[#111111] w-20 shrink-0">Web</span>
                  <span className="text-[#333333] leading-relaxed">
                    Visual Design · Responsive Design · Web Design
                  </span>
                </div>
              </div>
            </section>

            {/* COLLEGE INVOLVEMENT */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                COLLEGE INVOLVEMENT
              </h2>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[11.5px] text-[#111111]">
                      Treasurer — Natak Bitak <span className="font-semibold text-[#444444]">· Drama Club · MIT ID</span>
                    </span>
                    <span className="text-[11px] text-[#666666] font-medium shrink-0 ml-2">2025–2026</span>
                  </div>
                  <p className="text-[#555555] text-[11px]">Managed club finances, fundraising, volunteers, and event coordination.</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[11.5px] text-[#111111]">
                      ClubMember — Natak Bitak <span className="font-semibold text-[#444444]">· Drama Club · MIT ID</span>
                    </span>
                    <span className="text-[11px] text-[#666666] font-medium shrink-0 ml-2">2024–2025</span>
                  </div>
                  <p className="text-[#555555] text-[11px]">Supported event planning, logistics, promotion, and student-team coordination.</p>
                </div>
              </div>
            </section>

            {/* TOOLS */}
            <section>
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#111111] border-b border-black/15 pb-1 mb-2">
                TOOLS
              </h2>
              <p className="text-[#333333] text-[11px] leading-relaxed">
                Figma · FigJam · Framer · Miro · Sketch · Procreate · Google AI Studio · Claude · Stitch · GitHub · Vercel · WordPress
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
