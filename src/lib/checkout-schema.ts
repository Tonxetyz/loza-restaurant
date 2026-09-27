import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{9,}$/, "Введите корректный телефон"),
  deliveryType: z.enum(["delivery", "pickup"]),
  address: z.string().trim(),
  comment: z.string().trim(),
}).superRefine((val, ctx) => {
  if (val.deliveryType === "delivery" && val.address.length < 5) {
    ctx.addIssue({
      code: "custom",
      message: "Укажите адрес доставки",
      path: ["address"],
    });
  }
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
