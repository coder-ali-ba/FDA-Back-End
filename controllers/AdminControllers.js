import { response } from "express"
import rests from "../models/RestaurantModel/restmodel.js"
import auths from "../models/userModel/userModel.js"

const getAllRestaurantController = async(req , res)=> {
    const response =await rests.find({})
    res.json({
        message : " get all restaurants",
        data : response
    })
}


const restaurantApprovalController = async (req , res) => {
    const id = req.params.id
    
    const response = await rests.findById(id);
    const approved = response.isApproved
    const updateObj = {
        isApproved : !approved
    }

    const updatedStatus=await rests.findByIdAndUpdate(id , updateObj , {new : true})
    res.json({
        message : 'got Approval Api',
        data:updatedStatus
    })
}


const getAllCustomers = async (req ,res) => {
    const getClients = await auths.find({type : "customer"})
    res.json({
        message : "got all Customers",
        data : getClients
    })
}

const getAllVendors = async (req ,res) => {
    const getVendors = await auths.find({type : "vendor"})
    res.json({
        message : "got all Vendors",
        data : getVendors
    })
}

const changeCustomerStatus = async (req , res) => {
   const customerId = req.params.id
   const findUser =await auths.findById(customerId)

   const obj ={
      isVarified: !findUser.isVarified
   }

   const updateCustomer =await auths.findByIdAndUpdate(customerId , obj  , {new : true})

    res.json({
        message : "change Status",
        data : updateCustomer
    })
}

const getMyDatas = async (req ,res) => {
    const myId = req.user.id
    const myData = await auths.findById(myId)
    res.json({
        message :"get my datas",
        data :myData
    })
}



const changeVendorStatus = async (req , res) => {
   const vendorId = req.params.id
   const findUser =await auths.findById(vendorId)

   const obj ={
      isVarified: !findUser.isVarified
   }
 const updateVendor =await auths.findByIdAndUpdate(vendorId , obj  , {new : true})
  
    res.json({
        message : "change Status",
        data : updateVendor
    })
}


export{ 
    getAllRestaurantController,
    restaurantApprovalController,
    getAllCustomers,
    getAllVendors,
    changeCustomerStatus,
    changeVendorStatus,
    getMyDatas
}

