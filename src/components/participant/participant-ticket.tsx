import { forwardRef } from "react";

import { ParticipantQr } from "@/components/participant/participant-qr";
import { formatDate, formatTime } from "@/lib/utils/format-date";

type ParticipantTicketProps = {
    event: {
        name: string;
        startAt: Date;
        endAt: Date;
    };

    eventParticipant: {
        participantCode: string;
        qrToken: string;

        participant: {
            name: string;
            class: string | null;
            phone: string;
        };
    };
};

export const ParticipantTicket = forwardRef<
    HTMLDivElement,
    ParticipantTicketProps
>(function ParticipantTicket(
    {
        event,
        eventParticipant,
    },
    ref,
) {
    return (
        <div
            ref={ref}
            className="overflow-hidden rounded-3xl border-2 border-navy bg-cream shadow-[0_8px_0_#0B1F3A]"
        >
            {/* =================================================
                PARTICIPANT
            ================================================== */}
            <div className="border-b-2 border-dashed border-navy/30 px-6 py-6 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="font-body text-xs font-black uppercase tracking-[0.18em] text-navy/50">
                            Peserta
                        </p>

                        <h2 className="mt-1 font-display text-3xl uppercase leading-none text-navy sm:text-4xl">
                            {eventParticipant.participant.name}
                        </h2>
                    </div>

                    <span className="shrink-0 rounded-full border-2 border-navy bg-lime px-3 py-1 font-body text-xs font-black uppercase text-navy">
                        Aktif
                    </span>
                </div>
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* INFORMATION */}
                <div className="px-6 py-8 sm:px-8">
                    <p className="font-body text-xs font-black uppercase tracking-[0.18em] text-navy/50">
                        Your Ticket
                    </p>

                    <h3 className="mt-2 font-display text-5xl uppercase leading-none text-navy">
                        QR Code
                    </h3>

                    <p className="mt-4 max-w-md font-body text-sm font-semibold leading-6 text-navy/70">
                        Tunjukkan QR Code ini kepada panitia saat masuk dan
                        keluar dari event.
                    </p>

                    {/* Participant Code */}
                    <div className="mt-8">
                        <p className="font-body text-xs font-black uppercase tracking-[0.2em] text-navy/50">
                            Nomor Peserta
                        </p>

                        <p className="mt-1 font-display text-4xl tracking-wide text-navy sm:text-5xl">
                            {eventParticipant.participantCode}
                        </p>
                    </div>

                    {/* Event */}
                    <div className="mt-8">
                        <p className="font-body text-xs font-black uppercase tracking-[0.2em] text-navy/50">
                            Event
                        </p>

                        <p className="mt-1 font-display text-3xl uppercase leading-none text-navy">
                            {event.name}
                        </p>
                    </div>
                </div>

                {/* QR */}
                <div className="flex w-full items-center justify-center border-t-2 border-dashed border-navy/30 p-6 lg:border-l-2 lg:border-t-0">
                    <ParticipantQr value={eventParticipant.qrToken} />
                </div>
            </div>

            {/* =================================================
                EVENT INFO
            ================================================== */}
            <div className="w-full border-t-2 border-dashed border-navy/30 bg-sky px-6 py-6 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2">
                    {/* START */}
                    <div>
                        <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-navy/50">
                            Mulai
                        </p>

                        <p className="mt-1 font-body text-sm font-black text-navy">
                            {formatDate(event.startAt)}
                        </p>

                        <p className="font-body text-sm font-bold text-navy/70">
                            {formatTime(event.startAt)} WIB
                        </p>
                    </div>

                    {/* END */}
                    <div>
                        <p className="font-body text-xs font-black uppercase tracking-[0.15em] text-navy/50">
                            Selesai
                        </p>

                        <p className="mt-1 font-body text-sm font-black text-navy">
                            {formatDate(event.endAt)}
                        </p>

                        <p className="font-body text-sm font-bold text-navy/70">
                            {formatTime(event.endAt)} WIB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});