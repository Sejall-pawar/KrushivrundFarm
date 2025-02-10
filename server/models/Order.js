import {model, Schema} from "mongoose"; 
import Product from "./Product";

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Products:[
        {
           productID: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
           },
           quantity: {
            type: Number,
            required: true,
           },
           price: {
            type: Number,
            required: true,
           },
        }
    ],
    totalBill: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    paymentID: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    timeline: [
        {
            status: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ]
}, {
    timestamps: true,
});

const Order = model("Order", orderSchema);

export default Order;