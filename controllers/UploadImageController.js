// import express, { json } from "express";
// import { cloudinaryUploader } from "../Config/cloudinaryConfig.js";


// const UploadImageController = async(req , res) => {
//     try {
//         const filePath =req.files[0].path;
//         if(!filePath){
//             return res.json({
//                 message : "File not found"
//             })
//         }

//         const resImage =await cloudinaryUploader.upload(filePath)
       
//        res.json({
//            message : " Got Image Uploader",
//            data : resImage.secure_url

//         })
//     } catch (error) {
//         res.json({
//             message : error.message
//         })
//     }
    
// }

// export {
//     UploadImageController
// }
import express from "express";
import cloudinary from "../Config/cloudinaryConfig.js";
import streamifier from "streamifier"



const UploadImageController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

export default UploadImageController