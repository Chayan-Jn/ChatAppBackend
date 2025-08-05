const connectToDB = require('./database/db.js')
const express = require('express');
const authRoutes = require('./routes/authRoutes.js')
require('dotenv').config()
const uploadRoutes = require('./routes/uploadRoutes.js')
// connect to db
connectToDB()


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/app',authRoutes)
app.use('/app',uploadRoutes);


app.listen(PORT,()=>{
    console.log('Server is listening on Port ',PORT)
})