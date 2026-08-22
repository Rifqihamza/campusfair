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
        <section className="rounded-xl border bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-lg font-semibold">
                    QR Code Peserta
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Tunjukkan QR code ini kepada panitia saat check-in
                    dan check-out.
                </p>
            </div>

            <div className="mt-6 flex justify-center">
                <div className="rounded-xl border bg-white p-4">
                    <QRCodeSVG
                        value={value}
                        size={240}
                        level="M"
                    />
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    Kode Peserta
                </p>

                <p className="mt-1 font-mono text-lg font-semibold">
                    {participantCode}
                </p>
            </div>
        </section>
    );
}