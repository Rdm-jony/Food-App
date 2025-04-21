import { Request, RequestHandler, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, restaurantName } = req.body;
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Image is required"
            })
            return;
        }
        console.log("ashce")
        const imageUrl = await uploadImageOnCloudinary(req.file as Express.Multer.File);
        const menu: any = await Menu.create({
            name,
            description,
            price,
            image: imageUrl,
            restaurantName
        });
        const restaurant = await Restaurant.findOne({ user: req.userId, restaurantName });
        if (restaurant) {
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id)
            await restaurant.save()
            res.status(201).json({
                success: true,
                message: "Menu added successfully",
                menu
            });
            return
        }
        res.status(400).json({
            success: false,
            message: "Restaurant not found",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

}