const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const crypto = require('crypto')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const {username, email, password, profile_image, bio} = req.body;
    
    const isUserExistByEmail = await userModel.findOne({ email })
    
    if(isUserExistByEmail) {
        return res.status(409).json({
            message: "User already exist with this email"
        })
    }

    const isUserExistByUsername = await userModel.findOne({ username })

    if(isUserExistByUsername) {
        return res.status(409).json({
            message: "Username is avolable try another one"
        })
    }

    res.status(201).json({
        message: "user created successfully",
    })
})

module.exports = authRouter