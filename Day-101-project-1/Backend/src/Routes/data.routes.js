const express = require('express');
const userModel = require('../models/user.model');
const dataRouter = express.Router()

dataRouter.get('/', async (req, res) => {
    const data = await userModel.find({})
    res.send(data)
})

module.exports = dataRouter