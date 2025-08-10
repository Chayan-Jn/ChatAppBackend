const Message = require('../models/message');
const User = require('../models/user')

const fetchMessages = async (req, res) => {
    console.log('Fetch msg runs ')
    const receiver = await User.findOne({ username: req.params.username });
    console.log("receiver is ", receiver.username);
    if (!receiver) {
        return res.status(500).json({
            success: false,
            message: "Receiver not found"
        })
    }
    const sender = await User.findById(req.userInfo.userId);
    const usernames = [receiver.username,sender.username];
    const chatId = usernames.sort().join('_');

    const fetchedMessages = await Message.find({chatId:chatId}).sort({createdAt:1});
    return res.status(200).json({
        success: true,
        message: 'Messages Fetched Successfully',
        history:fetchedMessages
    })
    
}

const searchUser = async (req,res)=>{
    try{
        console.log("Search User runs")
        const username = req.params.username;
        const foundUser = await User.findOne({username});
        if(!foundUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"User found",
            username:foundUser.username,
            userId:foundUser._id
        })
    }
    catch(err){
        console.log("Error getting the user ");
        return res.status(500).json({
            success:false,
            message:"Server error occured"
        })
    }
}
module.exports = {fetchMessages,searchUser};