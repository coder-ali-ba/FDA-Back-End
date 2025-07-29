import multer from "multer";

const storage = multer.memoryStorage()

const upload = multer({
    storage : storage, 
    limits : {
        fileSize : 10 * 1024 * 1024
    }
})

// {
//     destination : "./uploads",
//     filename : (req , file , cb)=>{
//         cb(null , `${new Date().getTime()}-${file.originalname}`)
//     }
// }

export default upload