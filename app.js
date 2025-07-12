require('dotenv').config()
const connectDb = require('./config/db.config')
const express = require('express')
const cookieparser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const videoRouter = require('./routes/video.routes')
const tweetRouter = require('./routes/tweet.routes')
const channelRouter = require('./routes/subscribe.routes')
const playlistRouter = require('./routes/playlist.routes')
const commentRouter = require('./routes/comment.routes')
const likeRouter = require('./routes/like.routes')
const dashboardRouter = require('./routes/dashboard.routes')

const app = express()

connectDb()

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))


app.use('/user' , userRouter)
app.use('/videos' , videoRouter)
app.use('/tweet' , tweetRouter)
app.use('/channel' , channelRouter)
app.use('/playlist' , playlistRouter)
app.use('/comment' , commentRouter)
app.use('/like' , likeRouter)
app.use('/profile' , dashboardRouter)


app.get('/' , function(req,res){
    res.send("Hello World")
})

app.listen(process.env.PORT)