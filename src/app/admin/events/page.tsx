import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { DeleteEventButton } from "@/components/admin/delete-event-button";
import Link from "next/link";

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

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-row items-center justify-between ">
                    <h1 className="text-3xl font-bold">
                        Events
                    </h1>
                    <Link href="/events/new" className="w-fit rounded-lg bg-black px-4 py-1 text-white disabled:opacity-50"
                    >
                        + Buat Event
                    </Link>
                </div>

                <div className="mt-6 space-y-4">
                    {events.map((event) => (
                        <section
                            key={event.id}
                            className="relative rounded-xl border bg-white p-6 shadow-sm"
                        >
                            <div className="absolute top-2 right-2">
                                <span
                                    className={
                                        event.isActive
                                            ? "inline-block rounded-full bg-green-300 p-2 animate-pulse"
                                            : "inline-block rounded-full bg-gray-400 p-2 animate-pulse"
                                    }
                                >
                                </span>
                            </div>

                            <h2 className="text-xl font-semibold">
                                {event.name}
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Slug: {event.slug}
                            </p>

                            <p className="mt-2 text-sm">
                                Status:{" "}
                                {event.isActive
                                    ? "Aktif"
                                    : "Tidak aktif"}
                            </p>

                            <div className="mt-4 rounded-lg bg-gray-50 p-3">
                                <p className="text-sm font-medium">
                                    Scanner URL
                                </p>

                                <p className="mt-1 break-all font-mono text-sm text-gray-600">
                                    /scanner/{event.scannerToken}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={`/admin/events/${event.id}/edit`}
                                    className="rounded-lg border px-4 py-2 text-sm"
                                >
                                    Edit
                                </Link>

                                <Link
                                    href={`/admin/attendance/${event.id}`}
                                    className="rounded-lg border px-4 py-2 text-sm"
                                >
                                    Attendance
                                </Link>

                                <DeleteEventButton
                                    id={event.id}
                                />
                            </div>

                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}