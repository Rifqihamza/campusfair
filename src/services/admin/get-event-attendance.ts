import { prisma } from "@/lib/db/prisma";

export async function getAdminEventAttendance(eventId: string) {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            deletedAt: null,
        },
    });

    if (!event) {
        return {
            event: null,
            participants: [],
            totalParticipants: 0,
            checkInCount: 0,
            checkOutCount: 0,
        };
    }

    const [participants, totalParticipants, checkInCount, checkOutCount] =
        await Promise.all([
            prisma.eventParticipant.findMany({
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
            }),

            prisma.eventParticipant.count({
                where: {
                    eventId,
                    deletedAt: null,
                },
            }),

            prisma.attendanceLog.count({
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
            }),

            prisma.attendanceLog.count({
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
            }),
        ]);

    return {
        event,
        participants,
        totalParticipants,
        checkInCount,
        checkOutCount,
    };
}