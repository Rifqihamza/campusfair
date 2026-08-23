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
                        resultTimerRef.current =
                            null;
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
                        resultTimerRef.current =
                            null;
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
        <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6">
            <div className="flex w-full max-w-lg flex-col items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Campus Fair Scanner
                    </h1>

                    <p className="mt-2 text-gray-600">
                        {eventName}
                    </p>
                </div>

                <section className="mt-8 w-full overflow-hidden rounded-xl border bg-white p-4 shadow-sm">
                    <QrScanner
                        onScan={handleScan}
                        disabled={isProcessing}
                    />
                </section>

                {isProcessing && !result && (
                    <div className="mt-4 w-full rounded-xl border bg-white p-4 text-center">
                        <p className="font-medium">
                            Memproses QR...
                        </p>
                    </div>
                )}
            </div>

            {/* Result Modal Overlay */}
            {result && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/80 p-4">
                    <section className="relative z-100000 w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8">
                        <div
                            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-5xl font-bold ${result.success
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                                }`}
                        >
                            {result.success
                                ? isCheckIn
                                    ? "✓"
                                    : isCheckOut
                                        ? "↗"
                                        : "✓"
                                : "✕"}
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">
                            {result.success
                                ? isCheckIn
                                    ? "CHECK-IN BERHASIL"
                                    : "CHECK-OUT BERHASIL"
                                : "SCAN GAGAL"}
                        </h2>

                        <p className="mt-3 text-gray-600">
                            {result.message}
                        </p>

                        {result.success &&
                            result.data && (
                                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                                    <p className="text-xl font-semibold">
                                        {result.data.participant.name}
                                    </p>

                                    <p className="mt-2 font-mono text-sm text-gray-500">
                                        {
                                            result.data
                                                .participant
                                                .participantCode
                                        }
                                    </p>
                                </div>
                            )}

                        <p className="mt-6 text-sm text-gray-500">
                            Scanner akan siap kembali
                            dalam beberapa detik...
                        </p>

                        <button
                            type="button"
                            onClick={resetResult}
                            className="mt-4 w-full rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
                        >
                            Scan Lagi
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
}