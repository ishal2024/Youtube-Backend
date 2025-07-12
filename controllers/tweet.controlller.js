const tweetModel = require('../models/tweet.model')


async function createTweet(req,res){
    
    if(!req.body) return res.status(400).json({message: "Please enter the tweet description"})
    const {content} = req.body
    
    const tweet = await tweetModel.create({
          content,
          owner : req.user?._id
    })

    res.status(200).json({message : "Tweet is created" , tweet})
}

async function getUserTweets(req,res){
     try {
        const tweets = await tweetModel.find({'owner' : req.user._id})
        if(tweets.length == 0) return res.status(400).json({message : "Please add tweets"})
        
        res.status(200).json({tweets})
     } catch (error) {
        res.status(400).json({message : error.message})
     }
}

async function deleteTweet(req,res){
    try {
        
        const {tweetId} = req.params
        const tweet = await tweetModel.findByIdAndDelete(tweetId)
        if(!tweet) return res.status(400).json({message : "Invalid tweet Id"})
        
        res.status(200).json({message : "Tweet is deleted" , tweet})

    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function updateTweet(req,res){
    try {
        if(!req.body) return res.status(400).json({message: "Please enter the tweet description"})
        const {content} = req.body
        const {tweetId} = req.params
        const tweet = await tweetModel.findByIdAndUpdate(tweetId , {content} , {new : true})
        if(!tweet) return res.status(400).json({message: "Invalid tweet Id"})
        
        res.status(200).json({message : 'Twwet is updated' , tweet})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {createTweet , getUserTweets , deleteTweet , updateTweet}
