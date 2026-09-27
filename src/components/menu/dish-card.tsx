"use client";

import Image from "next/image";
import { Plus, Leaf, Flame } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import type { Dish } from "@/lib/types";

export function DishCard({ dish, onOpen }: { dish: Dish; onOpen?: (dish: Dish) => void }) {
  const { add } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
      <button
        onClick={() => onOpen?.(dish)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-muted-bg focus-visible:outline-none"
        aria-label={`Подробнее: ${dish.name}`}
      >
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex gap-1.5">
          {dish.isVegetarian && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card/90 text-accent">
              <Leaf size={14} />
            </span>
          )}
          {dish.isSpicy && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card/90 text-primary">
              <Flame size={14} />
            </span>
          )}
        </div>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <button onClick={() => onOpen?.(dish)} className="text-left focus-visible:outline-none">
          <h3 className="font-medium leading-snug">{dish.name}</h3>
        </button>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{dish.description}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <p className="font-display text-lg font-semibold">{formatPrice(dish.price)}</p>
            <p className="text-xs text-muted">{dish.weightGrams} г</p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              add(dish);
              toast.success(`${dish.name} добавлено в корзину`);
            }}
            aria-label="Добавить в корзину"
          >
            <Plus size={16} />В корзину
          </Button>
        </div>
      </div>
    </div>
  );
}
