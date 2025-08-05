const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect('mongodb+srv://chayan:chayan@cluster0.ctzw5qr.mongodb.net/chatapp');
        console.log("db connected successfully")
    }
    catch (err) {
        console.log("Error while connecting to db ", err);
    }
}

module.exports = connectToDB;