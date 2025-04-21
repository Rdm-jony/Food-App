import express from "express"
import { createRestaurant } from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticate } from "../middlewares/isAuthenticate";

const router = express.Router()

router.post("/create", isAuthenticate, upload.single("imageFile"), createRestaurant)

export default router;