const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    img_url:{
        type: String,
        // required: [true, "imgUrl is required for create an post"]
    },
    user: {
        ref:"users",
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "user id is required for creating an post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel  