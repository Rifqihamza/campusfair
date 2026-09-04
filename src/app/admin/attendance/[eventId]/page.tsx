import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";

type Props = {
    params: Promise<{
        eventId: string;
    }>;
};

export default async function AttendancePage({ params }: Props) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const { eventId } = await params;

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            deletedAt: null,
        },
    });

    if (!event) {
        notFound();
    }

    const participants = await prisma.eventParticipant.findMany({
        where: {
            eventId,
            deletedAt: null,
            participant: {
                deletedAt: null,
            },
        },
        include: {
            participant: true,
            attendanceLogs: {
                orderBy: {
                    scannedAt: "asc",
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const totalParticipants = await prisma.eventParticipant.count({
        where: {
            eventId,
            deletedAt: null,
        },
    });

    const checkInCount = await prisma.attendanceLog.count({
        where: {
            type: "CHECK_IN",
            eventParticipant: {
                eventId,
                deletedAt: null,
                participant: {
                    deletedAt: null,
                },
            },
        },
    });

    const checkOutCount = await prisma.attendanceLog.count({
        where: {
            type: "CHECK_OUT",
            eventParticipant: {
                eventId,
                deletedAt: null,
                participant: {
                    deletedAt: null,
                },
            },
        },
    });

    const insideCount = checkInCount - checkOutCount;

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-6">
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
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-8 shadow-[6px_6px_0_#B5FF2C] sm:px-10">
                    <div className="relative z-10">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            ATTENDANCE MONITORING
                        </p>

                        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl">
                            {event.name}
                        </h1>


                        <div className="mt-3">
                            <p className="font-body text-md font-bold uppercase tracking-[0.15em] text-sky">
                                Scanner URL
                            </p>

                            <p className="mt-2 break-all font-mono text-md font-bold text-sky bg-cream/20 px-4 py-2 rounded-md w-fit">
                                /scanner/{event.scannerToken}
                            </p>
                        </div>
                        <p className="mt-5 font-body text-sm font-medium text-sky sm:text-base">
                            Monitoring kehadiran peserta secara real-time.
                        </p>
                    </div>

                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-lime sm:h-36 sm:w-36" />
                </section>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-lime">
                            OVERVIEW
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Attendance Stats
                        </h2>
                    </div>

                    <Link
                        href="/admin/attendance"
                        className="font-body text-sm font-bold text-cream underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-lime"
                    >
                        ← Semua Event
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Total Peserta"
                        value={totalParticipants}
                        className="bg-sky"
                    />

                    <StatCard
                        label="Check In"
                        value={checkInCount}
                        className="bg-lime"
                    />

                    <StatCard
                        label="Check Out"
                        value={checkOutCount}
                        className="bg-cream"
                    />

                    <StatCard
                        label="Masih di Venue"
                        value={insideCount}
                        className="bg-navy text-cream"
                    />
                </div>

                <div className="mt-8">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-lime">
                                PARTICIPANTS
                            </p>

                            <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                                Daftar Kehadiran
                            </h2>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <a
                                href={`/api/admin/attendance/${eventId}/export-excel`}
                                className="inline-flex items-center justify-center rounded-xl border-2 border-navy bg-lime px-4 py-2.5 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                            >
                                Export Excel ↓
                            </a>

                            <a
                                href={`/api/admin/attendance/${eventId}/export-csv`}
                                className="inline-flex items-center justify-center rounded-xl border-2 border-navy bg-cream px-4 py-2.5 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                            >
                                Export CSV ↓
                            </a>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border-2 border-navy bg-sky shadow-[6px_6px_0_#0B1F3A]">
                        <table className="w-full min-w-190">
                            <thead>
                                <tr className="border-b-2 border-navy bg-navy text-left text-cream">
                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        User ID
                                    </th>
                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Nama
                                    </th>

                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Kelas
                                    </th>

                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Jurusan
                                    </th>

                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Sekolah
                                    </th>

                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Status
                                    </th>

                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Check In
                                    </th>

                                    <th className="p-4 font-body text-xs font-bold uppercase tracking-wide">
                                        Check Out
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {participants.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-8 text-center font-body text-sm text-navy/60"
                                        >
                                            Belum ada peserta terdaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    participants.map((item) => {
                                        const checkIn =
                                            item.attendanceLogs.find(
                                                (log) =>
                                                    log.type === "CHECK_IN",
                                            );

                                        const checkOut =
                                            item.attendanceLogs.find(
                                                (log) =>
                                                    log.type === "CHECK_OUT",
                                            );

                                        let status = "BELUM HADIR";

                                        if (checkIn && !checkOut) {
                                            status = "DI VENUE";
                                        }

                                        if (checkIn && checkOut) {
                                            status = "SUDAH KELUAR";
                                        }

                                        return (
                                            <tr
                                                key={item.id}
                                                className="border-b border-navy/20 last:border-b-0"
                                            >
                                                <td className="p-4 font-body text-sm font-bold text-navy">
                                                    {item.participant.userId}
                                                </td>
                                                <td className="p-4 font-body text-sm font-bold text-navy">
                                                    {item.participant.name}
                                                </td>
                                                <td className="p-4 font-body text-sm text-navy/70">
                                                    {item.participant.class}
                                                </td>
                                                <td className="p-4 font-body text-sm text-navy/70">
                                                    {item.participant.major}
                                                </td>

                                                <td className="p-4 font-body text-sm text-navy/70">
                                                    {item.participant.school}
                                                </td>

                                                <td className="p-4">
                                                    <span
                                                        className={`inline-block rounded-full border-2 border-navy px-3 py-1 font-body text-xs font-bold ${status ===
                                                            "DI VENUE"
                                                            ? "bg-lime text-navy"
                                                            : status ===
                                                                "SUDAH KELUAR"
                                                                ? "bg-cream text-navy"
                                                                : "bg-navy text-cream"
                                                            }`}
                                                    >
                                                        {status}
                                                    </span>
                                                </td>

                                                <td className="p-4 font-body text-sm text-navy/70">
                                                    {checkIn
                                                        ? checkIn.scannedAt.toLocaleString(
                                                            "id-ID",
                                                            {
                                                                timeZone:
                                                                    APP_TIMEZONE,
                                                                dateStyle:
                                                                    "short",
                                                                timeStyle:
                                                                    "medium",
                                                            },
                                                        )
                                                        : "-"}
                                                </td>

                                                <td className="p-4 font-body text-sm text-navy/70">
                                                    {checkOut
                                                        ? checkOut.scannedAt.toLocaleString(
                                                            "id-ID",
                                                            {
                                                                timeZone:
                                                                    APP_TIMEZONE,
                                                                dateStyle:
                                                                    "short",
                                                                timeStyle:
                                                                    "medium",
                                                            },
                                                        )
                                                        : "-"}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}

function StatCard({
    label,
    value,
    className,
}: {
    label: string;
    value: number;
    className: string;
}) {
    return (
        <div
            className={`rounded-3xl border-2 border-navy p-5 shadow-[5px_5px_0_#0B1F3A] ${className}`}
        >
            <p className="font-body text-xs font-bold uppercase tracking-[0.12em] opacity-60">
                {label}
            </p>

            <p className="mt-3 font-display text-5xl leading-none">
                {value}
            </p>
        </div>
    );
}