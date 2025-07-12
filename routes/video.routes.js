const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const upload = require('../middlewares/multer.middleware')
const videoController = require('../controllers/videos.controller')

router.post('/publish' , 
    upload.fields([{name : 'video' , maxCount:1} , {name: 'thumbnail' , maxCount : 1}]) 
    ,isLoggedIn  , videoController.publishVideo)

router.post('/updatevideo/:videoId' , 
    upload.fields([{name : 'video' , maxCount:1} , {name: 'thumbnail' , maxCount : 1}]) 
    ,isLoggedIn  , videoController.updateVideo)

router.get('/deletevideo/:videoId' , isLoggedIn , videoController.deleteVideo)

router.get('/' , isLoggedIn , videoController.getAllVideos)

module.exports = router