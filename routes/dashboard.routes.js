const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const dashboardController = require('../controllers/dashboard.controller')

router.get('/' , isLoggedIn , dashboardController.getChannelStats)

router.get('/videos' , isLoggedIn , dashboardController.getChannelVideos)

module.exports = router