import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-bold text-slate-700 ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-[15px] font-semibold transition-all duration-300",
                        "hover:border-slate-300",
                        "focus:border-primary focus:ring-4 focus:ring-sky-50 outline-none shadow-sm",
                        "disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-slate-400 placeholder:font-normal",
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

Input.displayName = "Input";
