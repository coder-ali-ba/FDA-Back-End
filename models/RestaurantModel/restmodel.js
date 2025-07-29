import mongoose from "mongoose";

const restModel = new mongoose.Schema({
    restaurantName: String,
    details: String,
    contactNumber: String,
    address: String,
    email: String,
    category: String,
    isOpen: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },

    createBy: String, 

    createAt: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    imageUrl: String

})

const rests = mongoose.model("Restaurants" , restModel)
export default rests