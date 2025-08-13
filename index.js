const connectToDB = require('./database/db.js')
const express = require('express');
const authRoutes = require('./routes/authRoutes.js')
require('dotenv').config()
const uploadRoutes = require('./routes/uploadRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const {Server} = require('socket.io')
const http = require('http');
const user = require('./models/user.js');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const storeMessage = require('./helpers/msgStorageHelper.js');



// connect to db
connectToDB()


const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser())

//cors
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST'],
    credentials: true
}));


// Socket Setup
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin:["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
const userList = new Map();
io.on('connection',(socket)=>{
    console.log(`User with socket id ${socket.id} connected`)
    socket.on('loginUser',(userId)=>{
        userList.set(userId,socket.id);
    })
    socket.on('send-msg',async (receivedData)=>{
        const receiverSocket = userList.get(receivedData.userId);

        const now = new Date();
        const createdAt =now.toISOString(); 
        const updatedAt =now.toISOString();
        
        const newMsg = 
        {
            sender:receivedData.senderId,
            receiver:receivedData.userId,
            text:receivedData.text,
            chatId:receivedData.chatId,
            createdAt,
            updatedAt,
        }
        // This stores the msg in db
        await storeMessage(newMsg);
        if(receiverSocket){
            io.to(receiverSocket).emit('receive-msg',(newMsg))
        }
    })
    socket.on('disconnect',()=>{
        for(let [uid,sid] of userList){
            if(sid == socket.id) userList.delete(uid);
        }
        console.log(`User with socket id ${socket.id} disconnected`);
    })
})

app.use(express.json());
app.use('/app',authRoutes)
app.use('/app',uploadRoutes);
app.use('/app',chatRoutes);


httpServer.listen(PORT,()=>{
    console.log('Server is listening on Port ',PORT)
})