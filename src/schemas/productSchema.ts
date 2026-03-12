import { z } from "zod";
import { Types } from "mongoose";

export const productSchema = z
    .object({ 
        _id: z.instanceof(Types.ObjectId),
        productName: z.string(),
        price: z.number(),
        description: z.string(),
        categoryName: z.string(),
    })
    .strict();

export const newProductSchema = productSchema.omit({ _id: true });

export type ProductInputDTO = z.input<typeof newProductSchema>;
export type ProductDTO = z.infer<typeof productSchema>;