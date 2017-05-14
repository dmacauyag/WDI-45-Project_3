const
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  flash = require('connect-flash'),
  passport = require('passport'),
  port = 3000

// mongoose connection
mongoose.connect('mongodb://localhost/stalitics', (err) => {
  console.log(err || "Connected to MongoDB (stalitics)")
})

// middleware
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())


app.listen(port, (err) => {
  console.log(err || "Server listening on port:", port)
})
