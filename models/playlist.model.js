const mongoose = require('mongoose')


const playlistSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : ""
    },
    videos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video',
        default : []
    }],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Playlist' , playlistSchema)