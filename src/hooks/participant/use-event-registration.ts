"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useEventRegistration(eventId: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function register() {
        if (loading) return;

        setLoading(true);
        setError("");

        const startedAt = Date.now();

        try {
            const response = await fetch("/api/events/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(
                    result.message ?? "Gagal mendaftar event.",
                );
                setLoading(false);
                return;
            }

            // Pastikan loading overlay sempat terlihat.
            const elapsed = Date.now() - startedAt;
            const minimumLoadingTime = 400;

            if (elapsed < minimumLoadingTime) {
                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        minimumLoadingTime - elapsed,
                    ),
                );
            }

            router.push(`/events/${eventId}/ticket`);
        } catch {
            setError("Terjadi kesalahan. Silakan coba lagi.");
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        register,
    };
}