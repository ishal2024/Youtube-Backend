const videoModel = require("../models/video.model")
const commentModel = require('../models/comment.model')



async function getVideoComments(req,res){
    try {
        const videoId = req.params?.videoId
        if(!videoId) return res.status(400).json({message : "Inavlid videoId"})
        
         const comment = await commentModel.find({video : videoId }) 
         if(comment.length == 0) return res.status(400).json({message : "No Comments On this Video"})
    
        res.status(200).json({message : "Video Comments" , comment})
        
    } catch (error) {
        return res.status(400).json({message : error.message})
    }
}

async function addComment(req, res) {
    try {
        const { videoId } = req.params
        const content = req.body?.content
        if (!content || content.trim().length === 0) return res.status(400).json({ message: "Please enter comment" })

        const video = await videoModel.findById(videoId)
        if (!video) return res.status(400).json({ message: "Video not exist" })

        const comment = await commentModel.create({
            content,
            video: videoId,
            owner: req.user?._id
        })

        res.status(200).json({ message: "Comment added", comment })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function updateComment(req, res) {
    try {
        const commentId = req.params?.commentId
        if (!commentId) return res.status(400).json({ message: "Invalid Comment Id" })
        const { content } = req.body?.content

        if (!content || content.trim().length === 0) return res.status(400).json({ message: "Please enter comment" })

        const updatedComment = await commentModel.findByIdAndUpdate(commentId, { $set: { content } })
        if (!updatedComment) return res.status(400).json({ message: "Comment not found" })

        res.status(200).json({ message: "Comment is updated", updateComment })

    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = req.params?.commentId
        if (!commentId) return res.status(400).json({ message: "Invalid Comment Id" })
        
        const deletedComment = await commentModel.deleteOne({'_id' : commentId})
        if(!deletedComment) return res.status(400).json({ message: "Invalid Comment Id" })
    
        res.status(200).json({message : "Comment is deleted" , deletedComment})
        
    } catch (error) {
        res.status(200).json({message : error.message})
    }
}


module.exports = { addComment, updateComment , deleteComment , getVideoComments }