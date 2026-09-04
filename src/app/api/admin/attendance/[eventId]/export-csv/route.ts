import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";

type RouteContext = {
    params: Promise<{ eventId: string }>;
};

function formatDateTime(date: Date | null) {
    if (!date) return "";

    return new Intl.DateTimeFormat("id-ID", {
        timeZone: APP_TIMEZONE,
        dateStyle: "short",
        timeStyle: "medium",
    }).format(date);
}

function escapeCsv(value: string | number | null) {
    const stringValue = value == null ? "" : String(value);

    if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
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
            slug: true,
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
            createdAt: "asc",
        },
        include: {
            participant: true,
            attendanceLogs: {
                where: {
                    type: {
                        in: ["CHECK_IN", "CHECK_OUT"],
                    },
                },
                orderBy: {
                    scannedAt: "asc",
                },
            },
        },
    });

    const headers = [
        "No",
        "User ID",
        "Nama",
        "Kelas",
        "Jurusan",
        "Sekolah",
        "Status",
        "Check In",
        "Check Out",
    ];

    const rows = participants.map((item, index) => {
        const checkIn = item.attendanceLogs.find(
            (log) => log.type === "CHECK_IN"
        );

        const checkOut = item.attendanceLogs.find(
            (log) => log.type === "CHECK_OUT"
        );

        let status = "BELUM HADIR";

        if (checkIn && !checkOut) {
            status = "DI VENUE";
        }

        if (checkIn && checkOut) {
            status = "SUDAH KELUAR";
        }

        return [
            index + 1,
            item.participant.userId,
            item.participant.name,
            item.participant.class,
            item.participant.major,
            item.participant.school,
            status,
            formatDateTime(checkIn?.scannedAt ?? null),
            formatDateTime(checkOut?.scannedAt ?? null),
        ];
    });

    const csv = [
        headers.map(escapeCsv).join(","),
        ...rows.map((row) => row.map(escapeCsv).join(",")),
    ].join("\r\n");

    // UTF-8 BOM supaya Excel membaca karakter Indonesia dengan benar.
    const csvWithBom = `\uFEFF${csv}`;

    return new NextResponse(csvWithBom, {
        status: 200,
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="attendance-${event.slug}.csv"`,
        },
    });
}