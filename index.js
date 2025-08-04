const connectToDB = require('./database/db.js')
const express = require('express');
const authRoutes = require('./routes/authRoutes.js')
require('dotenv').config()

// connect to db
connectToDB()


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/app',authRoutes);


app.listen(PORT,()=>{
    console.log('Server is listening on Port ',PORT)
})