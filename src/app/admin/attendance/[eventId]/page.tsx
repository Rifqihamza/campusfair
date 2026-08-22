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

    const participants =
        await prisma.eventParticipant.findMany({
            where: {
                eventId,
                deletedAt: null,
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
                },
            },
        });

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

            <div className="mt-8 grid gap-4 md:grid-cols-3">

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
                                        {latest
                                            ? latest.type
                                            : "BELUM HADIR"}
                                    </td>


                                    <td className="p-4">
                                        {latest
                                            ? latest.scannedAt.toLocaleString()
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