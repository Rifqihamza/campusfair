import { prisma } from "@/lib/db/prisma";

export async function getAdminDashboardData() {
    const now = new Date();

    const [
        totalEvents,
        activeEvents,
        totalParticipants,
        totalRegistrations,
        totalCheckIns,
        totalCheckOuts,
        recentEvents,
        eventRegistrationStats,
    ] = await Promise.all([
        prisma.event.count({
            where: {
                deletedAt: null,
            },
        }),

        prisma.event.count({
            where: {
                isActive: true,
                deletedAt: null,
                endAt: {
                    gte: now,
                },
            },
        }),

        prisma.participantProfile.count({
            where: {
                deletedAt: null,
            },
        }),

        prisma.eventParticipant.count({
            where: {
                deletedAt: null,
                event: {
                    deletedAt: null,
                },
                participant: {
                    deletedAt: null,
                },
            },
        }),

        prisma.attendanceLog.count({
            where: {
                type: "CHECK_IN",
                eventParticipant: {
                    deletedAt: null,
                    event: {
                        deletedAt: null,
                    },
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
                    deletedAt: null,
                    event: {
                        deletedAt: null,
                    },
                    participant: {
                        deletedAt: null,
                    },
                },
            },
        }),

        prisma.event.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                startAt: "desc",
            },
            take: 5,
            include: {
                _count: {
                    select: {
                        eventParticipants: {
                            where: {
                                deletedAt: null,
                                participant: {
                                    deletedAt: null,
                                },
                            },
                        },
                    },
                },
            },
        }),

        prisma.event.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                startAt: "asc",
            },
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        eventParticipants: {
                            where: {
                                deletedAt: null,
                                participant: {
                                    deletedAt: null,
                                },
                            },
                        },
                    },
                },
            },
        }),
    ]);

    return {
        now,
        totalEvents,
        activeEvents,
        totalParticipants,
        totalRegistrations,
        totalCheckIns,
        totalCheckOuts,
        recentEvents,
        eventRegistrationStats:
            eventRegistrationStats.map((event) => ({
                id: event.id,
                name: event.name,
                registrations:
                    event._count.eventParticipants,
            })),
    };
}