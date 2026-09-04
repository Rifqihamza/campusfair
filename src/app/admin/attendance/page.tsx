import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { getAttendanceEvents } from "@/services/admin/get-attendance-events";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminHero } from "@/components/admin/admin-hero";

export default async function AttendancePage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const events = await getAttendanceEvents();

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-6">
            <AdminHeader />

            <div className="relative z-10 mx-auto max-w-6xl py-5">
                <AdminHero
                    eyebrow="IKAMAMIIND 2100 | MONITORING"
                    title="ATTENDANCE MONITORING"
                    description="Pilih event untuk melihat kehadiran peserta, waktu check-in, check-out, dan status mereka di venue."
                />

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