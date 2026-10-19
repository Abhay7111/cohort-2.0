const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const crypto = require('crypto')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const {username, email, password, profile_image, bio} = req.body;
    // const isUserExistByEmail = await userModel.findOne({ email })
    // const isUserExistByUsername = await userModel.findOne({ username })

    // const createUser = await userModel.create({
    //     username,
    //     email,
    //     password,
    //     profile_image,
    //     bio
    // })
    
    // if(isUserExistByEmail) {
    //     return res.status(409).json({
    //         message: "User already exist with this email"
    //     })
    // }

    // if(isUserExistByUsername) {
    //     return res.status(409).json({
    //         message: "Username is avolable try another one"
    //     })
    // }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isUserAlredayexist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlredayexist) {
        return res.status(409).json({
            message: "user alreday exist"
        })
    }

    const createUser = await userModel.create({
        username,
        password,
        email,
        password: hash,
        profile_image,
        bio
    })

    res.status(201).json({
        message: "user created successfully",
        users: [createUser]
    })
})

module.exports = authRouter