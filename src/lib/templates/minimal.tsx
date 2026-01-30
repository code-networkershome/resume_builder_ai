import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 font-sans leading-tight w-full flex flex-col gap-3 shadow-none print:shadow-none text-[10pt] flex-1">
            {/* Header - Ultra minimal */}
            {data.header && (
                <header className="mb-4 border-b border-slate-100 px-10 pt-8 pb-2">
                    <h1 className="text-3xl font-light text-slate-900 tracking-tight mb-1">{data.header.name || ''}</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9.5pt] text-slate-500 font-medium">
                        {data.header.email && <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300" />{data.header.email}</span>}
                        {data.header.phone && <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300" />{data.header.phone}</span>}
                        {data.header.location && <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300" />{data.header.location}</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[9pt] text-slate-400 font-bold uppercase tracking-widest">
                        {data.header.linkedin && <a href={data.header.linkedin} className="hover:text-primary transition-colors">LinkedIn</a>}
                        {data.header.github && <a href={data.header.github} className="hover:text-primary transition-colors">GitHub</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-primary transition-colors">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-primary transition-colors">Portfolio</a>}
                        {data.header.customLinks?.map((link, i) => (
                            <a key={i} href={link.url} className="hover:text-primary transition-colors">{link.name}</a>
                        ))}
                    </div>
                </header>
            )}

            <div className="space-y-3 flex-1 px-10 pb-8">
                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[8.5pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 border-l-2 border-slate-100 pl-4">Experience</h2>
                        <div className="space-y-3">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11pt] font-semibold text-slate-900 tracking-tight">{exp.role}</h3>
                                        <span className="text-[9pt] text-slate-400 font-medium">{exp.duration}</span>
                                    </div>
                                    <p className="text-[9.5pt] text-slate-500 font-bold mb-1.5 uppercase tracking-wide">{exp.organization}</p>
                                    {exp.bullets && exp.bullets.length > 0 && (
                                        <ul className="space-y-0.5 text-[9.5pt] text-slate-600 font-normal leading-snug">
                                            {exp.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <span className="text-slate-200 mt-2 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
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

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-[8.5pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 border-l-2 border-slate-100 pl-4">Education</h2>
                        <div className="space-y-2.5">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[11pt] font-semibold text-slate-900 tracking-tight">{edu.degree}</h3>
                                        <span className="text-[9pt] text-slate-400 font-medium">{edu.duration}</span>
                                    </div>
                                    <p className="text-[10pt] text-slate-500 font-medium italic">{edu.institution} {edu.cgpa && <span className="text-slate-300 not-italic mx-2">|</span>} {edu.cgpa && <span className="not-italic font-bold text-slate-400">GPA {edu.cgpa}</span>}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[8.5pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 border-l-2 border-slate-100 pl-4">Projects</h2>
                        <div className="space-y-3">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11pt] font-semibold text-slate-900 tracking-tight">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-[8.5pt] text-slate-400 hover:text-primary transition-colors flex items-center gap-1 font-bold italic underline underline-offset-4 decoration-slate-100">View Project →</a>}
                                    </div>
                                    <p className="text-[9.5pt] text-slate-400 font-bold uppercase tracking-widest mb-1.5">{proj.techStack}</p>
                                    {proj.bullets && proj.bullets.length > 0 && (
                                        <ul className="space-y-0.5 text-[9.5pt] text-slate-600 font-normal leading-snug">
                                            {proj.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3 text-slate-600">
                                                    <span className="text-slate-200 mt-2 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
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

                {/* Skills */}
                {data.skills && data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[8.5pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 border-l-2 border-slate-100 pl-4">Capabilities</h2>
                        <div className="text-[9.5pt] text-slate-600 font-medium leading-snug bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                            {(data.skills.categories || []).filter(cat => cat.skills).map((cat, i) => (
                                <div key={i} className="mb-2 last:mb-0">
                                    <span className="font-black text-slate-400 uppercase text-[9pt] tracking-widest mr-4">{cat.category}:</span>
                                    <span>{cat.skills}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {data.achievements && data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-[8.5pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 border-l-2 border-slate-100 pl-4">Achievements</h2>
                        <ul className="space-y-0.5 text-[9.5pt] text-slate-600 font-normal leading-snug">
                            {data.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-slate-200 mt-2 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-[8.5pt] font-black uppercase tracking-[0.3em] text-slate-300 mb-3 border-l-2 border-slate-100 pl-4">Certifications</h2>
                        <ul className="space-y-0.5 text-[9.5pt] text-slate-600 font-normal leading-snug">
                            {data.certifications.map((cert, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-slate-200 mt-2 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                    <span>{cert}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

