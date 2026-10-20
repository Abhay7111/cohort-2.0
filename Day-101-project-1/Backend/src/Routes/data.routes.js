const express = require('express');
const userModel = require('../models/user.model');
const dataRouter = express.Router()

dataRouter.get('/data', async (req, res) => {
    const data = await userModel.find({})
    res.status(200).json({
        message:"data fetched successfully",
        data,
        username: data.username,
        email: data.email
    })
})


module.exports = dataRouter