import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { isParticipant } from "@/lib/auth/permission";
import { formatDate, formatTime } from "@/lib/utils/format-date";
import { getDashboardData } from "@/services/participant/get-dashboard-data";
import { ArrowRight } from "lucide-react";

import { ParticipantHero } from "@/components/participant/participant-hero";
import { ParticipantHeader } from "@/components/participant/participant-header";
export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isParticipant(session.user.role)) {
        redirect("/admin");
    }

    const { participant, registrations } = await getDashboardData(
        session.user.id,
    );

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

    return (
        <main className="relative min-h-dvh px-4">
            <ParticipantHeader activePage="dashboard" />
            <div className="relative z-10 mx-auto max-w-7xl py-5">
                <ParticipantHero
                    eyebrow="IKAMAMIIND 2100 | CAMPUS FAIR"
                    title={`HI, ${participant.name.toUpperCase()}!`}
                    description="Selamat datang di dashboard kamu. Di sini kamu bisa melihat event yang kamu ikuti dan mengakses tiket digital kamu."
                />

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
                                            <p className="mt-2 font-medium text-lg leading-5 text-navy/70">
                                                {registration.event.description}
                                            </p>

                                            <div className="mt-3 flex flex-col items-start gap-x-4 gap-y-1.5">
                                                <span className="font-body text-mb text-navy">
                                                    Mulai: <b>{formatDate(registration.event.startAt)}</b>
                                                </span>
                                                <span className="font-body text-mb  text-navy">
                                                    Selesai: <b>{formatDate(registration.event.endAt)}</b>
                                                </span>

                                                <span className="font-body text-navy">
                                                    Pukul: <b>{formatTime(registration.event.startAt)} — {formatTime(registration.event.endAt)} WIB</b>
                                                </span>
                                            </div>

                                            <div className="mt-1 flex flex-row items-center gap-2">
                                                <p className="font-body">
                                                    Participant Code:
                                                </p>
                                                <span className="flex rounded-md bg-navy px-3 py-1 text-sm tracking-wide text-white font-bold w-fit">
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