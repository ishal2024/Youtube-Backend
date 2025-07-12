const videoModel = require("../models/video.model")
const likeModel = require('../models/like.model')
const commentModel = require("../models/comment.model")
const tweetModel = require("../models/tweet.model")
const { exists } = require("../models/subscription.model")


async function toggleVideoLike(req, res) {
    try {
        const videoId = req.params?.videoId
        const video = await videoModel.findById(videoId)
        if (!video) return res.status(400).json({ message: "Invalid Video Id" })
        console.log(video)
        const videoExist = await likeModel.find({ likedBy: req.user?._id, video: videoId })
        console.log(videoExist)
        if (videoExist.length !== 0) {
            await likeModel.deleteOne({ '_id': videoExist[0]._id })
            const dislikedVideo = await videoModel.findByIdAndUpdate(videoId, { $set: { like: video.like - 1 } }, { new: true })
            return res.status(200).json({ message: "Video is dislike" , dislikedVideo})
        }

        const likeVideoDocument = await likeModel.create({
            video: videoId,
            likedBy: req.user._id
        })

        const likedVideo = await videoModel.findByIdAndUpdate(videoId, { $set: { like: video.like + 1 } }, { new: true })
        res.status(200).json({ message: "Video is liked" , likedVideo, likeVideoDocument})

    } catch (error) {
         res.status(400).json({ message: error.message })
    }
}

async function toggleCommentLike(req,res){
     try {
        const commentId = req.params?.commentId
        const comment = await commentModel.findById(commentId)
        if (!comment) return res.status(400).json({ message: "Invalid Video Id" })
        
        const commentExist = await likeModel.find({ likedBy: req.user?._id, comment: commentId })
       
        if (commentExist.length !== 0) {
            await likeModel.deleteOne({ '_id': commentExist[0]._id })
            const dislikedComment = await commentModel.findByIdAndUpdate(commentId, { $set: { like: comment.like - 1 } }, { new: true })
            return res.status(200).json({ message: "Video is dislike" , dislikedComment})
        }

        const likeCommentDocument = await likeModel.create({
            comment: commentId,
            likedBy: req.user._id
        })

        const likedComment = await commentModel.findByIdAndUpdate(commentId, { $set: { like: comment.like + 1 } }, { new: true })
        res.status(200).json({ message: "Video is liked" , likedComment, likeCommentDocument})

    } catch (error) {
         res.status(400).json({ message: error.message })
    }
}

async function toggleTweetLike(req,res){
    try {
        const tweetId = req.params?.tweetId
        const tweet = await tweetModel.findById(tweetId)
        if (!tweet) return res.status(400).json({ message: "Invalid Tweet Id" })
        
        const tweetExist = await likeModel.find({ likedBy: req.user?._id, tweet: tweetId })
       
        if (tweetExist.length !== 0) {
            await likeModel.deleteOne({ '_id': tweetExist[0]._id })
            const dislikedTweet = await tweetModel.findByIdAndUpdate(tweetId, { $set: { like: tweet.like - 1 } }, { new: true })
            return res.status(200).json({ message: "Tweet is dislike" , dislikedTweet})
        }

        const likeTweetDocument = await likeModel.create({
            tweet: tweetId,
            likedBy: req.user._id
        })

        const likedTweet = await tweetModel.findByIdAndUpdate(tweetId, { $set: { like: tweet.like + 1 } }, { new: true })
        res.status(200).json({ message: "Tweet is liked" , likedTweet, likeTweetDocument})

    } catch (error) {
         res.status(400).json({ message: error.message })
    }
}

async function getAllLikedVideos(req,res){
    try {
        const userId = req.user?._id
    
        const likedVideos = await likeModel.find({$and : [{likedBy : userId} , {video : {$exists : true}}]}).populate('video')
    
        if(likedVideos.length === 0) return res.status(200).json({message : "No video is liked"})
    
        res.status(200).json({message : "Liked Videos" , likedVideos})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }

}

module.exports = {toggleVideoLike , toggleCommentLike , toggleTweetLike , getAllLikedVideos}