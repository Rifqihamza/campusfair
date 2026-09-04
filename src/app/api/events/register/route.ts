import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/auth";
import { isParticipant } from "@/lib/auth/permission";
import { registerParticipantToEvent } from "@/services/participant/register-to-event";
import { registerEventSchema } from "@/lib/validations/event";

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

        let body: unknown;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Request body tidak valid",
                },
                {
                    status: 400,
                },
            );
        }

        const validation = registerEventSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "eventId tidak valid",
                },
                {
                    status: 400,
                },
            );
        }

        const participant =
            await registerParticipantToEvent(
                session.user.id,
                validation.data.eventId,
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