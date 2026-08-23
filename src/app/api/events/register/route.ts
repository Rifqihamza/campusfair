import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/auth";
import { isParticipant } from "@/lib/auth/permission";
import { registerParticipantToEvent } from "@/services/event-participant.service";

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                },
            );
        }

        if (!isParticipant(session.user.role)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Forbidden",
                },
                {
                    status: 403,
                },
            );
        }

        const body = await request.json();

        if (typeof body.eventId !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    message: "eventId wajib diisi",
                },
                {
                    status: 400,
                },
            );
        }

        const participant =
            await registerParticipantToEvent(
                session.user.id,
                body.eventId,
            );

        return NextResponse.json(
            {
                success: true,
                message:
                    "Participant registered to event",
                data: {
                    id: participant.id,
                    participantCode:
                        participant.participantCode,
                },
            },
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.message ===
            "PARTICIPANT_NOT_FOUND"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Data peserta tidak ditemukan",
                },
                {
                    status: 404,
                },
            );
        }

        if (
            error instanceof Error &&
            error.message === "EVENT_NOT_FOUND"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Event tidak ditemukan atau tidak aktif",
                },
                {
                    status: 404,
                },
            );
        }

        if (
            error instanceof Error &&
            error.message ===
            "EVENT_ALREADY_FINISHED"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event sudah selesai",
                },
                {
                    status: 409,
                },
            );
        }

        console.error(
            "Event registration error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Gagal mendaftarkan peserta ke event",
            },
            {
                status: 500,
            },
        );
    }
}