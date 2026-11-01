const followModel = require('../models/follow.model')
const userModel = require('../models/user.model') 

async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isFolloweefound = await userModel.findOne({ username: followeeUsername })

    if (!isFolloweefound){
        return res.status(404).json({
            message: `[ ${followeeUsername} ] not found`
        })
    }

    if (followeeUsername == followerUsername) {
        return res.status(404).json({
            message: "You can not follow yourself"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowing) {
        return res.status(200).json({
            message: `your are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isFollowing) {
        return res.status(200).json({
            message: `${followeeUsername} is not exist`
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(201).json({
        message: `you unfollow ${followeeUsername}`
    })
}
 
async function followerStatusController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.followerUsername
    const status = req.body && req.body.status

    if (!followerUsername || !["pending", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({
            message: "A follower username and a valid status are required"
        })
    }

    const updateStatus = await followModel.findOneAndUpdate(
        {
            follower: followerUsername,
            followee: followeeUsername
        },
        {
            $set: { status }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if(!updateStatus) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    res.status(200).json({
        message: `[ ${updateStatus.status} ]: successful`,
        status_details: updateStatus
    })
}
module.exports = {
    followUserController,
    unfollowUserController,
    followerStatusController
}