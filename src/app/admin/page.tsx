import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";

export default async function AdminPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const now = new Date();

    const [
        totalEvents,
        activeEvents,
        totalParticipants,
        totalRegistrations,
        totalCheckIns,
        totalCheckOuts,
        recentEvents,
    ] = await Promise.all([
        prisma.event.count({
            where: {
                deletedAt: null,
            },
        }),

        prisma.event.count({
            where: {
                isActive: true,
                deletedAt: null,
                endAt: {
                    gte: now,
                },
            },
        }),

        prisma.participantProfile.count({
            where: {
                deletedAt: null,
            },
        }),

        prisma.eventParticipant.count({
            where: {
                deletedAt: null,
                event: {
                    deletedAt: null,
                },
                participant: {
                    deletedAt: null,
                },
            },
        }),

        prisma.attendanceLog.count({
            where: {
                type: "CHECK_IN",
                eventParticipant: {
                    deletedAt: null,
                    event: {
                        deletedAt: null,
                    },
                    participant: {
                        deletedAt: null,
                    },
                },
            },
        }),

        prisma.attendanceLog.count({
            where: {
                type: "CHECK_OUT",
                eventParticipant: {
                    deletedAt: null,
                    event: {
                        deletedAt: null,
                    },
                    participant: {
                        deletedAt: null,
                    },
                },
            },
        }),

        prisma.event.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                startAt: "desc",
            },
            take: 5,
            include: {
                _count: {
                    select: {
                        eventParticipants: {
                            where: {
                                deletedAt: null,
                                participant: {
                                    deletedAt: null,
                                },
                            },
                        },
                    },
                },
            },
        }),
    ]);

    const insideVenue = Math.max(
        totalCheckIns - totalCheckOuts,
        0,
    );

    const formatDate = (date: Date) =>
        date.toLocaleDateString("id-ID", {
            timeZone: APP_TIMEZONE,
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    const formatTime = (date: Date) =>
        date.toLocaleTimeString("id-ID", {
            timeZone: APP_TIMEZONE,
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-6">
            {/* HEADER */}
            <header className="sticky top-5 z-20 mx-auto w-full max-w-7xl rounded-full bg-navy text-cream shadow-[0_4px_0_rgba(11,31,58,0.25)]">
                <div className="flex items-center justify-between rounded-full bg-navy px-4 py-2 text-cream sm:px-5">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3"
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Logo IKAMAMIIND 2100"
                            width={50}
                            height={50}
                            priority
                            className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                        />

                        <div className="flex flex-col -space-y-2 font-display leading-none tracking-wide">
                            <span className="text-xl sm:text-2xl">
                                IKAMAMIIND
                            </span>

                            <span className="text-2xl sm:text-3xl">
                                2100
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="hidden font-body text-sm font-bold text-sky sm:block">
                            ADMIN PANEL
                        </span>

                        <LogoutButton
                            className="border-none bg-transparent pr-2 font-body text-[16px] font-bold text-white transition-colors duration-300 hover:bg-transparent hover:text-lime"
                        />
                    </div>
                </div>
            </header>

            <div className="relative z-10 mx-auto max-w-7xl py-5">
                {/* HERO */}
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-10 shadow-[6px_6px_0_#B5FF2C] sm:px-10 sm:py-12">
                    <div className="relative z-10 max-w-4xl">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            IKAMAMIIND 2100 | ADMIN PANEL
                        </p>

                        <h1 className="mt-4 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl md:text-7xl">
                            ADMIN
                            <br />
                            DASHBOARD
                        </h1>

                        <p className="mt-5 max-w-2xl font-body text-sm leading-6 text-sky sm:text-base">
                            Selamat datang,{" "}
                            <span className="font-bold text-cream">
                                {session.user.name}
                            </span>
                            . Pantau event, peserta, dan kehadiran
                            Campus Fair dari satu tempat.
                        </p>
                    </div>

                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-lime sm:h-36 sm:w-36" />

                    <div className="absolute -bottom-14 right-16 h-24 w-32 rotate-12 rounded-2xl bg-sky/40 sm:right-24 sm:h-28 sm:w-36" />
                </section>

                {/* OVERVIEW */}
                <section className="mt-12">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            SYSTEM OVERVIEW
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Ringkasan Sistem
                        </h2>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            label="TOTAL EVENT"
                            value={totalEvents}
                            description="Semua event"
                            accent="lime"
                        />

                        <StatCard
                            label="EVENT AKTIF"
                            value={activeEvents}
                            description="Event berjalan / akan datang"
                            accent="sky"
                        />

                        <StatCard
                            label="PESERTA"
                            value={totalParticipants}
                            description="Peserta terdaftar"
                            accent="pink"
                        />

                        <StatCard
                            label="PENDAFTARAN"
                            value={totalRegistrations}
                            description="Total event registration"
                            accent="yellow"
                        />
                    </div>
                </section>

                {/* ATTENDANCE */}
                <section className="mt-12">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            ATTENDANCE
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Kehadiran
                        </h2>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        <AttendanceCard
                            label="CHECK IN"
                            value={totalCheckIns}
                            description="Total peserta masuk"
                        />

                        <AttendanceCard
                            label="CHECK OUT"
                            value={totalCheckOuts}
                            description="Total peserta keluar"
                        />

                        <AttendanceCard
                            label="DI VENUE"
                            value={insideVenue}
                            description="Masih berada di venue"
                        />
                    </div>
                </section>

                {/* RECENT EVENTS */}
                <section className="mt-12">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                RECENT EVENTS
                            </p>

                            <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                                Event Terbaru
                            </h2>
                        </div>

                        <Link
                            href="/admin/events"
                            className="shrink-0 font-body text-sm font-bold text-cream underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-lime"
                        >
                            Lihat semua →
                        </Link>
                    </div>

                    <div className="mt-6 space-y-5">
                        {recentEvents.length === 0 ? (
                            <div className="rounded-3xl border-2 border-navy bg-sky p-8 shadow-[6px_6px_0_#0B1F3A]">
                                <p className="font-body text-sm text-navy/70">
                                    Belum ada event.
                                </p>
                            </div>
                        ) : (
                            recentEvents.map((event) => {
                                const isFinished =
                                    now > event.endAt;

                                const isUpcoming =
                                    now < event.startAt;

                                const status =
                                    !event.isActive
                                        ? "TIDAK AKTIF"
                                        : isFinished
                                            ? "SELESAI"
                                            : isUpcoming
                                                ? "AKAN DATANG"
                                                : "BERLANGSUNG";

                                return (
                                    <article
                                        key={event.id}
                                        className="group relative overflow-hidden rounded-3xl border-2 border-navy bg-sky p-6 shadow-[6px_6px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0B1F3A] sm:p-8"
                                    >
                                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="rounded-full bg-navy px-3 py-1 font-body text-xs font-bold text-cream">
                                                        {status}
                                                    </span>

                                                    <span className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                                        {event._count.eventParticipants}{" "}
                                                        PESERTA
                                                    </span>
                                                </div>

                                                <h3 className="mt-3 font-display text-4xl leading-none text-navy sm:text-5xl">
                                                    {event.name}
                                                </h3>

                                                <p className="mt-4 font-body text-sm text-navy/70">
                                                    {formatDate(event.startAt)}
                                                    {" • "}
                                                    {formatTime(event.startAt)}
                                                    {" — "}
                                                    {formatTime(event.endAt)}
                                                    {" WIB"}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                <Link
                                                    href={`/admin/attendance/${event.id}`}
                                                    className="inline-flex items-center justify-center rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                                                >
                                                    Attendance →
                                                </Link>

                                                <Link
                                                    href={`/admin/events/${event.id}/edit`}
                                                    className="inline-flex items-center justify-center rounded-xl border-2 border-navy bg-cream px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                                                >
                                                    Edit Event
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-12 -right-8 h-28 w-28 rotate-12 rounded-3xl bg-lime/30 transition-transform duration-500 group-hover:rotate-6" />
                                    </article>
                                );
                            })
                        )}
                    </div>
                </section>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}

function StatCard({
    label,
    value,
    description,
    accent,
}: {
    label: string;
    value: number;
    description: string;
    accent: "lime" | "sky" | "pink" | "yellow";
}) {
    const accentClasses = {
        lime: "bg-lime",
        sky: "bg-sky",
        pink: "bg-pink",
        yellow: "bg-yellow",
    };

    return (
        <div
            className={`rounded-3xl border-2 border-navy p-6 shadow-[6px_6px_0_#0B1F3A] ${accentClasses[accent]}`}
        >
            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/60">
                {label}
            </p>

            <p className="mt-3 font-display text-5xl leading-none text-navy">
                {value}
            </p>

            <p className="mt-3 font-body text-xs font-semibold text-navy/60">
                {description}
            </p>
        </div>
    );
}

function AttendanceCard({
    label,
    value,
    description,
}: {
    label: string;
    value: number;
    description: string;
}) {
    return (
        <div className="rounded-3xl border-2 border-navy bg-cream p-6 shadow-[6px_6px_0_#0B1F3A]">
            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/60">
                {label}
            </p>

            <p className="mt-3 font-display text-5xl leading-none text-navy">
                {value}
            </p>

            <p className="mt-3 font-body text-xs font-semibold text-navy/60">
                {description}
            </p>
        </div>
    );
}