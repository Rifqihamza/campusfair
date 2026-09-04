import type {
    InputHTMLAttributes,
} from "react";

type InputProps =
    InputHTMLAttributes<HTMLInputElement>;

export function Input({
    className = "",
    ...props
}: InputProps) {
    return (
        <input
            className={[
                "w-full rounded-xl",
                "border-2 border-navy/15",
                "bg-white px-4 py-3",
                "text-sm text-ink",
                "placeholder:text-navy/40",
                "outline-none",
                "transition-colors",
                "focus:border-campus-blue",
                "focus:ring-2",
                "focus:ring-campus-blue/20",
                className,
            ].join(" ")}
            {...props}
        />
    );
}