"use client";

import { updateEvent } from "@/app/admin/events/actions";
import { formatDateTimeLocal } from "@/lib/utils/date";

type Props = {
    event: {
        id: string;
        name: string;
        description: string | null;
        startAt: Date;
        endAt: Date;
        isActive: boolean;
    };
};

export function EditEventForm({ event }: Props) {
    return (
        <form
            action={updateEvent}
            className="rounded-3xl border-2 border-navy bg-sky p-6 shadow-[6px_6px_0_#0B1F3A] sm:p-8"
        >
            <input
                type="hidden"
                name="id"
                value={event.id}
            />

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
                        defaultValue={event.name}
                        required
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
                        defaultValue={event.description ?? ""}
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
                            defaultValue={formatDateTimeLocal(event.startAt)}
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
                            defaultValue={formatDateTimeLocal(event.endAt)}
                            required
                            className="mt-2 w-full rounded-xl border-2 border-navy bg-cream px-4 py-3 font-body text-sm text-navy outline-none transition-shadow focus:shadow-[4px_4px_0_#0B1F3A]"
                        />

                        <p className="mt-2 font-body text-xs font-medium text-navy/50">
                            Waktu menggunakan WIB.
                        </p>
                    </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-navy bg-cream p-4">
                    <input
                        name="isActive"
                        type="checkbox"
                        defaultChecked={event.isActive}
                        className="h-5 w-5 accent-lime"
                    />

                    <span>
                        <span className="block font-body text-sm font-bold text-navy">
                            Event aktif
                        </span>

                        <span className="mt-1 block font-body text-xs text-navy/50">
                            Event yang aktif dapat ditampilkan kepada peserta.
                        </span>
                    </span>
                </label>

                <div className="rounded-2xl border-2 border-navy bg-cream p-4">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                        STATUS EVENT
                    </p>

                    <p className="mt-2 font-body text-sm leading-6 text-navy/70">
                        {event.isActive
                            ? "Event saat ini aktif dan dapat digunakan."
                            : "Event saat ini tidak aktif dan tidak ditampilkan kepada peserta."}
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl border-2 border-navy bg-lime px-5 py-3 font-body text-sm font-bold text-navy shadow-[4px_4px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B1F3A]"
                >
                    Simpan Perubahan →
                </button>
            </div>
        </form>
    );
}