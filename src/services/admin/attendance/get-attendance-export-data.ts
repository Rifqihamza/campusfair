import { prisma } from "@/lib/db/prisma";
import { APP_TIMEZONE } from "@/lib/utils/date";

function formatDateTime(date: Date | null) {
    if (!date) return "";

    return new Intl.DateTimeFormat("id-ID", {
        timeZone: APP_TIMEZONE,
        dateStyle: "short",
        timeStyle: "medium",
    }).format(date);
}

export async function getAttendanceExportData(
    eventId: string,
) {
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
        return null;
    }

    const participants =
        await prisma.eventParticipant.findMany({
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
                        userId: true,
                        name: true,
                        class: true,
                        major: true,
                        school: true,
                    },
                },
                attendanceLogs: {
                    where: {
                        type: {
                            in: [
                                "CHECK_IN",
                                "CHECK_OUT",
                            ],
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

    const data = participants.map(
        (participant, index) => {
            const checkIn =
                participant.attendanceLogs.find(
                    (log) =>
                        log.type === "CHECK_IN",
                );

            const checkOut =
                participant.attendanceLogs.find(
                    (log) =>
                        log.type === "CHECK_OUT",
                );

            let status = "BELUM HADIR";

            if (checkIn && checkOut) {
                status = "SUDAH KELUAR";
            } else if (checkIn) {
                status = "DI VENUE";
            }

            return {
                no: index + 1,
                userId: participant.participant.userId,
                name: participant.participant.name,
                className:
                    participant.participant.class,
                major: participant.participant.major,
                school:
                    participant.participant.school,
                participantCode:
                    participant.participantCode,
                status,
                checkIn: formatDateTime(
                    checkIn?.scannedAt ?? null,
                ),
                checkOut: formatDateTime(
                    checkOut?.scannedAt ?? null,
                ),
            };
        },
    );

    return {
        event,
        participants: data,
    };
}