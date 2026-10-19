const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "Username already exist"],
        required: [true, "username is required"]
    },
    email:{
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Email id is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    profile_image: {
        type:String,
        default: "https://ik.imagekit.io/xpzegfs4i/default-user.jpg"
    },
    bio: String,
    phone: Number,
    followers: String,
    following: String
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel