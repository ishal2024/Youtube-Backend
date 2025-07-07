const jwt = require('jsonwebtoken')

function generateToken(data , token , duration){
    return jwt.sign(data , token , {expiresIn : duration}) 
}

function tokenVerify(token , key){
    return jwt.verify(token , key) 
}

module.exports = {generateToken , tokenVerify}