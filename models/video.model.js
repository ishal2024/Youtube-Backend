const mongoose = require('mongoose')

const videoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        video: {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        views: {
            type: Number,
           
            default: 0
        },

        like: {
            type: Number,
           
            default: 0
        },

        duration : {
            type : Number,
            
        },

        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },

        isPublished : {
            type : Boolean,
            default : true
        }

    }, {timestamps : true}
)

module.exports = mongoose.model('Video' , videoSchema)