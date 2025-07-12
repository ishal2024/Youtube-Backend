const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    content : {
        type : String,
        required : true
    },
    like : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Tweet' , tweetSchema)