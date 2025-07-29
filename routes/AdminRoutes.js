import express from "express";

import { AdminAuthCheck, AuthCheck } from "../MiddleWares/authMiddleWare.js";
import { changeCustomerStatus, changeVendorStatus, getAllCustomers, getAllRestaurantController, getAllVendors, getMyDatas, restaurantApprovalController } from "../controllers/AdminControllers.js";

const Adminrouter =express.Router()

Adminrouter.get("/allrestaurants" ,AuthCheck , getAllRestaurantController)
Adminrouter.patch("/approve-restaurant/:id" ,AdminAuthCheck , restaurantApprovalController)
Adminrouter.get("/getall-customers" ,AdminAuthCheck , getAllCustomers)
Adminrouter.get("/getall-vendors" ,AdminAuthCheck , getAllVendors)
Adminrouter.patch("/changestatus/:id" ,AdminAuthCheck , changeCustomerStatus)
Adminrouter.patch("/changeVendorstatus/:id" ,AdminAuthCheck , changeVendorStatus)
Adminrouter.get("/getmydata" , AuthCheck , getMyDatas)


export default Adminrouter