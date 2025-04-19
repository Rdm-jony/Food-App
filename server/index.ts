import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb";
import cors from "cors";
import userRoute from "./routes/user.route";  // Import the router

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
connectDb();

app.use(express.json());
app.use(cors());

// Use the user route under the "/user" base path
app.use("/user", userRoute);  // This correctly attaches the routes defined in the user.route.ts

app.listen(port, () => {
    console.log(`Food app server running at ${port}`);
});
