import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

const COLORS = {
    amber: { primary: "text-amber-900", accent: "text-amber-600", border: "border-amber-100", bg: "bg-amber-50/50", banner: "bg-amber-900" },
};

export const PrimeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const c = COLORS.amber;

    return (
        <div className="bg-white text-slate-800 w-full shadow-none print:shadow-none flex flex-col text-[9.5pt] font-sans flex-1">
            {/* Header - Modern */}
            <header className="border-b-2 border-amber-50">
                <div className="px-10 pt-8 pb-4 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">{data.header.name.split(' ')[0]}</h1>
                        <h1 className={`text-3xl font-light uppercase tracking-tighter leading-none ${c.accent}`}>{data.header.name.split(' ').slice(1).join(' ')}</h1>
                    </div>
                    <div className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-400 space-y-0.5">
                        <div>{data.header.location}</div>
                        <div>{data.header.email}</div>
                        <div>{data.header.phone}</div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <aside className="w-[32%] border-r border-slate-100 px-10 py-6">
                    <div className="space-y-3">
                        {/* Skills - Pills */}
                        <section>
                            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-l-4 border-amber-100 pl-3`}>Skills</h2>
                            <div className="space-y-3">
                                {(data.skills.categories || []).map((cat, i) => (
                                    <div key={i}>
                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${c.accent}`}>{cat.category}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {(cat.skills || "").split(',').filter(s => s.trim()).map((s, j) => (
                                                <span key={j} className={`text-[9px] font-bold uppercase px-3 py-1 rounded-sm ${c.bg} ${c.primary}`}>{s.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        {data.certifications && data.certifications.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-l-4 border-amber-100 pl-3`}>Certifications</h2>
                                <ul className="space-y-2">
                                    {data.certifications.map((cert, i) => (
                                        <li key={i} className="text-xs font-medium text-slate-600 border-l-2 border-slate-100 pl-2">{cert}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 py-6 px-10">
                    <div className="space-y-3">
                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-l-4 border-amber-100 pl-3`}>Experience</h2>
                                <div className="space-y-3">
                                    {data.experience.map((exp, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none mb-1">{exp.role}</h3>
                                                <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{exp.duration}</span>
                                            </div>
                                            <div className={`text-[10pt] font-bold uppercase tracking-wide mb-1 ${c.primary}`}>{exp.organization}</div>
                                            <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-amber-600`}>
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
                                <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-l-4 border-amber-100 pl-3`}>Projects</h2>
                                <div className="space-y-3">
                                    {data.projects.map((proj, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="font-bold text-slate-900 text-[12.5pt] leading-none">{proj.name}</h3>
                                                <span className={`text-[9px] font-bold uppercase ${c.accent}`}>{proj.techStack}</span>
                                            </div>
                                            <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[10pt] leading-tight marker:text-amber-600`}>
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
                                <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-l-4 border-amber-100 pl-3`}>Education</h2>
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
                                <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-black ${c.primary} border-l-4 border-amber-100 pl-3`}>Achievements</h2>
                                <ul className={`list-disc list-outside ml-3 space-y-0.5 text-slate-600 text-[11px] leading-tight marker:text-amber-600`}>
                                    {data.achievements.map((ach, i) => (
                                        <li key={i}>{ach}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
