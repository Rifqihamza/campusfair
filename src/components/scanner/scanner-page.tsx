"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { QrScanner } from "@/components/scanner/qr-scanner";

type ScannerPageProps = {
    eventName: string;
    scannerToken: string;
};

type AttendanceResult = {
    success: boolean;
    message: string;
    data?: {
        type: "CHECK_IN" | "CHECK_OUT";
        participant: {
            name: string;
            participantCode: string;
        };
        scannedAt: string;
    };
};

export function ScannerPage({
    eventName,
    scannerToken,
}: ScannerPageProps) {
    const [result, setResult] =
        useState<AttendanceResult | null>(null);

    const [isProcessing, setIsProcessing] =
        useState(false);

    const resultTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );

    useEffect(() => {
        return () => {
            if (resultTimerRef.current) {
                clearTimeout(
                    resultTimerRef.current,
                );
            }
        };
    }, []);

    const resetResult = useCallback(() => {
        setResult(null);
        setIsProcessing(false);

        if (resultTimerRef.current) {
            clearTimeout(
                resultTimerRef.current,
            );

            resultTimerRef.current = null;
        }
    }, []);

    const handleScan = useCallback(
        async (qrToken: string) => {
            if (isProcessing) {
                return;
            }

            setIsProcessing(true);
            setResult(null);

            try {
                const response = await fetch(
                    "/api/attendance",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            scannerToken,
                            qrToken,
                        }),
                    },
                );

                const data: AttendanceResult =
                    await response.json();

                setResult(data);

                resultTimerRef.current =
                    setTimeout(() => {
                        setResult(null);
                        setIsProcessing(false);
                        resultTimerRef.current = null;
                    }, 5000);
            } catch (error) {
                console.error(
                    "Attendance request failed:",
                    error,
                );

                setResult({
                    success: false,
                    message:
                        "Tidak dapat terhubung ke server.",
                });

                resultTimerRef.current =
                    setTimeout(() => {
                        setResult(null);
                        setIsProcessing(false);
                        resultTimerRef.current = null;
                    }, 5000);
            }
        },
        [isProcessing, scannerToken],
    );

    const isCheckIn =
        result?.success &&
        result.data?.type === "CHECK_IN";

    const isCheckOut =
        result?.success &&
        result.data?.type === "CHECK_OUT";

    return (
        <main className="min-h-screen bg-cream px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-lg">

                {/* Header */}
                <section className="relative overflow-hidden rounded-3xl bg-campus-blue p-6 text-white shadow-[6px_6px_0_#B7FF2A] sm:p-8">
                    <div className="relative z-10">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            CAMPUS FAIR 2027
                        </p>

                        <h1 className="mt-3 font-display text-5xl leading-[0.82] tracking-tight sm:text-6xl">
                            SCAN
                            <br />
                            HERE.
                        </h1>

                        <div className="mt-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                                EVENT
                            </p>

                            <p className="mt-1 font-heading text-lg font-bold text-white sm:text-xl">
                                {eventName}
                            </p>
                        </div>
                    </div>

                    {/* Decorative */}
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime" />

                    <div className="absolute -bottom-16 right-16 h-32 w-32 rotate-12 rounded-3xl bg-sky/30" />
                </section>

                {/* Scanner */}
                <section className="mt-8 rounded-3xl border-2 border-navy bg-white p-4 shadow-[6px_6px_0_#0B1F3A] sm:p-5">
                    <div className="mb-4 px-1">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-campus-blue">
                            ATTENDANCE SCANNER
                        </p>

                        <h2 className="mt-1 font-heading text-xl font-bold text-navy">
                            Scan QR Peserta
                        </h2>

                        <p className="mt-1 font-body text-sm leading-5 text-navy/50">
                            Arahkan kamera ke QR code
                            peserta untuk melakukan
                            check-in atau check-out.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border-2 border-navy bg-navy p-2">
                        <QrScanner
                            onScan={handleScan}
                            disabled={isProcessing}
                        />
                    </div>

                    {isProcessing && !result && (
                        <div className="mt-4 flex items-center justify-center rounded-xl bg-sky px-4 py-3">
                            <p className="font-body text-sm font-bold text-navy">
                                Memproses QR...
                            </p>
                        </div>
                    )}

                    {!isProcessing && !result && (
                        <div className="mt-4 rounded-xl bg-sky px-4 py-3 text-center">
                            <p className="font-body text-xs font-semibold text-navy/60">
                                Scanner siap digunakan
                            </p>
                        </div>
                    )}
                </section>

                {/* Footer hint */}
                <p className="mt-6 text-center font-body text-xs leading-5 text-navy/40">
                    Pastikan QR code terlihat jelas
                    dan berada di dalam area kamera.
                </p>
            </div>

            {/* Result Modal */}
            {result && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm">
                    <section className="w-full max-w-md overflow-hidden rounded-3xl border-2 border-navy bg-cream shadow-[8px_8px_0_#B7FF2A]">

                        {/* Modal Header */}
                        <div
                            className={[
                                "px-6 py-4 text-center",
                                result.success
                                    ? "bg-campus-blue"
                                    : "bg-navy",
                            ].join(" ")}
                        >
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                {result.success
                                    ? "ATTENDANCE"
                                    : "SCAN ERROR"}
                            </p>
                        </div>

                        <div className="p-6 text-center sm:p-8">

                            {/* Icon */}
                            <div
                                className={[
                                    "mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-navy text-5xl font-bold",
                                    result.success
                                        ? "bg-lime text-navy"
                                        : "bg-red-100 text-red-600",
                                ].join(" ")}
                            >
                                {result.success
                                    ? isCheckIn
                                        ? "✓"
                                        : isCheckOut
                                            ? "↗"
                                            : "✓"
                                    : "✕"}
                            </div>

                            {/* Title */}
                            <h2 className="mt-6 font-display text-4xl leading-none text-navy sm:text-5xl">
                                {result.success
                                    ? isCheckIn
                                        ? "CHECK-IN"
                                        : isCheckOut
                                            ? "CHECK-OUT"
                                            : "BERHASIL"
                                    : "SCAN GAGAL"}
                            </h2>

                            {result.success && (
                                <p className="mt-2 font-body text-sm font-bold uppercase tracking-wider text-campus-blue">
                                    Berhasil
                                </p>
                            )}

                            {/* Message */}
                            <p className="mt-4 font-body text-sm leading-6 text-navy/60">
                                {result.message}
                            </p>

                            {/* Participant */}
                            {result.success &&
                                result.data && (
                                    <div className="mt-6 rounded-2xl border-2 border-navy bg-white p-5">
                                        <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/40">
                                            PESERTA
                                        </p>

                                        <p className="mt-2 font-heading text-xl font-bold text-navy">
                                            {
                                                result
                                                    .data
                                                    .participant
                                                    .name
                                            }
                                        </p>

                                        <div className="mt-3 inline-flex rounded-lg bg-sky px-3 py-1.5">
                                            <p className="font-mono text-sm font-bold text-navy">
                                                {
                                                    result
                                                        .data
                                                        .participant
                                                        .participantCode
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}

                            {/* Instruction */}
                            <p className="mt-6 font-body text-xs text-navy/40">
                                Scanner akan siap kembali
                                dalam beberapa detik...
                            </p>

                            {/* Manual close */}
                            <button
                                type="button"
                                onClick={resetResult}
                                className="mt-4 w-full rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                            >
                                Scan Lagi →
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}