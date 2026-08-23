"use client";

import { updateEvent } from "@/app/admin/events/actions";

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

export function EditEventForm({
    event,
}: Props) {
    return (
        <form
            action={updateEvent}
            className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
            <input
                type="hidden"
                name="id"
                value={event.id}
            />

            <div>
                <label className="text-sm font-medium">
                    Nama Event
                </label>

                <input
                    name="name"
                    defaultValue={event.name}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>

            <label
                htmlFor="description"
                className="block text-sm font-medium"
            >
                Deskripsi
            </label>

            <textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={event.description ?? ""}
                placeholder="Jelaskan tentang event..."
                className="mt-1 w-full rounded-lg border p-3"
            />

            <div>
                <label className="text-sm font-medium">
                    Mulai
                </label>

                <input
                    name="startAt"
                    type="datetime-local"
                    defaultValue={event.startAt
                        .toISOString()
                        .slice(0, 16)}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>


            <div>
                <label className="text-sm font-medium">
                    Selesai
                </label>

                <input
                    name="endAt"
                    type="datetime-local"
                    defaultValue={event.endAt
                        .toISOString()
                        .slice(0, 16)}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    required
                />
            </div>


            <label className="flex items-center gap-2">
                <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={
                        event.isActive
                    }
                />

                <span className="text-sm">
                    Event aktif
                </span>
            </label>


            <button
                type="submit"
                className="w-full rounded-lg bg-black px-4 py-2 text-white"
            >
                Simpan Perubahan
            </button>
        </form>
    );
}