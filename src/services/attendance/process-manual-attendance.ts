import {
    Prisma,
    type AttendanceType,
} from "../../../prisma/generated/client";
import { prisma } from "@/lib/db/prisma";
import { AttendanceError } from "./attendance-error";

const MAX_TRANSACTION_RETRIES = 3;

export async function processManualAttendance(
    eventId: string,
    eventParticipantId: string,
    type: AttendanceType,
) {
    for (
        let attempt = 1;
        attempt <= MAX_TRANSACTION_RETRIES;
        attempt++
    ) {
        try {
            return await prisma.$transaction(
                async (tx) => {
                    const event = await tx.event.findFirst({
                        where: {
                            id: eventId,
                            isActive: true,
                            deletedAt: null,
                        },
                    });

                    if (!event) {
                        throw new AttendanceError(
                            "SCANNER_NOT_FOUND",
                        );
                    }

                    const now = new Date();

                    if (now < event.startAt) {
                        throw new AttendanceError(
                            "EVENT_NOT_STARTED",
                        );
                    }

                    if (now > event.endAt) {
                        throw new AttendanceError(
                            "EVENT_FINISHED",
                        );
                    }

                    const eventParticipant =
                        await tx.eventParticipant.findFirst({
                            where: {
                                id: eventParticipantId,
                                eventId: event.id,
                                deletedAt: null,
                                participant: {
                                    deletedAt: null,
                                },
                            },
                            include: {
                                participant: true,
                            },
                        });

                    if (!eventParticipant) {
                        throw new AttendanceError(
                            "QR_NOT_FOUND",
                        );
                    }

                    const existingAttendance =
                        await tx.attendanceLog.findFirst({
                            where: {
                                eventParticipantId:
                                    eventParticipant.id,
                                type,
                            },
                        });

                    if (existingAttendance) {
                        throw new AttendanceError(
                            type === "CHECK_IN"
                                ? "ALREADY_CHECKED_IN"
                                : "ALREADY_CHECKED_OUT",
                        );
                    }

                    if (type === "CHECK_OUT") {
                        const checkIn =
                            await tx.attendanceLog.findFirst({
                                where: {
                                    eventParticipantId:
                                        eventParticipant.id,
                                    type: "CHECK_IN",
                                },
                            });

                        if (!checkIn) {
                            throw new AttendanceError(
                                "NOT_CHECKED_IN",
                            );
                        }
                    }

                    const attendance =
                        await tx.attendanceLog.create({
                            data: {
                                eventParticipantId:
                                    eventParticipant.id,
                                type,
                            },
                        });

                    return {
                        attendance,
                        participant: {
                            name: eventParticipant.participant.name,
                            participantCode:
                                eventParticipant.participantCode,
                        },
                    };
                },
                {
                    isolationLevel:
                        Prisma.TransactionIsolationLevel.Serializable,
                },
            );
        } catch (error) {
            if (
                error instanceof
                Prisma.PrismaClientKnownRequestError &&
                error.code === "P2034" &&
                attempt < MAX_TRANSACTION_RETRIES
            ) {
                continue;
            }

            throw error;
        }
    }

    throw new Error(
        "ATTENDANCE_TRANSACTION_FAILED",
    );
}