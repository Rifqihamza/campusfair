import Link from "next/link";

import { auth } from "@/lib/auth/auth";

export default async function ParticipantHomePage() {
    const session = await auth();

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-3xl">
                <section className="rounded-2xl border bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold">
                        Campus Fair
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Temukan dan ikuti berbagai event
                        Campus Fair.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <Link
                            href="/events"
                            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                        >
                            Lihat Event
                        </Link>

                        {session?.user?.id ? (
                            <Link
                                href="/dashboard"
                                className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}