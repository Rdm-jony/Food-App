import { z } from "zod";

export const restaurantFormSchema = z.object({
    restaurantName: z.string().nonempty("Restaurant name is required"),
    city: z.string().nonempty("City is required"),
    country: z.string().nonempty("Country is required"),
    deliveryTime: z
        .number({ invalid_type_error: "Delivery time must be a number" })
        .min(0, "Delivery time cannot be negative"),
    cuisines: z
        .array(z.string())
        .min(1, "Please enter at least one cuisine"),

    // File is required, so we can't have null or undefined
    imageFile: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
            message: "Image file is required",
        }),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
