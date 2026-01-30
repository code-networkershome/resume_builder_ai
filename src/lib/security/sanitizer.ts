/**
 * Extremely basic server-side HTML/String sanitizer.
 * It's safer to use a library like 'sanitize-html' or 'isomorphic-dompurify',
 * but since we are constrained to minimal changes and no new dependencies,
 * we focus on stripping dangerous tags and attributes.
 */
export function sanitizeString(str: string): string {
    if (!str) return str;

    // Remove scripts, styles, iframes, etc.
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
        .replace(/on\w+="[^"]*"/gi, "") // Remove 'onmouseover', 'onclick', etc.
        .replace(/on\w+='[^']*'/gi, "")
        .replace(/on\w+=[^\s>]+/gi, "")
        .replace(/javascript:[^"']*/gi, ""); // Remove 'javascript:...' URLs
}

/**
 * Deeply sanitizes a resume data object.
 */
export function sanitizeResumeData(data: unknown): unknown {
    if (typeof data === "string") {
        return sanitizeString(data);
    }

    if (Array.isArray(data)) {
        return data.map(item => sanitizeResumeData(item));
    }

    if (data !== null && typeof data === "object") {
        const sanitized: Record<string, unknown> = {};
        for (const key in data) {
            sanitized[key] = sanitizeResumeData((data as Record<string, unknown>)[key]);
        }
        return sanitized;
    }

    return data;
}
