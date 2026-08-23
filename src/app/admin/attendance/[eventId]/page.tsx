import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";

type Props = {
    params: Promise<{
        eventId: string;
    }>;
};

export default async function AttendancePage({
    params,
}: Props) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/participant");
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

    const participants =
        await prisma.eventParticipant.findMany({
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
                        scannedAt: "desc",
                    },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

    const totalParticipants =
        await prisma.eventParticipant.count({
            where: {
                eventId,
                deletedAt: null,
            },
        });


    const checkInCount =
        await prisma.attendanceLog.count({
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


    const checkOutCount =
        await prisma.attendanceLog.count({
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

    const insideCount =
        checkInCount - checkOutCount;

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-6xl">

                <h1 className="text-3xl font-bold">
                    {event.name}
                </h1>

                <p className="mt-2 text-gray-600">
                    Attendance Monitoring
                </p>

            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">

                <div className="rounded-xl border p-6">
                    <p className="text-sm text-gray-600">
                        Total Peserta
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {totalParticipants}
                    </p>
                </div>


                <div className="rounded-xl border p-6">
                    <p className="text-sm text-gray-600">
                        Check In
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {checkInCount}
                    </p>
                </div>


                <div className="rounded-xl border p-6">
                    <p className="text-sm text-gray-600">
                        Check Out
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {checkOutCount}
                    </p>
                </div>

                <div className="rounded-xl border p-6">
                    <p className="text-sm text-gray-600">
                        Masih di Venue
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {insideCount}
                    </p>
                </div>

            </div>

            <div className="mt-8 overflow-hidden rounded-xl border">

                <table className="w-full">

                    <thead>
                        <tr className="border-b text-left">
                            <th className="p-4">
                                Nama
                            </th>

                            <th className="p-4">
                                Sekolah
                            </th>

                            <th className="p-4">
                                Status
                            </th>

                            <th className="p-4">
                                Waktu
                            </th>
                        </tr>
                    </thead>


                    <tbody>

                        {participants.map((item) => {
                            const latest =
                                item.attendanceLogs[0];

                            let status = "BELUM HADIR";

                            if (latest?.type === "CHECK_IN") {
                                status = "DI VENUE";
                            }

                            if (latest?.type === "CHECK_OUT") {
                                status = "SUDAH KELUAR";
                            }

                            return (
                                <tr
                                    key={item.id}
                                    className="border-b"
                                >
                                    <td className="p-4">
                                        {item.participant.name}
                                    </td>

                                    <td className="p-4">
                                        {item.participant.school}
                                    </td>

                                    <td className="p-4">
                                        {status}
                                    </td>

                                    <td className="p-4">
                                        {latest
                                            ? latest.scannedAt.toLocaleString(
                                                "id-ID",
                                                {
                                                    dateStyle: "short",
                                                    timeStyle: "medium",
                                                },
                                            )
                                            : "-"}
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>
        </main>
    );
}