import { NextResponse } from "next/server";
import type { AttendanceType } from "../../../../prisma/generated/enums";
import { prisma } from "@/lib/db/prisma";
import { attendanceSchema } from "@/lib/validations/attendance";

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

        const event = await prisma.event.findFirst({
            where: {
                scannerToken,
                isActive: true,
                deletedAt: null,
            },
        });

        if (!event) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Scanner tidak valid.",
                },
                { status: 404 },
            );
        }

        const eventParticipant =
            await prisma.eventParticipant.findFirst({
                where: {
                    eventId: event.id,
                    qrToken,
                    deletedAt: null,
                },
                include: {
                    participant: true,
                },
            });

        if (!eventParticipant) {
            return NextResponse.json(
                {
                    success: false,
                    message: "QR peserta tidak valid.",
                },
                { status: 404 },
            );
        }

        const lastAttendance =
            await prisma.attendanceLog.findFirst({
                where: {
                    eventParticipantId:
                        eventParticipant.id,
                },
                orderBy: {
                    scannedAt: "desc",
                },
            });
        let attendanceType: AttendanceType;

        if (!lastAttendance) {
            attendanceType = "CHECK_IN";
        } else if (lastAttendance.type === "CHECK_IN") {
            attendanceType = "CHECK_OUT";
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Peserta sudah melakukan check-out.",
                },
                { status: 409 },
            );
        }

        const attendance =
            await prisma.attendanceLog.create({
                data: {
                    eventParticipantId:
                        eventParticipant.id,
                    type: attendanceType,
                },
            });

        return NextResponse.json({
            success: true,
            message:
                attendanceType === "CHECK_IN"
                    ? "Check-in berhasil."
                    : "Check-out berhasil.",
            data: {
                type: attendance.type,
                participant: {
                    name: eventParticipant.participant.name,
                    participantCode:
                        eventParticipant.participantCode,
                },
                scannedAt:
                    attendance.scannedAt,
            },
        });
    } catch (error) {
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