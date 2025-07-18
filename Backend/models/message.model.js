import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqired:true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqired:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});
const Message= mongoose.model("message",messageSchema);
export default Message;