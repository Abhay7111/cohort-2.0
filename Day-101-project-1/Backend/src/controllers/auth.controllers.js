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

    const token = jwt.sign(
        { id: createUser._id},
        process.env.JWT_SCREAT,
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
    })

    if(!user) {
        return res.status(404).json({
            error: "user not found"
        })
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex');

    // const isPasswordValid = hash == user.password

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(401).json({
            error: "your password is incorrect"
        })
    }

    const token = jwt.sign(
        {id: user._id},
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

module.exports = {
    registerController,
    loginController
}