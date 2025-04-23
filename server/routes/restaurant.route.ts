import express from "express"
import { createRestaurant, getRestaurant, getRetsaurantNameList, getSearchRestaurant, getSingleRestaurant, updateRestaurant } from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticate } from "../middlewares/isAuthenticate";

const router = express.Router()

router.post("/", isAuthenticate, upload.single("imageFile"), createRestaurant)
router.put("/", isAuthenticate, upload.single("imageFile"), updateRestaurant)
router.get("/", isAuthenticate, getRestaurant)
router.get("/list", isAuthenticate, getRetsaurantNameList)
router.get("/:id", getSingleRestaurant)
router.get("/search/:searchText",getSearchRestaurant)

export default router;