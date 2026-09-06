import { notFound, redirect } from "next/navigation";

import { ParticipantHeader } from "@/components/participant/participant-header";
import { ParticipantHero } from "@/components/participant/participant-hero";
import { ParticipantTicketActions } from "@/lib/actions/participant/participant-ticket-actions";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

import { auth } from "@/lib/auth/auth";
import { isParticipant } from "@/lib/auth/permission";
import { getEventTicket } from "@/services/participant/get-event-ticket";
type TicketPageProps = {
    params: Promise<{ eventId: string }>;
};

export default async function TicketPage({
    params,
}: TicketPageProps) {
    const session = await auth();
    const { eventId } = await params;

    if (!session?.user) {
        redirect("/login");
    }

    if (!isParticipant(session.user.role)) {
        redirect("/admin");
    }

    const { event, eventParticipant } = await getEventTicket(
        eventId,
        session.user.id,
    );

    if (!event) {
        notFound();
    }

    if (!eventParticipant) {
        redirect(`/events/${event.id}`);
    }

    return (
        <main className="relative min-h-dvh bg-campus-blue px-4">
            <ParticipantHeader activePage="events" />

            <div className="relative z-10 mx-auto max-w-7xl py-5">
                <div className="mt-4 px-5">
                    <Breadcrumbs
                        items={[
                            {
                                label: "Event",
                                href: "/events",
                            },
                            {
                                label: event.name,
                                href: `/events/${event.id}`,
                            },
                            {
                                label: "Tiket",
                            },
                        ]}
                    />
                </div>
                <ParticipantHero
                    eyebrow="TIKET EVENT"
                    title={event.name}
                    description="Tunjukkan QR Code ini kepada panitia saat check-in dan check-out event."
                />
                {/* TICKET */}
                <section className="relative mt-10">
                    <ParticipantTicketActions
                        event={event}
                        eventParticipant={eventParticipant}
                    />
                </section>

                {/* FOOTER NOTE */}
                <p className="mx-auto mt-8 max-w-xl text-center font-body text-xs font-bold leading-relaxed text-cream/70">
                    Simpan halaman ini dan pastikan QR Code terlihat jelas
                    ketika akan melakukan scan.
                </p>
            </div>
        </main>
    );
}