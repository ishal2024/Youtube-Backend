const subscriptionModel = require("../models/subscription.model")
const tweetModel = require("../models/tweet.model")
const videoModel = require("../models/video.model")


async function getChannelStats (req,res){
    try {
        const userId = req.user?._id
        let totalSubscribers = null
        const channel = await subscriptionModel.find({channel : userId})
        if(channel.length !== 0) totalSubscribers = channel.length
    
        let totalVideos = null
        const videos = await videoModel.find({owner : userId})
        const tweets = await tweetModel.find({owner : userId})
        if(videos.length !== 0) totalVideos = videos.length
    
        let totalViews = 0
        if(videos.length !== 0){
            videos.map((val) => {
                totalViews = totalViews + val?.views
            })
        }

        let totalTweetLikes = 0
        if(tweets.length !== 0){
            tweets.map((val) => {
                totalTweetLikes = totalTweetLikes + val?.like
            })
        }
    
        let totalVideosLikes = 0
        if(videos.length !== 0){
            videos.map((val) => {
                totalVideosLikes = totalVideosLikes + val?.like
            })
        }
    
        res.status(200).json({message : "Channel Information" , totalSubscribers , totalVideos , totalVideosLikes , totalViews , totalTweetLikes})
        
    } catch (error) {
        res.status(200).json({message : error.message})
    }

}

async function getChannelVideos(req,res){
    try {
        const userId = req.user?._id
        const channelVideos = await videoModel.find({owner : userId})
        if(channelVideos.length === 0) return res.status(200).json({message : "No Video is Uploaded"})
        res.status(200).json({message : "Channel Videos" , channelVideos})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports = {getChannelVideos , getChannelStats}