"use client";

import type { CSSProperties, ReactNode } from "react";

type FloatingProps = {
    children?: ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
    delay?: number;
};

export function Floating({
    children,
    className = "",
    duration = 3,
    distance = 8,
    delay = 0,
}: FloatingProps) {
    const style = {
        animation: `floating ${duration}s ease-in-out ${delay}s infinite`,
        "--floating-distance": `${distance}px`,
    } as CSSProperties;

    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}