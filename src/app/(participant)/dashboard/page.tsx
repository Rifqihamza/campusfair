import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { isParticipant } from "@/lib/auth/permission";
import { formatDate, formatTime } from "@/lib/utils/format-date";
import { ArrowRight } from "lucide-react";
export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isParticipant(session.user.role)) {
        redirect("/admin");
    }

    const participant = await prisma.participantProfile.findFirst({
        where: {
            userId: session.user.id,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
        },
    });

    if (!participant) {
        return (
            <main className="min-h-dvh bg-campus-blue">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <section className="rounded-3xl border-2 border-navy bg-sky p-8 shadow-[6px_6px_0_#0B1F3A]">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-navy/60">
                            CAMPUS FAIR 2027
                        </p>

                        <h1 className="mt-2 font-display text-4xl text-navy">
                            DATA PESERTA TIDAK DITEMUKAN
                        </h1>
                    </section>
                </div>
            </main>
        );
    }

    const registrations = await prisma.eventParticipant.findMany({
        where: {
            participantId: participant.id,
            deletedAt: null,
            event: {
                deletedAt: null,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            event: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    startAt: true,
                    endAt: true,
                    isActive: true,
                },
            },
        },
    });

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-4">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <header className="sticky top-5 z-20 mx-auto w-full max-w-7xl rounded-full bg-navy text-cream shadow-[0_4px_0_rgba(11,31,58,0.25)]">
                <div className="flex items-center justify-between rounded-full bg-navy px-4 py-2 sm:px-5">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <Image
                            src="/logo.jpg"
                            alt="Logo IKAMAMIIND 2100"
                            width={50}
                            height={50}
                            priority
                            className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                        />

                        <div className="flex flex-col -space-y-2 font-display leading-none tracking-wide">
                            <span className="text-xl sm:text-2xl">IKAMAMIIND</span>
                            <span className="text-2xl sm:text-3xl">2100</span>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link
                            href="/events"
                            className="font-body text-sm font-bold text-cream transition-colors hover:text-lime px-4 py-2"
                        >
                            Event
                        </Link>

                        <LogoutButton className="border-none bg-red-500 font-body text-sm font-bold text-white transition-colors hover:bg-red-400 hover:text-white" />
                    </nav>
                </div>
            </header>

            {/* =====================================================
                CONTENT
            ====================================================== */}
            <div className="relative z-10 mx-auto max-w-7xl py-5">

                {/* =================================================
                    WELCOME HERO
                ================================================== */}
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-6 py-10 shadow-[0px_8px_0_#B5FF2C] sm:px-10 sm:py-12">
                    <div className="relative z-10 max-w-4xl">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            IKAMAMIIND 2100 | CAMPUS FAIR
                        </p>

                        <h1 className="mt-4 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl md:text-7xl">
                            HI, {participant.name.toUpperCase()}!
                        </h1>

                        <p className="mt-2 max-w-2xl font-semibold text-md leading-5 md:leading-6 text-sky sm:text-base">
                            Selamat datang di dashboard kamu. Di sini kamu bisa melihat event yang kamu ikuti dan mengakses tiket digital kamu.
                        </p>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime sm:h-44 sm:w-44" />

                    {/* Decorative Shape */}
                    <div className="absolute -bottom-12 right-4 sm:right-28 h-28 w-36 rotate-12 rounded-2xl bg-sky/30" />

                    {/* Small Circle */}
                    <div className="absolute bottom-12 right-72 hidden h-10 w-10 rounded-full bg-pink lg:block" />
                </section>

                {/* =================================================
                    EVENTS HEADER
                ================================================== */}
                <section className="mt-12">
                    <div className="text-center md:text-left">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            YOUR EVENTS
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Event Saya
                        </h2>
                    </div>

                    {/* =================================================
                        EMPTY STATE
                    ================================================== */}
                    {registrations.length === 0 ? (
                        <section className="mt-6 relative overflow-hidden rounded-3xl border-2 text-center border-navy bg-sky p-7 shadow-[0px_6px_0_#0B1F3A]">

                            {/* Decorative */}
                            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-lime sm:h-36 sm:w-36" />
                            <div className="absolute left-20 top-6 h-4 w-4 rounded-full bg-navy/30" />
                            <div className="absolute bottom-5 right-8 h-14 w-14 rotate-12 rounded-xl border-2 border-navy/20 bg-navy/10 sm:right-12" />
                            <div className="absolute -bottom-8 right-20 h-20 w-20 rounded-full border-[6px] border-navy/10 sm:right-28" />
                            <p className="font-body text-lg font-semibold leading-6 text-navy">
                                Kamu belum terdaftar di event mana pun.
                            </p>

                            <Link
                                href="/events"
                                className="w-full mt-5 cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                            >
                                Cari Event →
                            </Link>
                        </section>
                    ) : (
                        /* =================================================
                            EVENT LIST
                        ================================================== */
                        <div className="mt-6 space-y-4">
                            {registrations.map((registration) => (
                                <section
                                    key={registration.id}
                                    className="group relative overflow-hidden rounded-2xl border-2 border-navy bg-sky px-6 py-6 shadow-[0px_6px_0_#0B1F3A] sm:px-6"
                                >
                                    <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                        {/* Event Info */}
                                        <div className="min-w-0">
                                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
                                                Registered Event
                                            </p>

                                            <h3 className="mt-1 font-display text-5xl leading-none text-navy">
                                                {registration.event.name}
                                            </h3>
                                            <p className="mt-2 font-medium text-sm leading-5 text-navy/70">
                                                {registration.event.description}
                                            </p>

                                            <div className="mt-3 flex flex-col items-start gap-x-4 gap-y-1.5">
                                                <span className="font-body text-sm font-semibold text-navy">
                                                    {formatDate(registration.event.startAt)}
                                                    {formatDate(registration.event.startAt) !== formatDate(registration.event.endAt) && (
                                                        <> — {formatDate(registration.event.endAt)}</>
                                                    )}
                                                </span>

                                                <span className="font-body text-navy">
                                                    {formatTime(registration.event.startAt)} — {formatTime(registration.event.endAt)} WIB
                                                </span>
                                            </div>

                                            <div className="mt-3 inline-flex rounded-md bg-navy px-3 py-1.5">
                                                <span className="font-mono text-xs font-bold tracking-wide text-cream">
                                                    {registration.participantCode}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="flex w-full flex-col gap-4 sm:w-auto">
                                            <Link
                                                href={`/events/${registration.event.id}/ticket`}
                                                className="inline-flex items-center rounded-lg border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                                            >
                                                Lihat Tiket QR
                                                <ArrowRight size={14} className="ml-2" />
                                            </Link>

                                            <Link
                                                href={`/events/${registration.event.id}`}
                                                className="inline-flex items-center rounded-lg border-2 border-navy bg-white px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                                            >
                                                Lihat Detail
                                                <ArrowRight size={14} className="ml-2" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Decorative */}
                                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime sm:h-32 sm:w-32" />

                                    <div className="absolute right-20 top-4 h-3 w-3 rounded-full bg-navy/30" />

                                    <div className="absolute -bottom-7 right-8 h-20 w-20 rotate-12 rounded-2xl border-2 border-navy/15 bg-navy/10 transition-transform duration-500 group-hover:rotate-6" />

                                    <div className="absolute bottom-4 right-32 h-1.5 w-10 -rotate-12 rounded-full bg-navy/20" />

                                    <div className="absolute bottom-8 right-28 h-1.5 w-5 rotate-12 rounded-full bg-navy/20" />
                                </section>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* =====================================================
                BOTTOM COLOR TRANSITION
            ====================================================== */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}