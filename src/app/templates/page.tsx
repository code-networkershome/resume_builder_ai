"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ScaleWrapper } from "@/components/ui/ScaleWrapper";
import { templateList, sampleResumeData } from "@/lib/templates";
import { getTemplate } from "@/lib/templates/registry";
import { useResume } from "@/lib/context/ResumeContext";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function TemplatesPage() {
    const { setFullData, resetData } = useResume();
    const [selectedCategory, setSelectedCategory] = useState("All Templates");
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
    const router = useRouter();

    const categories = [
        { name: "All Templates", icon: "📁" },
        { name: "Professional", icon: "💼" },
        { name: "Modern", icon: "🎨" },
        { name: "ATS-Friendly", icon: "🤖" },
    ];

    const handleSelectTemplate = (templateId: string) => {
        localStorage.setItem("selectedTemplate", templateId);
        setFullData({ ...sampleResumeData, template: templateId });
        router.push("/builder");
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Step Progress Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/">
                        <Logo />
                    </Link>

                    {/* Progress Steps */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-sky-100">1</div>
                            <span className="font-bold text-slate-800">Select Design</span>
                        </div>
                        <div className="w-8 h-px bg-slate-200" />
                        <div className="flex items-center gap-3 opacity-40">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">2</div>
                            <span className="font-bold text-slate-800">Craft Content</span>
                        </div>
                        <div className="w-8 h-px bg-slate-200" />
                        <div className="flex items-center gap-3 opacity-40">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">3</div>
                            <span className="font-bold text-slate-800">Finalize & Export</span>
                        </div>
                    </div>

                    <div className="w-24" /> {/* Spacer for symmetry */}
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
                {/* Title Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold text-[#2d3748] tracking-tight">Resume templates</h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        Simple to use and ready in minutes resume templates — give it a try for free now!
                        <br />
                        <button className="text-primary hover:underline font-bold mt-2">Choose later</button>
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-bold text-sm tracking-tight ${selectedCategory === cat.name
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {templateList
                        .filter(t => selectedCategory === "All Templates" || t.category.toLowerCase() === selectedCategory.toLowerCase().replace("-friendly", ""))
                        .map((template) => {
                            const ThumbnailTemplateComponent = getTemplate(template.id);
                            return (
                                <motion.div
                                    key={template.id}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                    onMouseLeave={() => setHoveredTemplate(null)}
                                >
                                    <div className={`aspect-[1/1.4142] bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 overflow-hidden relative ${hoveredTemplate === template.id ? "border-primary shadow-2xl shadow-sky-100 -translate-y-2" : "border-slate-50 shadow-slate-200/50"
                                        }`}>
                                        {/* Thumbnail Rendering */}
                                        <div className="absolute inset-0">
                                            <ScaleWrapper targetWidth={794}>
                                                <div className="w-[794px] min-h-[1123px] bg-white shadow-sm overflow-hidden">
                                                    <ThumbnailTemplateComponent data={{ ...sampleResumeData, template: template.id }} />
                                                </div>
                                            </ScaleWrapper>
                                        </div>

                                        {/* Overlay on hover */}
                                        <AnimatePresence>
                                            {hoveredTemplate === template.id && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center p-8 z-20"
                                                >
                                                    <Button
                                                        onClick={() => handleSelectTemplate(template.id)}
                                                        className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl"
                                                    >
                                                        Use This Template
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="text-lg font-bold text-slate-800">{template.name}</h3>
                                        <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">{template.category || "Professional"}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                </div>
            </div>

            {/* Sticky Bottom Bar for Mobile (Optional) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:hidden z-50 w-[90%] lg:w-auto">
                <Button className="w-full h-14 rounded-full shadow-2xl shadow-sky-400/40 text-lg font-black">
                    Next: Enter Details
                </Button>
            </div>
        </main>
    );
}
