import Link from "next/link";
import { notFound } from "next/navigation";

import { EventRegistration } from "@/components/participant/event-registration";
import { ParticipantHeader } from "@/components/participant/participant-header";
import { ParticipantHero } from "@/components/participant/participant-hero";
import { ParticipantQr } from "@/components/participant/participant-qr";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

import { auth } from "@/lib/auth/auth";
import { formatDate, formatTime } from "@/lib/utils/format-date";
import { getEventDetail } from "@/services/participant/get-event-detail";
import { Check } from "lucide-react";

type EventDetailPageProps = {
    params: Promise<{
        eventId: string;
    }>;
};

export default async function EventDetailPage({
    params,
}: EventDetailPageProps) {
    const { eventId } = await params;
    const session = await auth();

    const { event, eventParticipant } = await getEventDetail(
        eventId,
        session?.user?.id,
    );

    if (!event) {
        notFound();
    }

    const now = new Date();
    const eventFinished = now > event.endAt;
    const sameDay =
        formatDate(event.startAt) === formatDate(event.endAt);

    return (
        <main className="relative min-h-dvh bg-campus-blue px-4">
            <ParticipantHeader activePage="events" />

            <div className="relative z-10 mx-auto max-w-7xl py-5">
                {/* Breadcrumb */}
                <div className="mt-4 px-5">
                    <Breadcrumbs
                        items={[
                            { label: "Event", href: "/events" },
                            { label: event.name },
                        ]}
                    />
                </div>

                {/* Hero */}
                <ParticipantHero
                    eyebrow="IKAMAMIIND 2100 | CAMPUS FAIR"
                    title={event.name}
                    description={
                        event.description ??
                        "Lihat informasi event dan daftarkan dirimu untuk mengikuti event ini."
                    }
                />

                {/* Event Information */}
                <section className="mt-7 rounded-3xl border-2 border-navy bg-sky p-5 shadow-[0_6px_0_#0B1F3A] sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-navy/50">
                                EVENT INFORMATION
                            </p>

                            <h2 className="mt-1 font-display text-3xl leading-none text-navy sm:text-4xl">
                                Waktu Event
                            </h2>
                        </div>

                        <span className="shrink-0 rounded-full bg-lime px-3 py-1 font-body text-xs font-bold text-navy">
                            {eventFinished ? "CLOSED" : "OPEN"}
                        </span>
                    </div>

                    <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl bg-cream p-5 sm:gap-6 sm:p-6">
                        {/* Start */}
                        <div>
                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-navy/40 sm:text-xs">
                                MULAI
                            </p>

                            <p className="mt-1 font-body text-sm font-semibold text-navy sm:text-base">
                                {formatDate(event.startAt)}
                            </p>

                            <p className="mt-1 font-display text-2xl leading-none text-navy sm:text-3xl">
                                {formatTime(event.startAt)}
                                <span className="ml-1 font-body text-xs font-bold sm:text-sm">
                                    WIB
                                </span>
                            </p>
                        </div>

                        {/* Separator */}
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime font-bold text-navy sm:h-10 sm:w-10">
                            →
                        </div>

                        {/* End */}
                        <div className="text-right">
                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-navy/40 sm:text-xs">
                                SELESAI
                            </p>

                            <p className="mt-1 font-body text-sm font-semibold text-navy sm:text-base">
                                {formatDate(event.endAt)}
                            </p>

                            <p className="mt-1 font-display text-2xl leading-none text-navy sm:text-3xl">
                                {formatTime(event.endAt)}
                                <span className="ml-1 font-body text-xs font-bold sm:text-sm">
                                    WIB
                                </span>
                            </p>
                        </div>
                    </div>

                    {!sameDay && (
                        <div className="mt-3 flex items-center justify-center rounded-xl bg-navy px-4 py-2 text-center">
                            <p className="font-body text-xs font-semibold text-cream/80 sm:text-sm">
                                {formatDate(event.startAt)} —{" "}
                                {formatDate(event.endAt)}
                            </p>
                        </div>
                    )}
                </section>

                {/* Login Required */}
                {!session?.user?.id && (
                    <section className="relative mt-6 overflow-hidden rounded-3xl border-2 border-navy bg-navy p-7 text-cream shadow-[6px_6px_0_#B5FF2C] sm:p-8">
                        <div className="relative z-10">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                WANT TO JOIN?
                            </p>

                            <h2 className="mt-2 font-display text-4xl leading-none sm:text-5xl">
                                JOIN THIS EVENT.
                            </h2>

                            <p className="mt-4 max-w-lg font-body text-sm leading-6 text-sky">
                                Login terlebih dahulu untuk mendaftarkan
                                diri sebagai peserta event ini.
                            </p>

                            <Link
                                href="/login"
                                className="mt-6 inline-flex items-center rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                            >
                                Login →
                            </Link>
                        </div>

                        <div className="absolute -bottom-16 -right-10 h-36 w-36 rounded-full bg-sky/20" />
                    </section>
                )}

                {/* Registration */}
                {session?.user?.id &&
                    !eventParticipant &&
                    !eventFinished && (
                        <div className="mt-6">
                            <EventRegistration
                                eventId={event.id}
                                eventName={event.name}
                            />
                        </div>
                    )}

                {/* Already Registered */}
                {eventParticipant && (
                    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Registration Status */}
                        <div className="relative overflow-hidden rounded-3xl border-2 border-navy bg-sky p-6 shadow-[0_6px_0_#0B1F3A] sm:p-7">
                            {/* Decorative shapes */}
                            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-lime" />
                            <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rotate-12 rounded-2xl bg-pink/80" />

                            <div className="relative z-10 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between gap-8">
                                    <div>
                                        <p className="font-body text-xs font-black uppercase tracking-[0.18em] text-navy/50">
                                            REGISTRATION STATUS
                                        </p>

                                        <h2 className="mt-2 font-display text-4xl leading-[0.9] text-navy sm:text-5xl">
                                            YOU&apos;RE IN! 🎉
                                        </h2>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-lime text-xl shadow-[3px_3px_0_#0B1F3A]">
                                        ✓
                                    </div>
                                </div>

                                {/* Status Banner */}
                                <div className="flex items-center gap-3 rounded-lg border-2 border-navy bg-navy px-4 py-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime font-body text-sm font-black text-navy">
                                        <Check />
                                    </div>

                                    <div>
                                        <p className="font-body text-[10px] font-black uppercase tracking-[0.15em] text-lime">
                                            STATUS
                                        </p>

                                        <p className="font-body text-xl font-bold text-cream">
                                            Kamu sudah terdaftar
                                        </p>
                                    </div>
                                </div>

                                {/* Participant Code */}
                                <div className="rounded-lg border-2 border-navy bg-cream p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-body text-[10px] font-black uppercase tracking-[0.15em] text-navy/50">
                                                NOMOR PESERTA
                                            </p>

                                            <p className="mt-1 font-mono text-xl font-black tracking-wider text-navy">
                                                {eventParticipant.participantCode}
                                            </p>
                                        </div>

                                        <span className="rounded-lg bg-lime px-2.5 py-1 font-body text-[10px] font-black uppercase text-navy">
                                            VERIFIED
                                        </span>
                                    </div>
                                </div>

                                {/* Instruction */}
                                <div className="rounded-lg border-2 border-dashed border-navy/30 bg-sky/60 p-4">
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 shrink-0 text-xl">
                                            📱
                                        </div>

                                        <div>
                                            <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-navy/50">
                                                DON&apos;T FORGET
                                            </p>

                                            <p className="mt-1 font-body text-sm font-semibold leading-5 text-navy/80">
                                                Simpan QR code kamu dan tunjukkan kepada panitia
                                                saat check-in dan check-out.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t-2 border-dashed border-navy/20 pt-5">
                                    <Link
                                        href={`/events/${event.id}/ticket`}
                                        className="flex items-center justify-center rounded-lg border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                                    >
                                        LIHAT & SIMPAN TIKET →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-full flex-1 flex justify-center">
                            <ParticipantQr
                                className="w-full"
                                value={eventParticipant.qrToken}
                                participantCode={eventParticipant.participantCode}
                            />
                        </div>
                    </section>
                )}

                {/* Event Finished */}
                {eventFinished && !eventParticipant && (
                    <section className="mt-6 rounded-3xl border-2 border-navy bg-sky p-7 shadow-[6px_6px_0_#0B1F3A] sm:p-8">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-navy/50">
                            EVENT CLOSED
                        </p>

                        <h2 className="mt-2 font-display text-4xl leading-none text-navy">
                            Event ini sudah
                            <br />
                            selesai.
                        </h2>

                        <p className="mt-4 max-w-lg font-body text-sm leading-6 text-navy/60">
                            Pendaftaran untuk event ini sudah ditutup.
                        </p>
                    </section>
                )}
            </div>

            {/* Bottom Color Transition */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}