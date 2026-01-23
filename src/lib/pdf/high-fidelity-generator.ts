import { ResumeData } from "@/lib/schemas/resume";

/**
 * Generates a high-fidelity HTML string that mirrors the React templates.
 * This is used for direct PDF generation via Puppeteer setContent.
 */
export function generateHighFidelityHTML(data: ResumeData): string {
  const d = data || {};
  const h = d.header || {};
  const t = d.template || "simple";

  // Template-specific style configurations
  const config = {
    simple: {
      font: "'Crimson Pro', serif",
      bodyClass: "bg-white text-slate-900",
      sectionHeader: "section-title-simple",
      accent: "#4f46e5", // indigo-600
    },
    tech: {
      font: "'JetBrains Mono', monospace",
      bodyClass: "bg-[#0f172a] text-[#e2e8f0]", // slate-900, slate-200
      sectionHeader: "section-title-tech",
      accent: "#4ade80", // green-400
    },
    creative: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-[#fdf4ff] text-[#1f2937]", // fuchsia-50, gray-800
      sectionHeader: "section-title-creative",
      accent: "#c026d3", // fuchsia-600
    },
    bold: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-[#111827]", // gray-900
      sectionHeader: "section-title-bold",
      accent: "#dc2626", // red-600
    },
    modern: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-[#1f2937]", // gray-800
      sectionHeader: "section-title-modern",
      accent: "#059669", // emerald-600
    },
    minimal: {
      font: "'Inter', sans-serif",
      bodyClass: "bg-white text-[#1f2937]", // gray-800
      sectionHeader: "section-title-minimal",
      accent: "#9ca3af", // gray-400
    }
  }[t] || {
    font: "'Inter', sans-serif",
    bodyClass: "bg-white text-slate-900",
    sectionHeader: "section-title-simple",
    accent: "#4f46e5",
  };

  const isTech = t === "tech";
  const isCreative = t === "creative";
  const isBold = t === "bold";
  const isModern = t === "modern";
  const isMinimal = t === "minimal";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 0; }
          body { 
            margin: 0; padding: 0; 
            font-family: ${config.font}; 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page-container { 
            width: 210mm; 
            min-height: 297mm; 
            margin: auto;
            position: relative;
          }
          
          /* CRITICAL: Pure CSS for section titles to bypass Tailwind CDN processing lag */
          .section-title-simple { 
            border-bottom: 1px solid #e2e8f0; 
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #4f46e5;
          }
          .section-title-tech {
            color: #4ade80;
            margin-bottom: 0.5rem;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
          }
          .section-title-creative {
            font-size: 1.125rem;
            font-weight: 700;
            color: #c026d3;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .section-title-bold {
            font-size: 1.25rem;
            font-weight: 900;
            text-transform: uppercase;
            color: #dc2626;
            border-bottom: 4px solid #dc2626;
            padding-bottom: 0.25rem;
            margin-bottom: 1rem;
          }
          .section-title-modern {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #059669;
            margin-bottom: 0.75rem;
          }
          .section-title-minimal {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: #9ca3af;
            margin-bottom: 1.5rem;
          }

          /* General Overrides */
          ul { list-style: none; padding: 0; margin: 0; }
          a { text-decoration: none; color: inherit; }
        </style>
      </head>
      <body class="${config.bodyClass}">
        <div class="page-container ${isTech ? 'p-8' : (isMinimal ? 'p-12' : 'p-8')}">
          
          <!-- Header Section -->
          ${isTech ? `
            <header class="mb-6 border border-slate-700 rounded-lg p-4 bg-slate-800" style="-webkit-print-color-adjust: exact;">
                <div class="flex items-center gap-2 mb-3">
                    <span class="w-2 h-2 rounded-full bg-red-500"></span>
                    <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                    <span class="text-slate-500 text-[10px] ml-2 font-mono">~/resume/${(h.name || '').toLowerCase().replace(/\s+/g, "-")}</span>
                </div>
                <h1 class="text-3xl font-bold text-green-400 font-mono">$ ${h.name || 'Untitled'}</h1>
                <div class="mt-2 text-xs text-slate-400 font-mono">
                    <p><span class="text-cyan-400">location:</span> ${h.location || ''}</p>
                    <p><span class="text-cyan-400">email:</span> ${h.email || ''}</p>
                    <div class="flex gap-4 mt-1">
                        ${h.github ? `<span class="text-green-400">github</span>` : ''}
                        ${h.linkedin ? `<span class="text-blue-400">linkedin</span>` : ''}
                    </div>
                </div>
            </header>
          ` : isCreative ? `
            <header class="relative mb-8">
                <div class="absolute -left-4 -top-4 w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full opacity-10"></div>
                <div class="relative">
                    <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600" style="background-clip: text; -webkit-background-clip: text;">
                        ${h.name || 'Untitled'}
                    </h1>
                    <div class="mt-4 flex flex-wrap gap-2 text-[10px]">
                        <span class="px-2 py-1 bg-white rounded-full shadow-sm">${h.email || ''}</span>
                        <span class="px-2 py-1 bg-white rounded-full shadow-sm">${h.location || ''}</span>
                    </div>
                </div>
            </header>
          ` : isBold ? `
            <header class="bg-[#dc2626] text-white px-8 py-6 -mx-8 -mt-8 mb-8" style="-webkit-print-color-adjust: exact;">
                <h1 class="text-4xl font-black uppercase tracking-wide">${h.name || 'Untitled'}</h1>
                <div class="mt-2 flex flex-wrap gap-4 text-xs text-red-100">
                    <span>${h.email || ''}</span> | <span>${h.phone || ''}</span> | <span>${h.location || ''}</span>
                </div>
            </header>
          ` : isModern ? `
            <header class="mb-6">
                <div class="flex items-end justify-between border-b-4 border-emerald-500 pb-4">
                    <div>
                        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">${h.name || 'Untitled'}</h1>
                        <p class="text-emerald-600 font-medium mt-1 text-sm">${h.location || ''}</p>
                    </div>
                    <div class="text-right text-xs text-gray-600">
                        <p>${h.email || ''}</p>
                        <p>${h.phone || ''}</p>
                    </div>
                </div>
            </header>
          ` : `
            <header class="mb-8 ${isMinimal ? '' : 'text-center'}">
                <h1 class="${isMinimal ? 'text-4xl font-light' : 'text-4xl font-black'} text-slate-900 mb-2">${h.name || 'Untitled'}</h1>
                <div class="flex flex-wrap ${isMinimal ? '' : 'justify-center'} gap-x-4 text-xs text-slate-500">
                    <span>${h.email || ''}</span>
                    <span>${h.phone || ''}</span>
                    <span>${h.location || ''}</span>
                </div>
            </header>
          `}

          <!-- Main Content -->
          <main class="space-y-6">
            
            <!-- Experience Section -->
            ${(d.experience && d.experience.length > 0) ? `
            <section>
              <h2 class="${config.sectionHeader}">${isTech ? '// experience' : 'Experience'}</h2>
              <div class="space-y-4">
                ${d.experience.map(exp => `
                  <div class="${isTech ? 'pl-4 border-l-2 border-[#4ade80]' : ''}">
                    <div class="flex justify-between items-baseline">
                      <h3 class="font-bold ${isTech ? 'text-[#22d3ee]' : 'text-slate-900'}">${exp.role || ''}</h3>
                      <span class="text-xs ${isTech ? 'text-slate-500' : (isBold ? 'text-[#dc2626] font-bold' : 'text-slate-400')}">${exp.duration || ''}</span>
                    </div>
                    <p class="text-sm ${isTech ? 'text-[#facc15]' : (isBold ? 'text-gray-600 font-semibold' : 'text-slate-600')}">${exp.organization || ''}</p>
                    <ul class="mt-2 text-xs ${isTech ? 'text-[#cbd5e1]' : 'text-slate-700'} space-y-1">
                      ${(exp.bullets || []).map(b => `<li class="flex items-start gap-2">
                        <span class="font-bold mt-0.5" style="color: ${config.accent}">${isTech ? '→' : (isBold ? '▸' : '•')}</span>
                        <span>${b}</span>
                      </li>`).join("")}
                    </ul>
                  </div>
                `).join("")}
              </div>
            </section>` : ""}

            <!-- Education Section -->
            ${(d.education && d.education.length > 0) ? `
            <section>
              <h2 class="${config.sectionHeader}">${isTech ? '// education' : 'Education'}</h2>
              <div class="space-y-3">
                ${d.education.map(edu => isBold ? `
                  <div class="mb-3">
                    <div class="flex justify-between items-baseline">
                      <h3 class="font-bold text-[#111827]">${edu.degree || ''}</h3>
                      <span class="text-sm font-bold text-[#dc2626]">${edu.duration || ''}</span>
                    </div>
                    <p class="text-sm text-gray-600">${edu.institution || ''} ${edu.cgpa ? `• ${edu.cgpa}` : ''}</p>
                  </div>
                ` : `
                  <div class="flex justify-between items-baseline">
                    <div class="text-sm">
                      <span class="font-bold ${isTech ? 'text-[#22d3ee]' : 'text-slate-900'}">${edu.degree || ''}</span>
                      <span class="${isTech ? 'text-slate-500' : 'text-slate-400'}"> @ </span>
                      <span class="italic ${isTech ? 'text-[#facc15]' : 'text-slate-600'}">${edu.institution || ''}</span>
                    </div>
                    <span class="text-xs ${isTech ? 'text-slate-500' : 'text-slate-400'}">${edu.duration || ''}</span>
                  </div>
                `).join("")}
              </div>
            </section>` : ""}

            <!-- Projects Section -->
            ${(d.projects && d.projects.length > 0) ? `
            <section>
              <h2 class="${config.sectionHeader}">${isTech ? '// projects' : 'Projects'}</h2>
              <div class="space-y-4">
                ${d.projects.map(proj => `
                  <div class="${isTech ? 'bg-slate-800 rounded-lg p-3 border border-slate-700' : ''}">
                    <div class="flex justify-between items-center">
                      <h3 class="font-bold ${isTech ? 'text-[#c084fc]' : 'text-slate-900'}">${proj.name || ''}</h3>
                      ${proj.link ? `<span class="text-[10px] font-bold" style="color: ${config.accent}">${isTech ? '[repo]' : 'VIEW →'}</span>` : ''}
                    </div>
                    <p class="text-[10px] ${isTech ? 'text-slate-500 mt-2' : 'text-slate-500 mb-1 uppercase tracking-wider'}">${isTech ? '# ' : ''}${proj.techStack || ''}</p>
                    <ul class="mt-1 text-xs ${isTech ? 'text-[#cbd5e1]' : 'text-slate-700'} space-y-0.5">
                      ${(proj.bullets || []).map(b => `<li class="flex items-start gap-2">
                        <span class="font-bold mt-1" style="color: ${config.accent}">${isTech ? '•' : (isBold ? '▸' : '•')}</span>
                        <span>${b}</span>
                      </li>`).join("")}
                    </ul>
                  </div>
                `).join("")}
              </div>
            </section>` : ""}

            <!-- Skills Section -->
            ${(d.skills?.categories && d.skills.categories.length > 0) ? `
            <section>
              <h2 class="${config.sectionHeader}">${isTech ? '// skills' : 'Skills'}</h2>
              ${isTech ? `
                <div class="bg-slate-800 rounded-lg p-3 border border-slate-700 text-[10px]">
                    <pre class="font-mono text-slate-300">const skills = {
    ${d.skills.categories.map(cat => `  ${(cat.category || '').toLowerCase()}: ["${(cat.skills || '').split(',').join('", "')}"]`).join(",\n    ")}
};</pre>
                </div>
              ` : `
                <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                    ${d.skills.categories.map(cat => `
                        <div>
                            <span class="font-bold text-slate-900">${cat.category || ''}:</span>
                            <span class="text-slate-600 ml-1">${cat.skills || ''}</span>
                        </div>
                    `).join("")}
                </div>
              `}
            </section>` : ""}

            <!-- Achievements & Certifications Section -->
            <div class="${(isBold || isMinimal || isCreative || isModern) ? 'grid grid-cols-2 gap-6' : 'space-y-6'}">
                ${(d.achievements && d.achievements.length > 0) ? `
                <section>
                    <h2 class="${config.sectionHeader}">${isTech ? '// achievements' : 'Achievements'}</h2>
                    <ul class="text-xs ${isTech ? 'text-[#cbd5e1]' : 'text-slate-700'} space-y-1">
                        ${d.achievements.map(ach => `
                            <li class="flex items-start gap-2">
                                <span class="font-bold" style="color: ${config.accent}">${isTech ? '✓' : (isBold ? '★' : '✨')}</span>
                                <span>${ach}</span>
                            </li>
                        `).join("")}
                    </ul>
                </section>` : ""}

                ${(d.certifications && d.certifications.length > 0) ? `
                <section>
                    <h2 class="${config.sectionHeader}">${isTech ? '// certifications' : 'Certifications'}</h2>
                    <ul class="text-xs ${isTech ? 'text-[#cbd5e1]' : 'text-slate-700'} space-y-1">
                        ${d.certifications.map(cert => `
                            <li class="flex items-start gap-2">
                                <span class="font-bold" style="color: ${config.accent}">✓</span>
                                <span>${cert}</span>
                            </li>
                        `).join("")}
                    </ul>
                </section>` : ""}
            </div>

          </main>
        </div>
      </body>
    </html>
  `;
}
