import mongoose, { Schema } from "mongoose";
import { type } from "os";

const menuSchema = new mongoose.Schema({
    itemName : {
        type : String,
        required : true
    },
    restaurantName : {
        type : String,
        required : true
    },
    itemDesc : {
        type : String,
        required : true
    },
    itemPrice : {
        type : String,
        required : true
    },
    imageURL : String,
    createBy : String,
    isApproved :{
        type : Boolean,
        default : false
    }
})

const menuModel = mongoose.model("menues" , menuSchema)

export default menuModel