import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import { categories as seedCategories, dishes as seedDishes } from "@/lib/seed";
import type { Category, Dish } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return seedCategories;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, sort_order")
    .order("sort_order");

  if (error || !data?.length) return seedCategories;

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    sortOrder: row.sort_order,
  }));
}

export async function getDishes(): Promise<Dish[]> {
  if (!isSupabaseConfigured) return seedDishes;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dishes")
    .select(
      "id, category_id, slug, name, description, price, image_url, weight_grams, is_vegetarian, is_spicy, is_available"
    )
    .eq("is_available", true);

  if (error || !data?.length) return seedDishes;

  return data.map((row) => ({
    id: row.id,
    categoryId: row.category_id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: row.price,
    imageUrl: row.image_url,
    weightGrams: row.weight_grams,
    isVegetarian: row.is_vegetarian,
    isSpicy: row.is_spicy,
    isAvailable: row.is_available,
  }));
}
