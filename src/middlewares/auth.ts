import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token tidak ditemukan",
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            SECRET_KEY
        );

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            message: "Token tidak valid",
        });

    }

};