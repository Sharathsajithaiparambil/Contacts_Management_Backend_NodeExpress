import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const validateToken = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        throw new Error('Unauthorized!');
    }
    const token = authHeader.split(' ')[1];
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Unauthorized!');
    }
});

export default validateToken;

