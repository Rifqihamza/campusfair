import { redirect } from "next/navigation";

import { EventRegistration } from "@/components/dashboard/event-registration";
import { ParticipantQr } from "@/components/dashboard/participant-qr";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const participant = await prisma.participantProfile.findFirst({
        where: {
            userId: session.user.id,
            deletedAt: null,
        },
    });

    if (!participant) {
        return (
            <main className="p-8">
                <h1 className="text-2xl font-bold">
                    Data peserta tidak ditemukan
                </h1>
            </main>
        );
    }

    const activeEvent = await prisma.event.findFirst({
        where: {
            isActive: true,
            deletedAt: null,
        },
        orderBy: {
            startAt: "asc",
        },
    });

    const eventParticipant = activeEvent
        ? await prisma.eventParticipant.findFirst({
            where: {
                eventId: activeEvent.id,
                participantId: participant.id,
                deletedAt: null,
            },
        })
        : null;

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <div className="flex items-center justify-between">
                    <p className="mt-2 text-gray-600">
                        Halo, {participant.name}!
                    </p>
                    <LogoutButton />
                </div>

                <div className="mt-8">
                    {activeEvent && !eventParticipant && (
                        <EventRegistration
                            eventId={activeEvent.id}
                            eventName={activeEvent.name}
                        />
                    )}

                    {activeEvent && eventParticipant && (
                        <div className="space-y-6">
                            <section className="rounded-xl border bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold">
                                    Kamu sudah terdaftar
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Kode peserta:
                                </p>

                                <p className="mt-1 font-mono font-semibold">
                                    {eventParticipant.participantCode}
                                </p>
                            </section>

                            <ParticipantQr
                                value={eventParticipant.qrToken}
                                participantCode={eventParticipant.participantCode}
                            />
                        </div>
                    )}

                    {!activeEvent && (
                        <section className="rounded-xl border bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-600">
                                Belum ada event yang sedang dibuka.
                            </p>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}