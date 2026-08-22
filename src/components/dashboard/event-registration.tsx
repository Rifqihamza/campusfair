"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EventRegistrationProps = {
    eventId: string;
    eventName: string;
};

export function EventRegistration({
    eventId,
    eventName,
}: EventRegistrationProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister() {
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
                setError(result.message ?? "Gagal mendaftar event.");
                return;
            }

            router.refresh();
        } catch {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
                {eventName}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
                Kamu belum terdaftar sebagai peserta event ini.
            </p>

            {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                className="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Mendaftarkan..." : "Daftar ke Campus Fair"}
            </button>
        </section>
    );
}