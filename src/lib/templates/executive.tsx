import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <div className="bg-white text-slate-800 font-sans leading-snug w-full flex flex-col gap-3 shadow-none print:shadow-none text-[10pt] flex-1">
            {/* Header - Professional Executive Identity */}
            <header className="border-b-2 border-slate-900 px-10 pt-8 pb-4">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase mb-2">
                    {data.header.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9.5pt] font-medium text-slate-600">
                    {data.header.email}
                    {data.header.phone && (
                        <>
                            <span className="text-slate-300">•</span>
                            <span>{data.header.phone}</span>
                        </>
                    )}
                    {data.header.location && (
                        <>
                            <span className="text-slate-300">•</span>
                            <span>{data.header.location}</span>
                        </>
                    )}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[9pt] font-bold uppercase tracking-widest text-primary">
                    {data.header.linkedin && <a href={data.header.linkedin}>LinkedIn</a>}
                    {data.header.github && <a href={data.header.github}>GitHub</a>}
                    {data.header.leetcode && <a href={data.header.leetcode}>LeetCode</a>}
                    {data.header.portfolio && <a href={data.header.portfolio}>Portfolio</a>}
                </div>
            </header>

            <div className="space-y-3 flex-1 px-10 pb-8 mt-1">
                {/* 1. Experience - The Core of Executive Resume */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 pb-1 mb-2">
                            Executive Experience
                        </h2>
                        <div className="space-y-3">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12pt] font-bold text-slate-900 tracking-tight uppercase">
                                            {exp.role}
                                        </h3>
                                        <span className="text-[10pt] font-bold text-slate-500 uppercase tracking-wider">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="text-primary font-bold uppercase tracking-widest text-[9.5pt]">
                                        {exp.organization}
                                    </p>
                                    <ul className="list-disc list-outside ml-4 space-y-1 text-[10pt] text-slate-700 font-medium">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. Key Projects / Strategic Initiatives */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 pb-1 mb-2">
                            Strategic Initiatives
                        </h2>
                        <div className="space-y-3">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[11.5pt] font-bold text-slate-900 tracking-tight uppercase">
                                            {proj.name}
                                        </h3>
                                        {proj.link && (
                                            <a href={proj.link} className="text-[9pt] font-bold text-primary border-b border-primary/20 hover:border-primary transition-all uppercase tracking-widest">
                                                Case Study →
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-slate-500 italic font-bold tracking-wide text-[9.5pt]">
                                        {proj.techStack}
                                    </p>
                                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10pt] text-slate-700 font-medium">
                                        {proj.bullets.map((bullet, j) => (
                                            <li key={j} className="pl-1">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Core Expertise */}
                {data.skills.categories && data.skills.categories.some(cat => cat.skills) && (
                    <section>
                        <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 pb-1 mb-2">
                            Core Expertise
                        </h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                            {(data.skills.categories || []).map((cat, i) => (
                                cat.skills && (
                                    <div key={i} className="text-[9.5pt]">
                                        <span className="font-bold text-slate-900 uppercase tracking-wider mr-2">
                                            {cat.category}:
                                        </span>
                                        <span className="text-slate-600 font-medium">{cat.skills}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Row - Education & Certifications */}
                <div className="grid grid-cols-1 gap-6">
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 pb-1 mb-2">
                                Education
                            </h2>
                            <div className="space-y-3">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="flex justify-between items-baseline">
                                        <div className="space-y-0.5">
                                            <h3 className="text-[11pt] font-bold text-slate-900 uppercase tracking-tight">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-[10pt] text-slate-600 font-bold italic uppercase tracking-wide">
                                                {edu.institution} {edu.cgpa && <span className="text-primary not-italic ml-2">• GPA {edu.cgpa}</span>}
                                            </p>
                                        </div>
                                        <span className="text-[9.5pt] font-bold text-slate-500 uppercase tracking-widest">
                                            {edu.duration}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {(data.certifications.length > 0 || data.achievements.length > 0) && (
                        <div className="grid grid-cols-2 gap-8">
                            {data.certifications.length > 0 && (
                                <section>
                                    <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 pb-1 mb-2">
                                        Certifications
                                    </h2>
                                    <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium list-none">
                                        {data.certifications.map((cert, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-primary font-bold">✓</span>
                                                <span>{cert}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            {data.achievements.length > 0 && (
                                <section>
                                    <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-100 pb-1 mb-2">
                                        Honors
                                    </h2>
                                    <ul className="space-y-1 text-[9.5pt] text-slate-600 font-medium list-none">
                                        {data.achievements.map((ach, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-primary font-bold">★</span>
                                                <span>{ach}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
