import {model, Schema} from "mongoose"; 

const paymentSchema = new Schema({
    orderId: { 
        type: Schema.Types.ObjectId,  
        ref: "Order",  
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["paid", "failed", "pending"],
    },
}, {
    timestamps: true,
});

const Payment = model("Payment", paymentSchema);

export default Payment;