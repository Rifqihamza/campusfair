"use client";

import { ArrowRight, Check } from "lucide-react";
import { QrScanner } from "@/components/scanner/qr-scanner";
import { useAttendanceScan } from "@/hooks/scanner/use-attendance-scan";

type ScannerPageProps = {
    eventName: string;
    scannerToken: string;
};

export function ScannerPage({
    eventName,
    scannerToken,
}: ScannerPageProps) {
    const {
        result,
        isProcessing,
        handleScan,
        resetResult,
    } = useAttendanceScan(scannerToken);

    const isCheckIn =
        result?.success && result.data?.type === "CHECK_IN";

    const isCheckOut =
        result?.success && result.data?.type === "CHECK_OUT";

    return (
        <main className="relative min-h-dvh md:max-h-dvh overflow-hidden p-4 sm:p-6 lg:flex lg:items-center lg:justify-center lg:p-8">
            {/* Texture Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-dvh bg-[url('/texture-background.jpg')] bg-repeat bg-size-[480px_auto] mix-blend-color-burn"
            />

            {/* Mobile top decorations */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 overflow-hidden sm:h-50">
                <div className="absolute -right-10 -top-14 h-32 w-32 rounded-full border-8 border-pink/80" />
                <div className="absolute right-7 top-24 h-3 w-3 rounded-full bg-lime" />
                <div className="absolute left-0 top-34 h-1 w-24 -rotate-6 bg-pink" />

                <div className="absolute right-10 top-27 grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <span
                            key={index}
                            className="h-1.5 w-1.5 rounded-full bg-white/50"
                        />
                    ))}
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 h-100 overflow-hidden md:h-full md:bottom-0">
                <div className="absolute -bottom-10 -left-16 h-40 w-40 md:h-60 md:w-60 rounded-full border-10 border-lime/70" />

                <div className="absolute bottom-14 right-5 h-7 w-18 -rotate-6 bg-pink" />

                <div className="absolute bottom-7 right-22 h-4 w-4 rounded-full bg-navy" />

                <div className="absolute bottom-24 right-7 -rotate-12">
                    <span className="block h-1 w-10 rounded-full bg-white/70" />
                    <span className="ml-3 mt-2 block h-1 w-7 rounded-full bg-white/50" />
                </div>

                <div className="absolute bottom-7 left-1/4 flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                </div>
            </div>

            {/* Main Scanner Container */}
            <div className="relative z-10 mx-auto w-full max-w-2xl lg:max-w-6xl">
                <section className="overflow-hidden rounded-3xl border-2 border-lime bg-navy/60 shadow-[0px_6px_0_#b8f23d] backdrop-blur-xs lg:grid lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Scanner Information */}
                    <div className="p-5 sm:p-7 lg:flex lg:flex-col lg:justify-start lg:p-16">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-body text-xs font-black uppercase tracking-[0.18em] text-sky">
                                    ATTENDANCE SCANNER
                                </p>

                                <h1 className="mt-2 font-display text-4xl uppercase leading-[0.85] text-lime sm:text-5xl lg:text-6xl">
                                    Scan QR Peserta
                                </h1>
                            </div>

                            <div className="w-fit max-w-full rounded-md border-2 border-lime bg-lime px-3 py-1.5">
                                <p className="truncate font-body text-sm font-black text-navy">
                                    {eventName}
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 max-w-xl font-body text-sm font-semibold leading-5 text-sky lg:text-base lg:leading-6">
                            Arahkan kamera ke QR Code peserta untuk
                            mencatat check-in atau check-out secara
                            otomatis.
                        </p>

                        {/* Desktop Operational Info */}
                        <div className="mt-7 hidden border-l-4 border-lime pl-4 lg:block">
                            <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-lime">
                                CARA MENGGUNAKAN
                            </p>

                            <p className="mt-2 max-w-sm font-body text-sm font-semibold leading-5 text-cream">
                                Minta peserta menampilkan QR Code
                                tiketnya di depan kamera laptop atau
                                webcam.
                            </p>

                            <p className="mt-2 max-w-sm font-body text-sm font-semibold leading-5 text-sky">
                                Scan pertama mencatat check-in.
                                Scan berikutnya mencatat check-out.
                            </p>
                        </div>
                    </div>

                    {/* Scanner Camera */}
                    <div className="border-t-2 border-dashed border-lime p-5 lg:border-l-2 lg:border-t-0 lg:px-7 pt-7">
                        <div className="relative overflow-hidden rounded-xl border-2 border-lime pb-6">
                            <QrScanner
                                onScan={handleScan}
                                disabled={isProcessing}
                            />

                            {/* Scanner Status Overlay */}
                            {isProcessing && !result ? (
                                <div className="mt-4 absolute inset-x-0 bottom-0 bg-navy/85 py-4">
                                    <p className="text-center font-body text-sm font-black uppercase tracking-wide text-lime">
                                        Memproses QR...
                                    </p>

                                    <p className="mt-1 px-4 text-center font-body text-xs font-semibold leading-5 text-cream">
                                        Tunggu sebentar, data kehadiran
                                        sedang dicatat.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4 absolute inset-x-0 bottom-0 bg-navy/85 py-4">
                                    <p className="text-center font-body text-sm font-black uppercase tracking-wide text-lime">
                                        Scanner Siap Digunakan
                                    </p>

                                    <p className="mt-1 px-4 text-center font-body text-xs font-semibold leading-5 text-cream">
                                        Arahkan QR peserta ke kamera.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Camera Instruction */}
                        <div className="px-1 py-4">
                            <p className="text-center font-body text-md font-semibold leading-5 text-sky ">
                                Pastikan QR Code terlihat jelas, tidak
                                terpotong, dan berada di dalam area kamera.
                            </p>
                        </div>
                    </div>

                    {/* Mobile Operational Info */}
                    <div className="px-5 pb-5 sm:px-7 lg:hidden">
                        <div className="border-l-4 border-lime pl-3">
                            <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-lime">
                                CARA MENGGUNAKAN
                            </p>

                            <p className="mt-1 font-body text-xs font-semibold leading-5 text-cream">
                                Arahkan QR peserta ke kamera. Scan pertama
                                mencatat check-in, scan berikutnya
                                mencatat check-out.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Attendance Result Modal */}
            {result && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy/80 px-4 py-5">
                    <section className="my-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-navy bg-navy shadow-[0px_8px_0_#b8f23d]">
                        {/* Modal Header */}
                        <div
                            className={
                                result.success
                                    ? "border-b-2 border-lime bg-navy p-4"
                                    : "border-b-2 border-navy bg-sky p-4"
                            }
                        >
                            <p
                                className={
                                    result.success
                                        ? "inline-flex rounded-md bg-lime px-3 py-1 font-body text-xs font-black uppercase tracking-[0.16em] text-navy"
                                        : "inline-flex rounded-md bg-navy px-3 py-1 font-body text-xs font-black uppercase tracking-[0.16em] text-lime"
                                }
                            >
                                {result.success
                                    ? "ATTENDANCE"
                                    : "SCAN ERROR"}
                            </p>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 sm:p-5">
                            {/* Result Summary */}
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div
                                    className={
                                        result.success
                                            ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-navy bg-lime text-navy"
                                            : "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-navy bg-navy text-lime"
                                    }
                                >
                                    {result.success ? (
                                        <Check
                                            className="h-7 w-7"
                                            strokeWidth={3}
                                        />
                                    ) : (
                                        <span className="font-display text-3xl leading-none">
                                            ×
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h2
                                        className={
                                            result.success
                                                ? "font-display text-3xl uppercase leading-none text-lime"
                                                : "font-display text-3xl uppercase leading-none text-sky"
                                        }
                                    >
                                        {isCheckIn
                                            ? "CHECK-IN"
                                            : isCheckOut
                                                ? "CHECK-OUT"
                                                : "SCAN GAGAL"}
                                    </h2>

                                    {result.success ? (
                                        <p className="mt-1 font-body text-sm font-black text-sky">
                                            Berhasil dicatat
                                        </p>
                                    ) : (
                                        <p className="mt-1 font-body text-sm font-black text-sky">
                                            Kehadiran tidak dicatat
                                        </p>
                                    )}

                                    <p
                                        className={
                                            result.success
                                                ? "mt-2 font-body text-sm font-semibold leading-5 text-sky/80"
                                                : "mt-2 font-body text-sm font-semibold leading-5 text-sky"
                                        }
                                    >
                                        {result.message}
                                    </p>
                                </div>
                            </div>

                            {/* Participant Information */}
                            {result.success && result.data && (
                                <div className="mt-5 rounded-xl border-2 border-navy bg-sky p-4 sm:p-5">
                                    <div>
                                        <p className="font-body text-[11px] font-black uppercase tracking-[0.14em] text-navy/80">
                                            PESERTA
                                        </p>

                                        <p className="mt-1 wrap-break-word font-body text-lg font-black text-navy">
                                            {result.data.participant.name}
                                        </p>
                                    </div>

                                    <div className="mt-4 border-t-2 border-dashed border-navy/40 pt-4">
                                        <p className="font-body text-[11px] font-black uppercase tracking-[0.14em] text-navy/80">
                                            KODE PESERTA
                                        </p>

                                        <p className="mt-1 wrap-break-word font-body text-base font-black text-navy">
                                            {
                                                result.data.participant
                                                    .participantCode
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Operational Message */}
                            <p className="mt-4 text-center font-body text-xs font-semibold leading-5 text-sky">
                                {result.success
                                    ? "Scanner akan siap kembali dalam beberapa detik."
                                    : "Periksa QR peserta atau status kehadirannya, lalu coba scan kembali."}
                            </p>

                            {/* Scan Again */}
                            <button
                                type="button"
                                onClick={resetResult}
                                className={
                                    result.success
                                        ? "mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy bg-lime px-4 py-3 font-body text-sm font-black uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5 active:translate-y-0"
                                        : "mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy bg-sky px-4 py-3 font-body text-sm font-black uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5 active:translate-y-0"
                                }
                            >
                                SCAN LAGI

                                <ArrowRight
                                    className="h-4 w-4"
                                    strokeWidth={3}
                                />
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {/* Bottom Gradient Decoration */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}