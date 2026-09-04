import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { getAttendanceExportData } from "@/services/admin/attendance/get-attendance-export-data";

type RouteContext = {
    params: Promise<{
        eventId: string;
    }>;
};

function escapeCsv(
    value: string | number | null,
) {
    const stringValue =
        value == null ? "" : String(value);

    const safeValue =
        /^[=+\-@]/.test(stringValue)
            ? `'${stringValue}`
            : stringValue;

    if (
        safeValue.includes(",") ||
        safeValue.includes('"') ||
        safeValue.includes("\n")
    ) {
        return `"${safeValue.replace(/"/g, '""')}"`;
    }

    return safeValue;
}

export async function GET(
    _request: Request,
    { params }: RouteContext,
) {
    const session = await auth();

    if (
        !session?.user?.id ||
        !isAdmin(session.user.role)
    ) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 },
        );
    }

    const { eventId } = await params;

    const data =
        await getAttendanceExportData(eventId);

    if (!data) {
        return NextResponse.json(
            {
                message:
                    "Event tidak ditemukan",
            },
            { status: 404 },
        );
    }

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

    const rows = data.participants.map(
        (participant) => [
            participant.no,
            participant.userId,
            participant.name,
            participant.className,
            participant.major,
            participant.school,
            participant.status,
            participant.checkIn,
            participant.checkOut,
        ],
    );

    const csv = [
        headers.map(escapeCsv).join(","),
        ...rows.map((row) =>
            row.map(escapeCsv).join(","),
        ),
    ].join("\r\n");

    const csvWithBom = `\uFEFF${csv}`;

    return new NextResponse(csvWithBom, {
        status: 200,
        headers: {
            "Content-Type":
                "text/csv; charset=utf-8",
            "Content-Disposition":
                `attachment; filename="attendance-${data.event.slug}.csv"`,
        },
    });
}