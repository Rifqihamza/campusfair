import { prisma } from "@/lib/db/prisma";

export async function getEventDetail(
    eventId: string,
    userId?: string,
) {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            isActive: true,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            description: true,
            startAt: true,
            endAt: true,
        },
    });

    if (!event) {
        return {
            event: null,
            eventParticipant: null,
        };
    }

    let eventParticipant = null;

    if (userId) {
        const participant = await prisma.participantProfile.findFirst({
            where: {
                userId,
                deletedAt: null,
            },
            select: {
                id: true,
            },
        });

        if (participant) {
            eventParticipant = await prisma.eventParticipant.findFirst({
                where: {
                    eventId: event.id,
                    participantId: participant.id,
                    deletedAt: null,
                },
            });
        }
    }

    return {
        event,
        eventParticipant,
    };
}