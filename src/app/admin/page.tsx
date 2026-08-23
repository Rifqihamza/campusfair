import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { isAdmin } from "@/lib/auth/permission";
import { LogoutButton } from "@/components/auth/logout-button";
import SharedButton from "@/components/shared/button";

export default async function AdminPage() {
    const session = await auth();

    // Belum login
    if (!session?.user?.id) {
        redirect("/login");
    }

    // Bukan admin
    if (!isAdmin(session.user.role)) {
        redirect("/dashboard");
    }

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Admin Dashboard
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Selamat datang, {session.user.name}
                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <SharedButton
                            title="Halaman Event"
                            url="/admin/events"
                        />
                        <LogoutButton />
                    </div>
                </div>

                <section className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="font-semibold">
                            Events
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Kelola event Campus Fair.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="font-semibold">
                            Participants
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Lihat peserta yang terdaftar.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="font-semibold">
                            Attendance
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Monitor kehadiran peserta.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}