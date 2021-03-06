const
  dotenv = require('dotenv').load({silent: true}),
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
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'),
  apiRoutes = require('./routes/api.js'),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  twitterClient = require('./config/twit.js')

// environment port
const
  PORT = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/twitlitics'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB (twitlitics)")
})

// socket io connection
io.on('connection', (socket) => {
  console.log("Socket connection established")
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
app.use(methodOverride('_method'))

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
app.use('/api', apiRoutes)

app.listen(PORT, (err) => {
  console.log(err || "Server listening on port:", PORT)
})
