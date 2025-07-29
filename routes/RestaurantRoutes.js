import express from "express";

import { 
    createMenu,
    createRestaurantController, 
    deleteRestaurantController, 
    editRestaurantController, 
    getAllrestaurantName, 
    getApprovedRestaurants, 
    getRestaurantsController, 
    getSingleRestaurant, 
    openRestaurantController 
} from "../controllers/RestaurantControllers.js";
import { AuthCheck } from "../MiddleWares/authMiddleWare.js";

const restaurantRouter = express.Router()

restaurantRouter.post("/create" , AuthCheck ,  createRestaurantController)
restaurantRouter.get("/getall", AuthCheck ,  getRestaurantsController)
restaurantRouter.delete("/delete/:id" , AuthCheck , deleteRestaurantController)
restaurantRouter.put("/edit/:id" , AuthCheck , editRestaurantController)
restaurantRouter.patch("/approve/:id" , AuthCheck , openRestaurantController)
restaurantRouter.post("/create-menu" ,AuthCheck ,  createMenu)
restaurantRouter.get("/rests-names" ,AuthCheck ,  getAllrestaurantName)
restaurantRouter.get("/getapproved" ,AuthCheck ,  getApprovedRestaurants)
restaurantRouter.get("/getsinglerest/:id" ,AuthCheck ,  getSingleRestaurant)


export default restaurantRouter

