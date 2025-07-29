import express from "express";
import { AdminAuthCheck, AuthCheck } from "../MiddleWares/authMiddleWare.js";
import { changeMenuStatus, deleteMenu, getAllMenues,  getApprovedMenu,  menuForAdmin } from "../controllers/MenuControllers.js";

const MenuRouter = express.Router()

MenuRouter.get("/getall" , AuthCheck , getAllMenues)
MenuRouter.get("/getforadmin" , AdminAuthCheck , menuForAdmin)
MenuRouter.delete("/delete/:id" , AdminAuthCheck , deleteMenu)
MenuRouter.patch("/changestatus/:id" , AdminAuthCheck , changeMenuStatus)
MenuRouter.get("/getapprovedmenu" , AuthCheck , getApprovedMenu)

export default MenuRouter