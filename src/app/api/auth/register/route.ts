import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { registerParticipant } from "@/services/auth/register-participant";

export async function POST(request: Request) {
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

    try {
        const result = await registerParticipant(
            body as Parameters<typeof registerParticipant>[0],
        );

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                data: result,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Data registrasi tidak valid",
                    errors: error.flatten().fieldErrors,
                },
                {
                    status: 400,
                },
            );
        }

        if (
            error instanceof Error &&
            error.message === "EMAIL_ALREADY_REGISTERED"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email sudah terdaftar",
                },
                {
                    status: 409,
                },
            );
        }

        console.error("Registration error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan saat registrasi",
            },
            {
                status: 500,
            },
        );
    }
}