import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

const COLORS = {
    slate: { primary: "text-slate-900", accent: "text-slate-500", border: "border-slate-200", bg: "bg-slate-50", banner: "bg-slate-900" },
};

export const CorporateTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const c = COLORS.slate;

    return (
        <div className="bg-white text-slate-800 w-full shadow-none print:shadow-none flex flex-col text-[9.5pt] font-serif flex-1">
            {/* Header - Banner */}
            <header className={`${c.banner} text-white px-10 pt-8 pb-4 shadow-sm text-center`}>
                <h1 className="text-3xl font-black uppercase tracking-tight mb-1">{data.header.name}</h1>
                <div className="flex flex-wrap gap-4 text-white/80 text-[10px] font-medium">
                    <span>{data.header.location}</span>
                    <span>{data.header.phone}</span>
                    <span>{data.header.email}</span>
                </div>
            </header>

            <div className="px-10 pb-8">
                <div className="space-y-3">
                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-b ${c.border} pb-1.5`}>Experience</h2>
                            <div className="space-y-3">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none mb-1">{exp.role}</h3>
                                            <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{exp.duration}</span>
                                        </div>
                                        <div className={`text-[10pt] font-bold uppercase tracking-wide mb-1 ${c.primary}`}>{exp.organization}</div>
                                        <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-slate-400 text-slate-600 leading-tight`}>
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
                            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-b ${c.border} pb-1.5`}>Projects</h2>
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
                            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-b ${c.border} pb-1.5`}>Education</h2>
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
                        {/* Skills - List */}
                        <section>
                            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-b ${c.border} pb-1.5`}>Skills</h2>
                            <div className="space-y-3">
                                {(data.skills.categories || []).map((cat, i) => (
                                    <div key={i}>
                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${c.accent}`}>{cat.category}</div>
                                        <div className="text-xs text-slate-600 font-medium leading-tight">{cat.skills}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Certifications & Achievements */}
                        <div className="space-y-3">
                            {data.certifications && data.certifications.length > 0 && (
                                <section>
                                    <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-b ${c.border} pb-1.5`}>Certifications</h2>
                                    <ul className="space-y-2">
                                        {data.certifications.map((cert, i) => (
                                            <li key={i} className="text-xs font-medium text-slate-600 border-l-2 border-slate-100 pl-2">{cert}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            {data.achievements && data.achievements.length > 0 && (
                                <section>
                                    <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-b ${c.border} pb-1.5`}>Achievements</h2>
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
