"use client";

import { createEvent } from "@/app/admin/events/actions";

export function EventForm() {
    return (
        <form
            action={createEvent}
            className="rounded-3xl border-2 border-navy bg-sky p-6 shadow-[6px_6px_0_#0B1F3A] sm:p-8"
        >
            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="font-body text-sm font-bold text-navy"
                    >
                        Nama Event
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Campus Fair 2027"
                        className="mt-2 w-full rounded-xl border-2 border-navy bg-cream px-4 py-3 font-body text-sm text-navy outline-none transition-shadow placeholder:text-navy/40 focus:shadow-[4px_4px_0_#0B1F3A]"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="font-body text-sm font-bold text-navy"
                    >
                        Deskripsi
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        placeholder="Jelaskan tentang event..."
                        className="mt-2 w-full resize-none rounded-xl border-2 border-navy bg-cream p-4 font-body text-sm text-navy outline-none transition-shadow placeholder:text-navy/40 focus:shadow-[4px_4px_0_#0B1F3A]"
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="startAt"
                            className="font-body text-sm font-bold text-navy"
                        >
                            Mulai
                        </label>

                        <input
                            id="startAt"
                            name="startAt"
                            type="datetime-local"
                            required
                            className="mt-2 w-full rounded-xl border-2 border-navy bg-cream px-4 py-3 font-body text-sm text-navy outline-none transition-shadow focus:shadow-[4px_4px_0_#0B1F3A]"
                        />

                        <p className="mt-2 font-body text-xs font-medium text-navy/50">
                            Waktu menggunakan WIB.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="endAt"
                            className="font-body text-sm font-bold text-navy"
                        >
                            Selesai
                        </label>

                        <input
                            id="endAt"
                            name="endAt"
                            type="datetime-local"
                            required
                            className="mt-2 w-full rounded-xl border-2 border-navy bg-cream px-4 py-3 font-body text-sm text-navy outline-none transition-shadow focus:shadow-[4px_4px_0_#0B1F3A]"
                        />

                        <p className="mt-2 font-body text-xs font-medium text-navy/50">
                            Waktu menggunakan WIB.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border-2 border-navy bg-cream p-4">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                        CATATAN
                    </p>

                    <p className="mt-2 font-body text-sm leading-6 text-navy/70">
                        Setelah event dibuat, sistem akan membuat
                        scanner token secara otomatis untuk digunakan
                        panitia.
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                >
                    Buat Event →
                </button>
            </div>
        </form>
    );
}