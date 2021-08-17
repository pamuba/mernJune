const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//create the express app
const app = express()

//app should use json body parser
app.use(express.json())
//app should use cors
app.use(cors())

const uri = process.env.MONGODB_URL
mongoose.connect(uri, { useUnifiedTopology: true , useNewUrlParser: true})
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB connection established successfully")
})


const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
//localhost:5000/exercises
app.use('/exercises', exerciseRouter);
//localhost:5000/users
app.use('/users', usersRouter);

const port = process.env.PORT || 5000

app.listen(port, ()=> {
    console.log(`Server is running on PORT: ${port}`)
})