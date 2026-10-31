const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    post: {
        type: String,
        unique: [true, "post id is required for creating a like"]
    },
    user: {
        type: String
    }
},
{
    timestamps: true
}
)

// this is for database using this user can't create multipal like
likeSchema.index({post: 1, user: 1}, {unique: true})

const likemodel = mongoose.model("like", likeSchema)

module.exports = likemodel