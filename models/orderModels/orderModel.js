import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  placedBy : String,
  detail: {
    type: String,
    default: '',
  },
  status:{
    type : String,
    enum : ["pending", "accepted" , "delivered"]
  }
}, { timestamps: true });

const orderModel = mongoose.model('OrderItem', OrderItemSchema);
export default orderModel
