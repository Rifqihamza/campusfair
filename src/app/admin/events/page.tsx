import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DeleteEventButton } from "@/components/admin/delete-event-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";

export default async function AdminEventsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const events = await prisma.event.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            startAt: "desc",
        },
    });

    const now = new Date();

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
                {/* PAGE HEADER */}
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-8 shadow-[6px_6px_0_#B5FF2C] sm:px-10">
                    <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                IKAMAMIIND 2100 | ADMIN
                            </p>

                            <h1 className="mt-3 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl">
                                EVENTS
                            </h1>

                            <p className="mt-4 max-w-xl font-body text-sm leading-6 text-sky sm:text-base">
                                Kelola event Campus Fair, lihat
                                attendance, dan siapkan scanner untuk
                                panitia.
                            </p>
                        </div>

                        <Link
                            href="/admin/events/new"
                            className="inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                        >
                            + Buat Event
                        </Link>
                    </div>

                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-lime sm:h-36 sm:w-36" />

                    <div className="absolute -bottom-12 right-24 h-24 w-32 rotate-12 rounded-2xl bg-sky/40" />
                </section>

                {/* EVENTS */}
                <section className="mt-12">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                EVENT MANAGEMENT
                            </p>

                            <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                                Semua Event
                            </h2>
                        </div>

                        <Link
                            href="/admin"
                            className="shrink-0 font-body text-sm font-bold text-cream underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-lime"
                        >
                            ← Dashboard
                        </Link>
                    </div>

                    {events.length === 0 ? (
                        <div className="mt-6 rounded-3xl border-2 border-navy bg-sky p-8 shadow-[6px_6px_0_#0B1F3A]">
                            <p className="font-body text-sm text-navy/70">
                                Belum ada event yang dibuat.
                            </p>

                            <Link
                                href="/admin/events/new"
                                className="mt-5 inline-flex rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A]"
                            >
                                Buat Event →
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            {events.map((event) => {
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

                                const statusClass =
                                    !event.isActive
                                        ? "bg-gray-300 text-navy"
                                        : isFinished
                                            ? "bg-pink text-navy"
                                            : isUpcoming
                                                ? "bg-sky text-navy"
                                                : "bg-lime text-navy";

                                return (
                                    <article
                                        key={event.id}
                                        className="group relative overflow-hidden rounded-3xl border-2 border-navy bg-sky p-6 shadow-[6px_6px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0B1F3A] sm:p-7"
                                    >
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between gap-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 font-body text-xs font-bold ${statusClass}`}
                                                >
                                                    {status}
                                                </span>

                                                <span className="h-3 w-3 shrink-0 rounded-full bg-navy" />
                                            </div>

                                            <h3 className="mt-5 font-display text-4xl leading-none text-navy sm:text-5xl">
                                                {event.name}
                                            </h3>

                                            {event.description && (
                                                <p className="mt-4 line-clamp-2 font-body text-sm leading-6 text-navy/60">
                                                    {event.description}
                                                </p>
                                            )}

                                            <div className="mt-5 border-t-2 border-navy/10 pt-5">
                                                <p className="font-body text-sm font-bold text-navy">
                                                    {formatDate(event.startAt)}
                                                </p>

                                                <p className="mt-1 font-body text-sm text-navy/60">
                                                    {formatTime(event.startAt)}
                                                    {" — "}
                                                    {formatTime(event.endAt)}
                                                    {" WIB"}
                                                </p>
                                            </div>

                                            <div className="mt-5 rounded-2xl border-2 border-navy bg-cream p-4">
                                                <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                                    Scanner URL
                                                </p>

                                                <p className="mt-2 break-all font-mono text-xs font-bold text-navy">
                                                    /scanner/{event.scannerToken}
                                                </p>
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                <Link
                                                    href={`/admin/events/${event.id}/edit`}
                                                    className="inline-flex items-center rounded-xl border-2 border-navy bg-cream px-4 py-2.5 font-body text-sm font-bold text-navy shadow-[3px_3px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0B1F3A]"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={`/admin/attendance/${event.id}`}
                                                    className="inline-flex items-center rounded-xl border-2 border-navy bg-lime px-4 py-2.5 font-body text-sm font-bold text-navy shadow-[3px_3px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0B1F3A]"
                                                >
                                                    Attendance
                                                </Link>

                                                <DeleteEventButton
                                                    id={event.id}
                                                />
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-14 -right-10 h-32 w-32 rotate-12 rounded-3xl bg-lime/25 transition-transform duration-500 group-hover:rotate-6" />
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}