import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { EditEventForm } from "@/components/admin/edit-event-form";
import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { prisma } from "@/lib/db/prisma";

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
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-6">
            <header className="sticky top-5 z-20 mx-auto w-full max-w-7xl rounded-full bg-navy text-cream shadow-[0_4px_0_rgba(11,31,58,0.25)]">
                <div className="flex items-center justify-between rounded-full bg-navy px-4 py-2 text-cream sm:px-5">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3"
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Logo IKAMAMIIND 2100"
                            width={50}
                            height={50}
                            priority
                            className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                        />

                        <div className="flex flex-col -space-y-2 font-display leading-none tracking-wide">
                            <span className="text-xl sm:text-2xl">
                                IKAMAMIIND
                            </span>
                            <span className="text-2xl sm:text-3xl">
                                2100
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="hidden font-body text-sm font-bold text-sky sm:block">
                            ADMIN PANEL
                        </span>

                        <LogoutButton
                            className="border-none bg-transparent pr-2 font-body text-[16px] font-bold text-white transition-colors duration-300 hover:bg-transparent hover:text-lime"
                        />
                    </div>
                </div>
            </header>

            <div className="relative z-10 mx-auto max-w-4xl py-5">
                <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-8 shadow-[6px_6px_0_#B5FF2C] sm:px-10">
                    <div className="relative z-10">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            IKAMAMIIND 2100 | EVENT MANAGEMENT
                        </p>

                        <h1 className="mt-3 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl">
                            EDIT
                            <br />
                            EVENT
                        </h1>

                        <p className="mt-5 max-w-2xl font-body text-sm leading-6 text-sky sm:text-base">
                            Perbarui informasi event, jadwal, dan status
                            event yang sudah dibuat.
                        </p>
                    </div>

                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-lime sm:h-36 sm:w-36" />

                    <div className="absolute -bottom-12 right-24 h-24 w-32 rotate-12 rounded-2xl bg-sky/40" />
                </section>

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