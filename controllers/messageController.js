const Message = require('../models/message');


const sendMessage = async (req,res)=>{
    try{
        const {text,imageUrl,senderId} = req.body;
        if(!(text && imageUrl)){ // If both are absent, cant send msg
            return req.status(400).json({
                success:false,
                message:"No message found"
            })
        }
        
        const newMessage = await Message.create({
            text,
            imageUrl,
            sender:senderId
        })
        res.status(200).json({
            success:true,
            message:"Message sent successfully ",
            messageID:newMessage._id
        })
    
    }
    catch(err){
        console.log("Error occured while sending message ",err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }

}