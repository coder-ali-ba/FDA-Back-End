import { response } from "express"
import menuModel from "../models/menuModel/menuModal.js"
import rests from "../models/RestaurantModel/restmodel.js"

const createRestaurantController =async(req , res)=>{
    try {
        const body = req.body
        const userId = req.user.id

        const userObj = {
           ...body,
           createBy : userId
        }

        const restaurants = await rests.create(userObj)

        res.json({
           message:"Created Successfully",
           data : restaurants
        })
        } catch (error) {
        res.json({
            message : "something went wrong"
        })
       }   
   
}

const getRestaurantsController = async (req , res)=>{
    
    const userId = req.user.id
    // const data =await rests.find({createBy : userId})
    // res.json({
    //     message : "got It",
    //     data : data
    // })
    try {
        const response = await rests.find({
          createBy : userId,
          isDeleted : false
        })
    res.json({
        status : true,
        message : "Success",
        data : response
    })
    } catch (error) {
        res.json({
            status : false,
            message : "something went wrong"
        })
    }    
    
}

const deleteRestaurantController = async(req , res) =>{
    try {
        const id =req.params.id;
        
        const body = await rests.findOne({_id : id});
         const updateObj = {
             isDeleted : !body.isDeleted
     }       
         const response = await rests.findByIdAndUpdate(id , updateObj)
        res.json({
           message : `Soft Delete Successfully`,
           data : response
        })  
    } catch (error) {
        res.json({
            message: "Something Went Wrong"
        })
    }
       
}

const editRestaurantController = async(req , res) => {
    const body = req.body;
    const id = req.params.id;
    const editData = await rests.findByIdAndUpdate(id , body , {new : true})
    try {
        
        res.json({
           data : editData,
           message : "Got Edit Api"
        })
    } catch (error) {
        
        res.json({
         data : null,
         message : "Can't Get Edit Api"
        })
    }
  
}

const openRestaurantController = async(req , res) => {
    const id = req.params.id
    const body = await rests.findById(id)
    const approval =body.isApproved

    if(!approval){
        return res.json({
            message : "Please wait for the Admins Approval"
        })
    }

    const updateObj ={
        isOpen : !body.isOpen
    }

    const updateApproval =await rests.findByIdAndUpdate(id , updateObj)

    res.json({
        data : updateApproval,
        message:"Your Restaurant Status is Changed "
    })
}


const getAllrestaurantName = async (req , res) => {
    try {
        const id = req.user.id;
        const filter = {
            createBy : id,
            isApproved :true,
            isDeleted :false
        }
        const response = await rests.find(filter)
        res.json({
            data :response,
            message : "susskassfull"
        })
    } catch (error) {
        res.json({
            data :null,
            message : "UNNNNsusskassfull"
        })
    }
}


const createMenu = async(req , res) => {
    const id = req.user.id
    try {
        const body = req.body;
        const obj ={
            ...body,
            createBy : id
        }
        const response =await menuModel.create(obj)
        res.json({
          message : "got api",
          data : response
        })
    } catch (error) {
        res.json({
          message : "cannot get api",
          data : null
        })
    }
     
}

const getApprovedRestaurants = async(req , res) =>{
    const ApprovedRestaunts = await rests.find({
        isApproved : true,
        isDeleted : false
    })
    res.json({
        message : "Got Approved restaurants",
        data : ApprovedRestaunts
    })
}

const getSingleRestaurant = async (req , res) => {

    const id = req.params.id

    const menues = await menuModel.find({restaurantName : id})
    res.json({
        message : "hitted",
        data : menues
    })
}

export {
    createRestaurantController,
    getRestaurantsController,
    deleteRestaurantController,
    editRestaurantController,
    openRestaurantController,
    createMenu,
    getAllrestaurantName,
    getApprovedRestaurants,
    getSingleRestaurant
}