const Message = require('../models/message');
const User = require('../models/user')
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');

const messageController = async (req,res)=>{
    try{
        //  /messages/:username
        console.log("Message Controller runs ");
        const receiver = await User.findOne({username:req.params.username});
        console.log("receiver is ",receiver.username);
        if(!receiver){
            return res.status(500).json({
                success:false,
                message:"Receiver not found"
            })
        }

        console.log("UserInfo is ",req.userInfo);
        
        const sender  = await User.findById(req.userInfo.userId);


        console.log("Sender is ",sender)
        const usernames = [receiver.username,sender.username];
        const chatId = usernames.sort().join('_');
        const text = req.body;

        let imageUrl = null;
        let publicId = null;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
            imageUrl = result.url;
            publicId = result.publicId;
        }
        else{
            return res.status(500).json({
                success:false,
                message:"No file Found"
            })
        }
        
        if(!text && !imageUrl){ // If both are absent, cant send msg
            return res.status(400).json({
                success:false,
                message:"No message found"
            })
        }
        
        const newMessage = await Message.create({
            text,
            imageUrl,
            sender:sender._id,
            receiver:receiver._id,
            chatId:chatId
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

module.exports = messageController;