const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    },
    video : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video'
    },
    tweet : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tweet'
    },
    likedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

})

module.exports = mongoose.model('Like' , likeSchema)