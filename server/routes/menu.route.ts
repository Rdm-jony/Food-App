import express from "express"
import { addMenu, getMenusByCurrentUser } from "../controller/menu.controller"
import { isAuthenticate } from "../middlewares/isAuthenticate";
import upload from "../middlewares/multer";
const router = express.Router()

router.post("/", isAuthenticate, upload.single("imageMenu"), addMenu)
router.get("/", isAuthenticate, getMenusByCurrentUser)

export default router;
