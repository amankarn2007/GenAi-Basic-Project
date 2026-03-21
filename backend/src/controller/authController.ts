import type { Request, Response } from "express";
import prismaClient from "../config/db.js";
import { loginSchema, registerSchema } from "../utils/types.js";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    const parsedResult = registerSchema.safeParse(req.body);

    if(!parsedResult.success) {
        return res.status(400).json({
            message: "Something is missing",
            error: parsedResult.error
        })
    }

    try {
        const { username, email, password } = parsedResult.data;

        const isAlreadyExists = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if(isAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prismaClient.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        /*-----Otp verification part-----*/
        /*-----Otp verification part-----*/


        res.status(201).json({
            message: "User created successfully",
            user: {
                username: user.username,
                email: user.email,
                verified: user.verified
            }
        })

    } catch(err) {
        res.json({
            message: "Error in register"
        })
    }
}

export const loign = async (req: Request, res: Response) => {
    const parsedResult = loginSchema.safeParse(req.body);

    if(!parsedResult.success) {
        return res.status(400).json({
            message: "Something is missing",
            error: parsedResult.error
        })
    }

    try {
        const { email, password } = parsedResult.data;

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }

        const result = await bcrypt.compare(password, user.password);
        if(!result) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }

        

    } catch(err) {
        res.json({
            message: "Can't login right now"
        })
    }
}

export const getMe = async (req: Request, res: Response) => {

}

export const logout = async (req: Request, res: Response) => {

}

export const verifyEmail = async (req: Request, res: Response) => {

}