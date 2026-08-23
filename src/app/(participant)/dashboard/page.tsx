import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { isParticipant } from "@/lib/auth/permission";
export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isParticipant(session.user.role)) {
        redirect("/admin");
    }

    const participant =
        await prisma.participantProfile.findFirst({
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
            <main className="min-h-screen p-8">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-2xl font-bold">
                        Data peserta tidak ditemukan
                    </h1>
                </div>
            </main>
        );
    }

    const registrations =
        await prisma.eventParticipant.findMany({
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
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Halo, {participant.name}!
                        </p>
                    </div>

                    <LogoutButton />
                </div>

                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Event Saya
                        </h2>

                        <Link
                            href="/events"
                            className="text-sm font-medium hover:underline"
                        >
                            Lihat semua event
                        </Link>
                    </div>

                    {registrations.length === 0 ? (
                        <section className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-600">
                                Kamu belum terdaftar di event
                                mana pun.
                            </p>

                            <Link
                                href="/events"
                                className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                            >
                                Cari Event
                            </Link>
                        </section>
                    ) : (
                        <div className="mt-4 space-y-4">
                            {registrations.map(
                                (registration) => (
                                    <section
                                        key={
                                            registration.id
                                        }
                                        className="rounded-xl border bg-white p-6 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {
                                                        registration
                                                            .event
                                                            .name
                                                    }
                                                </h3>

                                                <p className="mt-2 text-sm text-gray-600">
                                                    {registration.event.startAt.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    sampai{" "}
                                                    {registration.event.endAt.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </p>

                                                <p className="mt-3 font-mono text-sm">
                                                    {
                                                        registration.participantCode
                                                    }
                                                </p>
                                            </div>

                                            <Link
                                                href={`/events/${registration.event.id}`}
                                                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </section>
                                ),
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}