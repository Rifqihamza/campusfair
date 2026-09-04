import Link from "next/link";

export function EventInfoSection() {
    return (
        <section
            id="info"
            className="bg-yellow py-7 md:py-8 relative"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-9">
                <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-8">
                    <div>
                        <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-navy/60">
                            SAVE THE DATE
                        </p>

                        <h2 className="mt-5 font-display text-[clamp(6rem,15vw,11rem)] leading-[0.72] tracking-tight text-navy">
                            20
                            <br />
                            JAN
                            <br />
                            2027
                        </h2>
                    </div>

                    <div>
                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                WAKTU
                            </p>

                            <p className="mt-2 font-heading text-2xl font-bold text-navy">
                                08.00 — Selesai
                            </p>
                        </div>

                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                LOKASI
                            </p>

                            <p className="mt-2 font-heading text-2xl font-bold text-navy">
                                SMK Mitra Industri MM2100 (Aula Gd. F)
                            </p>
                        </div>

                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                STATUS
                            </p>

                            <p className="mt-2 font-heading text-2xl font-bold text-navy">
                                Pendaftaran Dibuka
                            </p>
                        </div>

                        <Link
                            href="/register"
                            className="mt-4 inline-flex rounded-lg border-2 border-navy bg-navy px-6 py-3 font-body font-bold text-white shadow-[5px_5px_0_#F7F3E8] transition-[transform,box-shadow] duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_#F7F3E8]"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-64
        bg-linear-to-b
        from-transparent
        via-yellow
        to-campus-blue
    "
            />

            <div
                className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-28
        bg-linear-to-b
        from-transparent
        to-campus-blue
    "
            />
        </section>
    );
}