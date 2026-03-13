import { z } from "zod";
import { Types } from "mongoose";

const objectIdString = z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format"
});

export const orderItemSchema = z.object({
    productId: objectIdString,
    quantity: z.number().min(1),
}).strict();

export const orderInputSchema = z
    .object({ 
        userId: objectIdString,
        items: z.array(orderItemSchema).min(1, { message: "At least one item is required" }),
        status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).default('pending')
    })
    .strict();

export const orderSchema = z
    .object({
        _id: z.string(),
        totalPrice: z.number().min(0),
        ...orderInputSchema.shape,
    })
    .strict();


export type OrderInputDTO = z.input<typeof orderInputSchema>;
export type OrderDTO = z.infer<typeof orderSchema>;
export type OrderItemDTO = z.infer<typeof orderItemSchema>;