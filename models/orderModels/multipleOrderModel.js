import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  items: [
    {
      type: String,
      required: true,
    }
  ],
  prices: [
    {
      type: Number,
      required: true,
    }
  ],
  restaurant: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status :{
    type : String,
    default : "pending",
    enum : ["cancelled", "pending" , "accepted" , "delivered"]
  },
  orderedBy :{
    type : String,
  }
});

const orderMultipleModel = mongoose.model('Order', OrderSchema);
export default orderMultipleModel