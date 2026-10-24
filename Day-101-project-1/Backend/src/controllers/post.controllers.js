const postModel = require('../models/post.model');
const ImageKey = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imagekit = new ImageKey({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function postController(req, res) {
    
    const token = req.cookies.token

    if(!token) {
        return res.status(404).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let deCoded = null
    try{
        deCoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message:"user not authorized"
        })
    }
    console.log(deCoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        img_url: file.url,
        user: deCoded.id
    })


    res.status(201).json({
        message: "Post created successfully",
        post: post
    })
}

async function getPostsController(req, res) {
    const token = req.cookies.token
    let decoded = null

    if(!token) {
        return res.status(401).json({
            message: "UnAuthorized access"
        })
    }

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch (err) {
        return res.status(401).json({
            message: "Token invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message : "Post fetched successfully",
        posts
    })
}

async function getPostDetailsController(req, res) {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message: "UnAuthorized access"
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully.",
        post
    })
}

module.exports = {
    postController,
    getPostsController,
    getPostDetailsController
}