import Link from "next/link";

import { prisma } from "@/lib/db/prisma";

export default async function EventsPage() {
    const now = new Date();

    const events = await prisma.event.findMany({
        where: {
            isActive: true,
            deletedAt: null,
            endAt: {
                gte: now,
            },
        },
        orderBy: {
            startAt: "asc",
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            startAt: true,
            endAt: true,
        },
    });

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="text-sm text-gray-600 hover:underline"
                    >
                        ← Kembali
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold">
                        Event
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Pilih event yang ingin kamu ikuti.
                    </p>
                </div>

                {events.length === 0 ? (
                    <section className="rounded-xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-600">
                            Belum ada event yang tersedia.
                        </p>
                    </section>
                ) : (
                    <div className="grid gap-4">
                        {events.map((event) => (
                            <section
                                key={event.id}
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >
                                <h2 className="text-xl font-semibold">
                                    {event.name}
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    {event.startAt.toLocaleString(
                                        "id-ID",
                                    )}
                                </p>

                                <p className="text-sm text-gray-600">
                                    sampai{" "}
                                    {event.endAt.toLocaleString(
                                        "id-ID",
                                    )}
                                </p>

                                {event.description && (
                                    <p className="mt-4 line-clamp-3 text-sm text-gray-600">
                                        {event.description}
                                    </p>
                                )}

                                <div className="mt-5">
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                    >
                                        Lihat Event
                                    </Link>
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}