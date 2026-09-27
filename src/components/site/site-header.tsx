"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/menu", label: "Меню" },
  { href: "/#about", label: "О нас" },
  { href: "/#contacts", label: "Контакты" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setAuthed(Boolean(data.user)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session?.user));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile nav on route change
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight">
          Лоза
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isSupabaseConfigured && (
            <Link
              href={authed ? "/orders" : "/login"}
              className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:block"
            >
              {authed ? "Личный кабинет" : "Войти"}
            </Link>
          )}

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Корзина"
          >
            <ShoppingBag size={20} />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {totalCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted-bg md:hidden"
            aria-label="Меню"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        className={cn(
          "grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-200 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-3 text-sm font-medium last:border-0"
              >
                {item.label}
              </Link>
            ))}
            {isSupabaseConfigured && (
              <Link href={authed ? "/orders" : "/login"} className="py-3 text-sm font-medium">
                {authed ? "Личный кабинет" : "Войти"}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
