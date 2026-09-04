import Link from "next/link";
import Image from "next/image";
import { formatDate, formatTime } from "@/lib/utils/format-date";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getEvents } from "@/services/participant/get-events";

export default async function EventsPage() {
    const events = await getEvents();

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

                    <nav className="flex items-center gap-4 pr-4">
                        <Link
                            href="/dashboard"
                            className="font-body text-sm font-bold text-cream transition-colors hover:text-lime"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>
            </header>

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
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-6 py-10 shadow-[0px_8px_0_#B5FF2C] sm:px-10 sm:py-12">
                    {/* Content */}
                    <div className="relative z-10 max-w-4xl">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            IKAMAMIIND 2100 | CAMPUS FAIR
                        </p>

                        <h1 className="mt-4 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl md:text-7xl">
                            FIND YOUR
                            <br />
                            EVENT.
                        </h1>

                        <p className="mt-2 max-w-2xl font-semibold text-md leading-5 md:leading-6 text-sky sm:text-base">
                            Pilih event yang ingin kamu ikuti, lalu daftar untuk mendapatkan tiket digital kamu.
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
                                                    {formatDate(event.startAt) !== formatDate(event.endAt) && (
                                                        <> — {formatDate(event.endAt)}</>
                                                    )}
                                                </span>

                                                <span className="font-body text-sm text-navy">
                                                    {formatTime(event.startAt)} — {formatTime(event.endAt)} WIB
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