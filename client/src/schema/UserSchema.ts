import { z } from "zod";

export const userSchemaRegister = z.object({
    fullName: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    contact: z
        .string()
        .regex(/^01\d{9}$/, {
            message: "Contact must start with 01 and be 11 digits long",
        }),
});

export type RegisterInputState = z.infer<typeof userSchemaRegister>

export const userSchemaLogin = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
export type LoginInputState = z.infer<typeof userSchemaLogin>
