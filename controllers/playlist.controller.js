const playlistModel = require('../models/playlist.model')


async function createPlaylist(req, res) {
    try {
        const ownerId = req.user?._id

        const { name, description } = req.body
        if (!name) return res.status(400).json({ message: "name is undefined" })

        const playlist = await playlistModel.create({
            name,
            description,
            owner: ownerId
        })

        res.status(400).json({ message: "Playlist is created", playlistInfo: playlist })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

async function addVideoToPlaylist(req, res) {
    try {
        const { videoId } = req.params
        const { playlistId } = req.body

        if (!playlistId) return res.status(400).json({ message: "Playlist Id is must required" })

        const response = await playlistModel.findOne({ 'owner': req.user?._id, '_id': playlistId })

        if (!response) return res.status(400).json({ message: "Invalid playlist Id" })
        if (response.videos.includes(videoId)) res.status(400).json({ message: "Video is already in playlist" })

        const updatedPlaylist = await playlistModel.findByIdAndUpdate(playlistId, { $push: { videos: videoId } }, { new: true })

        res.status(200).json({ message: "Playlist Updated", updatedPlaylist })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

async function removeVideoFromPlaylist(req, res) {
    try {
        const { playlistId, videoId } = req.params
    
        if(!playlistId || !videoId) return res.status(400).json({message : "Please enter playlist or video Id"})
    
        const video = await playlistModel.findOne({'_id' : playlistId , 'videos' : videoId})
        if(!video) return res.status(400).json({message : "Video is not Present"})
    
        const updatedPlaylist = await playlistModel.findByIdAndUpdate(playlistId , {$pull : {videos : videoId}} , {new : true})
    
        res.status(200).json({message : 'Video is deleted' , updatedPlaylist})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function updatePlaylist(req,res){
    try {
        const {playlistId} = req.params
        
        const {name, description} = req.body
    
        const playlist = await playlistModel.findById(playlistId)
        if(!playlist) return res.status(400).json({message : 'Playlist not exist'})
    
        const updatedPlaylist = await playlistModel.findByIdAndUpdate(playlistId 
            , {$set : {'name' : name ? name : playlist?.name , 'description' : description ? description : playlist.description }},
            {new : true}
        )
    
        res.status(200).json({message : 'Playlist is updated' , updatedPlaylist})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function getUserPlaylists(req,res){
    const userId = req.user?._id
    if(!userId) return res.status(400).json({message : 'User Id is Important'})
    
    const userPlaylists = await playlistModel.find({owner : userId})
    if(userPlaylists.length == 0) res.status(400).json({message : 'No Playlist is present'})

    res.status(200).json({message : 'All Playlists' , userPlaylists})
}

async function deletePalylist(req,res){
    try {
        const playlistId = req.params?.playlistId
    
        const playlist = await playlistModel.findById(playlistId)
        if(!playlist) return res.status(200).json({message : "Playlist is not present"})
    
        const deletedPlaylist = await playlistModel.findByIdAndDelete(playlistId)
    
        res.status(200).json({message : "Playlist is deleted" , deletedPlaylist})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports = { createPlaylist, addVideoToPlaylist , removeVideoFromPlaylist , updatePlaylist , getUserPlaylists , deletePalylist}
