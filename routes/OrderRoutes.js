import express from "express";
import { placeOrder,  orderMultipleItems, getMyOrders, ordersForVendor, handleaccept, handleCancel, handleDelivered, getAllOrdersController } from "../controllers/OrderControllers.js";
import { AdminAuthCheck, AuthCheck } from "../MiddleWares/authMiddleWare.js";


const orderRouter =express.Router()


orderRouter.post("/placeorder" ,AuthCheck , placeOrder)
orderRouter.post("/placemultipleorder" ,AuthCheck , orderMultipleItems)
orderRouter.get("/myOrders/:id" , AuthCheck , getMyOrders)
orderRouter.get("/orderForvendor" , AuthCheck , ordersForVendor)
orderRouter.patch("/orderaccept/:id" , AuthCheck , handleaccept)
orderRouter.patch("/ordercancel/:id" , AuthCheck , handleCancel)
orderRouter.patch("/handleDelivered/:id" , AuthCheck , handleDelivered)
orderRouter.get("/allorder" , AdminAuthCheck , getAllOrdersController)


export default orderRouter