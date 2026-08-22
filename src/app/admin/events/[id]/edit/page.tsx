import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";
import { EditEventForm } from "@/components/admin/edit-event-form";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditEventPage({
    params,
}: Props) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const { id } = await params;

    const event = await prisma.event.findFirst({
        where: {
            id,
            deletedAt: null,
        },
    });

    if (!event) {
        notFound();
    }

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-xl">
                <h1 className="text-3xl font-bold">
                    Edit Event
                </h1>

                <div className="mt-6">
                    <EditEventForm
                        event={event}
                    />
                </div>
            </div>
        </main>
    );
}