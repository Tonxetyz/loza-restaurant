export type Category = {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
};

export type Dish = {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  weightGrams: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
};

export type CartLine = {
  dishId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type DeliveryType = "delivery" | "pickup";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export type CheckoutInput = {
  name: string;
  phone: string;
  address: string;
  comment: string;
  deliveryType: DeliveryType;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  name: string;
  phone: string;
  address: string;
  comment: string;
  deliveryType: DeliveryType;
  items: { dishName: string; price: number; quantity: number }[];
};
