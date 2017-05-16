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
  passportConfig = require('./config/passport.js'),
  Twitter = require('twit'),
  userRoutes = require('./routes/users.js')

const twitterClient = new Twitter({
  consumer_key: 'process.env.TWITTER_CONSUMER_KEY',
  consumer_secret: 'process.env.TWITTER_CONSUMER_SECRET',
  access_token: 'process.env.TWITTER_ACCESS_TOKEN',
  access_token_secret: 'process.env.TWITTER_ACCESS_TOKEN_SECRET'
})

// environment port
const
  port = 3000,
  mongoConnectionString = 'mongodb://localhost/stalitics'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB (stalitics)")
})

// will store session information as a 'sessions' collection in MongoDB
const store = new MongoDBStore ({
  uri: mongoConnectionString,
  collection: 'sessions'
})

// middleware
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// session + passport middleware
app.use(session({
  secret: "It's a secret",
  cookie: {maxAge: 60000000},
  resave: true,
  saveUninitialized: false,
  store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.currentUser = req.user
  app.locals.isLoggedIn = !!req.user
  next()
})

// static route
app.get('/', (req, res) => {
  res.render('pages/index')
})

app.use('/', userRoutes)

app.listen(port, (err) => {
  console.log(err || "Server listening on port:", port)
})
