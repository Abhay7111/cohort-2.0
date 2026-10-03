const express =  require('express');
const userModel = require('../models/user.model');

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const { email, password, username } = req.body

    const user = await  userModel.create({
        email, password, username
    })
    res.status(201).json({
        message:"User created successfully",
        user
    })

})

module.exports = authRouter