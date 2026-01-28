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
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-black text-slate-900 tracking-tight">
                            Resume Builder
                        </Link>
                        <span className="text-slate-300">|</span>
                        <span className="text-sm font-semibold text-primary">Data Studio</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {templateList.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <Button variant="outline" size="sm" onClick={handleLoadSample}>
                            Load Sample
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCopyJSON}>
                            {copied ? "✓ Copied" : "Copy JSON"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
                            ⬇ Download JSON
                        </Button>
                        <Button onClick={handleImportToBuilder} className="bg-indigo-600">
                            Preview & Download →
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content - Split View */}
            <div className="flex h-[calc(100vh-60px)]">
                {/* Left Panel - JSON Editor */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-1/2 border-r border-slate-200 flex flex-col"
                >
                    <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            JSON Input
                        </span>
                        {error && (
                            <span className="text-xs text-red-500 font-medium">
                                ⚠ {error}
                            </span>
                        )}
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none bg-slate-900 text-emerald-400"
                        placeholder="Paste your resume JSON here..."
                        spellCheck={false}
                    />
                </motion.div>

                {/* Right Panel - Live Preview */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-1/2 flex flex-col bg-slate-100"
                >
                    <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-sm font-bold text-slate-700">Live Preview</span>
                        <span className="text-xs text-slate-500 ml-2">
                            Template: {selectedTemplate}
                        </span>
                    </div>
                    <div className="flex-1 overflow-auto p-6 flex justify-center">
                        {error ? (
                            <div className="text-center text-slate-500 mt-20">
                                <div className="text-6xl mb-4">⚠️</div>
                                <p className="font-semibold">Invalid JSON</p>
                                <p className="text-sm mt-2">Fix the JSON syntax to see preview</p>
                            </div>
                        ) : (
                            <div className="w-full aspect-[1/1.4142] relative max-w-[794px]">
                                <ScaleWrapper targetWidth={794}>
                                    <div className="w-[794px] min-h-[1123px] bg-white shadow-2xl rounded-sm overflow-hidden">
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
