import crypto from "node:crypto";

import { prisma } from "@/lib/db/prisma";

export async function registerParticipantToEvent(
    userId: string,
    eventId: string,
) {
    const participant = await prisma.participantProfile.findFirst({
        where: {
            userId,
            deletedAt: null,
        },
    });

    if (!participant) {
        throw new Error("PARTICIPANT_NOT_FOUND");
    }

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            isActive: true,
            deletedAt: null,
        },
    });

    if (!event) {
        throw new Error("EVENT_NOT_FOUND");
    }

    const existingParticipant =
        await prisma.eventParticipant.findFirst({
            where: {
                eventId,
                participantId: participant.id,
                deletedAt: null,
            },
        });

    if (existingParticipant) {
        return existingParticipant;
    }

    const participantCode = await generateParticipantCode(
        event.startAt,
    );

    const qrToken = crypto.randomBytes(32).toString("hex");

    return prisma.eventParticipant.create({
        data: {
            eventId,
            participantId: participant.id,
            participantCode,
            qrToken,
        },
    });
}

async function generateParticipantCode(
    eventStartAt: Date,
): Promise<string> {
    const year = eventStartAt.getFullYear();

    const count = await prisma.eventParticipant.count({
        where: {
            deletedAt: null,
        },
    });

    const sequence = String(count + 1).padStart(4, "0");

    return `CF-${year}-${sequence}`;
}