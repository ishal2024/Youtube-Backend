const subscriptionModel = require('../models/subscription.model')


async function toggleSubscription(req,res){
    try {
        const {channelId} = req.params
        const userId = req.user._id
    
        const subscribe = await subscriptionModel.find({$and : [{subscriber : userId} , {channel : channelId}]})
        console.log(subscribe.length !== 0)
        if(subscribe.length !== 0){
           const response = await subscriptionModel.findByIdAndDelete(subscribe[0]._id)
           return res.status(200).send({message : 'Channel is unsubscribed' , subscribe : false , response})
        }
    
        const subscribeInfo = await subscriptionModel.create({
           subscriber : userId,
           channel : channelId
        })
    
        res.status(200).send({message : 'Channel is Subscribed' , subscribe : true , subscribeInfo})
        
        
    } catch (error) {
        res.status(200).send({message : error.message})
    }

}

async function getUserChannelSubscribers(req,res){
    try {
        const {channelId} = req.params
        
        const subscriberList = await subscriptionModel.find({channel : channelId}).populate('subscriber')
    
        res.status(200).json({message : "List of subscribers" ,'Number of subscribers' : subscriberList.length , subscriberList})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function getSubscribedChannels(req,res){
    try {
        const userId = req.user?._id
   
        const data = await subscriptionModel.find({subscriber : userId}).populate('channel')
   
        res.status(200).json({message : "List of Channels" ,'Number of channels' : data.length , data})
        
    } catch (error) {
         res.status(200).json({message : error.message})
    }
}


module.exports = {toggleSubscription , getUserChannelSubscribers , getSubscribedChannels}