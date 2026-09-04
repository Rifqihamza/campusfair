import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { EditEventForm } from "@/components/admin/edit-event-form";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { getAdminEvent } from "@/services/admin/get-event";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminHero } from "@/components/admin/admin-hero";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditEventPage({ params }: Props) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    const { id } = await params;

    const event = await getAdminEvent(id);

    if (!event) {
        notFound();
    }

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-6">
            <AdminHeader />

            <div className="relative z-10 mx-auto max-w-4xl py-5">
                <AdminHero
                    eyebrow="IKAMAMIIND 2100 | EVENT MANAGEMENT"
                    title="EDIT EVENT"
                    description="Perbarui informasi event, jadwal, dan status event yang sudah dibuat."
                />

                <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-lime">
                            EVENT SETTINGS
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            {event.name}
                        </h2>
                    </div>

                    <Link
                        href="/admin/events"
                        className="shrink-0 font-body text-sm font-bold text-cream underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-lime"
                    >
                        ← Kembali
                    </Link>
                </div>

                <div className="mt-6">
                    <EditEventForm event={event} />
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}