const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const subscribeInfoController = require('../controllers/subscribe.controller')


router.get('/subscribe/:channelId' , isLoggedIn , subscribeInfoController.toggleSubscription)

router.get('/subscribers/:channelId' , isLoggedIn , subscribeInfoController.getUserChannelSubscribers)

router.get('/subscribed/' , isLoggedIn , subscribeInfoController.getSubscribedChannels)

module.exports = router