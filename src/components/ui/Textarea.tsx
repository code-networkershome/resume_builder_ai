import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-bold text-slate-700 ml-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        "flex min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] font-semibold transition-all duration-300 shadow-sm",
                        "hover:border-slate-300",
                        "focus:border-primary focus:ring-4 focus:ring-sky-50 outline-none",
                        "disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-slate-400 placeholder:font-normal resize-none",
                        error && "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/30",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs font-bold text-destructive pl-1 animate-in fade-in slide-in-from-left-2">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
