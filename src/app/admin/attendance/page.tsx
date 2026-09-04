import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";

export default async function AttendancePage() {
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

            <div className="relative z-10 mx-auto max-w-6xl py-5">
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-8 shadow-[6px_6px_0_#B5FF2C] sm:px-10">
                    <div className="relative z-10">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            IKAMAMIIND 2100 | MONITORING
                        </p>

                        <h1 className="mt-3 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl">
                            ATTENDANCE
                            <br />
                            MONITORING
                        </h1>

                        <p className="mt-5 max-w-2xl font-body text-sm leading-6 text-sky sm:text-base">
                            Pilih event untuk melihat kehadiran peserta,
                            waktu check-in, check-out, dan status mereka
                            di venue.
                        </p>
                    </div>

                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-lime sm:h-36 sm:w-36" />

                    <div className="absolute -bottom-12 right-24 h-24 w-32 rotate-12 rounded-2xl bg-sky/40" />
                </section>

                <div className="mt-8 flex flex-row justify-between items-center">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-lime">
                            SELECT EVENT
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Pilih Event
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
                    <div className="mt-6 rounded-3xl border-2 border-navy bg-sky p-6 shadow-[6px_6px_0_#0B1F3A]">
                        <p className="font-body text-sm font-medium text-navy">
                            Belum ada event.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        {events.map((event) => (
                            <section
                                key={event.id}
                                className="relative overflow-hidden rounded-3xl border-2 border-navy bg-sky p-6 shadow-[6px_6px_0_#0B1F3A]"
                            >
                                <div className="absolute right-5 top-5">
                                    <span
                                        className={`inline-block h-4 w-4 rounded-full border-2 border-navy ${event.isActive
                                            ? "bg-lime"
                                            : "bg-navy/30"
                                            }`}
                                    />
                                </div>

                                <div className="pr-10">
                                    <h2 className="font-display text-3xl leading-none text-navy">
                                        {event.name}
                                    </h2>

                                    <p className="mt-3 font-body text-sm font-medium text-navy/60">
                                        {event.startAt.toLocaleString(
                                            "id-ID",
                                            {
                                                timeZone: "Asia/Jakarta",
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            },
                                        )}{" "}
                                        —{" "}
                                        {event.endAt.toLocaleString(
                                            "id-ID",
                                            {
                                                timeZone: "Asia/Jakarta",
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            },
                                        )}
                                    </p>

                                    <p className="mt-3 inline-flex rounded-full border-2 border-navy bg-cream px-3 py-1 font-body text-xs font-bold text-navy">
                                        {event.isActive
                                            ? "AKTIF"
                                            : "TIDAK AKTIF"}
                                    </p>
                                </div>

                                <Link
                                    href={`/admin/attendance/${event.id}`}
                                    className="mt-6 block rounded-xl border-2 border-navy bg-lime px-4 py-3 text-center font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                                >
                                    Lihat Attendance →
                                </Link>
                            </section>
                        ))}
                    </div>
                )}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}