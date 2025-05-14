import { Request, Response } from "express";

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}