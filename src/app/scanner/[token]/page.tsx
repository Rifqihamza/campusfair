import { notFound } from "next/navigation";

import { ScannerPage } from "@/components/scanner/scanner-page";
import { prisma } from "@/lib/db/prisma";

type ScannerPageProps = {
    params: Promise<{
        token: string;
    }>;
};

export default async function ScannerRoutePage({
    params,
}: ScannerPageProps) {

    const { token } = await params;

    const event = await prisma.event.findFirst({
        where: {
            scannerToken: token,
            isActive: true,
            deletedAt: null,
        },
    });

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
