import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const BoldTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-full flex flex-col shadow-none print:shadow-none font-sans text-[10pt] leading-[1.4] flex-1">
            {/* Header - Balanced & Authoritative */}
            {data.basics && (
                <header className="bg-slate-900 text-white px-[15mm] py-4 mb-2">
                    <h1 className="text-3xl font-black uppercase tracking-tight leading-none mb-3">{data.basics.name}</h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9pt] font-medium text-slate-300">
                        {data.basics.location && <span className="flex items-center gap-2">{data.basics.location}</span>}
                        {data.basics.phone && <span className="flex items-center gap-2">{data.basics.phone}</span>}
                        {data.basics.email && <span className="flex items-center gap-2">{data.basics.email}</span>}
                    </div>
                </header>
            )}

            <div className="px-[15mm] space-y-4 flex-1 pb-4">
                {/* 0. Summary */}
                {data.basics?.summary && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Executive Profile
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <p className="text-[10pt] text-slate-600 font-medium leading-relaxed italic">
                            {data.basics.summary}
                        </p>
                    </section>
                )}

                {/* 1. Professional Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Experience
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11.5pt] font-bold uppercase tracking-tight text-slate-900">{exp.role}</h3>
                                        <span className="text-[9pt] font-black text-primary uppercase tracking-widest">{exp.startDate} — {exp.endDate || 'Present'}</span>
                                    </div>
                                    <p className="text-slate-500 font-bold uppercase text-[9pt] tracking-widest mb-1">{exp.company}</p>
                                    <ul className="space-y-1 text-[10pt] text-slate-600 font-medium leading-tight list-outside ml-4 list-disc marker:text-slate-400">
                                        {(exp.bullets || []).map((bullet, j) => (
                                            <li key={j} className="pl-1 text-justify">
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. Expertise & Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Skills
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="flex flex-wrap gap-2 text-[9.5pt]">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 font-bold rounded uppercase tracking-wider">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Key Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Projects
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="text-[11pt] font-bold uppercase tracking-tight text-slate-900 mb-1">{proj.name}</h3>
                                    <p className="text-[10pt] text-slate-600 font-medium leading-relaxed italic text-justify">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. Academic Background */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Education
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-900 uppercase text-[10pt]">{edu.degree}</h3>
                                        <span className="text-[8.5pt] font-black text-primary uppercase tracking-widest shrink-0 ml-2">{edu.startDate} — {edu.endDate || 'Present'}</span>
                                    </div>
                                    <p className="text-[9.5pt] text-slate-500 font-bold uppercase italic leading-none">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. Honors & Certifications */}
                <div className="grid grid-cols-2 gap-10 pt-2">
                    {data.achievements && data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Awards</h2>
                            <ul className="space-y-1.5 text-[9.5pt] text-slate-600 font-medium leading-tight">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-slate-300 font-bold">•</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Certs</h2>
                            <ul className="space-y-1.5 text-[9.5pt] text-slate-600 font-medium leading-tight">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-slate-300 font-bold">•</span>
                                        <span>{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
