const message = require('../models/message');
async function storeMessage(msg){
    try{
        await message.create(msg);
    }
    catch(err){
        console.log("Error storing message")
    }

}

module.exports = storeMessage;