import { z } from "zod";
import { Types } from "mongoose";

export const categorySchema = z
    .object({ 
        _id: z.instanceof(Types.ObjectId),
        categoryName: z.string(),
    })
    .strict();

export const newCategorySchema = categorySchema.omit({ _id: true });

export type CategoryInputDTO = z.input<typeof newCategorySchema>;
export type CategoryDTO = z.infer<typeof categorySchema>;