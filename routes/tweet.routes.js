const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const tweetController = require('../controllers/tweet.controlller')

router.post('/add' , isLoggedIn , tweetController.createTweet)

router.get('/' , isLoggedIn , tweetController.getUserTweets)

router.get('/delete/:tweetId' , isLoggedIn , tweetController.deleteTweet)

router.post('/update/:tweetId' , isLoggedIn , tweetController.updateTweet)


module.exports = router