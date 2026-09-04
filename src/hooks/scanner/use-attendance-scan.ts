"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AttendanceResult = {
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

export function useAttendanceScan(
    scannerToken: string,
) {
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
                    "/api/scanner",
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
                    "Scanner attendance request failed:",
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

    return {
        result,
        isProcessing,
        handleScan,
        resetResult,
    };
}