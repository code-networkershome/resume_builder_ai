import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { EnhanceRequestSchema } from "@/lib/schemas/ai";
import { isRateLimited, rateLimitResponse } from "@/lib/security/rate-limit";

// Type-safe error response helper
const errorResponse = (message: string, details?: string[], status: number = 400) => {
    return NextResponse.json({
        error: message,
        details: details || []
    }, { status });
};

export async function POST(req: NextRequest) {
    try {
        // 1. Check authentication
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return errorResponse("Unauthorized", [], 401);
        }

        // 2. Payload Validation with Zod (Do this BEFORE rate limiting)
        const jsonBody = await req.json();
        const validation = EnhanceRequestSchema.safeParse(jsonBody);

        if (!validation.success) {
            const details = validation.error.issues.map(e => e.message);
            return errorResponse("Invalid request payload", details, 400);
        }

        // 3. Rate Limiting (Check per-user limit)
        const { success: limited, retryAfter } = isRateLimited(user.id, 10, 60000); // 10 req/min
        if (limited) {
            return rateLimitResponse(retryAfter);
        }

        const { type, content, context } = validation.data;

        // Check for API key
        if (!process.env.OPENAI_API_KEY) {
            console.error("CRITICAL: OpenAI API key not configured");
            return errorResponse("Service unavailable (configuration missing).", [], 500);
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        let systemPrompt = `You are an expert resume writer specializing in ATS-optimized resumes. Your task is to enhance resume bullet points to be more impactful and ATS-friendly.

Guidelines:
- Start each bullet with a strong action verb (Developed, Led, Implemented, Optimized, etc.)
- Include quantifiable metrics where possible (percentages, numbers, timeframes)
- Use industry-standard keywords that ATS systems recognize
- Focus on impact and results, not just responsibilities`;

        let userPrompt = "";

        if (type === "experience") {
            systemPrompt += `\n- Format for work experience: Action verb + Task + Result/Impact`;
            userPrompt = `Enhance these work experience bullet points${context?.role ? ` for a ${context.role} role` : ""}${context?.organization ? ` at ${context.organization}` : ""}:

${content.map((bullet, i) => `${i + 1}. ${bullet}`).join("\n")}

Return ONLY the enhanced bullet points, one per line, numbered.`;
        } else if (type === "project") {
            systemPrompt += `\n- Highlight technical implementation details and impact`;
            userPrompt = `Enhance these project bullet points${context?.projectName ? ` for project "${context.projectName}"` : ""}:

${content.map((bullet, i) => `${i + 1}. ${bullet}`).join("\n")}

Return ONLY the enhanced bullet points, one per line, numbered.`;
        } else if (type === "achievement") {
            systemPrompt += `\n- Make achievements specific and measurable`;
            userPrompt = `Enhance this achievement:

${content[0]}

Return ONLY the enhanced achievement, single line.`;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const response = completion.choices[0]?.message?.content || "";

        // Log usage (background task)
        supabase.from("ai_usage").insert({
            user_id: user.id,
            type,
            input_text: JSON.stringify(content),
            output_text: response,
            tokens_used: completion.usage?.total_tokens || 0,
            cost_usd: (completion.usage?.prompt_tokens || 0) * 0.00000015 + (completion.usage?.completion_tokens || 0) * 0.0000006
        }).then(({ error }) => {
            if (error) console.error("AI usage logging failed:", error);
        });

        let enhanced: string[];
        if (type === "achievement") {
            enhanced = [response.trim()];
        } else {
            enhanced = response
                .split("\n")
                .map(line => line.replace(/^\d+\.\s*/, "").trim())
                .filter(line => line.length > 0);
        }

        return NextResponse.json({ enhanced });
    } catch (error: unknown) {
        console.error("Enhance API error:", error);
        return errorResponse("Failed to process enhancement request.", [], 500);
    }
}
