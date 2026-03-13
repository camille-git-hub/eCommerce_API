import { z } from "zod";
import { Types } from "mongoose";

export const productSchema = z
    .object({ 
        _id: z.instanceof(Types.ObjectId).toString(),
        productName: z.string(),
        price: z.number(),
        description: z.string(),
        categoryId: z.instanceof(Types.ObjectId).toString(),
    })
    .strict();

export const newProductSchema = productSchema.omit({ _id: true });

export type ProductInputDTO = z.input<typeof newProductSchema>;
export type ProductDTO = z.infer<typeof productSchema>;