"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useResume } from "@/lib/context/ResumeContext";

interface CertificationsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ onNext, onBack }) => {
    const { data, updateData } = useResume();
    const [certifications, setCertifications] = useState<string[]>(data.certifications.length > 0 ? data.certifications : [""]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateData({
            certifications: certifications.filter((c: string) => c.trim() !== "")
        });
        onNext();
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 border-b pb-2">Certifications</h3>
                <div className="space-y-3">
                    {certifications.map((certification, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                placeholder="e.g. AWS Certified Cloud Practitioner"
                                value={certification}
                                onChange={(e) => {
                                    const newCertifications = [...certifications];
                                    newCertifications[index] = e.target.value;
                                    setCertifications(newCertifications);
                                }}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                    const newCertifications = certifications.filter((_, i) => i !== index);
                                    setCertifications(newCertifications);
                                }}
                                className="shrink-0 h-11 w-11 p-0"
                            >
                                ×
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed"
                        onClick={() => setCertifications([...certifications, ""])}
                    >
                        + Add Certification
                    </Button>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                <Button type="submit">Preview Resume</Button>
            </div>
        </form>
    );
};
