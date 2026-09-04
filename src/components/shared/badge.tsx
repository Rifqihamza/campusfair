import type { HTMLAttributes } from "react";

type BadgeVariant =
    | "blue"
    | "lime"
    | "yellow"
    | "pink"
    | "neutral";

type BadgeProps =
    HTMLAttributes<HTMLSpanElement> & {
        variant?: BadgeVariant;
    };

const variantStyles: Record<
    BadgeVariant,
    string
> = {
    blue:
        "bg-campus-blue text-white",

    lime:
        "bg-lime text-navy",

    yellow:
        "bg-yellow text-navy",

    pink:
        "bg-pink text-white",

    neutral:
        "bg-navy/10 text-navy",
};

export function Badge({
    variant = "neutral",
    className = "",
    ...props
}: BadgeProps) {
    return (
        <span
            className={[
                "inline-flex items-center",
                "rounded-full px-3 py-1",
                "text-xs font-bold",
                variantStyles[variant],
                className,
            ].join(" ")}
            {...props}
        />
    );
}