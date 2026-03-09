import { z } from "zod";
import { Types } from "mongoose";

export const userInputSchema = z
  .object({
    name: z.string({ error: "Name must be a string" }).min(2, {
        message: "Name is required"
    }),
    email: z.string({ error: "Email must be a string" }),
    password: z.string({ error: "Password must be a string" }).min(6, {
    }),
  })
  .strict();

export const userSchema = z
    .object({ 
        _id: z.instanceof(Types.ObjectId),
        ...userInputSchema.shape,
    })
    .strict();

export const newUserSchema = z
    .object({
        ...userInputSchema.shape,
    })
    .strict();

export default userSchema;