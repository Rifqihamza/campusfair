"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export function Reveal({
    children,
    className = "",
    delay = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setVisible(true);
                observer.unobserve(element);
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`campus-reveal ${visible ? "is-visible" : ""
                } ${className}`}
            style={{
                animationDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}