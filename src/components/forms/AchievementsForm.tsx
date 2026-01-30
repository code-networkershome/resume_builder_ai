"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EnhanceButton } from "@/components/ui/EnhanceButton";
import { useResume } from "@/lib/context/ResumeContext";

interface AchievementsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const [achievements, setAchievements] = useState<string[]>(data.achievements.length > 0 ? data.achievements : [""]);

    const onSubmit = () => {
        updateData({
            achievements: achievements.filter((a: string) => a.trim() !== ""),
        });
        onNext();
    };

    const handleEnhanceAchievement = (index: number, enhanced: string[]) => {
        if (enhanced.length > 0) {
            const newAchievements = [...achievements];
            newAchievements[index] = enhanced[0];
            setAchievements(newAchievements);
        }
    };

    const addAchievement = () => {
        setAchievements([...achievements, ""]);
    };

    const removeAchievement = (index: number) => {
        const newAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(newAchievements.length > 0 ? newAchievements : [""]);
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 border-b pb-2">Achievements</h3>
                <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="e.g. Secured Global Rank 250 in CodeChef Starters"
                                    value={achievement}
                                    onChange={(e) => {
                                        const newAchievements = [...achievements];
                                        newAchievements[index] = e.target.value;
                                        setAchievements(newAchievements);
                                    }}
                                />
                                <EnhanceButton
                                    type="achievement"
                                    content={[achievement]}
                                    onEnhanced={(enhanced) => handleEnhanceAchievement(index, enhanced)}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeAchievement(index)}
                                    className="shrink-0 h-11 w-11 p-0"
                                >
                                    ×
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addAchievement}
                        className="w-full"
                    >
                        + Add Achievement
                    </Button>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Save & Next</Button>
            </div>
        </form>
    );
};
