import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-white hover:bg-primary-dark shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.1)] border-t border-white/10",
            secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
            outline: "border border-primary text-primary hover:bg-primary/5",
            ghost: "bg-transparent hover:bg-slate-50 text-slate-600",
            destructive: "bg-destructive text-white hover:bg-destructive-dark shadow-sm",
        };

        const sizes = {
            sm: "h-9 px-3 text-sm font-semibold",
            md: "h-11 px-6 text-sm font-semibold",
            lg: "h-14 px-8 text-base font-bold tracking-tight",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2 whitespace-nowrap",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
