"use client";

import { QRCodeSVG } from "qrcode.react";

type ParticipantQrProps = {
    value: string;
    participantCode: string;
};

export function ParticipantQr({
    value,
    participantCode,
}: ParticipantQrProps) {
    return (
        <section className="rounded-3xl border-2 border-navy bg-sky p-5 shadow-[0px_6px_0_#0B1F3A] sm:p-6">
            <div className="text-center md:text-left">
                <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/65">
                    YOUR TICKET
                </p>

                <h2 className="mt-2 font-display text-4xl leading-none">
                    QR CODE
                </h2>

                <p className="mt-3 text-center font-body text-md leading-5 text-navy md:text-left">
                    Tunjukkan QR code ini kepada panitia saat check-in dan
                    check-out.
                </p>
            </div>

            <div className="mt-6 flex justify-center">
                <div className="rounded-2xl border-4 border-navy bg-white p-5">
                    <QRCodeSVG
                        value={value}
                        size={200}
                        level="H"
                        marginSize={2}
                    />
                </div>
            </div>

            <div className="mt-6 rounded-xl bg-navy p-4 text-center">
                <p className="font-body text-xs uppercase tracking-wider text-white/50">
                    Kode Peserta
                </p>

                <p className="mt-1 font-mono text-lg font-bold tracking-wide text-lime">
                    {participantCode}
                </p>
            </div>
        </section>
    );
}