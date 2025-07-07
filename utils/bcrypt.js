const bcrypt = require('bcrypt')

async function passwordHash (password){
    try {
       const salt = await bcrypt.genSalt(10)
       const hash = await bcrypt.hash(password , salt)
       return hash
    } catch (error) {
        return error.message
    }
}

async function passwordCompare (password , hash){
    return await bcrypt.compare(password , hash)
}

module.exports = {passwordHash , passwordCompare}