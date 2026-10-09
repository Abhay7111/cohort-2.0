const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const { email, password, username } = req.body

    const userAlreadyExist = await userModel.findOne({ email })

    if (userAlreadyExist) {
        return res.status(400).json({
            message: "User already exist with this email"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email, password: hash, username
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },

        process.env.JWT_SECRET

    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User created successfully",
        user,
        token
    }, console.log(user))

})

authRouter.post('/protected', (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "This is protected route"
    })
})

authRouter.post('/signin', async (req, res) => {

    const { email, password } = req.body

    const existEmail = await userModel.findOne({ email })

    if (!existEmail) {
        return res.status(404).json({
            message: "user not found with this email"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const matchedPassword = existEmail.password === hash

    if (!matchedPassword) {
        return res.status(404).json({
            message: "wrong password"
        })
    }

    const token = jwt.sign({
        id: existEmail._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User logged in successfully",
        existEmail
    })


})

module.exports = authRouter