import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            success: true,
            message: "Database connection is healty",
        });
    } catch (error) {
        console.error("Database health check failer: ", error);

        return NextResponse.json({
            success: false,
            message: "Database connection failed",
        },
            {
                status: 500
            }
        )
    }
}