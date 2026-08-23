"use client"

import Link from "next/link";

interface ButtonSharedProps {
    url: string;
    title: string;
    className: string;
}

export default function SharedButton({ title, url, className }: ButtonSharedProps) {

    const safeUrl = url.startsWith("/") ? url : `/${url}`
    return (
        <Link
            className={`${className ? "rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 cursor-pointer" : className}`}
            href={safeUrl}>
            {title}
        </Link>
    )
}