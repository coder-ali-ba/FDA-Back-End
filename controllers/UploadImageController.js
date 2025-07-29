import express, { json } from "express";
import { cloudinaryUploader } from "../Config/cloudinaryConfig.js";


const UploadImageController = async(req , res) => {
    try {
        const filePath =req.files[0].path;
        if(!filePath){
            return res.json({
                message : "File not found"
            })
        }

        const resImage =await cloudinaryUploader.upload(filePath)
       
       res.json({
           message : " Got Image Uploader",
           data : resImage.secure_url

        })
    } catch (error) {
        res.json({
            message : error.message
        })
    }
    
}

export {
    UploadImageController
}