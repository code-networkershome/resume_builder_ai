"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { EnhanceButton } from "@/components/ui/EnhanceButton";
import { useResume } from "@/lib/context/ResumeContext";

interface ProjectFormData {
    projects: {
        name: string;
        techStack: string;
        link: string;
        bullets: string[];
        bullets_text: string;
    }[];
}

interface ProjectsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormData>({
        defaultValues: {
            projects: data.projects.map(proj => ({
                ...proj,
                bullets_text: proj.bullets.join("\n")
            })),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "projects",
    });

    // Watch all project entries for enhance button
    const watchedProjects = useWatch<ProjectFormData>({ control, name: "projects" });


    const onSubmit = (formData: ProjectFormData) => {

        const transformedProjects = formData.projects.map((proj) => ({
            name: proj.name,
            techStack: proj.techStack,
            link: proj.link,
            bullets: proj.bullets_text ? proj.bullets_text.split("\n").filter((b) => b.trim() !== "").map((b) => b.replace(/^[•\s*-]+/, "").trim()) : []
        }));
        updateData({ projects: transformedProjects });
        onNext();
    };

    const handleEnhanceProject = (index: number, enhanced: string[]) => {
        setValue(`projects.${index}.bullets_text`, enhanced.join("\n"));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 border border-neutral-200 rounded-xl bg-neutral-50/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Project #{index + 1}</h3>
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
                                label="Project Name"
                                placeholder="e.g. E-commerce Platform"
                                error={errors.projects?.[index]?.name?.message}
                                {...register(`projects.${index}.name`)}
                            />
                            <Input
                                label="Tech Stack"
                                placeholder="e.g. Next.js, TypeScript, Tailwild"
                                error={errors.projects?.[index]?.techStack?.message}
                                {...register(`projects.${index}.techStack`)}
                            />
                            <Input
                                label="Project Link (Optional)"
                                placeholder="https://github.com/username/project"
                                error={errors.projects?.[index]?.link?.message}
                                {...register(`projects.${index}.link`)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-neutral-700">Bullet Points (Max 10, one per line)</label>
                                <EnhanceButton
                                    type="project"
                                    content={Array.isArray(watchedProjects) && typeof watchedProjects[index] === 'object' && watchedProjects[index]?.bullets_text?.split("\n").filter((b) => b.trim()) || []}
                                    context={{
                                        projectName: Array.isArray(watchedProjects) && typeof watchedProjects[index] === 'object' ? watchedProjects[index]?.name : "",
                                        techStack: Array.isArray(watchedProjects) && typeof watchedProjects[index] === 'object' ? watchedProjects[index]?.techStack : "",
                                    }}
                                    onEnhanced={(enhanced) => handleEnhanceProject(index, enhanced)}
                                />
                            </div>
                            <Textarea
                                placeholder="• Implemented authentication using NextAuth&#10;• Integrated Stripe payment gateway"
                                error={errors.projects?.[index]?.bullets_text?.message}
                                {...register(`projects.${index}.bullets_text`)}
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
                onClick={() => append({ name: "", techStack: "", link: "", bullets: [], bullets_text: "" })}
            >
                + Add Project
            </Button>

            {fields.length === 0 && (
                <div className="text-center py-8 text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl">
                    <p>No projects added yet.</p>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({ name: "", techStack: "", link: "", bullets: [], bullets_text: "" })}
                    >
                        Add your first project
                    </Button>
                </div>
            )}

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
