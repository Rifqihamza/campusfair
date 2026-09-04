import { prisma } from "@/lib/db/prisma";

export async function getDashboardData(userId: string) {
    const participant = await prisma.participantProfile.findFirst({
        where: {
            userId,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
        },
    });

    if (!participant) {
        return {
            participant: null,
            registrations: [],
        };
    }

    const registrations = await prisma.eventParticipant.findMany({
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

    return {
        participant,
        registrations,
    };
}