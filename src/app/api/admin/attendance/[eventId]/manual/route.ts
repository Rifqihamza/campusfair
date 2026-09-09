import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { processManualAttendance } from "@/services/attendance/process-manual-attendance";
import { AttendanceError } from "@/services/attendance/attendance-error";

type Props = {
    params: Promise<{ eventId: string }>;
};

export async function POST(
    request: Request,
    { params }: Props,
) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 },
        );
    }

    if (!isAdmin(session.user.role)) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 },
        );
    }

    const { eventId } = await params;

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Request tidak valid" },
            { status: 400 },
        );
    }

    if (
        typeof body !== "object" ||
        body === null ||
        !("eventParticipantId" in body) ||
        typeof body.eventParticipantId !== "string" ||
        !body.eventParticipantId.trim()
    ) {
        return NextResponse.json(
            { message: "eventParticipantId wajib diisi" },
            { status: 400 },
        );
    }

    if (
        !("type" in body) ||
        (body.type !== "CHECK_IN" &&
            body.type !== "CHECK_OUT")
    ) {
        return NextResponse.json(
            { message: "Type attendance tidak valid" },
            { status: 400 },
        );
    }

    try {
        const result = await processManualAttendance(
            eventId,
            body.eventParticipantId,
            body.type,
        );

        return NextResponse.json({
            message:
                body.type === "CHECK_IN"
                    ? "Check-in berhasil dicatat"
                    : "Check-out berhasil dicatat",
            ...result,
        });
    } catch (error) {
        if (error instanceof AttendanceError) {
            const messages: Record<
                AttendanceError["code"],
                string
            > = {
                SCANNER_NOT_FOUND:
                    "Event tidak ditemukan atau sudah tidak aktif.",
                EVENT_NOT_STARTED:
                    "Event belum dimulai. Check-in belum dapat dicatat.",
                EVENT_FINISHED:
                    "Event sudah selesai. Kehadiran tidak dapat dicatat.",
                QR_NOT_FOUND:
                    "Data peserta tidak ditemukan pada event ini.",
                ALREADY_CHECKED_IN:
                    "Peserta sudah melakukan check-in sebelumnya.",
                ALREADY_CHECKED_OUT:
                    "Peserta sudah melakukan check-out sebelumnya.",
                NOT_CHECKED_IN:
                    "Peserta belum melakukan check-in, jadi belum bisa check-out.",
            };

            const status =
                error.code === "ALREADY_CHECKED_IN" ||
                    error.code === "ALREADY_CHECKED_OUT"
                    ? 409
                    : error.code === "EVENT_NOT_STARTED" ||
                        error.code === "EVENT_FINISHED"
                        ? 400
                        : 404;

            return NextResponse.json(
                {
                    message:
                        messages[error.code],
                    code: error.code,
                },
                { status },
            );
        }
    }
}