import { NextResponse } from "next/server";

import { AttendanceError } from "@/services/attendance/attendance-error";
import { processAttendance } from "@/services/attendance/process-attendance";

import { attendanceSchema } from "@/lib/validations/attendance";

export async function POST(request: Request) {
    try {
        let body: unknown;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Request body tidak valid.",
                },
                {
                    status: 400,
                },
            );
        }

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

        const result = await processAttendance(
            scannerToken,
            qrToken,
        );

        return NextResponse.json({
            success: true,
            message:
                result.attendance.type === "CHECK_IN"
                    ? "Check-in berhasil."
                    : "Check-out berhasil.",
            data: {
                type: result.attendance.type,
                participant: result.participant,
                scannedAt:
                    result.attendance.scannedAt,
            },
        });
    } catch (error) {
        if (error instanceof AttendanceError) {
            switch (error.code) {
                case "SCANNER_NOT_FOUND":
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "Scanner tidak valid.",
                        },
                        { status: 404 },
                    );

                case "EVENT_NOT_STARTED":
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "Event belum dimulai.",
                        },
                        { status: 409 },
                    );

                case "EVENT_FINISHED":
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "Event sudah selesai.",
                        },
                        { status: 409 },
                    );

                case "QR_NOT_FOUND":
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "QR peserta tidak valid.",
                        },
                        { status: 404 },
                    );

                case "ALREADY_CHECKED_OUT":
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "Peserta sudah melakukan check-out.",
                        },
                        { status: 409 },
                    );
            }
        }

        console.error(
            "Scanner attendance API error:",
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