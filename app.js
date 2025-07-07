require('dotenv').config()
const connectDb = require('./config/db.config')
const express = require('express')
const cookieparser = require('cookie-parser')
const userRouter = require('./routes/user.routes')

const app = express()

connectDb()

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))


app.use('/user' , userRouter)

app.get('/' , function(req,res){
    res.send("Hello World")
})

app.listen(process.env.PORT)