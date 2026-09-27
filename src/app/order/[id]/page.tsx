"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { getOrderById } from "@/lib/orders-client";
import type { Order } from "@/lib/types";

const STATUS_LABEL: Record<Order["status"], string> = {
  new: "Принят",
  confirmed: "Подтверждён",
  preparing: "Готовится",
  on_the_way: "В пути",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    getOrderById(id).then(setOrder);
  }, [id]);

  if (order === undefined) {
    return <div className="mx-auto max-w-2xl px-4 py-24 text-center text-muted">Загрузка...</div>;
  }

  if (order === null) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Заказ не найден</h1>
        <p className="mt-2 text-muted">Проверьте ссылку или оформите новый заказ.</p>
        <Link href="/menu" className={cn(buttonClasses("primary", "md"), "mt-6")}>
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold">Заказ оформлен</h1>
        <p className="mt-2 text-muted">
          Номер заказа: <span className="font-medium text-foreground">{order.id.slice(0, 8)}</span>
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-sm text-muted">Статус</span>
          <span className="rounded-full bg-muted-bg px-3 py-1 text-sm font-medium">
            {STATUS_LABEL[order.status]}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>
                {item.dishName} <span className="text-muted">× {item.quantity}</span>
              </span>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-medium">Итого</span>
          <span className="font-display text-lg font-semibold">{formatPrice(order.total)}</span>
        </div>

        <div className="mt-4 grid gap-1 border-t border-border pt-4 text-sm text-muted">
          <p>Получатель: {order.name}</p>
          <p>Телефон: {order.phone}</p>
          <p>
            {order.deliveryType === "delivery" ? `Доставка: ${order.address}` : "Самовывоз из ресторана"}
          </p>
          {order.comment && <p>Комментарий: {order.comment}</p>}
        </div>
      </div>

      <Link href="/menu" className={cn(buttonClasses("outline", "md"), "mt-6 w-full")}>
        Вернуться в меню
      </Link>
    </div>
  );
}
