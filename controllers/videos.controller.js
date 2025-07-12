const uploadCloud = require('../utils/cloudinary')
const videoModel = require('../models/video.model')
const { video } = require('../config/cloudinary.config')


async function publishVideo(req, res) {
    try {

        const { title, description } = req.body
        console.log(req.files)
        const videolocalPath = req.files?.video[0]?.path
        const thumbnailPath = req.files?.thumbnail[0]?.path
        console.log(videolocalPath)
        console.log(thumbnailPath)
        if (!videolocalPath) return res.status(400).json({ message: "Please upload video file" })
        if (!thumbnailPath) return res.status(400).json({ message: "Please upload thumbnail file" })

        const videoResponse = await uploadCloud(videolocalPath)
        const thumbnailResponse = await uploadCloud(thumbnailPath)

        console.log(videoResponse)
        console.log(thumbnailResponse)

        const duration = Number(((videoResponse.duration) / 60).toFixed(2))

        const uploadedVideo = await videoModel.create({
            title,
            description,
            video: videoResponse?.url,
            thumbnail: thumbnailResponse?.url,
            duration,
            owner: req.user?._id,

        })

        res.status(200).json({ message: "Video is uploaded", videoInfo: uploadedVideo })

    } catch (error) {
        res.status(200).send(error.message)
    }

}


async function updateVideo(req, res) {
    try {
        const videoId = req.params?.videoId
        const requiredFields = ["thumbnail", "video"]
        const updatedField = Object.keys(req.files || {})
        if(updatedField.length === 0) return res.status(400).json({ message: "No valid fields to update" });
        let updatedFile = []
        for(let val of requiredFields){
            if (updatedField.includes(val)) {
                console.log(req.files)
                const localPath = req.files[val][0]?.path
                if(!localPath) return res.status(400).json({message : "Try Again"})
                const response = await uploadCloud(localPath)
                if(!response?.url) return res.status(400).json({message : "Try Again"})
                const updateVideo = await videoModel.findByIdAndUpdate(videoId,
                      {[val] : response?.url},
                      {new : true}
                )
                console.log(updateVideo)
                updatedFile.push(updateVideo)
            }
        
    }
         res.status(200).json({message : "Video is updated" , videoInfo : updatedFile})
        
    } catch (error) {
         res.status(200).json({message : error.message})
    }
}


async function deleteVideo(req,res){
    try {
        const {videoId} = req.params
   
        const response = await videoModel.findByIdAndDelete(videoId)
        if(!response) return res.status(400).json({message : "Invalid video Id"})
   
        res.status(200).json({message : "Video is deleted" , deletedVideo : response})
        
    } catch (error) {
        res.status(400).json({message : error.message})

    }


}

async function getAllVideos(req, res){
    try {
        let {limit = 10 , query , sortType , sortBy , userId}  = req.query
 
        if(userId){
         const video = await videoModel.find({'_id' : userId})
         return res.status(200).json({video})
        }
 
        let findQuery = {}
        if(query){
         findQuery = {'title' : query}
        }
 
        let sorting = {}
        if(sortBy){
         if(sortType) sortType = 'desc'
         sorting = {sortBy : sortType == 'asc' ? 1 : -1}
        }
 
        const video = await videoModel.find(findQuery).sort(sorting).limit(limit)
 
        res.status(200).json({message : 'Video is fetched'  , video})
        
    } catch (error) {
         res.status(200).json({message : error.message})
    }
 }


module.exports = { publishVideo , updateVideo , deleteVideo , getAllVideos}