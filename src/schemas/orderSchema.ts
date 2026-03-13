import { z } from "zod";
import { Types } from "mongoose";

export const orderItemSchema = z.object({
    productId: z.string({ error: "Product ID is required" }),
    quantity: z.number().min(1),
}).strict();

export const orderInputSchema = z
    .object({ 
        userId: z.string({ error: "User ID is required" }),
        items: z.array(orderItemSchema).min(1, { message: "At least one order item is required" })  ,
        status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).default('pending')
    })
    .strict();

export const orderSchema = z
    .object({
        _id: z.instanceof(Types.ObjectId).toString(),
        totalPrice: z.number().min(0),
        ...orderInputSchema.shape,
    })
    .strict();


export type OrderInputDTO = z.input<typeof orderInputSchema>;
export type OrderDTO = z.infer<typeof orderSchema>;
export type OrderItemDTO = z.infer<typeof orderItemSchema>;