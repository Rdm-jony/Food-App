import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb";
const app = express()
const port = process.env.PORT || 5000

dotenv.config()
connectDb()

app.listen(port, () => {
    console.log(`Food app server running at ${port}`)
})