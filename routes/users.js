const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  User = require('../models/User.js')

userRouter.route('/login')
  .get((req, res) => {
    res.render('pages/login', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: 'pages/login'
  }))

userRouter.route('/signup')
  .get((req, res) => {
    res.render('pages/signup', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))


userRouter.get('/profile', isLoggedIn, (req, res) => {
  res.render('pages/profile', {user: req.user})
})

userRouter.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    console.log(user)
    res.render('pages/index', {user: user})
  })
})

userRouter.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/')
})

userRouter.get('/favorites', isLoggedIn, (req, res) => {
  res.render('pages/favorites')
})

userRouter.get('/featured', (req, res) => {
  res.render('pages/featured')
})

userRouter.get('/tweets', (req, res) => {
  res.render('pages/tweets')
})

userRouter.get('/hashtags', (req, res) => {
  res.render('pages/hashtags')
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
