"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScaleWrapperProps {
    children: React.ReactNode;
    targetWidth: number; // The width of the content to be scaled (e.g., 794 for A4)
    className?: string; // Optional wrapper class
}

export const ScaleWrapper: React.FC<ScaleWrapperProps> = ({
    children,
    targetWidth,
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const calculateScale = () => {
            if (!containerRef.current || !contentRef.current) return;

            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const contentWidth = Math.max(targetWidth, contentRef.current.scrollWidth);

            // Calculate scale: container width / content width
            // We multiply by 0.95 to provide a 5% safety buffer for margins
            const newScale = (containerWidth / contentWidth) * 0.95;
            setScale(newScale);
        };

        const observer = new ResizeObserver(calculateScale);
        observer.observe(containerRef.current);
        observer.observe(contentRef.current);

        // Initial calculation
        calculateScale();

        return () => {
            observer.disconnect();
        };
    }, [targetWidth]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative overflow-hidden ${className}`}
        >
            <div
                ref={contentRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    // Allow container to grow if content is wider than targetWidth
                    minWidth: targetWidth,
                    width: "max-content",
                    transform: `translateX(-50%) scale(${scale})`,
                    transformOrigin: "top center"
                }}
            >
                {children}
            </div>
        </div>
    );
};
