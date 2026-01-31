import { z } from "zod";

export const BasicsSchema = z.object({
  name: z.string().nullable().transform(v => v ?? "").default(""),
  email: z.string().nullable().transform(v => v ?? "").default(""), // Removed .email() temporarily to be lenient with empty imports
  phone: z.string().nullable().transform(v => v ?? "").default(""),
  location: z.string().nullable().transform(v => v ?? "").default(""),
  summary: z.string().nullable().transform(v => v ?? "").default(""),
});

export const ExperienceSchema = z.object({
  company: z.string().nullable().transform(v => v ?? "").default(""),
  role: z.string().nullable().transform(v => v ?? "").default(""),
  startDate: z.string().nullable().transform(v => v ?? "").default(""),
  endDate: z.string().nullable().transform(v => v ?? "").default(""),
  bullets: z.array(z.string()).default([]),
});

export const EducationSchema = z.object({
  institution: z.string().nullable().transform(v => v ?? "").default(""),
  degree: z.string().nullable().transform(v => v ?? "").default(""),
  startDate: z.string().nullable().transform(v => v ?? "").default(""),
  endDate: z.string().nullable().transform(v => v ?? "").default(""),
});

export const ProjectSchema = z.object({
  name: z.string().nullable().transform(v => v ?? "").default(""),
  description: z.string().nullable().transform(v => v ?? "").default(""),
});

export const ResumeSchema = z.object({
  basics: BasicsSchema,
  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  skills: z.array(z.string()).default([]),
  achievements: z.array(z.string()).optional().default([]),
  certifications: z.array(z.string()).optional().default([]),
  template: z.string().optional().default("simple"),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
