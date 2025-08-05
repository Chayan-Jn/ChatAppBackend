const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        maxLength:1000,
    },
    imageUrl:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    chatId:{
        type:String,
        required:true
    },
},    {timestamps:true})

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;