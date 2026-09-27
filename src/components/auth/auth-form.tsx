"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted-bg p-6 text-sm text-muted">
        Личный кабинет и авторизация работают через Supabase. Добавьте
        <code className="mx-1 rounded bg-card px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>
        и
        <code className="mx-1 rounded bg-card px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        в <code className="rounded bg-card px-1.5 py-0.5">.env.local</code> — оформление заказов
        как гость уже полностью работает.
      </div>
    );
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createClient();

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    toast.success(mode === "login" ? "Вы вошли в аккаунт" : "Регистрация завершена");
    router.push("/orders");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" name="password" type="password" required minLength={6} placeholder="Минимум 6 символов" />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <Button disabled={loading}>
        {loading ? "Подождите..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
      </Button>
      <p className="text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            Нет аккаунта? <Link href="/register" className="font-medium text-primary hover:underline">Зарегистрироваться</Link>
          </>
        ) : (
          <>
            Уже есть аккаунт? <Link href="/login" className="font-medium text-primary hover:underline">Войти</Link>
          </>
        )}
      </p>
    </form>
  );
}
