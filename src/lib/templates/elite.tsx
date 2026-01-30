import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

const COLORS = {
    rose: { primary: "text-rose-900", accent: "text-rose-600", border: "border-rose-100", bg: "bg-rose-50/50", banner: "bg-rose-900" },
};

export const EliteTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const c = COLORS.rose;

    return (
        <div className="bg-white text-slate-800 w-full shadow-none print:shadow-none flex flex-col text-[9.5pt] font-serif flex-1">
            {/* Header - Banner */}
            <header className={`${c.banner} text-white px-10 py-4 shadow-sm`}>
                <h1 className="text-3xl font-black uppercase tracking-tight mb-1">{data.header.name}</h1>
                <div className="flex flex-wrap gap-4 text-white/80 text-[10px] font-medium">
                    <span>{data.header.location}</span>
                    <span>{data.header.phone}</span>
                    <span>{data.header.email}</span>
                </div>
            </header>

            <div className="flex flex-1 gap-8">
                {/* Main Content */}
                <main className="w-[65%] py-4 pl-10">
                    <div className="space-y-3">
                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-3 font-black text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>Experience</h2>
                                <div className="space-y-3">
                                    {data.experience.map((exp, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none mb-1">{exp.role}</h3>
                                                <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{exp.duration}</span>
                                            </div>
                                            <div className={`text-[10pt] font-bold uppercase tracking-wide mb-1 ${c.primary}`}>{exp.organization}</div>
                                            <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-rose-600`}>
                                                {exp.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-3 font-black text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>Projects</h2>
                                <div className="space-y-3">
                                    {data.projects.map((proj, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none">{proj.name}</h3>
                                                <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{proj.techStack}</span>
                                            </div>
                                            <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-rose-600`}>
                                                {proj.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-3 font-black text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>Education</h2>
                                <div className="space-y-3">
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                                <div className="text-slate-500 text-xs">{edu.degree}</div>
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase ${c.accent}`}>{edu.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.achievements && data.achievements.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-3 font-black text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>Achievements</h2>
                                <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[11px] leading-tight marker:text-rose-600`}>
                                    {data.achievements.map((ach, i) => (
                                        <li key={i}>{ach}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-[30%] border-l border-slate-100 pl-10 pr-10 py-4">
                    <div className="space-y-2">
                        {/* Skills - Bubbles */}
                        <section>
                            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>Skills</h2>
                            <div className="space-y-3">
                                {(data.skills.categories || []).map((cat, i) => (
                                    <div key={i}>
                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${c.accent}`}>{cat.category}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {(cat.skills || "").split(',').filter(s => s.trim()).map((s, j) => (
                                                <span key={j} className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full border border-rose-100 bg-white text-slate-600`}>{s.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        {data.certifications && data.certifications.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black text-white ${c.banner} p-1.5 pl-3 rounded-sm`}>Certifications</h2>
                                <ul className="space-y-1">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i} className="text-xs font-medium text-slate-600 border-l-2 border-slate-100 pl-2">{cert}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};
