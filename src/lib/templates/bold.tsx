import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const BoldTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 w-full flex flex-col shadow-none print:shadow-none font-sans text-[10pt] leading-[1.4] flex-1">
            {/* Header - Balanced & Authoritative */}
            <header className="bg-slate-900 text-white px-[15mm] py-4 mb-2">
                <h1 className="text-3xl font-black uppercase tracking-tight leading-none mb-3">{data.header.name}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9pt] font-medium text-slate-300">
                    {data.header.location && <span className="flex items-center gap-2">{data.header.location}</span>}
                    {data.header.phone && <span className="flex items-center gap-2">{data.header.phone}</span>}
                    {data.header.email && <span className="flex items-center gap-2">{data.header.email}</span>}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[8.5pt] font-bold uppercase tracking-[0.15em] mt-3 border-t border-slate-800 pt-2.5">
                    {data.header.linkedin && <a href={data.header.linkedin} className="text-white hover:text-primary transition-colors">LinkedIn</a>}
                    {data.header.github && <a href={data.header.github} className="text-white hover:text-primary transition-colors">GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode} className="text-white hover:text-primary transition-colors">LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio} className="text-white hover:text-primary transition-colors">Portfolio</a>}
                    {data.header.customLinks?.map((link, i) => (
                        <a key={i} href={link.url} className="text-white hover:text-primary transition-colors">{link.name}</a>
                    ))}
                </div>
            </header>

            <div className="px-[15mm] space-y-4 flex-1 pb-4">
                {/* 1. Professional Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Professional Experience
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11.5pt] font-bold uppercase tracking-tight text-slate-900">{exp.role}</h3>
                                        <span className="text-[9pt] font-black text-primary uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-slate-500 font-bold uppercase text-[9pt] tracking-widest mb-1">{exp.organization}</p>
                                    <ul className="space-y-1 text-[10pt] text-slate-600 font-medium leading-tight list-outside ml-4 list-disc">
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

                {/* 2. Expertise & Skills (Refined High-Density Grouping) */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Core Expertise
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <div key={i} className="text-[9.5pt]">
                                        <span className="font-bold text-slate-900 uppercase tracking-wider mr-2">{cat.category}:</span>
                                        <span className="text-slate-600 font-medium">{cat.skills}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Key Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3 flex items-center gap-4">
                            Strategic Projects
                            <div className="h-[1px] bg-slate-100 flex-1" />
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11pt] font-bold uppercase tracking-tight text-slate-900">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-[8.5pt] font-black text-primary uppercase tracking-widest border-b border-primary/20 hover:border-primary transition-all pb-0.5">Reference →</a>}
                                    </div>
                                    <p className="text-slate-500 font-medium italic text-[9.5pt] mb-1">{proj.techStack}</p>
                                    <ul className="space-y-1 text-[10pt] text-slate-600 font-medium leading-tight list-outside ml-4 list-disc">
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

                {/* 4. Academic Background */}
                {data.education.length > 0 && (
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
                                        <span className="text-[8.5pt] font-black text-primary uppercase tracking-widest shrink-0 ml-2">{edu.duration}</span>
                                    </div>
                                    <p className="text-[9.5pt] text-slate-500 font-bold uppercase italic leading-none">{edu.institution}</p>
                                    {edu.cgpa && <div className="text-[8.5pt] font-bold text-emerald-600 mt-1.5 uppercase tracking-tighter">GPA {edu.cgpa}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. Honors & Certifications */}
                <div className="grid grid-cols-2 gap-10">
                    {data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Honors & Awards</h2>
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
                    {data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[9pt] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-1 mb-3">Professional Certs</h2>
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
