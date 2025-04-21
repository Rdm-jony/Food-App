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

export const getRetsaurantNameList: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurants = await Restaurant.find({ user: req.userId }).select("restaurantName -_id");
        const restaurantList = restaurants.map(r => r.restaurantName);
        if (restaurantList.length > 0) {
            res.status(200).json({ success: true, restaurantList })
            return;
        }
        res.status(200).json({ success: true, restaurantList: [] })
        return;
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: "Internal server error" })
    }
}

export const getRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant = await Restaurant.find({ user: req.userId }).populate('menus');
        if (!restaurant) {
            res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found"
            })
            return;
        };
        res.status(200).json({ success: true, restaurant });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
        return;
    }
}