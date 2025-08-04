const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        maxLength:1000,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()  
    },
    imageUrl:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.objectId,
        required:true,
        ref:'User'
    }
})

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;