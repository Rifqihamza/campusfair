import Link from "next/link";
import { notFound } from "next/navigation";

import { EventRegistration } from "@/components/dashboard/event-registration";
import { ParticipantQr } from "@/components/dashboard/participant-qr";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

type EventDetailPageProps = {
    params: Promise<{
        eventId: string;
    }>;
};

export default async function EventDetailPage({
    params,
}: EventDetailPageProps) {
    const { eventId } = await params;

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            isActive: true,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            description: true,
            startAt: true,
            endAt: true,
        },
    });

    if (!event) {
        notFound();
    }

    const session = await auth();

    let eventParticipant = null;

    if (session?.user?.id) {
        const participant =
            await prisma.participantProfile.findFirst({
                where: {
                    userId: session.user.id,
                    deletedAt: null,
                },
                select: {
                    id: true,
                },
            });

        if (participant) {
            eventParticipant =
                await prisma.eventParticipant.findFirst({
                    where: {
                        eventId: event.id,
                        participantId: participant.id,
                        deletedAt: null,
                    },
                });
        }
    }

    const now = new Date();
    const eventFinished = now > event.endAt;

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/events"
                    className="text-sm text-gray-600 hover:underline"
                >
                    ← Kembali ke Event
                </Link>

                <div className="mt-6">
                    <h1 className="text-3xl font-bold">
                        {event.name}
                    </h1>

                    {event.description && (
                        <div className="mt-4 whitespace-pre-line text-gray-600">
                            {event.description}
                        </div>
                    )}
                </div>

                <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">
                        Waktu Event
                    </h2>

                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                        <p>
                            Mulai:{" "}
                            {event.startAt.toLocaleString(
                                "id-ID",
                            )}
                        </p>

                        <p>
                            Selesai:{" "}
                            {event.endAt.toLocaleString(
                                "id-ID",
                            )}
                        </p>
                    </div>
                </section>

                {!session?.user?.id && (
                    <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">
                            Ingin mengikuti event ini?
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Login terlebih dahulu untuk
                            mendaftarkan diri ke event.
                        </p>

                        <Link
                            href="/login"
                            className="mt-4 inline-flex rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                        >
                            Login
                        </Link>
                    </section>
                )}

                {session?.user?.id &&
                    !eventParticipant &&
                    !eventFinished && (
                        <section className="mt-6">
                            <EventRegistration
                                eventId={event.id}
                                eventName={event.name}
                            />
                        </section>
                    )}

                {eventParticipant && (
                    <div className="mt-6 space-y-6">
                        <section className="rounded-xl border bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold">
                                Kamu sudah terdaftar
                            </h2>

                            <p className="mt-4 text-sm text-gray-600">
                                Kode peserta:
                            </p>

                            <p className="mt-1 font-mono font-semibold">
                                {
                                    eventParticipant.participantCode
                                }
                            </p>
                        </section>

                        <ParticipantQr
                            value={eventParticipant.qrToken}
                            participantCode={
                                eventParticipant.participantCode
                            }
                        />
                    </div>
                )}

                {eventFinished && !eventParticipant && (
                    <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-600">
                            Event ini sudah selesai dan
                            pendaftaran sudah ditutup.
                        </p>
                    </section>
                )}
            </div>
        </main>
    );
}