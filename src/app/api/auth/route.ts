import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { registerParticipant } from "@/services/auth.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = await registerParticipant(body);

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