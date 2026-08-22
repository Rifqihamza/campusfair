"use client";

import { useEffect, useId, useRef } from "react";
import {
    Html5Qrcode,
    Html5QrcodeSupportedFormats,
} from "html5-qrcode";

type QrScannerProps = {
    onScan: (qrToken: string) => void;
    disabled?: boolean;
};

export function QrScanner({
    onScan,
    disabled = false,
}: QrScannerProps) {
    const generatedId = useId();
    const containerId = `qr-reader-${generatedId.replace(/:/g, "")}`;

    const containerRef = useRef<HTMLDivElement>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const onScanRef = useRef(onScan);
    const disabledRef = useRef(disabled);

    const lockedRef = useRef(false);
    const unlockTimerRef = useRef<ReturnType<
        typeof setTimeout
    > | null>(null);

    useEffect(() => {
        onScanRef.current = onScan;
    }, [onScan]);

    useEffect(() => {
        disabledRef.current = disabled;
    }, [disabled]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        let mounted = true;
        let scanner: Html5Qrcode | null = null;

        const clearTimer = () => {
            if (unlockTimerRef.current) {
                clearTimeout(unlockTimerRef.current);
                unlockTimerRef.current = null;
            }
        };

        const cleanup = async () => {
            clearTimer();

            const currentScanner = scanner;

            scanner = null;

            if (!currentScanner) {
                return;
            }

            try {
                if (currentScanner.isScanning) {
                    await currentScanner.stop();
                }
            } catch (error) {
                console.warn(
                    "Failed to stop QR scanner:",
                    error,
                );
            }

            try {
                currentScanner.clear();
            } catch (error) {
                console.warn(
                    "Failed to clear QR scanner:",
                    error,
                );
            }

            if (container) {
                container.replaceChildren();
            }

            if (scannerRef.current === currentScanner) {
                scannerRef.current = null;
            }
        };

        const start = async () => {
            /*
             * Bersihkan container terlebih dahulu.
             *
             * Ini penting kalau React development mode
             * melakukan mount/unmount/mount dengan cepat.
             */
            container.replaceChildren();

            const currentScanner = new Html5Qrcode(
                containerId,
                {
                    verbose: false,
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.QR_CODE,
                    ],
                },
            );

            scanner = currentScanner;
            scannerRef.current = currentScanner;

            try {
                await currentScanner.start(
                    {
                        facingMode: "environment",
                    },
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250,
                        },
                    },
                    (decodedText) => {
                        if (!mounted) {
                            return;
                        }

                        if (disabledRef.current) {
                            return;
                        }

                        if (lockedRef.current) {
                            return;
                        }

                        lockedRef.current = true;

                        clearTimer();

                        onScanRef.current(decodedText);
                    },
                    () => {
                        if (!mounted) {
                            return;
                        }

                        /*
                         * Jangan langsung unlock.
                         * Beri kesempatan QR untuk kembali
                         * terbaca di frame berikutnya.
                         */
                        if (!lockedRef.current) {
                            return;
                        }

                        clearTimer();

                        unlockTimerRef.current = setTimeout(() => {
                            lockedRef.current = false;
                            unlockTimerRef.current = null;
                        }, 1000);
                    },
                );

                /*
                 * Kalau component sudah di-unmount ketika
                 * start() selesai, jangan biarkan camera hidup.
                 */
                if (!mounted) {
                    await cleanup();
                }
            } catch (error) {
                if (mounted) {
                    console.error(
                        "Failed to start QR scanner:",
                        error,
                    );
                } else {
                    await cleanup();
                }
            }
        };

        void start();

        return () => {
            mounted = false;
            void cleanup();
        };
    }, [containerId]);

    return (
        <div
            ref={containerRef}
            id={containerId}
            className="overflow-hidden rounded-xl"
        />
    );
}