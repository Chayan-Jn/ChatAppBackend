
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
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
            user: {
                _id: newUser._id,
                username: newUser.username
            }
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
        console.log("body is ",req.body)
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
            userID:userExists._id,
            username:username,
        }, 
            process.env.JWT_SECRET,
        {   expiresIn:'50m'}
        )

        res.status(200).json({
            success:true,
            message:"Logged in successfully ",
            accessToken
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
module.exports = { registerUser,loginUser}