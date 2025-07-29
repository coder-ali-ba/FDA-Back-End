import express from "express";
import { loginController, signupController } from "../controllers/AuthControllers.js";

const authRouter = express.Router()

authRouter.post("/signup" , signupController)
authRouter.post("/login" , loginController)


export default authRouter