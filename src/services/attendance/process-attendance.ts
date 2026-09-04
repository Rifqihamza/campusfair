import {
    Prisma,
    type AttendanceType,
} from "../../../prisma/generated/client";

import { prisma } from "@/lib/db/prisma";

import { AttendanceError } from "./attendance-error";

const MAX_TRANSACTION_RETRIES = 3;

export async function processAttendance(
    scannerToken: string,
    qrToken: string,
) {
    for (
        let attempt = 1;
        attempt <= MAX_TRANSACTION_RETRIES;
        attempt++
    ) {
        try {
            return await prisma.$transaction(
                async (tx) => {
                    const event =
                        await tx.event.findFirst({
                            where: {
                                scannerToken,
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
                        await tx.eventParticipant.findFirst(
                            {
                                where: {
                                    eventId: event.id,
                                    qrToken,
                                    deletedAt: null,
                                    participant: {
                                        deletedAt: null,
                                    },
                                },
                                include: {
                                    participant: true,
                                },
                            },
                        );

                    if (!eventParticipant) {
                        throw new AttendanceError(
                            "QR_NOT_FOUND",
                        );
                    }

                    const lastAttendance =
                        await tx.attendanceLog.findFirst(
                            {
                                where: {
                                    eventParticipantId:
                                        eventParticipant.id,
                                },
                                orderBy: {
                                    scannedAt: "desc",
                                },
                            },
                        );

                    let attendanceType: AttendanceType;

                    if (!lastAttendance) {
                        attendanceType = "CHECK_IN";
                    } else if (
                        lastAttendance.type ===
                        "CHECK_IN"
                    ) {
                        attendanceType = "CHECK_OUT";
                    } else {
                        throw new AttendanceError(
                            "ALREADY_CHECKED_OUT",
                        );
                    }

                    const attendance =
                        await tx.attendanceLog.create({
                            data: {
                                eventParticipantId:
                                    eventParticipant.id,
                                type: attendanceType,
                            },
                        });

                    return {
                        attendance,
                        participant: {
                            name: eventParticipant
                                .participant.name,
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