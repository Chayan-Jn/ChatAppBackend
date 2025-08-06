const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    socketId: {
        type: String,
        default: null
    },
    isOnline: {
        type: Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('User',userSchema);