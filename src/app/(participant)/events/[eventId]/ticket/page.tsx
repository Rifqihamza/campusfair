import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { isParticipant } from "@/lib/auth/permission";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { formatDate, formatTime } from "@/lib/utils/format-date";
import { ParticipantQr } from "@/components/dashboard/participant-qr";

type TicketPageProps = {
    params: Promise<{ eventId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
    const session = await auth();
    const { eventId } = await params;

    if (!session?.user) {
        redirect("/login");
    }

    if (!isParticipant(session.user.role)) {
        redirect("/admin");
    }

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            isActive: true,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            startAt: true,
            endAt: true,
        },
    });

    if (!event) {
        notFound();
    }

    const eventParticipant = await prisma.eventParticipant.findFirst({
        where: {
            eventId: event.id,
            deletedAt: null,
            participant: {
                userId: session.user.id,
                deletedAt: null,
            },
        },
        select: {
            id: true,
            participantCode: true,
            qrToken: true,
            participant: {
                select: {
                    name: true,
                    class: true,
                    phone: true,
                },
            },
        },
    });

    if (!eventParticipant) {
        redirect(`/events/${event.id}`);
    }

    return (
        <main className="relative min-h-dvh overflow-hidden bg-campus-blue px-6">
            {/* NAVBAR */}
            <header className="sticky top-5 z-20 mx-auto w-full max-w-7xl rounded-full bg-navy text-cream shadow-[0_4px_0_rgba(11,31,58,0.25)]">
                <div className="flex items-center justify-between px-4 py-2 sm:px-5">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <Image src="/logo.jpg" alt="Logo IKAMAMIIND 2100" width={50} height={50} priority className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" />

                        <div className="flex flex-col -space-y-2 font-display leading-none tracking-wide">
                            <span className="text-xl sm:text-2xl">IKAMAMIIND</span>
                            <span className="text-2xl sm:text-3xl">2100</span>
                        </div>
                    </Link>

                    <Link
                        href="/events"
                        className="pr-5 font-body text-sm font-bold text-cream transition-colors duration-300 hover:text-lime"
                    >
                        Event
                    </Link>
                </div>
            </header>

            <div className="relative z-10 mx-auto max-w-7xl py-5">
                {/* BREADCRUMBS */}
                <div className="mt-4 px-5">
                    <Breadcrumbs
                        items={[
                            {
                                label: "Event",
                                href: "/events",
                            },
                            {
                                label: event.name,
                                href: `/events/${event.id}`,
                            },
                            {
                                label: "Tiket",
                            },
                        ]}
                    />
                    {/* HERO */}
                    <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-10 shadow-[0px_8px_0_#B5FF2C] sm:px-10 sm:py-12">
                        <div className="relative z-10 max-w-4xl">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                                Tiket Event
                            </p>

                            <h1 className="mt-3 font-display text-6xl leading-[0.8] tracking-tight text-cream md:text-8xl">
                                {event.name}
                            </h1>

                            <p className="mt-2 max-w-2xl font-semibold text-sm leading-6 text-sky sm:text-base">
                                Tunjukkan QR Code ini kepada panitia saat check-in
                                dan check-out event.
                            </p>
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lime sm:h-44 sm:w-44" />

                        {/* Decorative Shape */}
                        <div className="absolute -bottom-12 right-28 h-28 w-36 rotate-12 rounded-2xl bg-sky/30" />

                        {/* Small Circle */}
                        <div className="absolute bottom-12 right-72 hidden h-10 w-10 rounded-full bg-pink lg:block" />
                    </section>

                    {/* TICKET */}
                    <section className="relative mt-10">
                        <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border-2 border-navy bg-cream shadow-[0_8px_0_#0B1F3A]">
                            {/* TICKET HEADER */}
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

                            {/* QR */}
                            <div className="px-6 py-5">
                                <div className="mx-auto max-w-xl rounded-3xl border-2 border-navy bg-white p-5 shadow-[0_5px_0_#0B1F3A] sm:p-7">
                                    <ParticipantQr value={eventParticipant.qrToken} participantCode={eventParticipant.participantCode} />
                                </div>

                                <div className="mt-7 text-center">
                                    <p className="font-body text-xs font-black uppercase tracking-[0.2em] text-navy/50">
                                        Nomor Peserta
                                    </p>

                                    <p className="mt-1 font-display text-4xl tracking-wide text-navy sm:text-5xl">
                                        {eventParticipant.participantCode}
                                    </p>
                                </div>

                                <div className="mx-auto mt-7 max-w-md rounded-2xl border-2 border-navy/20 bg-sky/50 px-5 py-4 text-center">
                                    <p className="font-body text-sm font-bold leading-relaxed text-navy">
                                        Tunjukkan QR Code ini kepada panitia saat
                                        masuk dan keluar dari event.
                                    </p>
                                </div>
                            </div>

                            {/* EVENT INFO */}
                            <div className="border-t-2 border-dashed border-navy/30 bg-sky px-6 py-6 sm:px-8">
                                <div className="grid gap-5 sm:grid-cols-2">
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
                    </section>

                    {/* FOOTER NOTE */}
                    <p className="mx-auto mt-8 max-w-xl text-center font-body text-xs font-bold leading-relaxed text-cream/70">
                        Simpan halaman ini dan pastikan QR Code terlihat jelas
                        ketika akan melakukan scan.
                    </p>
                </ div>
            </div>
        </main>
    );
}