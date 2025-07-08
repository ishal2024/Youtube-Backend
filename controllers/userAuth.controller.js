const userModel = require('../models/user.model')
const bcrypt = require('../utils/bcrypt')
const cloudUpload = require('../utils/cloudinary')
const token = require('../utils/jwt')

async function registerUser(req,res){
   try {
    const {username , fullname , email , password} = req.body
    const user = await userModel.findOne({email})
    if(user) return res.status(400).json({message : "User is already Created"})
    
    const hashPassword = await bcrypt.passwordHash(password)
    console.log(req.files)
    const {avatar , coverImage} = req.files
    if(!avatar) return res.status(400).json({message : "Please Upload Avatar Image"})
    const avatarResponse = await cloudUpload(avatar[0].path)
    const coverResponse = coverImage ? await cloudUpload(coverImage[0].path) : null

    const createdUser = await userModel.create({
        username : username.replace(/\s+/g, ""),
        email,
        fullname,
        password : hashPassword,
        avatar : avatarResponse.url,
        coverImage : coverResponse?.url || ""
    })

    const modifyUser = await userModel.findById(createdUser._id).select('-password')

    res.status(200).json({message : 'user created Successfully' , userInfo : modifyUser})

   } catch (error) {
    res.status(409).json({message : error.message})
   }
}

async function logInUser(req,res){
    try {
    const {username , email , password} = req.body

    if(!username && !email) return res.status(400).json({message : "Enter Username or Email"})
    if(req.cookies.refreshToken) return res.status(400).json({message : "User already Logged In"})

    const user = await userModel.findOne({$or : [{email} , {username}]})
    if(!user) return res.status(400).json({message : "User not exist"})
    
    const result = await bcrypt.passwordCompare(password , user.password)
    if(!result) return res.status(400).json({message : "Please enter valid email or password"})
    
    const {accesstoken , refreshtoken} = token.generateRefereshandAccessToken({userId : user._id} , {userId : user._id , email})
    user.refreshToken = refreshtoken
    await user.save()

    const options = {
          httpOnly : true,
          secure : true
    }

    const loggedInUser = await userModel.findById(user._id).select('-password  -refreshToken')
    res.status(200)
    .cookie('accessToken' , accesstoken , options).cookie('refreshToken' , refreshtoken , options)
    .json({message : 'User Loggeed In Succesfully' , userDeatils : loggedInUser})

    } catch (error) {
     res.status(500)
    .json({message : error.message})
    } 
}

async function logOut(req,res){
    try {
        const user = req.user

        user.refreshToken = ""
        await user.save()

        const options = {
            httpOnly : true,
            secure : true
        }

        res.status(200).clearCookie('accessToken' , options).clearCookie('refreshToken' , options).json({message : "user is logged out"})
        
    } catch (error) {
        res.status(500).json({messsage : error.message})
    }
}

module.exports = {registerUser , logInUser , logOut}