export interface Highlights {
    number: string
    title: string
    description: string
    accent: string
    rotate: string
}

export const highlightsData: Highlights[] = [
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
]