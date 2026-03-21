import { Router } from "express";
import { getMe, logout, loign, register, verifyEmail } from "../controller/authController.js";
const authRouter = Router();


// POST '/api/auth/register'
authRouter.post("/register", register)

// POST '/api/auth/login'
authRouter.post("/loign", loign)

// GET '/api/auth/logout'
authRouter.get("/logout", logout)

// GET '/api/auth/get-me'
authRouter.get("/get-me", getMe)

authRouter.post("verify-email", verifyEmail)

export default authRouter;