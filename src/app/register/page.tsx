import { AuthForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <h1 className="mb-6 text-center font-display text-2xl font-bold">Регистрация</h1>
      <AuthForm mode="register" />
    </div>
  );
}
