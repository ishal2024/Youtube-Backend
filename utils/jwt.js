const jwt = require('jsonwebtoken')

function generateToken(data , token , duration){
    if(!data || !token) return  new Error("Invalid data or token")
    return jwt.sign(data , token , {expiresIn : duration}) 
}

function tokenVerify(token , secretKey){
    if(!token) throw new Error("Invalid token")
    return jwt.verify(token , secretKey) 
}

function generateRefereshandAccessToken (accessData , refershData){
   const accesstoken = generateToken( accessData ,  process.env.ACCESS_TOKEN , process.env.EXPIRY_ACCESS_TOKEN )
   const refreshtoken = generateToken(refershData ,process.env.REFRESH_TOKEN , process.env.EXPIRY_REFRESH_TOKEN )
   return {accesstoken , refreshtoken}
}

module.exports = {generateRefereshandAccessToken , tokenVerify}