"use client";

import { createEvent } from "@/app/admin/events/actions";

export function EventForm() {

    return (
        <form
            action={createEvent}
            className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
            <div>
                <label className="text-sm font-medium">
                    Nama Event
                </label>

                <input
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    placeholder="Campus Fair 2027"
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Mulai
                </label>

                <input
                    name="startAt"
                    type="datetime-local"
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Selesai
                </label>

                <input
                    name="endAt"
                    type="datetime-local"
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            >
                Buat Event
            </button>
        </form>
    );
}