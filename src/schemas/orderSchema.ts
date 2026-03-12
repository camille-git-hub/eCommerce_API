import { z } from "zod";
import { Types } from "mongoose";

export const orderInputSchema = z
    .object({ 
        userID: z.string().min(1),
        items: z.array(z.any()).min(1),
        totalPrice: z.number().min(0),
        status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).default('pending')
    })
    .strict();

export const orderSchema = z
    .object({ 
        _id: z.instanceof(Types.ObjectId),
        ...orderInputSchema.shape,
    })
    .strict();

export const orderItemSchema = z.object({
    productID: z.instanceof(Types.ObjectId),
    quantity: z.number().min(1),
    price: z.number().min(0)
}).strict();

export type OrderInputDTO = z.input<typeof orderInputSchema>;
export type OrderDTO = z.infer<typeof orderSchema>;
export type OrderItemDTO = z.infer<typeof orderItemSchema>;