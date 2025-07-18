const express = require('express')
const router = express.Router()
const authController = require('../controllers/userAuth.controller')
const upload = require('../middlewares/multer.middleware')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post("/register" , 
    upload.fields([{name : 'avatar' , maxCount:1} , {name:'coverImage' , maxCount : 1}]) , authController.registerUser)


router.post("/login" , authController.logInUser)

router.get('/logout' ,isLoggedIn , authController.logOut)

router.get('/refreshtoken'  , authController.againRefreshToken)

router.post('/updateuser' , isLoggedIn , authController.updateUser)

router.post('/updateavatar' , isLoggedIn , upload.single('avatar') , authController.updateAvatar)

module.exports = router