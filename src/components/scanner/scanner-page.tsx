"use client";

import { useCallback, useState } from "react";

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

                setTimeout(() => {
                    setResult(null);
                    setIsProcessing(false);
                }, 3000);
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

                setTimeout(() => {
                    setResult(null);
                    setIsProcessing(false);
                }, 3000);
            }
        },
        [isProcessing, scannerToken],
    );

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Campus Fair Scanner
                    </h1>

                    <p className="mt-2 text-gray-600">
                        {eventName}
                    </p>
                </div>

                <section className="mt-8 overflow-hidden rounded-xl border bg-white p-4 shadow-sm">
                    <QrScanner
                        onScan={handleScan}
                        disabled={isProcessing}
                    />
                </section>

                {isProcessing && !result && (
                    <div className="mt-4 rounded-xl border bg-white p-4 text-center">
                        <p className="font-medium">
                            Memproses QR...
                        </p>
                    </div>
                )}

                {result && (
                    <section className="mt-4 rounded-xl border bg-white p-6 text-center shadow-sm">
                        <div className="text-4xl">
                            {result.success
                                ? result.data?.type ===
                                    "CHECK_IN"
                                    ? "✓"
                                    : "↗"
                                : "✕"}
                        </div>

                        <h2 className="mt-3 text-xl font-bold">
                            {result.success
                                ? result.data?.type ===
                                    "CHECK_IN"
                                    ? "CHECK-IN BERHASIL"
                                    : "CHECK-OUT BERHASIL"
                                : "SCAN GAGAL"}
                        </h2>

                        <p className="mt-2 text-gray-600">
                            {result.message}
                        </p>

                        {result.success &&
                            result.data && (
                                <div className="mt-4">
                                    <p className="text-lg font-semibold">
                                        {
                                            result.data
                                                .participant
                                                .name
                                        }
                                    </p>

                                    <p className="mt-1 font-mono text-sm text-gray-500">
                                        {
                                            result.data
                                                .participant
                                                .participantCode
                                        }
                                    </p>
                                </div>
                            )}
                    </section>
                )}
            </div>
        </main>
    );
}