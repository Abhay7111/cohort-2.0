const express = require('express')
const userController = require('../controllers/user.controllers')
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()

/*
* @route POST /api/users/follow/:username

*/
userRouter.post('/follow/:username', identifyUser, userController.followUserController)

userRouter.delete('/follow/:username', identifyUser, userController.unfollowUserController)

module.exports = userRouter