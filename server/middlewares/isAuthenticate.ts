import { NextFunction, Request, RequestHandler, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
export const isAuthenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
            return;
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        req.userId = decode.userId
        next()

    } catch (error: any) {
        console.error("JWT verification failed:", error.message);
        res.status(500).json({

            message: error.message || "Internal server error"
        })
    }
}