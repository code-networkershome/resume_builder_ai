import React from "react";
import { ResumeData } from "@/lib/schemas/resume";

// Import all template components
import { ATSTemplate } from "./ats-resume";
import { ClassicTemplate } from "./classic";
import { ModernTemplate } from "./modern";
import { ProfessionalTemplate } from "./professional";
import { MinimalTemplate } from "./minimal";
import { CreativeTemplate } from "./creative";
import { TechTemplate } from "./tech";
import { ExecutiveTemplate } from "./executive";
import { AcademicTemplate } from "./academic";
import { CompactTemplate } from "./compact";
import { ElegantTemplate } from "./elegant";
import { BoldTemplate } from "./bold";

import { FlexibleTemplate } from "./flexible";

// Template component type
export type TemplateComponent = React.FC<{ data: ResumeData }>;

// Template registry - maps template IDs to their components
const templateRegistry: Record<string, TemplateComponent> = {
    simple: ATSTemplate,
    classic: ClassicTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    tech: TechTemplate,
    executive: ExecutiveTemplate,
    academic: AcademicTemplate,
    compact: CompactTemplate,
    elegant: ElegantTemplate,
    bold: BoldTemplate,
    // New templates using flexible system
    clean: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "sans", layout: "classic", headerStyle: "simple", sectionStyle: "minimal", skillStyle: "tags", color: "slate" }} />,
    corporate: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "serif", layout: "classic", headerStyle: "banner", sectionStyle: "underline", skillStyle: "list", color: "slate" }} />,
    functional: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "mono", layout: "left-sidebar", headerStyle: "simple", sectionStyle: "side-border", skillStyle: "bubbles", color: "blue", compact: true }} />,
    premium: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "serif", layout: "right-sidebar", headerStyle: "modern", sectionStyle: "underline", skillStyle: "pills", color: "purple" }} />,
    sleek: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "sans", layout: "left-sidebar", headerStyle: "modern", sectionStyle: "minimal", skillStyle: "tags", color: "emerald" }} />,
    standard: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "sans", layout: "classic", headerStyle: "centered", sectionStyle: "underline", skillStyle: "list", color: "slate" }} />,
    basic: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "mono", layout: "classic", headerStyle: "simple", sectionStyle: "simple", skillStyle: "list", color: "slate", compact: true }} />,
    elite: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "serif", layout: "right-sidebar", headerStyle: "banner", sectionStyle: "block", skillStyle: "bubbles", color: "rose" }} />,
    prime: (props) => <FlexibleTemplate {...props} variant={{ fontFamily: "sans", layout: "left-sidebar", headerStyle: "modern", sectionStyle: "side-border", skillStyle: "pills", color: "amber" }} />,
};

// Get template component by ID
export const getTemplate = (id: string): TemplateComponent => {
    return templateRegistry[id] || templateRegistry.simple;
};

// Get all template IDs
export const getTemplateIds = (): string[] => {
    return Object.keys(templateRegistry);
};
