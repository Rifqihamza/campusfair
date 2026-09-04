import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { APP_TIMEZONE } from "@/lib/utils/date";
import { getAdminDashboardData } from "@/services/admin/get-dashboard-data";

import { RegistrationChart } from "@/components/admin/registration-chart";
import { AttendanceChart } from "@/components/admin/attendance-chart";
import { ArrowRight } from "lucide-react";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminHero } from "@/components/admin/admin-hero";

export default async function AdminPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const {
        now,
        totalEvents,
        activeEvents,
        totalParticipants,
        totalRegistrations,
        totalCheckIns,
        totalCheckOuts,
        recentEvents,
        eventRegistrationStats,
    } = await getAdminDashboardData();

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
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-4">
            <AdminHeader />


            <div className="relative z-10 mx-auto max-w-7xl py-5">
                <AdminHero
                    eyebrow="IKAMAMIIND 2100 | ADMIN PANEL"
                    title="ADMIN DASHBOARD"
                    description={`Selamat datang, ${session.user.email}. Pantau event, peserta, dan kehadiran Campus Fair dari satu tempat.`}
                />

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

                <section className="mt-12">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            ANALYTICS
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Analisis
                        </h2>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                        <RegistrationChart
                            data={eventRegistrationStats}
                        />

                        <AttendanceChart
                            insideVenue={insideVenue}
                            checkedOut={totalCheckOuts}
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
                                        className="group relative overflow-hidden rounded-2xl border-2 border-navy bg-sky px-6 py-6 shadow-[0px_6px_0_#0B1F3A] sm:px-6"
                                    >
                                        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="min-w-0">
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

                                                <p className="mt-2 font-medium text-sm leading-5 text-navy/70">
                                                    {event.description}
                                                </p>

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
                                                    className="inline-flex items-center rounded-lg border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                                                >
                                                    Attendance
                                                    <ArrowRight size={14} className="ml-2" />
                                                </Link>

                                                <Link
                                                    href={`/admin/events/${event.id}/edit`}
                                                    className="inline-flex items-center rounded-lg border-2 border-navy bg-white px-5 py-3 font-body text-sm font-bold text-navy shadow-[0px_4px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_2px_0_#0B1F3A]"
                                                >
                                                    Edit Event
                                                </Link>
                                            </div>
                                        </div>
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