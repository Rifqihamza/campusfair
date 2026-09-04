import { prisma } from "@/lib/db/prisma";

export async function getEventTicket(
    eventId: string,
    userId: string,
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
            slug: true,
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

    const eventParticipant = await prisma.eventParticipant.findFirst({
        where: {
            eventId: event.id,
            deletedAt: null,
            participant: {
                userId,
                deletedAt: null,
            },
        },
        select: {
            id: true,
            participantCode: true,
            qrToken: true,
            participant: {
                select: {
                    name: true,
                    class: true,
                    phone: true,
                },
            },
        },
    });

    return {
        event,
        eventParticipant,
    };
}