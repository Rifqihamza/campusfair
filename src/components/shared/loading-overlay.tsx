"use client";

import { LoaderCircle } from "lucide-react";

type LoadingOverlayProps = {
    show: boolean;
    message?: string;
};

export function LoadingOverlay({
    show,
    message = "Memproses...",
}: LoadingOverlayProps) {
    if (!show) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label={message}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-navy px-4 backdrop-blur-sm w-full"
        >
            <div className="flex min-w-45 flex-col items-center gap-3 rounded-2xl border-2 border-navy bg-campus-blue px-8 py-6 text-center shadow-[8px_8px_0_#b8f23d]">
                <LoaderCircle className="h-9 w-9 animate-spin text-lime" />

                <p className="font-body text-xl font-bold text-lime">
                    {message}
                </p>
            </div>
        </div>
    );
}