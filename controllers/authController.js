
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists",
                user: {
                    userId: existingUser._id,
                    username: existingUser.username
                }
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while registering the user",
            error: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        
        const { username, password } = req.body;
        const userExists = await User.findOne({ username: username });
        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }  

        const isPasswordValid = await bcrypt.compare(password,userExists.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }

        const accessToken = jwt.sign(
        {
            userId:userExists._id,
            username:username,
        }, 
            process.env.JWT_SECRET,
        {   expiresIn:'50m'}
        )

        // Clear old cookie if it exists

        // Set token in HttpOnly cookie
        res.cookie('token', accessToken, {
            httpOnly: true, // JS cannot access this cookie
            secure: false, // send cookie only over HTTPS in prod. If its development, secure is false 
            sameSite: 'lax', // CSRF protection
            maxAge: 50 * 60 * 1000, // 50 minutes in milliseconds,
            path:"/"
        });

        res.status(200).json({
            success:true,
            message:"Logged in successfully ",
            user:{
                username:username,
                userId:userExists._id
            }
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while logging in ",
            error: err
        })
    }
}
const getCurrentUser = async (req,res)=>{

        console.log("get current user runs")
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
            console.log("decoded token is ",decodedToken);
            return res.status(200).json({
                success:true,
                message:"Current User fetched successfully",
                data:{
                    username:decodedToken.username,
                    userId:decodedToken.userId

                }
            })
        }
        catch(e){
            return res.status(500).json({
                success:false,  
                messsage:"Access denied, no token provided"
            })
        }
}


module.exports = { registerUser,loginUser,getCurrentUser}