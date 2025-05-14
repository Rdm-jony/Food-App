import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb";
import cors from "cors";
import userRoute from "./routes/user.route";  // Import the router
import restaurantRoute from "./routes/restaurant.route";  // Import the router
import menuRoute from "./routes/menu.route";  // Import the router
import orderRoute from "./routes/order.route";  // Import the router
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

// Use the user route under the "/user" base path
app.use("/user", userRoute);  // This correctly attaches the routes defined in the user.route.ts
app.use("/restaurant", restaurantRoute);  // This correctly attaches the routes defined in the user.route.ts
app.use("/menu", menuRoute);  // This correctly attaches the routes defined in the user.route.ts
app.use("/order", orderRoute);  // This correctly attaches the routes defined in the user.route.ts

app.listen(port, () => {
    console.log(`Food app server running at ${port}`);
});
