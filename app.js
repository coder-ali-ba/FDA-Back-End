import express, { json } from "express";
import mongoose, { model } from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js";
import restaurantRouter from "./routes/RestaurantRoutes.js";
import uploadRouter from "./routes/UploadImageRoutes.js";
import { cloudinaryConfig } from "./Config/cloudinaryConfig.js";
import Adminrouter from "./routes/AdminRoutes.js";
import MenuRouter from "./routes/MenuRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";

dotenv.config()
cloudinaryConfig()


const PORT = process.env.PORT || 5050

const URI = process.env.URI

mongoose.connect(URI)
.then(()=>console.log("Connected"))
.catch(()=>console.log("connection Error"))

const app = express()
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))
app.use(express.json())
app.use(express.urlencoded({extended :true}))


app.use("/api/auth" , authRouter)
app.use("/api/restaurant"  , restaurantRouter)
app.use('/api/image' , uploadRouter)
app.use('/api/admin' , Adminrouter)
app.use("/api/menu" , MenuRouter)
app.use("/api/order" , orderRouter)




app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})


export default app