import Link from "next/link";

import { ParticipantHeader } from "@/components/participant/participant-header";
import { ParticipantHero } from "@/components/participant/participant-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { formatDate, formatTime } from "@/lib/utils/format-date";
import { getEvents } from "@/services/participant/get-events";
export const dynamic = "force-dynamic"
export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-4">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <ParticipantHeader activePage="events" />

            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}
            <div className="relative z-10 mx-auto max-w-7xl py-5">
                <div className="mt-4 px-5">
                    <Breadcrumbs items={[{ label: "Event" }]} />
                </div>

                {/* =================================================
                    PAGE HERO
                ================================================== */}
                <ParticipantHero
                    eyebrow="IKAMAMIIND 2100 | CAMPUS FAIR"
                    title={
                        <>
                            FIND YOUR
                            <br />
                            EVENT.
                        </>
                    }
                    description="Pilih event yang ingin kamu ikuti, lalu daftar untuk mendapatkan tiket digital kamu."
                />

                {/* =================================================
                    AVAILABLE EVENTS
                ================================================== */}
                {events.length === 0 ? (
                    <section className="mt-12 rounded-3xl border-2 border-navy bg-sky p-8 shadow-[6px_6px_0_#0B1F3A]">
                        <p className="font-body text-sm text-navy/70">
                            Belum ada event yang tersedia.
                        </p>
                    </section>
                ) : (
                    <section className="mt-12">
                        {/* Section Heading */}
                        <div className="text-center md:text-left">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                AVAILABLE EVENTS
                            </p>

                            <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                                Pilih Event untuk Daftar
                            </h2>
                        </div>

                        {/* Event Grid */}
                        <div className="mt-6 space-y-4">
                            {events.map((event) => (
                                <section
                                    key={event.id}
                                    className="group relative overflow-hidden rounded-2xl border-2 border-navy bg-sky px-6 py-6 shadow-[0px_6px_0_#0B1F3A] sm:px-6"
                                >
                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0">
                                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
                                                Available Event
                                            </p>

                                            <h3 className="mt-1 font-display text-5xl leading-none text-navy">
                                                {event.name}
                                            </h3>

                                            <p className="mt-2 font-medium text-sm leading-5 text-navy/70">
                                                {event.description}
                                            </p>

                                            <div className="mt-3 flex flex-col items-start gap-x-4 gap-y-1.5">
                                                <span className="font-body text-sm font-semibold text-navy">
                                                    {formatDate(event.startAt)}

                                                    {formatDate(event.startAt) !==
                                                        formatDate(event.endAt) && (
                                                            <>
                                                                {" "}
                                                                — {formatDate(event.endAt)}
                                                            </>
                                                        )}
                                                </span>

                                                <span className="font-body text-sm text-navy">
                                                    {formatTime(event.startAt)} —{" "}
                                                    {formatTime(event.endAt)} WIB
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="mt-5 inline-flex items-center rounded-lg border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                                        >
                                            Lihat Detail & Daftar →
                                        </Link>
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
                    </section>
                )}
            </div>

            {/* =====================================================
                BOTTOM GRADIENT
            ====================================================== */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}