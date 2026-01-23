import { ResumeData } from "@/lib/schemas/resume";

/**
 * Generates a high-fidelity HTML string that mirrors the React templates.
 * This is used for direct PDF generation via Puppeteer setContent.
 */
export function generateHighFidelityHTML(data: ResumeData): string {
  const d = data || {};
  const h = d.header || {};
  const t = d.template || "simple";

  // UNIVERSAL STANDARDS
  const GLOBAL_MARGIN = "20mm";
  const PAGE_WIDTH = "210mm";
  const PAGE_HEIGHT = "297mm";

  // Template-specific style configurations
  const config = {
    simple: { // ATSTemplate
      font: "'Times New Roman', serif",
      bodyClass: "bg-white text-black",
      sectionHeaderClass: "text-[12pt] font-bold uppercase tracking-tight border-b-[1pt] border-black mb-2",
      accent: "#000000",
      fullWidthHeader: false
    },
    tech: {
      font: "'JetBrains Mono', monospace",
      bodyClass: "bg-[#0f172a] text-[#e2e8f0]",
      sectionHeaderClass: "text-[#4ade80] mb-2 font-bold",
      accent: "#4ade80",
      fullWidthHeader: true
    },
    creative: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-gradient-to-br from-fuchsia-50 to-purple-50 text-gray-800",
      sectionHeaderClass: "text-lg font-bold text-fuchsia-600 mb-3 flex items-center gap-2",
      accent: "#c026d3",
      fullWidthHeader: false
    },
    bold: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-[#111827]",
      sectionHeaderClass: "text-xl font-black uppercase text-[#dc2626] border-b-4 border-[#dc2626] pb-1 mb-4",
      accent: "#dc2626",
      fullWidthHeader: true
    },
    modern: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-[#1f2937]",
      sectionHeaderClass: "text-xs font-bold uppercase tracking-widest text-[#059669] mb-3",
      accent: "#059669",
      fullWidthHeader: false
    },
    minimal: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-[#1f2937]",
      sectionHeaderClass: "text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-4",
      accent: "#9ca3af",
      fullWidthHeader: false
    },
    classic: {
      font: "'Times New Roman', serif",
      bodyClass: "bg-white text-black",
      sectionHeaderClass: "text-lg font-bold uppercase border-b border-gray-400 mb-2",
      accent: "#000000",
      fullWidthHeader: false
    },
    professional: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-gray-900",
      sectionHeaderClass: "text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2",
      accent: "#1e293b",
      fullWidthHeader: true
    },
    executive: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-gray-900",
      sectionHeaderClass: "text-sm font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-200 pb-2 mb-4",
      accent: "#0f172a",
      fullWidthHeader: true
    },
    academic: {
      font: "Georgia, serif",
      bodyClass: "bg-white text-gray-900",
      sectionHeaderClass: "text-lg font-bold text-[#78350f] border-b border-[#fcd34d] pb-1 mb-3",
      accent: "#78350f",
      fullWidthHeader: false
    },
    compact: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-gray-900",
      sectionHeaderClass: "text-xs font-bold uppercase text-gray-500 mb-1",
      accent: "#4b5563",
      fullWidthHeader: false
    },
    elegant: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-gray-800",
      sectionHeaderClass: "text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4 flex items-center gap-3",
      accent: "#7c3aed",
      fullWidthHeader: false
    }
  }[t] || {
    font: "'Inter', sans-serif",
    bodyClass: "bg-white text-slate-900",
    sectionHeaderClass: "border-b border-slate-200 pb-2 mb-4 text-sm font-black uppercase tracking-widest text-indigo-600",
    accent: "#4f46e5",
    fullWidthHeader: false
  };

  const isTech = t === "tech";
  const isBold = t === "bold";
  const isCreative = t === "creative";
  const isAcademic = t === "academic";
  const isClassic = t === "classic";
  const isProfessional = t === "professional";
  const isExecutive = t === "executive";
  const isCompact = t === "compact";
  const isElegant = t === "elegant";
  const isSimple = t === "simple" || t === "ats";
  const isModern = t === "modern";
  const isMinimal = t === "minimal";

  // Standard Header Links Helper
  const allLinks = [
    { label: 'LinkedIn', url: h.linkedin },
    { label: 'GitHub', url: h.github },
    { label: 'LeetCode', url: h.leetcode },
    { label: 'Portfolio', url: h.portfolio },
    ...(h.customLinks || []).map(cl => ({ label: cl.name, url: cl.url }))
  ].filter(l => l.url);

  return `
    <!DOCTYPE html>
    <html style="margin:0; padding:0;">
      <head>
        <meta charset="utf-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 0; }
          * { box-sizing: border-box; }
          html, body { 
            margin: 0; padding: 0; 
            width: ${PAGE_WIDTH};
            height: ${PAGE_HEIGHT};
            background: white;
            overflow: hidden;
          }
          body { 
            font-family: ${config.font}; 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page-container { 
            width: ${PAGE_WIDTH}; 
            height: ${PAGE_HEIGHT}; 
            position: relative;
            background: white;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .content-margin { padding: ${GLOBAL_MARGIN}; }
          .sidebar-width { width: 70mm; }
          .main-content-width { width: 140mm; }
          ${isCompact ? `html { font-size: 14px; }` : ''}
          ul { list-style: none; padding: 0; margin: 0; }
          a { text-decoration: none; color: inherit; }
          .section-line { width: 32px; height: 2px; background: #1e293b; }
          .bg-fill { flex-grow: 1; }
          
          /* Creative Gradient Text */
          .gradient-text {
            background: linear-gradient(to right, #c026d3, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 3rem; font-weight: 900;
          }
          
          /* Decorative Elements */
          .floating-circle {
            position: absolute;
            left: -16px; top: -16px;
            width: 128px; height: 128px;
            background: linear-gradient(to bottom right, #d946ef, #7c3aed);
            border-radius: 9999px;
            opacity: 0.15;
          }
        </style>
      </head>
      <body class="${config.bodyClass}">
        <div class="page-container ${isProfessional ? 'flex-row' : ''}">
          ${isCreative ? '<div class="floating-circle"></div>' : ''}
          
          ${isProfessional ? `
            <aside class="sidebar-width bg-slate-800 text-white p-6 h-full" style="-webkit-print-color-adjust: exact;">
                <div class="w-20 h-20 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                    ${(h.name || 'U').split(" ").map(n => n[0]).join("")}
                </div>
                <!-- Sidebar Links -->
                <div class="mb-6">
                    <h3 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 text-center">Contact</h3>
                    <div class="space-y-1.5 text-[9px]">
                        <p>📍 ${h.location || ''}</p>
                        <p>📞 ${h.phone || ''}</p>
                        <p class="break-all">✉️ ${h.email || ''}</p>
                        ${allLinks.map(l => `<p class="break-all capitalize">🔗 ${l.label}: ${l.url}</p>`).join("")}
                    </div>
                </div>
                <!-- Sidebar Skills -->
                ${(d.skills?.categories && d.skills.categories.length > 0) ? `
                    <div class="mb-6">
                        <h3 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 text-center">Skills</h3>
                        <div class="space-y-2">
                            ${d.skills.categories.map(cat => `
                                <div>
                                    <p class="font-semibold text-[9px] mb-0.5">${cat.category}:</p>
                                    <p class="text-[8px] text-slate-300">${cat.skills}</p>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                ` : ''}
                <!-- Sidebar Certifications -->
                ${(d.certifications && d.certifications.length > 0) ? `
                    <div>
                        <h3 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 text-center">Certs</h3>
                        <ul class="text-[8px] space-y-1">
                            ${d.certifications.map(cert => `<li>• ${cert}</li>`).join("")}
                        </ul>
                    </div>
                ` : ''}
            </aside>
          ` : ''}

          <div class="${isProfessional ? 'main-content-width' : 'w-full'} flex flex-col h-full bg-fill relative">
            
            <!-- Full Width Header Blocks -->
            ${(config.fullWidthHeader && !isProfessional) ? `
                <div class="w-full">
                    ${isTech ? `
                        <header class="p-8 bg-slate-800 border-b border-slate-700" style="-webkit-print-color-adjust: exact;">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="w-2 h-2 rounded-full bg-red-500"></span>
                                <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                                <span class="text-slate-500 text-[9px] ml-1">~/resume/${(h.name || '').toLowerCase().replace(/\s+/g, "-")}</span>
                            </div>
                            <h1 class="text-2xl font-bold text-green-400 font-mono italic">$ ${h.name}</h1>
                            <div class="mt-1 text-[10px] text-slate-400 font-mono">
                                <p><span class="text-cyan-400">loc:</span> ${h.location} | <span class="text-cyan-400">mail:</span> ${h.email} | <span class="text-cyan-400">tel:</span> ${h.phone}</p>
                                <div class="flex gap-4 mt-1">
                                    ${allLinks.map(l => `<span class="text-purple-400 capitalize">${l.label}: ${l.url}</span>`).join("")}
                                </div>
                            </div>
                        </header>
                    ` : isExecutive ? `
                        <header class="bg-slate-900 text-white px-10 py-6" style="-webkit-print-color-adjust: exact;">
                            <h1 class="text-3xl font-light tracking-wide">${h.name}</h1>
                            <div class="mt-2 flex flex-wrap gap-x-4 text-xs text-slate-300">
                                <span>${h.email}</span> | <span>${h.phone}</span> | <span>${h.location}</span>
                                ${allLinks.map(l => `<span>|</span> <span>${l.label}: ${l.url}</span>`).join("")}
                            </div>
                        </header>
                    ` : isBold ? `
                        <header class="bg-[#dc2626] text-white px-10 py-6" style="-webkit-print-color-adjust: exact;">
                            <h1 class="text-3xl font-black uppercase tracking-wide">${h.name}</h1>
                            <div class="mt-1 flex flex-wrap gap-4 text-xs">
                                <span>${h.email}</span> | <span>${h.phone}</span> | <span>${h.location}</span>
                                ${allLinks.map(l => `<span>|</span> <span>${l.label}: ${l.url}</span>`).join("")}
                            </div>
                        </header>
                    ` : ''}
                </div>
            ` : ''}

            <main class="content-margin space-y-5">
                <!-- Inner Header Block -->
                ${(!config.fullWidthHeader && !isProfessional) ? `
                    ${isSimple ? `
                        <header class="text-center border-b-[1.5pt] border-black pb-2">
                            <h1 class="text-2xl font-bold uppercase tracking-wide mb-1">${h.name}</h1>
                            <div class="flex flex-wrap justify-center gap-2 text-[9pt]">
                                <span>${h.location}</span> • <span>${h.phone}</span> • <span>${h.email}</span>
                            </div>
                            <div class="flex flex-wrap justify-center gap-2 mt-1 text-[8pt]">
                                ${allLinks.map(l => `<span class="underline">${l.label}: ${l.url}</span>`).join(" • ")}
                            </div>
                        </header>
                    ` : isCreative ? `
                        <header class="relative mb-6">
                            <h1 class="gradient-text">${h.name}</h1>
                            <div class="mt-4 flex flex-wrap gap-2 text-[10px]">
                                <span class="px-2 py-1 bg-white rounded-full shadow-sm">✉️ ${h.email}</span>
                                <span class="px-2 py-1 bg-white rounded-full shadow-sm">📞 ${h.phone}</span>
                                <span class="px-2 py-1 bg-white rounded-full shadow-sm">📍 ${h.location}</span>
                                ${allLinks.map(l => `<span class="px-2 py-1 bg-white rounded-full shadow-sm text-fuchsia-600 font-bold">${l.label}: ${l.url}</span>`).join("")}
                            </div>
                        </header>
                    ` : isModern ? `
                        <header class="mb-4">
                            <div class="flex items-end justify-between border-b-4 border-emerald-500 pb-3">
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900 leading-tight">${h.name}</h1>
                                    <p class="text-emerald-600 font-medium text-xs mt-0.5">${h.location}</p>
                                </div>
                                <div class="text-right text-[10px] text-gray-500">
                                    <p>${h.phone}</p>
                                    <p>${h.email}</p>
                                    <div class="flex gap-2 justify-end mt-1 text-emerald-600">
                                        ${allLinks.map(l => `<span>${l.label}</span>`).join(" • ")}
                                    </div>
                                </div>
                            </div>
                        </header>
                    ` : isElegant ? `
                        <header class="relative mb-6 pb-4 pl-6">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600"></div>
                            <h1 class="text-3xl font-light text-gray-900 tracking-tight">${h.name}</h1>
                            <div class="mt-2 text-xs text-gray-500 space-x-3">
                                <span>${h.email}</span> • <span>${h.phone}</span> • <span>${h.location}</span>
                                ${allLinks.map(l => `• <span>${l.label}</span>`).join("")}
                            </div>
                        </header>
                    ` : isClassic ? `
                        <header class="text-center mb-6 border-b-2 border-gray-800 pb-3">
                            <h1 class="text-2xl font-bold tracking-wide uppercase leading-none">${h.name}</h1>
                            <div class="mt-2 text-[10px] space-x-2">
                                <span>${h.location}</span> • <span>${h.phone}</span> • <span>${h.email}</span>
                            </div>
                            <div class="mt-1 text-[9px] text-gray-600">
                                ${allLinks.map(l => `<span>${l.label}: ${l.url}</span>`).join(" • ")}
                            </div>
                        </header>
                    ` : `
                        <header class="text-center italic">
                            <h1 class="text-3xl font-black text-slate-900">${h.name}</h1>
                            <div class="flex justify-center gap-x-2 text-[10px] text-slate-500 mt-1">
                                <span>${h.email}</span> • <span>${h.phone}</span> • <span>${h.location}</span>
                                ${allLinks.map(l => `• <span>${l.label}</span>`).join("")}
                            </div>
                        </header>
                    `}
                ` : (isProfessional ? `
                    <header class="border-b-2 border-slate-800 pb-2 mb-4">
                        <h1 class="text-2xl font-bold text-slate-800 uppercase">${h.name}</h1>
                        <p class="text-sm text-slate-500 font-bold italic">Curriculum Vitae</p>
                    </header>
                ` : '')}

                <!-- Creative Skills Badge Section -->
                ${isCreative && d.skills?.categories?.some(cat => cat.skills) ? `
                    <section class="mb-4 bg-white rounded-2xl p-3 shadow-sm flex flex-wrap gap-2">
                        ${d.skills.categories.map(cat => (cat.skills || '').split(',').map(skill => `
                            <span class="px-2 py-0.5 bg-gradient-to-r from-fuchsia-50 to-purple-100 text-purple-700 rounded-full text-[9px] font-bold border border-purple-200">${skill.trim()}</span>
                        `).join("")).join("")}
                    </section>
                ` : ''}

                <!-- Main Sections -->
                ${(d.experience && d.experience.length > 0) ? `
                <section>
                  <h2 class="${config.sectionHeaderClass}">${isProfessional ? '<span class="section-line"></span>' : ''}${isAcademic ? 'EXPERIENCE' : (isTech ? '// exp' : 'Experience')}</h2>
                  <div class="space-y-4">
                    ${d.experience.map(exp => `
                      <div class="${isTech ? 'pl-3 border-l border-green-500' : (isElegant || isCreative ? 'pl-3 border-l border-violet-200' : '')} ${isCreative ? 'bg-white p-3 rounded-xl shadow-sm' : ''}">
                        <div class="flex justify-between items-baseline mb-0.5">
                          <h3 class="font-bold text-sm ${isTech ? 'text-[#22d3ee]' : 'text-slate-900'}">${exp.role}</h3>
                          <span class="text-[9px] px-2 py-0.5 rounded-full ${isTech ? 'text-slate-500' : (isBold ? 'text-[#dc2626] font-bold underline' : 'bg-slate-100 text-slate-500 font-bold')}">${exp.duration}</span>
                        </div>
                        <p class="text-[11px] ${isTech ? 'text-yellow-400' : (isBold ? 'text-gray-600 italic font-black' : (isAcademic ? 'text-gray-700 italic' : 'text-slate-600 font-bold'))}">${isTech ? '@ ' : ''}${exp.organization}</p>
                        <ul class="mt-1.5 text-[10px] ${isTech ? 'text-slate-300' : 'text-slate-600'} ${isAcademic || isClassic || isCompact || isSimple ? 'list-disc list-inside' : 'space-y-1'}">
                          ${(exp.bullets || []).map(b => `<li class="flex items-start gap-1.5">
                            ${!(isAcademic || isClassic || isCompact || isSimple) ? `<span class="mt-1" style="color: ${config.accent}">${isTech ? '→' : '•'}</span>` : ''}
                            <span class="flex-1">${b}</span>
                          </li>`).join("")}
                        </ul>
                      </div>
                    `).join("")}
                  </div>
                </section>` : ""}

                ${(d.education && d.education.length > 0) ? `
                <section>
                  <h2 class="${config.sectionHeaderClass}">${isAcademic ? 'EDUCATION' : 'Education'}</h2>
                  <div class="space-y-2">
                    ${d.education.map(edu => `
                      <div class="flex justify-between items-baseline ${isCreative ? 'bg-white p-3 rounded-xl shadow-sm' : ''}">
                        <div class="text-[11px]">
                          <span class="font-bold ${isTech ? 'text-[#22d3ee]' : 'text-slate-900'}">${edu.degree}</span>
                          <span class="text-xs ${isTech ? 'text-yellow-400' : 'text-slate-500'}">, ${edu.institution}</span>
                        </div>
                        <span class="text-[9px] text-slate-400 font-bold">${edu.duration}</span>
                      </div>
                    `).join("")}
                  </div>
                </section>` : ""}

                ${(!isProfessional && !isCreative && d.skills?.categories?.some(cat => cat.skills)) ? `
                    <section>
                      <h2 class="${config.sectionHeaderClass}">${isTech ? '// skills' : 'Skills'}</h2>
                      <div class="${isElegant || isExecutive || isMinimal ? 'grid grid-cols-2 gap-x-8 gap-y-1' : 'space-y-0.5'} text-[10px]">
                          ${d.skills.categories.map(cat => `
                              <div>
                                  <span class="font-bold text-slate-900 uppercase tracking-tighter text-[9px]">${cat.category}:</span>
                                  <span class="text-slate-600 ml-1">${cat.skills}</span>
                              </div>
                          `).join("")}
                      </div>
                    </section>
                ` : ''}

                ${(d.projects && d.projects.length > 0) ? `
                <section>
                  <h2 class="${config.sectionHeaderClass}">${isAcademic ? 'PROJECTS' : 'Projects'}</h2>
                  <div class="space-y-3">
                    ${d.projects.map(proj => `
                      <div class="${isTech || isCreative ? 'bg-slate-800/10 p-3 rounded-lg border border-slate-200' : ''} ${isCreative ? 'bg-white shadow-sm' : ''}">
                        <div class="flex justify-between items-center mb-0.5">
                          <h3 class="font-black text-xs ${isTech ? 'text-purple-400' : 'text-slate-900'}">${proj.name}</h3>
                          ${proj.link ? `<span class="text-[9px] font-bold italic" style="color: ${config.accent}">[source]</span>` : ''}
                        </div>
                        <p class="text-[9px] text-slate-500 italic mb-1">${proj.techStack}</p>
                        <ul class="text-[10px] ${isTech ? 'text-slate-400' : 'text-slate-600'} space-y-0.5">
                          ${(proj.bullets || []).map(b => `<li class="flex items-start gap-1.5 font-medium">
                            <span class="mt-1" style="color: ${config.accent}">•</span>
                            <span class="flex-1">${b}</span>
                          </li>`).join("")}
                        </ul>
                      </div>
                    `).join("")}
                  </div>
                </section>` : ""}

                <div class="grid grid-cols-2 gap-6">
                    ${(d.achievements && d.achievements.length > 0) ? `
                        <section>
                            <h2 class="${config.sectionHeaderClass}">${isAcademic ? 'AWARDS' : 'Awards'}</h2>
                            <ul class="text-[10px] space-y-1">
                                ${d.achievements.map(ach => `<li class="flex gap-2"><span>✨</span><span class="italic font-bold text-slate-700">${ach}</span></li>`).join("")}
                            </ul>
                        </section>` : ""}
                    ${(!isProfessional && d.certifications && d.certifications.length > 0) ? `
                        <section>
                            <h2 class="${config.sectionHeaderClass}">${isAcademic ? 'CERTS' : 'Certs'}</h2>
                            <ul class="text-[10px] space-y-1">
                                ${d.certifications.map(cert => `<li class="flex gap-2"><span>✓</span><span class="font-bold text-slate-700">${cert}</span></li>`).join("")}
                            </ul>
                        </section>` : ""}
                </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  `;
}
