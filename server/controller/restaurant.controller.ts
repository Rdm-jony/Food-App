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

export const updateRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { retsuarantId, restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.userId, _id: retsuarantId });

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return;
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = cuisines.split(",");

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        })
        return;
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Internal server error" })
        return;
    }
}

export const getSingleRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 }
        });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
            return;
        };
        res.status(200).json({ success: true, restaurant });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
        return
    }
}
export const getSearchRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
        console.log(searchText)
        const query: any = {};
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ]
        }
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines }
        }
        const restaurants = await Restaurant.find(query);
        console.log(restaurants)
        res.status(200).json({
            success: true,
            restaurants
        });
        return;


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
        return
    }
}