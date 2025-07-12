const mongoose  = require('mongoose')


const commentSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    video : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video',
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    like : {
        type : Number,
        default : 0
    }
} , {timestamps : true})

module.exports = mongoose.model('Comment' , commentSchema)