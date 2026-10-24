const express = require('express');
const postModel = require('../models/post.model');
const dataRouter = express.Router()

dataRouter.get('/data', async (req, res) => {
    const data = await postModel.find({})
    res.status(200).json({
        message:"data fetched successfully",
        data,
    })
})


module.exports = dataRouter