import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";

type RouteContext = {
    params: Promise<{ eventId: string }>;
};

function formatExcelDate(date: Date | null) {
    if (!date) return "";

    return new Intl.DateTimeFormat("id-ID", {
        timeZone: APP_TIMEZONE,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(date);
}

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    const session = await auth();

    if (!session?.user?.id || !isAdmin(session.user.role)) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { eventId } = await params;

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            startAt: true,
            endAt: true,
        },
    });

    if (!event) {
        return NextResponse.json(
            { message: "Event tidak ditemukan" },
            { status: 404 }
        );
    }

    const participants = await prisma.eventParticipant.findMany({
        where: {
            eventId: event.id,
            deletedAt: null,
            participant: {
                deletedAt: null,
            },
        },
        orderBy: {
            participantCode: "asc",
        },
        select: {
            participantCode: true,
            participant: {
                select: {
                    name: true,
                    class: true,
                },
            },
            attendanceLogs: {
                where: {
                    type: {
                        in: ["CHECK_IN", "CHECK_OUT"],
                    },
                },
                orderBy: {
                    scannedAt: "asc",
                },
                select: {
                    type: true,
                    scannedAt: true,
                },
            },
        },
    });

    const rows = participants.map((participant, index) => {
        const checkIn = participant.attendanceLogs.find(
            (log) => log.type === "CHECK_IN"
        );

        const checkOut = participant.attendanceLogs.find(
            (log) => log.type === "CHECK_OUT"
        );

        let status = "Belum Hadir";

        if (checkIn && checkOut) {
            status = "Selesai";
        } else if (checkIn) {
            status = "Sedang Hadir";
        }

        return {
            No: index + 1,
            "Nama Peserta": participant.participant.name,
            Kelas: participant.participant.class,
            "No. Peserta": participant.participantCode,
            Status: status,
            "Check In": checkIn
                ? formatExcelDate(checkIn.scannedAt)
                : "",
            "Check Out": checkOut
                ? formatExcelDate(checkOut.scannedAt)
                : "",
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
        { wch: 6 },
        { wch: 30 },
        { wch: 15 },
        { wch: 16 },
        { wch: 18 },
        { wch: 22 },
        { wch: 22 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Attendance"
    );

    const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
    });

    const filename = `attendance-${event.slug}.xlsx`;

    return new NextResponse(buffer, {
        status: 200,
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}