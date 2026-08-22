import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Daftar Campus Fair
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Buat akun untuk mengikuti Campus Fair.
                    </p>
                </div>

                <RegisterForm />
            </div>
        </main>
    );
}