const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const likeController = require('../controllers/like.controller')

router.get('/video/:videoId' , isLoggedIn , likeController.toggleVideoLike)

router.get('/comment/:commentId' , isLoggedIn , likeController.toggleCommentLike)

router.get('/tweet/:tweetId' , isLoggedIn , likeController.toggleTweetLike)

router.get('/videos' , isLoggedIn , likeController.getAllLikedVideos)

module.exports = router