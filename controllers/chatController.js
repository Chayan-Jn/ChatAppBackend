const Message = require('../models/message');
const User = require('../models/user')

const fetchMessages = async (req, res) => {

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

    const fetchedMessages = await Message.find({chatId:chatId});
    return res.status(200).json({
        success: true,
        message: fetchedMessages
    })
    
}

module.exports = {fetchMessages};