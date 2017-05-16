const
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('../models/User.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

// LOCAL SIGNUP
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if(err) return done(err)
    if(user) return done(null, false, req.flash('signupMessage', 'That username already exists.'))
    var newUser = new User()
    console.log(req.body);
    newUser.local.name = req.body.name
    newUser.local.user_name = req.body.user_name
    newUser.local.email = req.body.email
    newUser.local.password = newUser.generateHash(password)
    newUser.save((err, newUser) => {
      if(err) throw err
      return done(null, newUser, null)
    })
  })
}))

// LOCAL SIGNIN
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if(err) return done(err)
    if(!user) return done(null, false, req.flash('loginMessage', 'Invalid username or password.'))
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Invalid username or password.'))
    return done(null, user)
  })
}))

module.exports = passport
