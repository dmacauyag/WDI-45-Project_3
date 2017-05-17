const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  User = require('../models/User.js'),
  favoriteController = require('../controllers/favorites.js'),
  twitterClient = require('../config/twit.js')

userRouter.route('/login')
  .get((req, res) => {
    res.render('pages/login', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

userRouter.route('/signup')
  .get((req, res) => {
    res.render('pages/signup', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }))


userRouter.get('/profile', isLoggedIn, (req, res) => {
  res.render('pages/profile', {user: req.user})
})

userRouter.get('/search/:query', (req, res) => {
  twitterClient.get('search/tweets', { q: req.params.query, count: 100 }, (err, data, response) => {
    res.render('pages/results', {data: data, favorite: req.params.query})
  })
})

userRouter.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.render('pages/index', {user: user})
  })
})

userRouter.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/')
})

userRouter.route('/users/:id/favorites')
  .get(favoriteController.index)
  .post(favoriteController.create)

userRouter.route('/users/:id/favorites/:favId')
  .get(favoriteController.show)
  .patch(favoriteController.update)
  .delete(favoriteController.destroy)

userRouter.get('/featured', (req, res) => {
  res.render('pages/featured')
})

userRouter.get('/tweets', (req, res) => {
    res.render('pages/tweets')
})

userRouter.get('/hashtags', (req, res) => {
  twitterClient.get('trends/place', {id: 2442047}, (err, data, response) => {
    if(err) {console.log(err)}
    res.render('pages/hashtags', {data: data})
  })
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
