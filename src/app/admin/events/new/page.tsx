import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { EventForm } from "@/components/admin/event-form";

export default async function NewEventPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-xl">
                <div className="flex flex-row items-center justify-between ">
                    <h1 className="text-3xl font-bold">
                        Buat Event Baru
                    </h1>
                    <Link href="/admin/events" className="w-fit rounded-lg bg-black px-4 py-1 text-white disabled:opacity-50"
                    >
                        Kembali ke Event
                    </Link>
                </div>

                <div className="mt-6">
                    <EventForm />
                </div>
            </div>
        </main>
    );
}