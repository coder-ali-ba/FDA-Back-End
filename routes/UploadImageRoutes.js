import express from "express";

import upload from "../MiddleWares/multerMiddleWare.js";
import { AuthCheck } from "../MiddleWares/authMiddleWare.js";
import UploadImageController from "../controllers/UploadImageController.js";

const uploadRouter = express.Router()

uploadRouter.post("/upload" , [AuthCheck , upload.any("image")],   UploadImageController)

export default uploadRouter