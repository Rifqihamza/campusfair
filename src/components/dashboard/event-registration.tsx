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
        <section className="rounded-2xl text-center flex flex-col items-center justify-center border-2 border-navy bg-cream p-6 shadow-[6px_6px_0_#0B1F3A]">
            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-campus-blue">
                READY TO JOIN?
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold text-navy">
                {eventName}
            </h2>

            <p className="mt-3 max-w-xl font-medium text-md leading-6 text-navy/80">
                Kamu belum terdaftar sebagai peserta
                event ini. <br /> Yuk, daftar sekarang dan
                jadi bagian dari <b>{eventName}</b>.
            </p>

            {error && (
                <div className="mt-5 rounded-xl border-2 border-red-700/20 bg-red-100 p-3 text-sm font-medium text-red-800">
                    {error}
                </div>
            )}

            <button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                className="w-full mt-5 cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
            >
                {loading
                    ? "Mendaftarkan..."
                    : "Daftar ke Campus Fair →"}
            </button>
        </section>
    );
}