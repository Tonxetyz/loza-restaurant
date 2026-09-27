"use client";

import { useState } from "react";
import { DishCard } from "@/components/menu/dish-card";
import { DishDialog } from "@/components/menu/dish-dialog";
import type { Dish } from "@/lib/types";

export function PopularDishes({ dishes }: { dishes: Dish[] }) {
  const [openDish, setOpenDish] = useState<Dish | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onOpen={setOpenDish} />
        ))}
      </div>
      <DishDialog dish={openDish} onClose={() => setOpenDish(null)} />
    </>
  );
}
