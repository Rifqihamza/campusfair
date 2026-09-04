"use client";

import { deleteEvent } from "@/lib/actions/admin/deleteEvent";
type Props = {
    id: string;
};

export function DeleteEventButton({
    id,
}: Props) {
    return (
        <form
            action={deleteEvent}
            onSubmit={(event) => {
                const confirmed =
                    window.confirm(
                        "Yakin ingin menghapus event ini?",
                    );

                if (!confirmed) {
                    event.preventDefault();
                }
            }}
        >
            <input
                type="hidden"
                name="id"
                value={id}
            />

            <button
                type="submit"
                className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-600 cursor-pointer"
            >
                Hapus
            </button>
        </form>
    );
}