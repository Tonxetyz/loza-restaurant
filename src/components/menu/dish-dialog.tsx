"use client";

import Image from "next/image";
import { Leaf, Flame } from "lucide-react";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import type { Dish } from "@/lib/types";

export function DishDialog({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const { add } = useCart();

  return (
    <Dialog open={Boolean(dish)} onClose={onClose}>
      {dish && (
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-muted-bg">
            <Image src={dish.imageUrl} alt={dish.name} fill className="object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2">
              {dish.isVegetarian && (
                <span className="flex items-center gap-1 text-xs font-medium text-accent">
                  <Leaf size={14} /> Вегетарианское
                </span>
              )}
              {dish.isSpicy && (
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  <Flame size={14} /> Острое
                </span>
              )}
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold">{dish.name}</h2>
            <p className="mt-2 text-sm text-muted">{dish.description}</p>
            <p className="mt-2 text-xs text-muted">{dish.weightGrams} г</p>

            <div className="mt-6 flex items-center justify-between">
              <p className="font-display text-2xl font-semibold">{formatPrice(dish.price)}</p>
              <Button
                onClick={() => {
                  add(dish);
                  toast.success(`${dish.name} добавлено в корзину`);
                  onClose();
                }}
              >
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
