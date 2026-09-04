import { notFound } from "next/navigation";

import { ScannerPage } from "@/components/scanner/scanner-page";
import { getScannerEvent } from "@/services/attendance/get-scanner-event";

type ScannerPageProps = {
    params: Promise<{
        token: string;
    }>;
};

export default async function ScannerRoutePage({
    params,
}: ScannerPageProps) {
    const { token } = await params;

    const event = await getScannerEvent(token);

    if (!event) {
        notFound();
    }

    return (
        <ScannerPage
            eventName={event.name}
            scannerToken={event.scannerToken}
        />
    );
}