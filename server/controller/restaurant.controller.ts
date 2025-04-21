import { Request, RequestHandler, Response } from "express";
import multer from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Restaurant } from "../models/restaurant.model";


export const createRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Image is required"
            })
            return;
        }
        console.log(cuisines)
        const imageUrl = await uploadImageOnCloudinary(req.file as Express.Multer.File)
        await Restaurant.create({
            user: req.userId,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: cuisines.split(","),
            imageUrl
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

}