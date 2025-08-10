const expres = require('express');
const jwt = require('jsonwebtoken');


const authMiddleware = async (req,res,next)=>{
    console.log("Auth middleware runs ")
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookies?.token;
    if(!token){
        return res.status(400).json({
            success:false,
            message:"No token provided"
        })
    }
    // Decode the token
    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded token is ",decodedToken);
        req.userInfo = decodedToken;
        next()
    }
    catch(e){
        return res.status(500).json({
            success:false,  
            messsage:"Access denied, no token provided"
        })
    }
}   

module.exports = authMiddleware;