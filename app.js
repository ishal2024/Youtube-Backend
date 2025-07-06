require('dotenv').config()
const connectDb = require('./config/db.config')
const express = require('express')
const app = express()

connectDb()


app.get('/' , function(req,res){
    res.send("Hello World")
})

app.listen(process.env.PORT)