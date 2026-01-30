"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormWrapper } from "@/components/forms/FormWrapper";
import { HeaderForm } from "@/components/forms/HeaderForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { AchievementsForm } from "@/components/forms/AchievementsForm";
import { CertificationsForm } from "@/components/forms/CertificationsForm";
import { JSONImport } from "@/components/forms/JSONImport";
import { QuickPeek } from "@/components/ui/QuickPeek";
import { useResume } from "@/lib/context/ResumeContext";

const STEPS = ["Header", "Education", "Experience", "Projects", "Skills", "Achievements", "Certifications"];

function BuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { loadEditFromStorage, updateData } = useResume();
    const [currentStep, setCurrentStep] = useState(0);
    const [isImportMode, setIsImportMode] = useState(false);
    const isImportModeRef = useRef(false);
    const shouldRedirectRef = useRef<string | null>(null);
    const hasRedirectedRef = useRef(false);

    useEffect(() => {
        // Prevent multiple redirects
        if (hasRedirectedRef.current) return;
        
        const importIntent = localStorage.getItem("importIntent") === "true" || searchParams.get("import") === "true";
        
        if (importIntent) {
            isImportModeRef.current = true;
            localStorage.removeItem("importIntent"); // Clear after reading
        }
        
        if (searchParams.get("edit") === "true") {
            // Edit mode: load existing resume (it already has template)
            loadEditFromStorage();
        } else {
            // New resume flow: MUST have selected template
            const selectedTemplate = localStorage.getItem("selectedTemplate");
            if (!selectedTemplate) {
                shouldRedirectRef.current = "/templates";
                return;
            }
            // Only update template once when component mounts or template changes
            updateData({ template: selectedTemplate });
        }
    }, [searchParams, router, updateData]);

    // Handle redirect outside of effect
    useEffect(() => {
        if (shouldRedirectRef.current && !hasRedirectedRef.current) {
            hasRedirectedRef.current = true;
            setTimeout(() => {
                try {
                    router.push(shouldRedirectRef.current!);
                } catch (error) {
                    console.error("Navigation error:", error);
                    // Fallback: use window.location if router.push fails
                    window.location.href = shouldRedirectRef.current!;
                }
            }, 500);
            shouldRedirectRef.current = null;
        }
    }, [router]);

    // Separate effect to handle import mode state update
    useEffect(() => {
        if (isImportModeRef.current) {
            // Use a microtask to avoid setState in effect
            Promise.resolve().then(() => {
                setIsImportMode(true);
                isImportModeRef.current = false;
            });
        }
    }, []);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setTimeout(() => {
                try {
                    router.push("/preview");
                } catch (error) {
                    console.error("Navigation error:", error);
                    window.location.href = "/preview";
                }
            }, 100);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleImportSuccess = () => {
        setIsImportMode(false);
        setTimeout(() => {
            try {
                router.push("/preview");
            } catch (error) {
                console.error("Navigation error:", error);
                window.location.href = "/preview";
            }
        }, 100);
    };

    const renderStep = () => {
        if (isImportMode) {
            return <JSONImport onSuccess={handleImportSuccess} onCancel={() => setIsImportMode(false)} />;
        }

        switch (currentStep) {
            case 0: return <HeaderForm onNext={handleNext} />;
            case 1: return <EducationForm onNext={handleNext} onBack={handleBack} />;
            case 2: return <ExperienceForm onNext={handleNext} onBack={handleBack} />;
            case 3: return <ProjectsForm onNext={handleNext} onBack={handleBack} />;
            case 4: return <SkillsForm onNext={handleNext} onBack={handleBack} />;
            case 5: return <AchievementsForm onNext={handleNext} onBack={handleBack} />;
            case 6: return <CertificationsForm onNext={handleNext} onBack={handleBack} />;
            default: return null;
        }
    };

    const getStepTitle = () => {
        if (isImportMode) return "Import Resume JSON";
        return STEPS[currentStep];
    };

    const getStepDescription = () => {
        if (isImportMode) return "Paste your valid resume JSON to populate all fields instantly.";

        switch (currentStep) {
            case 0: return "Start with your basic contact information and links.";
            case 1: return "Tell us about your educational background.";
            case 2: return "List your professional experience and internships.";
            case 3: return "Showcase your best projects and technical expertise.";
            case 4: return "Highlight your technical and interpersonal skills.";
            case 5: return "List your notable achievements and awards.";
            case 6: return "List your professional certifications and licenses.";
            default: return "";
        }
    };

    return (
        <>
            <FormWrapper
                currentStep={currentStep}
                totalSteps={STEPS.length}
                title={getStepTitle()}
                description={getStepDescription()}
                steps={STEPS}
            >
                {renderStep()}
            </FormWrapper>
            {!isImportMode && <QuickPeek />}
        </>
    );
}

export default function BuilderPage() {
    return (
        <main className="min-h-screen">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <BuilderContent />
            </Suspense>
        </main>
    );
}
