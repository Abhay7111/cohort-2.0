const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

authRouter.post('/register', async (req, res) => {
    const {name , email , password} = req.body
    const uniqueEmail = await userModel.findOne({ email })

    if(uniqueEmail) {
        res.status(409).json({
            message:"Error! Email already exist",
            email
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "2h"})
    
    res.cookie("token", token);

    res.status(201).json({
        message:'user create successfully',
        user
    })

})

authRouter.get('/get-me', async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'Authentication required'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded)

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const isPasswordValid = hash === user.password

    if(!user) {
        return res.status(404).json({
            message:"Email not found"
        })
    }

    if(!isPasswordValid) {
        return res.status(401).json({
            message:"Your password is incorrect"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    res.status(200).json({
        message:"You are loggedin",
        email,
        name: user.name
    })
})

module.exports = authRouter;
