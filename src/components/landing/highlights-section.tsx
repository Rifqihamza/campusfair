import { GraphicCard } from "@/components/shared/graphic-card";

const highlights = [
    {
        number: "01",
        title: "Kenali Kampus",
        description:
            "Dapatkan informasi dan kenali berbagai pilihan kampus yang bisa menjadi tujuanmu.",
        accent: "lime" as const,
        rotate: "-1" as const,
    },
    {
        number: "02",
        title: "Eksplorasi Pilihan",
        description:
            "Temukan berbagai bidang studi dan peluang yang sesuai dengan minat serta rencanamu.",
        accent: "yellow" as const,
        rotate: "1" as const,
    },
    {
        number: "03",
        title: "Mulai Langkahmu",
        description:
            "Gunakan informasi yang kamu dapatkan untuk mempersiapkan langkah setelah sekolah.",
        accent: "cyan" as const,
        rotate: "-1" as const,
    },
];

export function HighlightsSection() {
    return (
        <section
            id="highlights"
            className="bg-sky py-16 text-navy md:py-20 relative"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-9">
                <div className="max-w-3xl">
                    <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-navy/60">
                        WHAT`S WAITING FOR YOU? 👀
                    </p>

                    <h2 className="mt-4 max-w-4xl font-display text-[clamp(4rem,10vw,8rem)] leading-[0.78] tracking-tight text-navy">
                        FIND YOUR
                        <br />
                        NEXT STEP.
                    </h2>

                    <p className="mt-6 max-w-2xl font-body text-base leading-6 text-navy md:text-xl">
                        Campus Fair bukan cuma tentang datang
                        dan melihat-lihat. Ini kesempatan buat kamu
                        untuk mencari tahu, mengeksplorasi, dan mulai
                        memikirkan langkahmu setelah lulus sekolah.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {highlights.map((item) => (
                        <GraphicCard
                            key={item.number}
                            accent={item.accent}
                            rotate={item.rotate}
                            className="p-6 md:p-7"
                        >
                            <span className="font-display text-6xl text-navy">
                                {item.number}
                            </span>

                            <h3 className="mt-6 font-heading text-2xl font-bold text-navy">
                                {item.title}
                            </h3>

                            <p className="mt-3 font-body leading-5 text-navy text-lg">
                                {item.description}
                            </p>
                        </GraphicCard>
                    ))}
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
        via-sky
        to-yellow
    "
            />

            <div
                className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-12
        bg-linear-to-b
        from-transparent
        to-yellow
    "
            />
        </section>
    );
}