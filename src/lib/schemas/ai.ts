import { z } from "zod";

export const EnhanceRequestSchema = z.object({
    type: z.enum(["experience", "project", "achievement"]),
    content: z.array(z.string().min(1)).min(1).max(10),
    context: z.object({
        role: z.string().max(100).optional(),
        organization: z.string().max(100).optional(),
        projectName: z.string().max(100).optional(),
        techStack: z.string().max(200).optional(),
        jobDescription: z.string().max(2000).optional(),
    }).optional(),
});

export type EnhanceRequest = z.infer<typeof EnhanceRequestSchema>;
