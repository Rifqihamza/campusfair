import { prisma } from "@/lib/db/prisma";

export async function searchEventParticipants(
    eventId: string,
    query: string,
) {
    const search = query.trim();

    if (!search) {
        return [];
    }

    return prisma.eventParticipant.findMany({
        where: {
            eventId,
            deletedAt: null,
            OR: [
                {
                    participantCode: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    participant: {
                        deletedAt: null,
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    participant: {
                        deletedAt: null,
                        user: {
                            email: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        },
        select: {
            id: true,
            participantCode: true,
            participant: {
                select: {
                    name: true,
                    class: true,
                    major: true,
                    school: true,
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
            },
            attendanceLogs: {
                orderBy: {
                    scannedAt: "desc",
                },
                select: {
                    type: true,
                    scannedAt: true,
                },
            },
        },
        orderBy: {
            participant: {
                name: "asc",
            },
        },
        take: 10,
    });
}