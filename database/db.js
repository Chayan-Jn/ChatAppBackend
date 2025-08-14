const mongoose = require('mongoose')
require('dotenv').config()

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected successfully")
    }
    catch (err) {
        console.log("Error while connecting to db ", err);
    }
}

module.exports = connectToDB;