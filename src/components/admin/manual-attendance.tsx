"use client";

import { useManualAttendance } from "@/hooks/admin/use-manual-attendance";

type ManualAttendanceProps = {
    eventId: string;
};

export function ManualAttendance({
    eventId,
}: ManualAttendanceProps) {
    const {
        query,
        setQuery,
        participants,
        loading,
        processingId,
        message,
        error,
        handleAttendance,
    } = useManualAttendance(eventId);

    return (
        <section className="rounded-3xl border-2 border-navy bg-cream p-5 shadow-[6px_6px_0_#0B1F3A] sm:p-6">
            <div>
                <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-navy/50">
                    MANUAL ATTENDANCE
                </p>

                <h2 className="mt-1 font-display text-3xl leading-none text-navy sm:text-4xl">
                    Catat Kehadiran
                </h2>

                <p className="mt-2 max-w-2xl font-body text-sm font-semibold text-navy/60">
                    Cari peserta berdasarkan nama, email,
                    atau nomor peserta jika QR Code tidak
                    dapat digunakan.
                </p>
            </div>

            <div className="mt-5">
                <input
                    type="search"
                    value={query}
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                    placeholder="Cari nama, email, atau nomor peserta..."
                    className="w-full rounded-lg border-2 border-navy bg-white px-4 py-3 font-body text-sm font-semibold text-navy outline-none placeholder:text-navy/40 focus:ring-4 focus:ring-lime/50"
                />
            </div>

            {loading && (
                <p className="mt-4 font-body text-sm font-semibold text-navy/60">
                    Mencari peserta...
                </p>
            )}

            {message && (
                <p className="mt-4 rounded-xl border-2 border-navy bg-lime px-4 py-3 font-body text-sm font-bold text-navy">
                    {message}
                </p>
            )}

            {error && (
                <p className="mt-4 rounded-xl border-2 border-navy bg-pink px-4 py-3 font-body text-sm font-bold text-navy">
                    {error}
                </p>
            )}

            {query.trim() && !loading && (
                <div className="mt-5 space-y-3">
                    {participants.length === 0 ? (
                        <p className="rounded-lg text-center border-2 border-navy/20 bg-sky px-4 py-4 font-body text-sm font-semibold text-navy/60">
                            Peserta tidak ditemukan.
                        </p>
                    ) : (
                        participants.map((item) => {
                            const hasCheckIn =
                                item.attendanceLogs.some(
                                    (log) =>
                                        log.type ===
                                        "CHECK_IN",
                                );

                            const hasCheckOut =
                                item.attendanceLogs.some(
                                    (log) =>
                                        log.type ===
                                        "CHECK_OUT",
                                );

                            const isProcessing =
                                processingId === item.id;

                            const status = hasCheckOut
                                ? "SUDAH KELUAR"
                                : hasCheckIn
                                    ? "DI VENUE"
                                    : "BELUM HADIR";

                            const actionType =
                                hasCheckIn && !hasCheckOut
                                    ? "CHECK_OUT"
                                    : "CHECK_IN";

                            return (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-4 rounded-lg border-2 border-navy bg-sky p-6 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <p className="font-display text-2xl leading-none text-navy">
                                            {
                                                item
                                                    .participant
                                                    .name
                                            }
                                        </p>

                                        <p className="mt-1 font-body text-sm font-semibold text-navy/60">
                                            {
                                                item
                                                    .participant
                                                    .user
                                                    .email
                                            }
                                        </p>

                                        <p className="mt-1 font-mono text-xs font-bold text-navy/70">
                                            {
                                                item.participantCode
                                            }
                                        </p>

                                        <p className="mt-2 font-body text-xs font-bold uppercase tracking-wide text-navy/50">
                                            {status}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            hasCheckOut ||
                                            isProcessing
                                        }
                                        onClick={() =>
                                            handleAttendance(
                                                item.id,
                                                actionType,
                                            )
                                        }
                                        className="shrink-0 rounded-lg border-2 border-navy bg-lime px-4 py-3 font-body text-sm font-black text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isProcessing
                                            ? "MENYIMPAN..."
                                            : hasCheckOut
                                                ? "SUDAH CHECK-OUT"
                                                : actionType ===
                                                    "CHECK_OUT"
                                                    ? "CATAT CHECK-OUT"
                                                    : "CATAT CHECK-IN"}
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </section>
    );
}