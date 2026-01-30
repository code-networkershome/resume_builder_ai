import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const TechTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 font-sans leading-[1.3] w-full flex flex-col gap-2 shadow-none print:shadow-none text-[10pt] flex-1">
            {/* Header - Modern & Minimal */}
            <header className="border-b-[1.5pt] border-slate-900 px-10 pt-8 pb-4">
                <div className="flex justify-between items-end mb-2">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">
                        {data.header.name}
                    </h1>
                    <div className="text-right text-[9pt] font-bold text-slate-500 uppercase tracking-wider">
                        {data.header.location}
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9pt] font-medium text-slate-600">
                    <div className="flex items-center gap-1.5 underline decoration-slate-200 underline-offset-4">{data.header.email}</div>
                    <div className="flex items-center gap-1.5">{data.header.phone}</div>
                    <div className="flex flex-wrap gap-x-4">
                        {data.header.github && <a href={data.header.github} className="text-primary font-bold hover:text-indigo-600 transition-colors uppercase tracking-tight">GitHub</a>}
                        {data.header.linkedin && <a href={data.header.linkedin} className="text-primary font-bold hover:text-indigo-600 transition-colors uppercase tracking-tight">LinkedIn</a>}
                        {data.header.leetcode && <a href={data.header.leetcode} className="text-primary font-bold hover:text-indigo-600 transition-colors uppercase tracking-tight">LeetCode</a>}
                        {data.header.portfolio && <a href={data.header.portfolio} className="text-primary font-bold hover:text-indigo-600 transition-colors uppercase tracking-tight">Portfolio</a>}
                    </div>
                </div>
            </header>

            <div className="space-y-3 flex-1 px-10 pb-8 mt-1">
                {/* Skills - Grouped Layout */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 border-l-4 border-slate-100 pl-3">Skills</h2>
                        <div className="space-y-1.5">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <div key={i} className="text-[9.5pt]">
                                        <span className="font-black text-slate-900 uppercase tracking-tight mr-2">{cat.category}:</span>
                                        <span className="text-slate-600 font-medium">{cat.skills}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 border-l-4 border-slate-100 pl-3">Experience</h2>
                        <div className="space-y-2.5">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[11pt] font-black text-slate-900 uppercase tracking-tight">{exp.role}</h3>
                                        <span className="text-slate-400 text-[9pt] font-black uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-primary text-[10pt] font-black uppercase tracking-wide leading-none mb-1.5">{exp.organization}</p>
                                    <ul className="space-y-0.5 text-[10pt] text-slate-600 font-medium leading-tight ml-4 list-disc list-outside">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 border-l-4 border-slate-100 pl-3">Projects</h2>
                        <div className="space-y-2.5">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[11pt] font-black text-slate-900 uppercase tracking-tight">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-primary text-[9pt] font-bold uppercase border-b border-primary/20 hover:border-primary transition-all">Repository →</a>}
                                    </div>
                                    <p className="text-slate-500 text-[9.5pt] font-bold uppercase tracking-wide leading-none italic mb-1">{proj.techStack}</p>
                                    <ul className="space-y-0.5 text-[10pt] text-slate-600 font-medium leading-tight ml-4 list-disc list-outside">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 border-l-4 border-slate-100 pl-3">Education</h2>
                        <div className="space-y-2.5">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="text-[10.5pt] font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                        <p className="text-[9.5pt] text-slate-500 font-bold uppercase mt-0.5">{edu.institution} {edu.cgpa && <span className="text-primary ml-2">• GPA {edu.cgpa}</span>}</p>
                                    </div>
                                    <span className="text-slate-400 text-[9pt] font-black uppercase tracking-widest">{edu.duration}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {/* Achievements */}
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 border-l-4 border-slate-100 pl-3">Accomplishments</h2>
                            <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium leading-tight list-none">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary font-black opacity-40">→</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[9.5pt] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 border-l-4 border-slate-100 pl-3">Certifications</h2>
                            <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium leading-tight list-none">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary font-black opacity-40">✓</span>
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
