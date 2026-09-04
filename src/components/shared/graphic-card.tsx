import type { HTMLAttributes } from "react";

type GraphicCardProps =
    HTMLAttributes<HTMLDivElement> & {
        accent?: "lime" | "yellow" | "pink" | "cyan";
        rotate?: "-2" | "-1" | "0" | "1" | "2";
    };

const accentStyles = {
    lime: "bg-lime",
    yellow: "bg-yellow",
    pink: "bg-pink",
    cyan: "bg-cyan",
};

const rotationStyles = {
    "-2": "-rotate-2",
    "-1": "-rotate-1",
    "0": "rotate-0",
    "1": "rotate-1",
    "2": "rotate-2",
};

export function GraphicCard({
    accent = "lime",
    rotate = "0",
    className = "",
    children,
    ...props
}: GraphicCardProps) {
    return (
        <div
            className={[
                "relative rounded-2xl",
                "border-2 border-navy",
                "shadow-[6px_6px_0_#0B1F3A]",
                accentStyles[accent],
                rotationStyles[rotate],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}