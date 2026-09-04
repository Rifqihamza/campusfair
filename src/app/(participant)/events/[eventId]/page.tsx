import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { EventRegistration } from "@/components/dashboard/event-registration";
import { ParticipantQr } from "@/components/dashboard/participant-qr";

import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

import { formatDate, formatTime } from "@/lib/utils/format-date";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";

type EventDetailPageProps = {
    params: Promise<{
        eventId: string;
    }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { eventId } = await params;

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            isActive: true,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            description: true,
            startAt: true,
            endAt: true,
        },
    });

    if (!event) {
        notFound();
    }

    const session = await auth();

    let eventParticipant = null;

    if (session?.user?.id) {
        const participant = await prisma.participantProfile.findFirst({
            where: {
                userId: session.user.id,
                deletedAt: null,
            },
            select: {
                id: true,
            },
        });

        if (participant) {
            eventParticipant = await prisma.eventParticipant.findFirst({
                where: {
                    eventId: event.id,
                    participantId: participant.id,
                    deletedAt: null,
                },
            });
        }
    }

    const now = new Date();
    const eventFinished = now > event.endAt;
    const sameDay = formatDate(event.startAt) === formatDate(event.endAt);

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-4">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <header className="sticky top-5 z-20 mx-auto w-full max-w-7xl rounded-full bg-navy text-cream shadow-[0_4px_0_rgba(11,31,58,0.25)]">
                <div className="flex items-center justify-between px-4 py-2 sm:px-5">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <Image src="/logo.jpg" alt="Logo IKAMAMIIND 2100" width={50} height={50} priority className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" />

                        <div className="flex flex-col -space-y-2 font-display leading-none tracking-wide">
                            <span className="text-xl sm:text-2xl">IKAMAMIIND</span>
                            <span className="text-2xl sm:text-3xl">2100</span>
                        </div>
                    </Link>

                    <Link
                        href="/events"
                        className="pr-5 font-body text-sm font-bold text-cream transition-colors duration-300 hover:text-lime"
                    >
                        Event
                    </Link>
                </div>
            </header>

            {/* =====================================================
                CONTENT
            ====================================================== */}
            <div className="relative z-10 mx-auto max-w-7xl py-5">
                <div className="mt-4 px-5">
                    <Breadcrumbs
                        items={[
                            { label: "Event", href: "/events" },
                            { label: event.name },
                        ]}
                    />
                </div>
                {/* =================================================
                    EVENT HERO
                ================================================== */}
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-6 py-10 shadow-[0px_8px_0_#B5FF2C] sm:px-10 sm:py-12">
                    <div className="relative z-10 max-w-4xl">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            IKAMAMIIND 2100 | CAMPUS FAIR
                        </p>

                        <h1 className="mt-3 font-display text-6xl leading-[0.8] tracking-tight text-cream md:text-8xl">
                            {event.name}
                        </h1>

                        {event.description && (
                            <p className="mt-2 max-w-2xl font-semibold text-md leading-5 md:leading-6 text-sky sm:text-base">
                                {event.description}
                            </p>
                        )}
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime sm:h-44 sm:w-44" />

                    {/* Decorative Shape */}
                    <div className="absolute -bottom-12 right-4 sm:right-28 h-28 w-36 rotate-12 rounded-2xl bg-sky/30" />

                    {/* Small Circle */}
                    <div className="absolute bottom-12 right-72 hidden h-10 w-10 rounded-full bg-pink lg:block" />
                </section>

                {/* =================================================
                    EVENT INFORMATION
                ================================================== */}
                <section className="mt-7 rounded-3xl border-2 border-navy bg-sky p-5 shadow-[0px_6px_0_#0B1F3A] sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-navy/50">
                                EVENT INFORMATION
                            </p>

                            <h2 className="mt-1 font-display text-3xl leading-none text-navy sm:text-4xl">
                                Waktu Event
                            </h2>
                        </div>

                        <div className="shrink-0 rounded-full bg-lime px-3 py-1 font-body text-xs font-bold text-navy">
                            {eventFinished ? "CLOSED" : "OPEN"}
                        </div>
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
                                {formatDate(event.startAt)} — {formatDate(event.endAt)}
                            </p>
                        </div>
                    )}
                </section>

                {/* =================================================
                    NOT LOGGED IN
                ================================================== */}
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
                                Login terlebih dahulu untuk mendaftarkan diri sebagai peserta event ini.
                            </p>

                            <Link href="/login" className="mt-6 inline-flex items-center rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]">
                                Login →
                            </Link>
                        </div>

                        <div className="absolute -bottom-16 -right-10 h-36 w-36 rounded-full bg-sky/20" />
                    </section>
                )}

                {/* =================================================
                    REGISTRATION
                ================================================== */}
                {session?.user?.id && !eventParticipant && !eventFinished && (
                    <div className="mt-6">
                        <EventRegistration eventId={event.id} eventName={event.name} />
                    </div>
                )}

                {/* =================================================
                    ALREADY REGISTERED
                ================================================== */}
                {eventParticipant && (
                    <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
                        {/* Registration Status */}
                        <section className="rounded-3xl border-2 border-navy bg-sky p-6 shadow-[0px_6px_0_#0B1F3A] ">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                REGISTRATION STATUS
                            </p>

                            <h2 className="mt-2 font-display text-4xl leading-none text-navy">
                                Kamu sudah
                                <br />
                                terdaftar! 🎉
                            </h2>

                            <p className="mt-6 font-body text-md text-navy">
                                Kode peserta kamu:
                            </p>

                            <div className="mt-2 inline-flex rounded-xl bg-navy px-4 py-2">
                                <p className="font-mono text-lg font-bold tracking-wide text-cream">
                                    {eventParticipant.participantCode}
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl border-2 border-navy/10 bg-navy p-7">
                                <p className="font-body text-md font-semibold leading-6 text-white">
                                    Simpan QR code kamu dan tunjukkan kepada panitia saat check-in dan check-out.
                                </p>
                            </div>
                        </section>

                        {/* QR */}
                        <div>
                            <ParticipantQr value={eventParticipant.qrToken} participantCode={eventParticipant.participantCode} />
                        </div>
                    </div>
                )}

                {/* =================================================
                    EVENT FINISHED
                ================================================== */}
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

            {/* =====================================================
                BOTTOM COLOR TRANSITION
            ====================================================== */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}