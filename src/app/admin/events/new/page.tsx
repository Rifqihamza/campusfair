import Link from "next/link";
import { redirect } from "next/navigation";

import { EventForm } from "@/components/admin/event-form";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminHero } from "@/components/admin/admin-hero";
export default async function NewEventPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-4">
            <AdminHeader />

            <div className="relative z-10 mx-auto max-w-7xl py-5">
                <AdminHero
                    eyebrow="IKAMAMIIND 2100 | EVENT MANAGEMENT"
                    title="BUAT EVENT"
                    description="Buat event baru untuk Campus Fair dan siapkan jadwal serta scanner untuk peserta."
                />

                <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-lime">
                            NEW EVENT
                        </p>

                        <h2 className="mt-1 font-display text-3xl leading-none text-cream sm:text-4xl">
                            Detail Event
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
                    <EventForm />
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-sky/50 to-lime" />
        </main>
    );
}