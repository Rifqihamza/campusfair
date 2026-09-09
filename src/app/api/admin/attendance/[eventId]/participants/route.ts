import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { searchEventParticipants } from "@/services/admin/attendance/search-event-participants";

type Props = {
    params: Promise<{
        eventId: string;
    }>;
};

export async function GET(
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
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") ?? "";

    if (!query.trim()) {
        return NextResponse.json({ participants: [] });
    }

    const participants =
        await searchEventParticipants(
            eventId,
            query,
        );

    return NextResponse.json({ participants });
}