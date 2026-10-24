const express = require('express');
const postController = require('../controllers/post.controllers');
const multer = require('multer');
const uploade = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()

// Only logged in user can post 
postRouter.post('/',uploade.single('img_url'), postController.postController)

// GET posts belong created user
postRouter.get('/', postController.getPostsController)

// GET specific post belong user
postRouter.get('/details/:postId', postController.getPostDetailsController)

module.exports = postRouter