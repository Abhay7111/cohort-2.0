const express = require('express');
const createPost = require('../controllers/post.controllers');
const multer = require('multer');
const uploade = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()

postRouter.post('/',uploade.single('img_url'), createPost)

module.exports = postRouter