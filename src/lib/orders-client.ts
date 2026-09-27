import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { CartLine, CheckoutInput, Order } from "@/lib/types";

const LOCAL_KEY = "demo_orders";

function readLocalOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeLocalOrder(order: Order) {
  const orders = [order, ...readLocalOrders()];
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
}

export async function createOrder(
  input: CheckoutInput,
  items: CartLine[]
): Promise<Order> {
  const total = items.reduce((sum, l) => sum + l.price * l.quantity, 0);

  if (!isSupabaseConfigured) {
    const order: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
      total,
      name: input.name,
      phone: input.phone,
      address: input.address,
      comment: input.comment,
      deliveryType: input.deliveryType,
      items: items.map((l) => ({ dishName: l.name, price: l.price, quantity: l.quantity })),
    };
    writeLocalOrder(order);
    return order;
  }

  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userData.user?.id ?? null,
      status: "new",
      total,
      name: input.name,
      phone: input.phone,
      address: input.address,
      comment: input.comment,
      delivery_type: input.deliveryType,
    })
    .select()
    .single();

  if (orderError || !orderRow) throw new Error(orderError?.message ?? "Order creation failed");

  const { error: itemsError } = await supabase.from("order_items").insert(
    items.map((l) => ({
      order_id: orderRow.id,
      dish_id: l.dishId,
      dish_name: l.name,
      price: l.price,
      quantity: l.quantity,
    }))
  );

  if (itemsError) throw new Error(itemsError.message);

  return {
    id: orderRow.id,
    createdAt: orderRow.created_at,
    status: orderRow.status,
    total: orderRow.total,
    name: orderRow.name,
    phone: orderRow.phone,
    address: orderRow.address,
    comment: orderRow.comment,
    deliveryType: orderRow.delivery_type,
    items: items.map((l) => ({ dishName: l.name, price: l.price, quantity: l.quantity })),
  };
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured) {
    return readLocalOrders().find((o) => o.id === id) ?? null;
  }

  const supabase = createClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("*, order_items(dish_name, price, quantity)")
    .eq("id", id)
    .single();

  if (error || !order) return null;

  return {
    id: order.id,
    createdAt: order.created_at,
    status: order.status,
    total: order.total,
    name: order.name,
    phone: order.phone,
    address: order.address,
    comment: order.comment,
    deliveryType: order.delivery_type,
    items: order.order_items.map(
      (i: { dish_name: string; price: number; quantity: number }) => ({
        dishName: i.dish_name,
        price: i.price,
        quantity: i.quantity,
      })
    ),
  };
}

export async function getMyOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured) return readLocalOrders();

  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(dish_name, price, quantity)")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((order) => ({
    id: order.id,
    createdAt: order.created_at,
    status: order.status,
    total: order.total,
    name: order.name,
    phone: order.phone,
    address: order.address,
    comment: order.comment,
    deliveryType: order.delivery_type,
    items: order.order_items.map(
      (i: { dish_name: string; price: number; quantity: number }) => ({
        dishName: i.dish_name,
        price: i.price,
        quantity: i.quantity,
      })
    ),
  }));
}
