import { NextResponse } from "next/server";

import * as XLSX from "xlsx";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { getAttendanceExportData } from "@/services/admin/attendance/get-attendance-export-data";

type RouteContext = {
    params: Promise<{
        eventId: string;
    }>;
};

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

    const rows = data.participants.map(
        (participant) => ({
            No: participant.no,
            "Nama Peserta": participant.name,
            Kelas: participant.className,
            "No. Peserta":
                participant.participantCode,
            Status: formatStatusForExcel(
                participant.status,
            ),
            "Check In": participant.checkIn,
            "Check Out": participant.checkOut,
        }),
    );

    const worksheet =
        XLSX.utils.json_to_sheet(rows);

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
        "Attendance",
    );

    const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
    });

    const filename =
        `attendance-${data.event.slug}.xlsx`;

    return new NextResponse(buffer, {
        status: 200,
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition":
                `attachment; filename="${filename}"`,
        },
    });
}

function formatStatusForExcel(
    status: string,
) {
    switch (status) {
        case "DI VENUE":
            return "Sedang Hadir";

        case "SUDAH KELUAR":
            return "Selesai";

        default:
            return "Belum Hadir";
    }
}