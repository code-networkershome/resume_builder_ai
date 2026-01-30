import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-full flex shadow-none print:shadow-none font-sans text-[9.5pt] flex-1">
            {/* Left Sidebar */}
            <aside className="w-[28%] bg-slate-900 text-white px-6 pt-8 pb-8 flex flex-col">
                {/* Photo placeholder / Initials */}
                {data.header && (
                    <div className="w-16 h-16 bg-slate-800 rounded-xl mb-4 flex items-center justify-center text-2xl font-black shadow-2xl border border-slate-700">
                        {data.header.name.split(" ").map(n => n[0]).join("")}
                    </div>
                )}

                <div className="space-y-4">
                    {/* Contact */}
                    {data.header && (
                        <section>
                            <h3 className="text-[8pt] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Connectivity</h3>
                            <div className="space-y-2 text-[8.5pt]">
                                {data.header.location && (
                                    <p className="flex items-start gap-4 text-slate-200">
                                        <span className="text-slate-500 mt-1">📍</span> {data.header.location}
                                    </p>
                                )}
                                {data.header.phone && (
                                    <p className="flex items-start gap-4 text-slate-200">
                                        <span className="text-slate-500 mt-1">📞</span> {data.header.phone}
                                    </p>
                                )}
                                {data.header.email && (
                                    <p className="flex items-start gap-4 text-slate-200 break-all leading-snug">
                                        <span className="text-slate-500 mt-1">✉️</span> {data.header.email}
                                    </p>
                                )}
                                {data.header.linkedin && (
                                    <p className="flex items-start gap-4">
                                        <span className="text-slate-500 mt-1">🔗</span> <a href={data.header.linkedin} className="text-slate-200 hover:text-primary transition-colors">LinkedIn</a>
                                    </p>
                                )}
                                {data.header.github && (
                                    <p className="flex items-start gap-4">
                                        <span className="text-slate-500 mt-1">💻</span> <a href={data.header.github} className="text-slate-200 hover:text-primary transition-colors">GitHub</a>
                                    </p>
                                )}
                                {data.header.leetcode && (
                                    <p className="flex items-start gap-4">
                                        <span className="text-slate-500 mt-1">⌨️</span> <a href={data.header.leetcode} className="text-slate-200 hover:text-primary transition-colors">LeetCode</a>
                                    </p>
                                )}
                                {data.header.portfolio && (
                                    <p className="flex items-start gap-4">
                                        <span className="text-slate-500 mt-1">🌐</span> <a href={data.header.portfolio} className="text-slate-200 hover:text-primary transition-colors">Portfolio</a>
                                    </p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h3 className="text-[9pt] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">Education</h3>
                            <div className="space-y-3">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="group">
                                        <p className="font-black text-slate-100 text-[9.5pt] leading-tight mb-1 uppercase">{edu.degree}</p>
                                        <p className="text-[8.5pt] text-slate-400 font-bold mb-0.5">{edu.institution}</p>
                                        <p className="text-[7.5pt] text-primary font-black uppercase tracking-widest">{edu.duration}</p>
                                        {edu.cgpa && <p className="text-[8pt] text-emerald-500 font-black mt-0.5">GPA: {edu.cgpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 pt-8 pb-8 flex flex-col">
                {/* Header */}
                {data.header && (
                    <header className="mb-4">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-1">{data.header.name}</h1>
                        <div className="flex items-center gap-3">
                            <div className="h-1 w-12 bg-primary/20 rounded-full" />
                        </div>
                    </header>
                )}

                <div className="space-y-3">
                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 border-b border-slate-100 pb-1">
                                Experience
                            </h2>
                            <div className="space-y-3">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[11.5pt] font-black text-slate-900 tracking-tight uppercase leading-none">{exp.role}</h3>
                                            <span className="text-[9pt] font-black text-slate-400 tracking-widest uppercase">{exp.duration}</span>
                                        </div>
                                        <p className="text-[10pt] text-primary font-black uppercase tracking-wider mb-2">{exp.organization}</p>
                                        {exp.bullets && exp.bullets.length > 0 && (
                                            <ul className="space-y-0.5 text-[9.5pt] text-slate-600 font-medium leading-tight">
                                                {exp.bullets.map((bullet, j) => (
                                                    <li key={j} className="flex items-start gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-2" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise / Skills */}
                    {data.skills && data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 border-b border-slate-100 pb-1">
                                Expertise
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {(data.skills.categories || []).map((cat, i) => (
                                    cat.skills && (
                                        <div key={i}>
                                            <p className="text-[9pt] font-black text-slate-400 uppercase tracking-widest mb-1">{cat.category}</p>
                                            <p className="text-[10pt] text-slate-700 font-bold leading-tight">{cat.skills}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 border-b border-slate-100 pb-1">
                                Case Studies
                            </h2>
                            <div className="space-y-3">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="text-[10.5pt] font-black text-slate-900 tracking-tight uppercase">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-primary text-[8pt] font-black uppercase border-b-2 border-primary/10 hover:border-primary transition-all">View →</a>}
                                        </div>
                                        <p className="text-[8.5pt] text-slate-400 font-bold uppercase tracking-widest mb-1">{proj.techStack}</p>
                                        {proj.bullets && proj.bullets.length > 0 && (
                                            <ul className="space-y-0.5 text-[9pt] text-slate-600 font-medium">
                                                {proj.bullets.map((bullet, j) => (
                                                    <li key={j} className="flex items-start gap-3">
                                                        <span className="text-slate-200 mt-1.5 text-[5pt]">■</span>
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {data.achievements && data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 border-b border-slate-100 pb-1">
                                Honors & Awards
                            </h2>
                            <ul className="space-y-1 text-[9pt] text-slate-600 font-medium">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-2" />
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 border-b border-slate-100 pb-1">
                                Certifications
                            </h2>
                            <ul className="space-y-1 text-[9pt] text-slate-600 font-medium">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-2" />
                                        <span>{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

