"use client";

import { useRef } from "react";

import { DownloadTicketButton } from "@/components/participant/download-ticke-button";
import { ParticipantQr } from "@/components/participant/participant-qr";

type ParticipantTicketActionsProps = {
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

export function ParticipantTicketActions({
    event,
    eventParticipant,
}: ParticipantTicketActionsProps) {
    const ticketRef = useRef<HTMLDivElement>(null);
    const mobileQrRef = useRef<HTMLDivElement>(null);

    const safeEventName = event.name
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

    const fileName = `campus-fair-ticket-${safeEventName}-${eventParticipant.participantCode}.png`;
    const qrFileName = `campus-fair-qr-${eventParticipant.participantCode}.png`;

    return (
        <div className="space-y-6">
            {/* TICKET */}
            <div
                ref={ticketRef}
                className="w-full overflow-hidden rounded-3xl border-2 border-navy bg-cream shadow-[0_8px_0_#0B1F3A]"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* INFORMATION */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <p className="font-body text-xs font-black uppercase tracking-[0.2em] text-navy/50">
                            YOUR DIGITAL TICKET
                        </p>

                        <h2 className="mt-2 max-w-xl font-display text-5xl uppercase leading-[0.85] text-navy sm:text-6xl">
                            {event.name}
                        </h2>

                        <p className="mt-4 max-w-md font-body text-sm font-semibold leading-6 text-navy/60">
                            Tunjukkan QR Code ini kepada panitia saat
                            check-in dan check-out.
                        </p>

                        {/* Participant */}
                        <div className="mt-6">
                            <p className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-navy/50">
                                PESERTA
                            </p>

                            <p className="mt-2 font-display text-3xl uppercase leading-none text-navy sm:text-4xl">
                                {eventParticipant.participant.name}
                            </p>
                        </div>

                        {/* Participant Code */}
                        <div className="mt-4 inline-block">
                            <p className="font-body text-[10px] font-black uppercase tracking-[0.18em] text-navy/50">
                                NOMOR PESERTA
                            </p>

                            <p className="mt-2 rounded bg-navy px-3 py-1 font-mono text-sm font-black tracking-wider text-cream">
                                {eventParticipant.participantCode}
                            </p>
                        </div>

                        {/* Event */}
                        <div className="mt-6 border-t-2 border-dashed border-navy/20 pt-5">
                            <p className="font-body text-[10px] font-black uppercase tracking-[0.18em] text-navy/50">
                                EVENT
                            </p>

                            <p className="mt-1 font-body text-sm font-bold text-navy">
                                {event.name}
                            </p>
                        </div>
                    </div>

                    {/* QR AREA */}
                    <div
                        ref={mobileQrRef}
                        className="flex flex-col items-center justify-center border-t-2 border-dashed border-navy/30 bg-sky p-6 sm:p-8 lg:border-l-2 lg:border-t-0"
                    >
                        <p className="font-body text-xs font-black uppercase tracking-[0.2em] text-navy/50">
                            SCAN ME
                        </p>

                        <ParticipantQr
                            className="bg-none border-none shadow-none"
                            participantCode={eventParticipant.participantCode}
                            value={eventParticipant.qrToken}
                        />

                        <p className="text-center font-body text-xs font-semibold text-navy/60">
                            Scan QR Code ini saat check-in dan check-out.
                        </p>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="lg:hidden">
                <DownloadTicketButton
                    ticketRef={mobileQrRef}
                    fileName={qrFileName}
                />
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:block">
                <DownloadTicketButton
                    ticketRef={ticketRef}
                    fileName={fileName}
                />
            </div>
        </div>
    );
}