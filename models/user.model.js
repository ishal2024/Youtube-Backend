const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        
        },

        fullname: {
            type: String,
            required: true,
        },

        avatar: {
            type: String,
            required: true
        },

        coverImage: {
            type: String,
        },

        watchHisory: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
        ],

        password: {
            type: String,
            required: true,
        },
        
        refreshToken : {
            type : String,
            default : ""
        }

    },

    { timestamps: true }
)

module.exports = mongoose.model('User' , userSchema)