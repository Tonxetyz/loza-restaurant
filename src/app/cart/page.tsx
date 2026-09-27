"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonClasses } from "@/components/ui/button";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/orders-client";
import { checkoutSchema } from "@/lib/checkout-schema";
import type { DeliveryType } from "@/lib/types";

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    const values = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      comment: String(formData.get("comment") ?? ""),
      deliveryType,
    };

    const result = checkoutSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const order = await createOrder(result.data, cart.lines);
      cart.clear();
      router.push(`/order/${order.id}`);
    } catch {
      toast.error("Не удалось оформить заказ. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  }

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted-bg text-muted">
          <ShoppingBag size={28} />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 max-w-sm text-muted">
          Добавьте блюда из меню, чтобы оформить заказ на доставку или самовывоз.
        </p>
        <Link href="/menu" className={cn(buttonClasses("primary", "md"), "mt-6")}>
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Оформление заказа</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-4">
          {cart.lines.map((line) => (
            <div
              key={line.dishId}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted-bg">
                <Image src={line.imageUrl} alt={line.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{line.name}</p>
                <p className="mt-1 text-sm text-muted">{formatPrice(line.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => cart.setQuantity(line.dishId, line.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted-bg"
                  aria-label="Уменьшить количество"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium">{line.quantity}</span>
                <button
                  onClick={() => cart.setQuantity(line.dishId, line.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted-bg"
                  aria-label="Увеличить количество"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => cart.remove(line.dishId)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-danger/10 hover:text-danger"
                aria-label="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <form action={handleSubmit} className="h-fit rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="text-muted">Итого</span>
            <span className="font-display text-xl font-semibold">
              {formatPrice(cart.totalPrice)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDeliveryType("delivery")}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                deliveryType === "delivery"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted hover:bg-muted-bg"
              )}
            >
              Доставка
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType("pickup")}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                deliveryType === "pickup"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted hover:bg-muted-bg"
              )}
            >
              Самовывоз
            </button>
          </div>

          <div className="mt-4">
            <Label htmlFor="name">Имя</Label>
            <Input id="name" name="name" placeholder="Как к вам обращаться" aria-invalid={Boolean(errors.name)} />
            <FieldError>{errors.name}</FieldError>
          </div>

          <div className="mt-4">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" name="phone" placeholder="+7 900 000-00-00" aria-invalid={Boolean(errors.phone)} />
            <FieldError>{errors.phone}</FieldError>
          </div>

          {deliveryType === "delivery" && (
            <div className="mt-4">
              <Label htmlFor="address">Адрес доставки</Label>
              <Input
                id="address"
                name="address"
                placeholder="Улица, дом, квартира"
                aria-invalid={Boolean(errors.address)}
              />
              <FieldError>{errors.address}</FieldError>
            </div>
          )}

          <div className="mt-4">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea id="comment" name="comment" rows={3} placeholder="Например: без лука" />
          </div>

          <Button className="mt-5 w-full" disabled={submitting}>
            {submitting ? "Оформляем..." : "Оформить заказ"}
          </Button>
        </form>
      </div>
    </div>
  );
}
