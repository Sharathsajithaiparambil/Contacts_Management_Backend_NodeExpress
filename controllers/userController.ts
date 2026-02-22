import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

interface LoginBody {
    email: string;
    password: string;
}

const registerUser = asyncHandler(async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(400);
        throw new Error('Email already exists!');
    }
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });
    res.status(201).json({ message: 'User registered successfully!', id: user.id, email: user.email });
});

const loginUser = asyncHandler(async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const user = await User.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ message: 'User logged in successfully!', token: token });
    } else {
        res.status(401);
        throw new Error('Invalid email or password!');
    }
});

const currentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(req.user);
});

export {
    registerUser,
    loginUser,
    currentUser
};

