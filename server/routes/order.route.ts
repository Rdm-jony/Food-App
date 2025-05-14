import express from "express";
import { createCheckoutSession } from "../controller/order.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";

const router = express.Router();

router.post('/create-checkout-session', isAuthenticate, createCheckoutSession);

export default router;
