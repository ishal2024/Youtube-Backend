const cloudinary = require('../config/cloudinary.config')
const fs = require('fs')

async function cloudUpload(localFilePath){
    try {
        const response = cloudinary.uploader.upload(localFilePath , {resource_type : 'auto'})
        console.log("File is uploaded in cloudinary")
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return error.message
    }
}

module.exports = cloudUpload