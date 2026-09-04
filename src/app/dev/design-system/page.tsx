"use client";

import { useState } from "react";

import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { Input } from "@/components/shared/input";
import { Modal } from "@/components/shared/modal";

const colors = [
    {
        name: "Campus Blue",
        token: "campus-blue",
        hex: "#1264B3",
        className: "bg-campus-blue",
    },
    {
        name: "Deep Navy",
        token: "navy",
        hex: "#0B1F3A",
        className: "bg-navy",
    },
    {
        name: "Lime",
        token: "lime",
        hex: "#B8F23D",
        className: "bg-lime",
    },
    {
        name: "Yellow",
        token: "yellow",
        hex: "#FFD92F",
        className: "bg-yellow",
    },
    {
        name: "Pink",
        token: "pink",
        hex: "#FF4F9A",
        className: "bg-pink",
    },
    {
        name: "Cyan",
        token: "cyan",
        hex: "#A7E8F2",
        className: "bg-cyan",
    },
    {
        name: "Cream",
        token: "cream",
        hex: "#F7F3E8",
        className: "bg-cream",
    },
    {
        name: "Ink",
        token: "ink",
        hex: "#111111",
        className: "bg-ink",
    },
];

export default function DesignSystemPage() {
    const [modalOpen, setModalOpen] =
        useState(false);

    return (
        <main className="min-h-screen bg-cream px-6 py-12">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <header>
                    <Badge variant="lime">
                        DESIGN SYSTEM
                    </Badge>

                    <h1 className="mt-4 text-5xl font-black tracking-tight text-navy md:text-6xl">
                        Campus Fair UI
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-navy/65">
                        Visual foundation untuk landing
                        page, participant dashboard, admin,
                        dan scanner Campus Fair.
                    </p>
                </header>

                {/* Colors */}
                <section className="mt-16">
                    <SectionTitle
                        number="01"
                        title="Colors"
                    />

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {colors.map((color) => (
                            <div
                                key={color.token}
                                className="overflow-hidden rounded-2xl border border-navy/10 bg-white"
                            >
                                <div
                                    className={`h-28 ${color.className}`}
                                />

                                <div className="p-4">
                                    <p className="font-bold text-navy">
                                        {color.name}
                                    </p>

                                    <p className="mt-1 font-mono text-sm text-navy/50">
                                        {color.hex}
                                    </p>

                                    <p className="mt-2 text-xs text-navy/40">
                                        {color.token}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="mt-16">
                    <SectionTitle
                        number="02"
                        title="Typography"
                    />

                    <Card className="mt-6 p-8">
                        <p className="text-sm font-bold uppercase tracking-widest text-campus-blue">
                            Campus Fair 2027
                        </p>
                        <h1 className="font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-navy md:text-8xl">
                            Your Next
                            <br />
                            Chapter
                            <br />
                            Starts Here.
                        </h1>

                        <p className="mt-8 max-w-2xl text-base leading-7 text-navy/65">
                            Temukan informasi event,
                            kenali dunia perkuliahan,
                            dan mulai perjalananmu menuju
                            masa depan.
                        </p>
                    </Card>
                </section>

                {/* Buttons */}
                <section className="mt-16">
                    <SectionTitle
                        number="03"
                        title="Buttons"
                    />

                    <Card className="mt-6 p-8">
                        <div className="flex flex-wrap gap-4">
                            <Button>
                                Daftar Sekarang
                            </Button>

                            <Button variant="secondary">
                                Lihat Event
                            </Button>

                            <Button variant="outline">
                                Login
                            </Button>

                            <Button variant="danger">
                                Hapus Event
                            </Button>

                            <Button variant="ghost">
                                Batal
                            </Button>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button disabled>
                                Disabled
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* Cards */}
                <section className="mt-16">
                    <SectionTitle
                        number="04"
                        title="Cards"
                    />

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <Card className="p-6">
                            <Badge variant="blue">
                                CAMPUS FAIR 2027
                            </Badge>

                            <h3 className="mt-4 text-2xl font-black text-navy">
                                Kenali Dunia
                                Perkuliahan
                            </h3>

                            <p className="mt-3 leading-7 text-navy/65">
                                Dapatkan informasi
                                tentang dunia
                                perkuliahan dan
                                berbagai pilihan
                                kampus.
                            </p>

                            <div className="mt-6">
                                <Button>
                                    Lihat Detail
                                </Button>
                            </div>
                        </Card>

                        <Card className="border-0 bg-campus-blue p-6 text-white">
                            <Badge variant="lime">
                                EVENT
                            </Badge>

                            <h3 className="mt-4 text-2xl font-black">
                                Campus Fair 2027
                            </h3>

                            <p className="mt-3 leading-7 text-white/75">
                                20 Januari 2027
                            </p>

                            <div className="mt-6">
                                <Button variant="primary">
                                    Daftar Sekarang
                                </Button>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Badges */}
                <section className="mt-16">
                    <SectionTitle
                        number="05"
                        title="Badges"
                    />

                    <Card className="mt-6 p-8">
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="blue">
                                CAMPUS FAIR
                            </Badge>

                            <Badge variant="lime">
                                OPEN
                            </Badge>

                            <Badge variant="yellow">
                                UPCOMING
                            </Badge>

                            <Badge variant="pink">
                                NEW
                            </Badge>

                            <Badge variant="neutral">
                                CLOSED
                            </Badge>
                        </div>
                    </Card>
                </section>

                {/* Inputs */}
                <section className="mt-16">
                    <SectionTitle
                        number="06"
                        title="Inputs"
                    />

                    <Card className="mt-6 max-w-xl p-8">
                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-navy">
                                    Nama Lengkap
                                </label>

                                <Input
                                    placeholder="Masukkan nama kamu"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-navy">
                                    Email
                                </label>

                                <Input
                                    type="email"
                                    placeholder="nama@email.com"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-navy">
                                    Sekolah
                                </label>

                                <Input
                                    placeholder="Nama sekolah"
                                />
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Modal */}
                <section className="mt-16">
                    <SectionTitle
                        number="07"
                        title="Modal"
                    />

                    <Card className="mt-6 p-8">
                        <p className="mb-5 text-navy/65">
                            Komponen ini nanti bisa
                            dipakai untuk confirmation,
                            success, error, dan state
                            penting lainnya.
                        </p>

                        <Button
                            onClick={() =>
                                setModalOpen(true)
                            }
                        >
                            Buka Modal
                        </Button>
                    </Card>
                </section>

                {/* Design direction */}
                <section className="mt-16 pb-12">
                    <SectionTitle
                        number="08"
                        title="Visual Direction"
                    />

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <DirectionCard
                            color="bg-campus-blue"
                            title="Bold"
                            description="Warna kuat dan typography yang berani."
                        />

                        <DirectionCard
                            color="bg-lime"
                            title="Playful"
                            description="Accent warna cerah untuk energi anak muda."
                        />

                        <DirectionCard
                            color="bg-yellow"
                            title="Friendly"
                            description="Tetap hangat dan mudah digunakan."
                        />
                    </div>
                </section>
            </div>

            <Modal open={modalOpen}>
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-3xl font-black text-navy">
                        ✓
                    </div>

                    <h2 className="mt-5 text-2xl font-black text-navy">
                        Modal Berhasil
                    </h2>

                    <p className="mt-3 leading-7 text-navy/65">
                        Ini contoh modal dari Design
                        System Campus Fair.
                    </p>

                    <div className="mt-6">
                        <Button
                            onClick={() =>
                                setModalOpen(false)
                            }
                        >
                            Tutup
                        </Button>
                    </div>
                </div>
            </Modal>
        </main>
    );
}

type SectionTitleProps = {
    number: string;
    title: string;
};

function SectionTitle({
    number,
    title,
}: SectionTitleProps) {
    return (
        <div className="flex items-end gap-4">
            <span className="font-mono text-sm font-bold text-campus-blue">
                {number}
            </span>

            <h2 className="text-3xl font-black tracking-tight text-navy">
                {title}
            </h2>
        </div>
    );
}

type DirectionCardProps = {
    color: string;
    title: string;
    description: string;
};

function DirectionCard({
    color,
    title,
    description,
}: DirectionCardProps) {
    return (
        <div
            className={`rounded-2xl p-6 ${color}`}
        >
            <h3 className="text-2xl font-black text-navy">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-navy/70">
                {description}
            </p>
        </div>
    );
}