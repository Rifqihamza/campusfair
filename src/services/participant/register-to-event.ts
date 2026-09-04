import crypto from "node:crypto";

import { Prisma } from "../../../prisma/generated/client";

import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";
const MAX_CODE_RETRIES = 5;

export async function registerParticipantToEvent(
    userId: string,
    eventId: string,
) {
    const participant =
        await prisma.participantProfile.findFirst({
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

    const now = new Date();

    if (now > event.endAt) {
        throw new Error("EVENT_ALREADY_FINISHED");
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

    for (
        let attempt = 1;
        attempt <= MAX_CODE_RETRIES;
        attempt++
    ) {
        const participantCode =
            await generateParticipantCode(
                event.id,
                event.startAt,
            );

        const qrToken =
            crypto.randomBytes(32).toString("hex");

        try {
            return await prisma.eventParticipant.create({
                data: {
                    eventId: event.id,
                    participantId: participant.id,
                    participantCode,
                    qrToken,
                },
            });
        } catch (error) {
            if (
                error instanceof
                Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                const existingParticipant =
                    await prisma.eventParticipant.findFirst({
                        where: {
                            eventId: event.id,
                            participantId:
                                participant.id,
                            deletedAt: null,
                        },
                    });

                if (existingParticipant) {
                    return existingParticipant;
                }

                if (attempt < MAX_CODE_RETRIES) {
                    continue;
                }
            }

            throw error;
        }
    }

    throw new Error(
        "PARTICIPANT_REGISTRATION_FAILED",
    );
}

async function generateParticipantCode(
    eventId: string,
    eventStartAt: Date,
): Promise<string> {

    const year = new Intl.DateTimeFormat("en-US", {
        timeZone: APP_TIMEZONE,
        year: "numeric",
    }).format(eventStartAt);

    const participants =
        await prisma.eventParticipant.findMany({
            where: {
                eventId,
            },
            select: {
                participantCode: true,
            },
        });

    let maxSequence = 0;

    for (const participant of participants) {
        const match =
            participant.participantCode.match(
                /^CF-\d{4}-(\d+)$/,
            );

        if (!match) {
            continue;
        }

        const sequence = Number(match[1]);

        if (
            Number.isInteger(sequence) &&
            sequence > maxSequence
        ) {
            maxSequence = sequence;
        }
    }

    const nextSequence = String(
        maxSequence + 1,
    ).padStart(4, "0");

    return `CF-${year}-${nextSequence}`;
}