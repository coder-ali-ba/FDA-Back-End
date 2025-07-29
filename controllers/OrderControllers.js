 import orderMultipleModel from "../models/orderModels/multipleOrderModel.js"
import orderModel from "../models/orderModels/orderModel.js"
import rests from "../models/RestaurantModel/restmodel.js"



const placeOrder = async(req , res)=>{
    const body = req.body
     const userId = req.user.id
     
     

     const createdBody ={
        ...body,
        placedBy : userId,
        status : "pending"
     }

     const createdOrder = await orderModel.create(createdBody)
    res.json({
        message : "api Hitssss",
        data : createdOrder
       
    })
}

const orderMultipleItems = async(req , res)=>{
    const body =req.body
    const id = req.user.id
    const obj ={
        ...body,
        status : "pending",
        orderedBy :id
    }
    const makeMultipleOrder = await orderMultipleModel.create(obj)
    res.json({
        message : "place Multiple",
        data :makeMultipleOrder
    })
}

const getMyOrders = async (req ,res) => {
    const id =req.user.id
    const myOrders = await orderMultipleModel.find({orderedBy : id})
    res.json({
        message : "got My orders",
        data : myOrders
    })
}

const ordersForVendor=async(req ,res) => {
    const vendorId = req.user.id;
     const myRests =await rests.find({createBy : vendorId})

     let nameArray =[]

     const names = myRests.filter((rest)=>{
        return  nameArray.push(rest.restaurantName)
     })
     const orderToMyRest = await orderMultipleModel.find({
        restaurant: { $in: nameArray }  
     })

    
    res.json({
        message : "got for Vendor",
        data : orderToMyRest
    })
}


const handleaccept = async(req ,res) =>{
    const acceptId = req.params.id;
    const obj ={
        status : "accepted"
    }
    const updateAccept = await orderMultipleModel.findByIdAndUpdate(acceptId , obj)
    res.json({
        message: "handleaccept",
        data :updateAccept
    })
}


const handleCancel = async(req ,res) =>{
    const cancelId = req.params.id;
    const obj ={
        status : "cancelled"
    }
    const updateCancel = await orderMultipleModel.findByIdAndUpdate(cancelId , obj)
    res.json({
        message: "handled Cancelled",
        data :updateCancel
    })
}

const handlePending = async(req ,res) =>{
    res.json({
        message: "handlePending"
    })
}
const handleDelivered = async(req ,res) =>{
    const deliverId = req.params.id;
    const obj ={
        status : "delivered"
    }
    const updateDeliver = await orderMultipleModel.findByIdAndUpdate(deliverId , obj)
    res.json({
        message: "handled Cancelled",
        data :updateDeliver
    })
}

const getAllOrdersController = async (req ,res) => {
    const allOrders = await orderMultipleModel.find()
    res.json({
        message :" got all orders for admin",
        data : allOrders
    })
}


export {
     placeOrder,
     orderMultipleItems,
     getMyOrders ,
     ordersForVendor,
     handleaccept,
     handleCancel,
     handlePending,
     handleDelivered,
     getAllOrdersController
}