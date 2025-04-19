import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
export const isAuthenticate = (res: Response, req: Request, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
            return;
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        if (!decode) {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            })
            return;
        }

        req.userId = decode.userId
        next()

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}