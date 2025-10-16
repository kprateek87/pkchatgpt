import { model, Schema } from "mongoose";

const transactionSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:"User",required:true},
    planId:{type:String,required:true},
    amount:{type:Number,required:true},
    credits:{type:Number,required:true},
    isPaid:{type:Boolean,required:true}
},{timestamps:true})

const Transaction = model("Transaction", transactionSchema);

export default Transaction;