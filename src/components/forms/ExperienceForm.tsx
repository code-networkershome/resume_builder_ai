"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { EnhanceButton } from "@/components/ui/EnhanceButton";
import { useResume } from "@/lib/context/ResumeContext";

const FormSchema = z.object({
    experience: z.array(z.object({
        role: z.string().min(1, "Role is required"),
        organization: z.string().min(1, "Organization is required"),
        duration: z.string().min(1, "Duration is required"),
        bullets_text: z.string().optional(),
        bullets: z.array(z.string()).optional(),
    })),
});

interface ExperienceFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            experience: data.experience.map(exp => ({
                ...exp,
                bullets_text: exp.bullets.join("\n")
            })),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "experience",
    });

    // Watch all experience entries for enhance button
    const watchedExperience = useWatch({ control, name: "experience" });


    const onSubmit = (formData: z.infer<typeof FormSchema>) => {

        const transformedExperience = formData.experience.map((exp) => ({
            role: exp.role,
            organization: exp.organization,
            duration: exp.duration,
            bullets: exp.bullets_text ? exp.bullets_text.split("\n").filter((b) => b.trim() !== "").map((b) => b.replace(/^[•\s*-]+/, "").trim()) : []
        }));
        updateData({ experience: transformedExperience });
        onNext();
    };

    const handleEnhanceExperience = (index: number, enhanced: string[]) => {
        setValue(`experience.${index}.bullets_text`, enhanced.join("\n"));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 border border-neutral-200 rounded-xl bg-neutral-50/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Experience Entry #{index + 1}</h3>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => remove(index)}
                                className="h-8 px-3"
                            >
                                Remove
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Role / Title"
                                placeholder="e.g. Software Engineer Intern"
                                error={errors.experience?.[index]?.role?.message}
                                {...register(`experience.${index}.role` as const)}
                            />
                            <Input
                                label="Organization / Company"
                                placeholder="e.g. Google"
                                error={errors.experience?.[index]?.organization?.message}
                                {...register(`experience.${index}.organization` as const)}
                            />
                            <Input
                                label="Duration"
                                placeholder="e.g. June 2023 - Aug 2023"
                                error={errors.experience?.[index]?.duration?.message}
                                {...register(`experience.${index}.duration` as const)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-neutral-700">Bullet Points (Max 10, one per line)</label>
                                <EnhanceButton
                                    type="experience"
                                    content={watchedExperience?.[index]?.bullets_text?.split("\n").filter((b: string) => b.trim()) || []}
                                    context={{
                                        role: watchedExperience?.[index]?.role,
                                        organization: watchedExperience?.[index]?.organization,
                                    }}
                                    onEnhanced={(enhanced) => handleEnhanceExperience(index, enhanced)}
                                />
                            </div>
                            <Textarea
                                placeholder="• Optimized API performance by 40%&#10;• Led a team of 3 developers"
                                error={errors.experience?.[index]?.bullets_text?.message}
                                {...register(`experience.${index}.bullets_text` as const)}
                            />
                            <p className="text-[10px] text-neutral-400">Separate each point with a new line.</p>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-2 hover:bg-neutral-100"
                onClick={() => append({ role: "", organization: "", duration: "", bullets: [], bullets_text: "" })}
            >
                + Add Experience
            </Button>

            {fields.length === 0 && (
                <div className="text-center py-8 text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl">
                    No experience added yet. It&apos;s okay to skip if you&apos;re a first-year student!
                </div>
            )}

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
