const express = require('express');
const postController = require('../controllers/post.controllers');
const multer = require('multer');
const uploade = multer({storage:multer.memoryStorage()})
const userIdentify = require('../middlewares/auth.middleware')

const postRouter = express.Router()

// Only logged in user can post 
postRouter.post('/',uploade.single('img_url'), userIdentify, postController.postController)

// GET posts belong created user
postRouter.get('/', userIdentify , postController.getPostsController)

// GET specific post belong user
postRouter.get('/details/:postId', userIdentify , postController.getPostDetailsController)

module.exports = postRouter