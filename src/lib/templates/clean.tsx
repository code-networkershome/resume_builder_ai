import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

const COLORS = {
    slate: { primary: "text-slate-900", accent: "text-slate-500", border: "border-slate-200", bg: "bg-slate-50", banner: "bg-slate-900" },
};

export const CleanTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const c = COLORS.slate;

    return (
        <div className="bg-white text-slate-800 w-full shadow-none print:shadow-none flex flex-col text-[9.5pt] font-sans flex-1">
            {/* Header - Simple */}
            <header className="px-10 pt-8 pb-4 border-b border-slate-100">
                <h1 className={`text-3xl font-bold tracking-tight ${c.primary}`}>{data.header.name}</h1>
                <div className={`mt-1.5 flex flex-wrap gap-4 text-xs ${c.accent}`}>
                    <span>{data.header.location}</span>
                    <span>{data.header.email}</span>
                    <span>{data.header.phone}</span>
                </div>
            </header>

            <div className="px-10 pb-8">
                <div className="space-y-3">
                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className={`text-xs uppercase tracking-widest mb-2 font-black ${c.primary}`}>Experience</h2>
                            <div className="space-y-3">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none mb-1">{exp.role}</h3>
                                            <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{exp.duration}</span>
                                        </div>
                                        <div className={`text-[10pt] font-bold uppercase tracking-wide mb-1 ${c.primary}`}>{exp.organization}</div>
                                        <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-slate-400`}>
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
                            <h2 className={`text-xs uppercase tracking-widest mb-2 font-black ${c.primary}`}>Projects</h2>
                            <div className="space-y-3">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none">{proj.name}</h3>
                                            <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{proj.techStack}</span>
                                        </div>
                                        <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-slate-400`}>
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
                            <h2 className={`text-xs uppercase tracking-widest mb-2 font-black ${c.primary}`}>Education</h2>
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

                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                        {/* Skills - Tags */}
                        <section>
                            <h2 className={`text-xs uppercase tracking-widest mb-2 font-black ${c.primary}`}>Skills</h2>
                            <div className="space-y-3">
                                {(data.skills.categories || []).map((cat, i) => (
                                    <div key={i}>
                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${c.accent}`}>{cat.category}</div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-600">
                                            {(cat.skills || "").split(',').filter(s => s.trim()).map((s, j) => (
                                                <span key={j} className="border-b border-slate-100 pb-0.5">#{s.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Certifications & Achievements */}
                        <div className="space-y-3">
                            {data.certifications && data.certifications.length > 0 && (
                                <section>
                                    <h2 className={`text-xs uppercase tracking-widest mb-2 font-black ${c.primary}`}>Certifications</h2>
                                    <ul className="space-y-2">
                                        {data.certifications.map((cert, i) => (
                                            <li key={i} className="text-xs font-medium text-slate-600 border-l-2 border-slate-100 pl-2">{cert}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            {data.achievements && data.achievements.length > 0 && (
                                <section>
                                    <h2 className={`text-xs uppercase tracking-widest mb-2 font-black ${c.primary}`}>Achievements</h2>
                                    <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[11px] leading-tight marker:text-slate-400`}>
                                        {data.achievements.map((ach, i) => (
                                            <li key={i}>{ach}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
