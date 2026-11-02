const express = require('express');
const authControllers = require('../controllers/auth.controllers');
const userIdentify = require('../middlewares/auth.middleware')

const authRouter = express.Router()

authRouter.post('/register', authControllers.registerController)

authRouter.post('/login', authControllers.loginController)

authRouter.get('/get-me',userIdentify, authControllers.getMeController)

module.exports = authRouter