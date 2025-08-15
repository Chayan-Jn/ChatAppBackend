const Message = require('../models/message');
const User = require('../models/user')
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');

const imageController = async (req,res)=>{
    try{
        //  /messages/:username
        console.log("Image Controller runs ");
        const receiver = await User.findOne({username:req.params.username});
        console.log("receiver is ",receiver.username);
        if(!receiver){
            return res.status(500).json({
                success:false,
                message:"Receiver not found"
            })
        }
        const sender  = await User.findById(req.userInfo.userId);
        const usernames = [receiver.username,sender.username];
        const chatId = usernames.sort().join('_');

        let imageUrl = null;
        let publicId = null;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
            imageUrl = result.url;
            publicId = result.publicId;
        }
        
        if(!imageUrl){ 
            return res.status(400).json({
                success:false,
                message:"No image found"
            })
        }
        
        const newMessage = await Message.create({
            imageUrl,
            sender:sender._id,
            receiver:receiver._id,
            chatId:chatId
        })
        res.status(200).json({
            success:true,
            message:"Message sent successfully ",
            msgData:newMessage
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

module.exports = imageController;