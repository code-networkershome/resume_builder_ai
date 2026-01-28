"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ScaleWrapper } from "@/components/ui/ScaleWrapper";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ResumeData } from "@/lib/schemas/resume";
import { getTemplate } from "@/lib/templates/registry";
import Link from "next/link";
import { useResume } from "@/lib/context/ResumeContext";
import { templateList } from "@/lib/templates";

const sampleJSON = {
    header: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        portfolio: "https://johndoe.dev",
        leetcode: "https://leetcode.com/johndoe",
        customLinks: [
            { name: "Twitter", url: "https://twitter.com/johndoe" }
        ]
    },
    education: [
        {
            institution: "Stanford University",
            degree: "M.S. in Computer Science",
            duration: "2022 - 2024",
            cgpa: "4.0"
        },
        {
            institution: "UC Berkeley",
            degree: "B.S. in Electrical Engineering",
            duration: "2018 - 2022",
            cgpa: "3.9"
        }
    ],
    experience: [
        {
            organization: "Meta",
            role: "Senior Software Engineer",
            duration: "2024 - Present",
            bullets: [
                "Leading infrastructure optimization for global messaging systems serving 2B+ users",
                "Reduced end-to-end latency by 15% using advanced caching strategies in distributed systems",
                "Mentored 10+ junior engineers and established new CI/CD standards across the platform team"
            ]
        },
        {
            organization: "Google",
            role: "Software Engineering Intern",
            duration: "Summer 2023",
            bullets: [
                "Developed scalable microservices using Node.js and Go for the Cloud Platform team",
                "Implemented real-time monitoring dashboard using React and D3.js",
                "Optimized database queries resulting in 30% faster data retrieval for analytics pipelines"
            ]
        },
        {
            organization: "OpenSource.org",
            role: "Full Stack Contributor",
            duration: "2021 - 2022",
            bullets: [
                "Contributed to core modules of popular UI libraries with focus on accessibility",
                "Fixed 50+ critical bugs and improved documentation for community developers",
                "Implemented automated testing suite reducing regression rates by 25%"
            ]
        }
    ],
    projects: [
        {
            name: "AI Resume Optimization Engine",
            techStack: "Next.js, Python, OpenAI API",
            link: "https://github.com/johndoe/ai-resume",
            bullets: [
                "Built an intelligent parser for complex PDF structures using LLMs",
                "Achieved 95% accuracy in parsing multi-column resume layouts",
                "Implemented real-time feedback loops for user-driven data refinement"
            ]
        },
        {
            name: "Distributed Task Scheduler",
            techStack: "Go, Redis, gRPC",
            link: "https://github.com/johndoe/task-queue",
            bullets: [
                "Engineered a high-throughput task processing system capable of 100k+ ops/sec",
                "Designed fault-tolerant architecture with automatic retry and dead-letter queues",
                "Reduced resource consumption by 40% through efficient memory management"
            ]
        }
    ],
    skills: {
        categories: [
            { category: "Languages", skills: "JavaScript, TypeScript, Python, Go, C++, SQL" },
            { category: "Frontend", skills: "React, Next.js, Vue, Tailwind CSS, Framer Motion" },
            { category: "Backend", skills: "Node.js, Express, Django, FastAPI, GraphQL" },
            { category: "Infrastructure", skills: "AWS, Docker, Kubernetes, Terraform, CI/CD" },
            { category: "Concepts", skills: "Distributed Systems, Microservices, System Design" }
        ]
    },
    achievements: [
        "First Place - International Collegiate Programming Contest (ICPC) Regionals",
        "Recipient of the National Merit Scholarship for Engineering Excellence",
        "Top 1% Contributor to several high-profile Open Source projects",
        "Delivered keynote speech at WebDev Summit 2023 on Reactive Patterns"
    ],
    certifications: [
        "AWS Solutions Architect Professional",
        "Google Professional Cloud Architect",
        "Certified Kubernetes Administrator (CKA)",
        "Meta Front-End Developer Professional Certificate"
    ],
    template: "compact"
};

import { Logo } from "@/components/ui/Logo";

export default function ConvertPage() {
    const router = useRouter();
    const { setFullData } = useResume();
    const [jsonInput, setJsonInput] = useState(JSON.stringify(sampleJSON, null, 2));
    const [resumeData, setResumeData] = useState<ResumeData>(sampleJSON as ResumeData);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("compact");

    // Parse JSON on input change
    useEffect(() => {
        try {
            const parsed = JSON.parse(jsonInput);
            parsed.template = selectedTemplate;
            setResumeData(parsed as ResumeData);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    }, [jsonInput, selectedTemplate]);

    const TemplateComponent = getTemplate(resumeData.template || "simple");

    const handleImportToBuilder = () => {
        setFullData(resumeData);
        // Persist to localStorage as well for insurance
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        router.push("/preview");
    };

    const handleCopyJSON = () => {
        navigator.clipboard.writeText(jsonInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadJSON = () => {
        const blob = new Blob([jsonInput], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoadSample = () => {
        setJsonInput(JSON.stringify(sampleJSON, null, 2));
    };

    return (
        <main className="h-screen flex flex-col bg-white overflow-hidden font-outfit">
            {/* Header - SaaS Style */}
            <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl transition-all">
                <div className="max-w-[1800px] mx-auto px-6 h-[72px] flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <Logo />
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <span className="text-sm font-bold text-primary tracking-wide">JSON EDITOR</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <span className="text-[10px] font-black text-slate-400">TEMPLATE</span>
                            <select
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
                            >
                                {templateList.map((t) => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="h-6 w-px bg-slate-200 mx-2" />

                        <Button variant="outline" size="sm" onClick={handleLoadSample} className="h-10 font-bold rounded-xl px-5 border-slate-200 hover:bg-slate-50 transition-all">
                            Load Sample
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCopyJSON} className="h-10 font-bold rounded-xl px-5 border-slate-200 hover:bg-slate-50 transition-all">
                            {copied ? "✓ Copied" : "Copy JSON"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadJSON} className="h-10 font-bold rounded-xl px-5 border-slate-200 hover:bg-slate-50 transition-all">
                            Download JSON
                        </Button>
                        <Button onClick={handleImportToBuilder} className="h-10 font-bold rounded-xl px-6 bg-primary hover:bg-primary-dark shadow-lg shadow-sky-100 transition-all">
                            Preview & Download →
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content - Split View */}
            <div className="flex-1 flex pt-[72px] overflow-hidden">
                {/* Left Panel - JSON Editor */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-1/2 border-r border-slate-200/60 flex flex-col bg-white"
                >
                    <div className="h-14 px-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                                JSON Input
                            </span>
                        </div>
                        {error && (
                            <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                                ⚠ {error}
                            </span>
                        )}
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="flex-1 p-8 font-mono text-[13px] resize-none focus:outline-none bg-[#0f172a] text-[#38bdf8] selection:bg-primary/30 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700"
                        placeholder="Paste your resume JSON here..."
                        spellCheck={false}
                    />
                </motion.div>

                {/* Right Panel - Live Preview */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-1/2 flex flex-col bg-slate-50/50"
                >
                    <div className="h-14 px-6 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                                Live Preview
                            </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter bg-slate-50 px-3 py-1 rounded-md border border-slate-200/50">
                            Render Engine: <span className="text-primary">{selectedTemplate}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-12 flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
                        {error ? (
                            <div className="text-center text-slate-400 mt-32 max-w-sm">
                                <div className="text-6xl mb-6 grayscale opacity-20">⚠️</div>
                                <h3 className="text-lg font-black text-slate-800 mb-2">Invalid JSON Protocol</h3>
                                <p className="text-sm font-medium leading-relaxed">Fix the syntax errors in the editor to re-establish the live preview stream.</p>
                            </div>
                        ) : (
                            <div className="w-full aspect-[1/1.4142] relative max-w-[794px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-slate-200">
                                <ScaleWrapper targetWidth={794}>
                                    <div className="w-[794px] min-h-[1123px] bg-white rounded-sm overflow-hidden">
                                        <TemplateComponent data={resumeData} />
                                    </div>
                                </ScaleWrapper>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
