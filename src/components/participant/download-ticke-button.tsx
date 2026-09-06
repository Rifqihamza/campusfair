"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { toPng } from "html-to-image";
import { Download, X } from "lucide-react";
import Image from "next/image";

type DownloadTicketButtonProps = {
    ticketRef: React.RefObject<HTMLDivElement | null>;
    fileName: string;
};

export function DownloadTicketButton({
    ticketRef,
    fileName,
}: DownloadTicketButtonProps) {
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    async function handleDownload() {
        const ticket = ticketRef.current;

        if (!ticket || loading) {
            return;
        }

        setLoading(true);

        try {
            const dataUrl = await toPng(ticket, {
                cacheBust: true,
                pixelRatio: 2,
            });

            const isIOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === "MacIntel" &&
                    navigator.maxTouchPoints > 1);

            if (isIOS) {
                setPreviewUrl(dataUrl);
                return;
            }

            const link = document.createElement("a");

            link.download = fileName;
            link.href = dataUrl;

            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Failed to download ticket:", error);

            window.alert(
                "Tiket gagal disimpan. Silakan coba lagi.",
            );
        } finally {
            setLoading(false);
        }
    }

    function closePreview() {
        setPreviewUrl(null);
    }

    useEffect(() => {
        if (previewUrl) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [previewUrl]);

    const previewModal =
        previewUrl &&
            typeof document !== "undefined"
            ? createPortal(
                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-navy/90 p-10">
                    <div className="relative flex max-h-[90vh] w-full max-w-md flex-col shadow-[8px_8px_#b8f23d] rounded-2xl">
                        {/* HEADER */}
                        <div className="flex shrink-0 items-center justify-between border-b-2 border-navy bg-navy px-4 py-3 rounded-t-2xl">
                            <div>
                                <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-lime">
                                    TIKET SIAP
                                </p>

                                <p className="font-body text-sm font-bold text-cream">
                                    Simpan gambar ke perangkat
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closePreview}
                                aria-label="Tutup preview"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-navy bg-lime text-navy transition-transform hover:translate-y-0.5"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* IMAGE PREVIEW */}
                        <div className="min-h-0 overflow-y-auto bg-sky p-4">
                            <div className="flex max-h-90 items-center justify-center p-7 bg-cream rounded-2xl border-2 border-navy">
                                <Image
                                    width={760}
                                    height={720}
                                    src={previewUrl}
                                    alt="Campus Fair Ticket"
                                    className="h-full w-auto max-w-full rounded-2xl object-contain p-4"
                                />
                            </div>
                        </div>

                        {/* INSTRUCTION */}
                        <div className="shrink-0 border-t-2 border-navy bg-sky px-4 py-4 text-center rounded-b-2xl">
                            <p className="font-body text-sm font-bold text-navy">
                                Tekan dan tahan gambar di atas
                            </p>

                            <p className="mt-1 font-body text-xs leading-4 font-semibold text-navy/60">
                                lalu pilih{" "}
                                <span className="font-black">
                                    &quot;Simpan ke Foto&quot;
                                </span>{" "}
                                untuk menyimpan tiket.
                            </p>
                        </div>
                    </div>
                </div>,
                document.body,
            )
            : null;

    return (
        <>
            <button
                type="button"
                onClick={handleDownload}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0_4px_0_#0B1F3A] transition-transform hover:translate-y-0.5 hover:shadow-[0_2px_0_#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Download className="h-4 w-4" />

                {loading
                    ? "Menyiapkan Tiket..."
                    : "Simpan Tiket"}
            </button>

            {previewModal}
        </>
    );
}