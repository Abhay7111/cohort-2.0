const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

async function registerController(req, res) {
    const {email, username, password, bio, profile_image} = req.body ;

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(user) {
        return res.status(409).json({
            message: "User already exist with " + (user.email == email ? "email" : "username")
        })
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex')

    const hash = await bcryptjs.hash(password, 10)

    const createUser = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profile_image
    })

    // Token will expires in = 1Day
    const token = jwt.sign(
        { 
            id: createUser._id,
            username: createUser.username
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}    
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user created successfully",
        user: {
            username: createUser.username,
            email: createUser.email
        }
    })
}

async function loginController(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    }).select("+password")

    if(!user) {
        return res.status(404).json({
            error: "user not found"
        })
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(401).json({
            error: "your password is incorrect"
        })
    }

    // Token will expires in = 1Day
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.cookie("token", token);

    res.status(201).json({
        sucess: "you are loggedin",
        user: {
            username: `welcome back ${user.username}`,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

async function getMeController(req, res) {
    const userId = req.user.id
    const user = await userModel.findById(userId)

    res.status(200).json({
        user:{
            username: user.username,
            email: user.email,
            profileImage: user.profile_image,
            bio: user.bio
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}