"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useEventRegistration(eventId: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function register() {
        setLoading(true);
        setError("");

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
                return;
            }

            router.refresh();
        } catch {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        register,
    };
}