const mongoose = require('mongoose')

async function connectDb(){
    try {
        const connect = await mongoose.connect(`${process.env.DB_URL}`)
        console.log("DB is connected")
    } catch (error) {
        console.log("DB not connected" , error.message)
        process.exit(1)
    }
}


module.exports = connectDb