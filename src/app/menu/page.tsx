import type { Metadata } from "next";
import { getCategories, getDishes } from "@/lib/data";
import { MenuBrowser } from "@/components/menu/menu-browser";

export const metadata: Metadata = { title: "Меню — Лоза" };

export default async function MenuPage() {
  const [categories, dishes] = await Promise.all([getCategories(), getDishes()]);

  return (
    <div>
      <div className="border-b border-border bg-muted-bg">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Меню</h1>
          <p className="mt-2 max-w-xl text-muted">
            Авторские блюда средиземноморской и грузинской кухни, гриль на углях и сезонные
            позиции.
          </p>
        </div>
      </div>
      <MenuBrowser categories={categories} dishes={dishes} />
    </div>
  );
}
