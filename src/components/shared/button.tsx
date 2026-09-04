import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "ghost";

type ButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant;
    };

const variantStyles: Record<
    ButtonVariant,
    string
> = {
    primary:
        "bg-lime text-navy hover:bg-yellow",

    secondary:
        "bg-campus-blue text-white hover:bg-navy",

    outline:
        "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white",

    danger:
        "bg-red-600 text-white hover:bg-red-700",

    ghost:
        "bg-transparent text-navy hover:bg-navy/10",
};

export function Button({
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={[
                "inline-flex items-center justify-center",
                "rounded-xl px-5 py-3",
                "text-sm font-bold",
                "transition-colors duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-campus-blue",
                "disabled:pointer-events-none",
                "disabled:opacity-50",
                variantStyles[variant],
                className,
            ].join(" ")}
            {...props}
        />
    );
}