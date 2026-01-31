"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useResume } from "@/lib/context/ResumeContext";

const FormSchema = z.object({
    skills_text: z.string().min(1, "At least one skill is required"),
});

interface SkillsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            skills_text: data.skills.join(", "),
        },
    });

    const onSubmit = (formData: z.infer<typeof FormSchema>) => {
        const skillsArray = formData.skills_text
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "");
        updateData({ skills: skillsArray });
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border border-slate-200 rounded-[2rem] bg-slate-50/50 space-y-6">
                <div className="space-y-4">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Technical & Soft Skills</label>
                    <div className="relative">
                        <Textarea
                            className="min-h-[200px] rounded-[1.5rem] p-6 text-lg leading-relaxed shadow-inner"
                            placeholder="e.g. React, TypeScript, Node.js, Python, AWS, Docker, Git, Agile Methodology..."
                            error={errors.skills_text?.message as string}
                            {...register("skills_text")}
                        />
                        <div className="absolute top-4 right-4 text-xs font-black text-slate-300 uppercase tracking-tighter">
                            COMMA SEPARATED
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 p-6 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Live Preview Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-lg uppercase tracking-wider border border-primary/20">
                                {skill}
                            </span>
                        ))}
                        {data.skills.length === 0 && <span className="text-slate-300 text-xs italic">Start typing to see tags...</span>}
                    </div>
                </div>
            </div>

            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] max-w-md mx-auto">
                TIP: MIX TECHNICAL TOOLS WITH CORE COMPETENCIES FOR BEST ATS RESULTS.
            </p>

            <div className="flex justify-between pt-8">
                <Button type="button" variant="ghost" className="h-12 rounded-2xl px-8 font-bold" onClick={onBack}>Back</Button>
                <Button type="submit" className="h-12 rounded-2xl px-12 font-bold shadow-xl shadow-primary/20">Save & Next</Button>
            </div>
        </form>
    );
};
