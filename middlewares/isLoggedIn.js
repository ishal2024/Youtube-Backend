const userModel = require('../models/user.model')
const jwt = require('../utils/jwt')


const isLoggedIn = async (req, res, next) => {
    try {
        if (!req.cookies?.accessToken) return res.status(401).json({ message: "Please log in" });

        const decoded = jwt.tokenVerify(req.cookies.accessToken, process.env.ACCESS_TOKEN)
        console.log(decoded)
        if (!decoded?.userId) return res.status(401).json({ message: "Invalid Token" });

        const user = await userModel.findById(decoded.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = isLoggedIn