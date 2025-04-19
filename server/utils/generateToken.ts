import { Response } from "express";
import { IUserDocument } from "../models/user.model";
import jwt from 'jsonwebtoken'

export const generateToken = async (res: Response, user: IUserDocument) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "24hr" })
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
        return token;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}