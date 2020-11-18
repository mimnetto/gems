// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')

// CONFIGURATION
require('dotenv').config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI


// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)

// DATABASE
mongoose.connect(
  mongodbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established at', mongodbURI)
  }
)

// Optional, but likely helpful
// Connection Error/Success
// Define callback functions for various events
db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Controllers
const fruitsController = require('./controllers/fruits_controller.js')
app.use('/fruits', fruitsController)
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)


// Routes
app.get('/', (req, res) => {
  res.redirect('/fruits')
})

// Listener
app.listen(PORT, () => {
  console.log('🍒🍋Listening on port🥝🍉', PORT)
})

// https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Moss/tree/master/unit_2/w06d03/instructor_notes
