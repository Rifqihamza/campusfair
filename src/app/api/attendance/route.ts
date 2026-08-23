import { NextResponse } from "next/server";

import {
    Prisma,
    type AttendanceType,
} from "../../../../prisma/generated/client";

import { prisma } from "@/lib/db/prisma";
import { attendanceSchema } from "@/lib/validations/attendance";

const MAX_TRANSACTION_RETRIES = 3;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation =
            attendanceSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Data tidak valid.",
                },
                { status: 400 },
            );
        }

        const { scannerToken, qrToken } =
            validation.data;

        for (
            let attempt = 1;
            attempt <= MAX_TRANSACTION_RETRIES;
            attempt++
        ) {
            try {
                const result =
                    await prisma.$transaction(
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
                                throw new Error(
                                    "SCANNER_NOT_FOUND",
                                );
                            }

                            const now = new Date();

                            if (now < event.startAt) {
                                throw new Error(
                                    "EVENT_NOT_STARTED",
                                );
                            }

                            if (now > event.endAt) {
                                throw new Error(
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
                                throw new Error(
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
                                            scannedAt:
                                                "desc",
                                        },
                                    },
                                );

                            let attendanceType: AttendanceType;

                            if (!lastAttendance) {
                                attendanceType =
                                    "CHECK_IN";
                            } else if (
                                lastAttendance.type ===
                                "CHECK_IN"
                            ) {
                                attendanceType =
                                    "CHECK_OUT";
                            } else {
                                throw new Error(
                                    "ALREADY_CHECKED_OUT",
                                );
                            }

                            const attendance =
                                await tx.attendanceLog.create(
                                    {
                                        data: {
                                            eventParticipantId:
                                                eventParticipant.id,
                                            type: attendanceType,
                                        },
                                    },
                                );

                            return {
                                attendance,
                                participant: {
                                    name: eventParticipant
                                        .participant
                                        .name,
                                    participantCode:
                                        eventParticipant
                                            .participantCode,
                                },
                            };
                        },
                        {
                            isolationLevel:
                                Prisma.TransactionIsolationLevel.Serializable,
                        },
                    );

                return NextResponse.json({
                    success: true,
                    message:
                        result.attendance.type ===
                            "CHECK_IN"
                            ? "Check-in berhasil."
                            : "Check-out berhasil.",
                    data: {
                        type: result.attendance.type,
                        participant:
                            result.participant,
                        scannedAt:
                            result.attendance.scannedAt,
                    },
                });
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
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "SCANNER_NOT_FOUND"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Scanner tidak valid.",
                },
                { status: 404 },
            );
        }

        if (
            error instanceof Error &&
            error.message === "EVENT_NOT_STARTED"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event belum dimulai.",
                },
                { status: 409 },
            );
        }

        if (
            error instanceof Error &&
            error.message === "EVENT_FINISHED"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event sudah selesai.",
                },
                { status: 409 },
            );
        }

        if (
            error instanceof Error &&
            error.message === "QR_NOT_FOUND"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "QR peserta tidak valid.",
                },
                { status: 404 },
            );
        }

        if (
            error instanceof Error &&
            error.message === "ALREADY_CHECKED_OUT"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Peserta sudah melakukan check-out.",
                },
                { status: 409 },
            );
        }

        console.error(
            "Attendance API error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Terjadi kesalahan pada server.",
            },
            { status: 500 },
        );
    }
}