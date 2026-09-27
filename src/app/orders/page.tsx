"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { getMyOrders } from "@/lib/orders-client";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import type { Order } from "@/lib/types";

const STATUS_LABEL: Record<Order["status"], string> = {
  new: "Принят",
  confirmed: "Подтверждён",
  preparing: "Готовится",
  on_the_way: "В пути",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no auth backend, treat as always-authed guest mode
      setAuthed(true);
      getMyOrders().then(setOrders);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setAuthed(Boolean(data.user));
      if (data.user) getMyOrders().then(setOrders);
    });
  }, []);

  if (authed === false) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Личный кабинет</h1>
        <p className="mt-2 text-muted">Войдите в аккаунт, чтобы увидеть историю заказов.</p>
        <Link href="/login" className={cn(buttonClasses("primary", "md"), "mt-6")}>
          Войти
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Мои заказы</h1>

      {orders === null ? (
        <p className="mt-8 text-muted">Загрузка...</p>
      ) : orders.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted-bg text-muted">
            <PackageOpen size={24} />
          </span>
          <p className="mt-4 font-medium">Заказов пока нет</p>
          <Link href="/menu" className={cn(buttonClasses("primary", "md"), "mt-5")}>
            Сделать первый заказ
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/order/${order.id}`}
              className="block rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Заказ №{order.id.slice(0, 8)}</span>
                <span className="rounded-full bg-muted-bg px-3 py-1 text-xs font-medium">
                  {STATUS_LABEL[order.status]}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {new Date(order.createdAt).toLocaleString("ru-RU")}
              </p>
              <p className="mt-1 text-sm text-muted">
                {order.items.map((i) => i.dishName).join(", ")}
              </p>
              <p className="mt-3 font-display text-lg font-semibold">{formatPrice(order.total)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
