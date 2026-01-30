import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-gray-800 font-serif w-full shadow-none print:shadow-none flex flex-col gap-2 text-[10pt] flex-1" style={{ fontFamily: "Georgia, serif" }}>
            {/* Header - Refined Academic Style */}
            <header className="text-center mb-1 border-b-[1px] border-slate-200 px-12 pt-10 pb-4">
                <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{data.header.name}</h1>
                <div className="text-[10pt] text-slate-500 flex justify-center flex-wrap gap-x-5 gap-y-1 items-center italic mb-3">
                    <span>{data.header.location}</span>
                    <span className="text-slate-200">•</span>
                    <span>{data.header.phone}</span>
                    <span className="text-slate-200">•</span>
                    <span>{data.header.email}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[9pt] font-black uppercase tracking-widest text-slate-400">
                    {data.header.linkedin && <a href={data.header.linkedin} className="hover:text-slate-900 transition-colors">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="hover:text-slate-900 transition-colors">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="hover:text-slate-900 transition-colors">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="hover:text-slate-900 transition-colors">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="hover:text-slate-900 transition-colors">{link.name}</a>
                    ))}
                </div>
            </header>

            {/* Main Content - Tightened vertical rhythm */}
            <div className="space-y-4 px-12 pb-10">
                {/* 1. Education - Scholarly Core */}
                <section>
                    <h2 className="text-[10pt] font-black text-slate-900 border-b border-slate-900 pb-1 mb-2 tracking-[0.2em] uppercase">
                        Education
                    </h2>
                    <div className="space-y-3">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <span className="text-[11pt] font-bold text-slate-900">{edu.degree}</span>
                                    <span className="text-[9.5pt] text-slate-500 font-bold italic tracking-tight">{edu.duration}</span>
                                </div>
                                <div className="text-[10.5pt] text-slate-600 font-bold mb-1">{edu.institution}</div>
                                {edu.cgpa && <div className="text-[8.5pt] text-slate-400 font-bold border-l-2 border-slate-100 pl-2 uppercase tracking-tighter">Cumulative GPA: {edu.cgpa}</div>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Research & Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black text-slate-900 border-b border-slate-900 pb-1 mb-2 tracking-[0.2em] uppercase">
                            Research & Professional Experience
                        </h2>
                        <div className="space-y-3">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="text-[11pt] font-bold text-slate-900 uppercase tracking-tight">{exp.role}</span>
                                        <span className="text-[9.5pt] text-slate-500 font-bold italic tracking-tight">{exp.duration}</span>
                                    </div>
                                    <div className="text-[10pt] text-slate-600 font-bold italic mb-2">{exp.organization}</div>
                                    <ul className="space-y-1.5 text-[9.5pt] text-slate-600 list-outside ml-4 list-disc marker:text-slate-300">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Key Projects & Publications */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black text-slate-900 border-b border-slate-900 pb-1 mb-2 tracking-[0.2em] uppercase">
                            Selected Projects & Publications
                        </h2>
                        <div className="space-y-3">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="text-[11pt] font-bold text-slate-900 tracking-tight">{proj.name}</span>
                                        {proj.link && <a href={proj.link} className="text-[8.5pt] font-bold text-slate-400 border-b border-slate-100 pb-0.5 italic">Ref →</a>}
                                    </div>
                                    <div className="text-[9.5pt] text-slate-400 font-bold uppercase tracking-widest mb-2 opacity-80">{proj.techStack}</div>
                                    <ul className="space-y-1.5 text-[9.5pt] text-slate-600 list-outside ml-4 list-disc marker:text-slate-300">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. Technical Proficiencies */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[10pt] font-black text-slate-900 border-b border-slate-900 pb-1 mb-2 tracking-[0.2em] uppercase">
                            Technical Proficiencies
                        </h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-3 font-sans">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <div key={i} className="text-[9.5pt] leading-tight flex gap-3">
                                        <span className="font-bold text-slate-900 uppercase tracking-tighter whitespace-nowrap">{cat.category}:</span>
                                        <span className="text-slate-600 font-medium italic">{cat.skills}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. Honors & Certifications */}
                <div className="grid grid-cols-2 gap-x-12 pt-2">
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black text-slate-900 border-b border-slate-200 pb-1 mb-2 tracking-widest uppercase">Honors & Awards</h2>
                            <ul className="space-y-2 text-[9pt] text-slate-600 font-medium leading-tight">
                                {data.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-4 italic group">
                                        <span className="text-slate-300 shrink-0">•</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black text-slate-900 border-b border-slate-200 pb-1 mb-2 tracking-widest uppercase">Certifications</h2>
                            <ul className="space-y-2 text-[9pt] text-slate-600 font-medium leading-tight">
                                {data.certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="text-slate-300 shrink-0">✓</span>
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
