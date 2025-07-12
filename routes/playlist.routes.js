const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const playlistController = require('../controllers/playlist.controller')

router.get('/' , isLoggedIn , playlistController.getUserPlaylists)

router.post('/create' , isLoggedIn , playlistController.createPlaylist)

router.post('/add/:videoId' , isLoggedIn , playlistController.addVideoToPlaylist)

router.get('/delete/:playlistId/:videoId' , isLoggedIn , playlistController.removeVideoFromPlaylist)

router.post('/update/:playlistId' , isLoggedIn , playlistController.updatePlaylist)

router.get('/deletePlaylist/:playlistId' , isLoggedIn , playlistController.deletePalylist)

module.exports = router