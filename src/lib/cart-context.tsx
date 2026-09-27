"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Dish } from "@/lib/types";

const STORAGE_KEY = "cart";

type CartContextValue = {
  lines: CartLine[];
  totalCount: number;
  totalPrice: number;
  add: (dish: Dish) => void;
  remove: (dishId: string) => void;
  setQuantity: (dishId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const add = (dish: Dish) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.dishId === dish.id);
        if (existing) {
          return prev.map((l) =>
            l.dishId === dish.id ? { ...l, quantity: l.quantity + 1 } : l
          );
        }
        return [
          ...prev,
          {
            dishId: dish.id,
            name: dish.name,
            price: dish.price,
            imageUrl: dish.imageUrl,
            quantity: 1,
          },
        ];
      });
    };

    const remove = (dishId: string) => {
      setLines((prev) => prev.filter((l) => l.dishId !== dishId));
    };

    const setQuantity = (dishId: string, quantity: number) => {
      if (quantity <= 0) return remove(dishId);
      setLines((prev) => prev.map((l) => (l.dishId === dishId ? { ...l, quantity } : l)));
    };

    const clear = () => setLines([]);

    return {
      lines,
      totalCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      totalPrice: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      add,
      remove,
      setQuantity,
      clear,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
