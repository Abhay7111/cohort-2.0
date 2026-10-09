const express =  require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const { email, password, username } = req.body

    const userAlreadyExist = await userModel.findOne({email})

    if (userAlreadyExist) {
        return res.status(400).json({
            message: "User already exist with this email"
        })
    }

    
    const user = await  userModel.create({
        email, password, username
    })
    
    const token = jwt.sign({
        id :user._id,
        email :user.email
    },

    process.env.JWT_SECRET
    
    )

    res.cookie("JWT_token", token)

    res.status(201).json({
        message:"User created successfully",
        user,
        token
    })

})

module.exports = authRouter