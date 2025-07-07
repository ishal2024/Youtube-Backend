const userModel = require('../models/user.model')
const bcrypt = require('../utils/bcrypt')
const cloudUpload = require('../utils/cloudinary')

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

module.exports = {registerUser}