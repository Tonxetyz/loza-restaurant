"use client";

import { useMemo, useState } from "react";
import { Search, Leaf, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { DishCard } from "@/components/menu/dish-card";
import { DishDialog } from "@/components/menu/dish-dialog";
import type { Category, Dish } from "@/lib/types";

export function MenuBrowser({
  categories,
  dishes,
}: {
  categories: Category[];
  dishes: Dish[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [openDish, setOpenDish] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      if (activeCategory !== "all" && d.categoryId !== activeCategory) return false;
      if (vegOnly && !d.isVegetarian) return false;
      if (spicyOnly && !d.isSpicy) return false;
      if (q && !d.name.toLowerCase().includes(q) && !d.description.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [dishes, activeCategory, query, vegOnly, spicyOnly]);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по меню..."
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-bg text-muted hover:text-foreground"
              )}
            >
              Все блюда
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-bg text-muted hover:text-foreground"
                )}
              >
                {c.name}
              </button>
            ))}

            <span className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => setVegOnly((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                vegOnly ? "bg-accent/15 text-accent" : "bg-muted-bg text-muted hover:text-foreground"
              )}
            >
              <Leaf size={14} /> Вегетарианское
            </button>
            <button
              onClick={() => setSpicyOnly((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                spicyOnly ? "bg-primary/15 text-primary" : "bg-muted-bg text-muted hover:text-foreground"
              )}
            >
              <Flame size={14} /> Острое
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="font-display text-xl font-semibold">Ничего не найдено</p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Попробуйте изменить запрос или сбросить фильтры — возможно, блюдо есть в другой
              категории.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} onOpen={setOpenDish} />
            ))}
          </div>
        )}
      </div>

      <DishDialog dish={openDish} onClose={() => setOpenDish(null)} />
    </div>
  );
}
