const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const crypto = require('crypto');
const authControllers = require('../controllers/auth.controllers');

const authRouter = express.Router()

authRouter.post('/register', authControllers.registerController)
authRouter.post('/login', authControllers.loginController)

module.exports = authRouter