"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicsSchema } from "@/lib/schemas/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useResume } from "@/lib/context/ResumeContext";
import { z } from "zod";

interface HeaderFormProps {
    onNext: () => void;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({ onNext }) => {
    const { data, updateData } = useResume();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(BasicsSchema),
        defaultValues: data.basics,
    });


    const onSubmit = (formData: z.infer<typeof BasicsSchema>) => {
        updateData({ basics: formData });
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    error={errors.name?.message as string}
                    {...register("name")}
                />
                <Input
                    label="Email Address"
                    placeholder="e.g. john@example.com"
                    error={errors.email?.message as string}
                    {...register("email")}
                />
                <Input
                    label="Phone Number"
                    placeholder="e.g. +1 234 567 890"
                    error={errors.phone?.message as string}
                    {...register("phone")}
                />
                <Input
                    label="Location"
                    placeholder="e.g. New York, NY"
                    error={errors.location?.message as string}
                    {...register("location")}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Professional Summary</label>
                <textarea
                    className="w-full min-h-[120px] p-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-slate-700"
                    placeholder="e.g. Innovative Software Engineer with a passion for building scalable web applications..."
                    {...register("summary")}
                />
                {errors.summary && <p className="text-xs text-rose-500 font-bold">{errors.summary.message as string}</p>}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="rounded-2xl px-12">Save & Next</Button>
            </div>
        </form>
    );
};
