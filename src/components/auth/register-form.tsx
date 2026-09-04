"use client";

import { useRegister } from "@/hooks/auth/use-register";

export function RegisterForm() {
    const {
        form,
        error,
        loading,
        handleChange,
        register,
    } = useRegister();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await register();
    }

    const inputClass =
        "w-full rounded-lg border-2 border-navy/20 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40";

    const labelClass =
        "mb-2 block font-body text-sm font-bold text-navy";

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border-2 border-navy bg-cream p-6 shadow-[8px_8px_0_#0B1F3A] sm:p-8"
        >
            {error && (
                <div className="mb-6 rounded-xl border-2 border-red-700/20 bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
                    {error}
                </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
                {/* Nama */}
                <div>
                    <label
                        htmlFor="name"
                        className={labelClass}
                    >
                        Nama lengkap
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Nama lengkap"
                        className={inputClass}
                    />
                </div>

                {/* Sekolah */}
                <div>
                    <label
                        htmlFor="school"
                        className={labelClass}
                    >
                        Sekolah
                    </label>

                    <input
                        id="school"
                        name="school"
                        type="text"
                        value={form.school}
                        onChange={handleChange}
                        required
                        placeholder="Nama sekolah"
                        className={inputClass}
                    />
                </div>

                {/* Jurusan */}
                <div>
                    <label
                        htmlFor="major"
                        className={labelClass}
                    >
                        Jurusan
                    </label>

                    <input
                        id="major"
                        name="major"
                        type="text"
                        value={form.major}
                        onChange={handleChange}
                        placeholder="Contoh: Elektronika Industri"
                        className={inputClass}
                    />
                </div>

                {/* Kelas */}
                <div>
                    <label
                        htmlFor="class"
                        className={labelClass}
                    >
                        Kelas
                    </label>

                    <input
                        id="class"
                        name="class"
                        type="text"
                        value={form.class}
                        onChange={handleChange}
                        placeholder="Contoh: XII ELIND 1"
                        className={inputClass}
                    />
                </div>

                {/* Nomor HP */}
                <div>
                    <label
                        htmlFor="phone"
                        className={labelClass}
                    >
                        Nomor HP
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        placeholder="08xxxxxxxxxx"
                        className={inputClass}
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className={labelClass}
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="nama@email.com"
                        className={inputClass}
                    />
                </div>

                {/* Password */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="password"
                        className={labelClass}
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        placeholder="Minimal 8 karakter"
                        className={inputClass}
                    />

                    <p className="mt-2 font-body text-xs text-navy/50">
                        Gunakan minimal 8 karakter.
                    </p>
                </div>
            </div>

            <div className="mt-7">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg border-2 border-navy bg-lime px-4 py-3.5 font-body text-sm font-bold text-navy shadow-[5px_5px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Mendaftarkan..."
                        : "Daftar Sekarang"}
                </button>
            </div>

            <div className="mt-5 border-t border-navy/10 pt-4 text-center">
                <p className="font-body text-sm text-navy/60">
                    Sudah punya akun?
                </p>

                <a
                    href="/login"
                    className="mt-1 inline-block font-body text-sm font-bold text-navy underline decoration-lime decoration-2 underline-offset-4 transition hover:text-navy/70"
                >
                    Login di sini →
                </a>
            </div>
        </form>
    );
}