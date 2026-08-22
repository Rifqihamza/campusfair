import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Login
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Masuk ke akun Campus Fair kamu.
                    </p>
                </div>

                <LoginForm />
            </div>
        </main>
    );
}