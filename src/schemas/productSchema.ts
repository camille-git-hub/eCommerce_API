import { z } from "zod";
import { Types } from "mongoose";

export const newProductSchema = z
    .object({ 
        productName: z.string(),
        price: z.number(),
        description: z.string(),
        categoryId: Types.ObjectId.toString()
    })
    .strict();

export const productSchema = newProductSchema.extend({
    _id: z.string()
});

export type ProductInputDTO = z.input<typeof newProductSchema>;
export type ProductDTO = z.infer<typeof productSchema>;