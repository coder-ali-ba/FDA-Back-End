import express from "express";
import { UploadImageController } from "../controllers/UploadImageController.js";

import upload from "../MiddleWares/multerMiddleWare.js";
import { AuthCheck } from "../MiddleWares/authMiddleWare.js";

const uploadRouter = express.Router()

uploadRouter.post("/upload" , [AuthCheck , upload.any("image")],  UploadImageController)

export default uploadRouter