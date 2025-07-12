const express = require('express')
const router = express.Router()
const commnetController = require('../controllers/comment.controller')
const isLoggedIn = require('../middlewares/isLoggedIn')


router.post('/add/:videoId' , isLoggedIn , commnetController.addComment)

router.get('/:videoId' , isLoggedIn , commnetController.getVideoComments)

module.exports = router

