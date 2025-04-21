import express from "express"
import { createRestaurant, getRestaurant, getRetsaurantNameList } from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticate } from "../middlewares/isAuthenticate";

const router = express.Router()

router.post("/", isAuthenticate, upload.single("imageFile"), createRestaurant)
router.get("/", isAuthenticate, getRestaurant)
router.get("/list", isAuthenticate, getRetsaurantNameList)

export default router;