const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  User = require('../models/User.js'),
  favoriteController = require('../controllers/favorites.js'),
  userController = require('../controllers/users.js'),
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

userRouter.get('/search/:query', (req, res) => {
  twitterClient.get('search/tweets', { q: req.params.query, count: 100 }, (err, data, response) => {
    res.render('pages/results', {data: data, favorite: req.params.query})
  })
})

userRouter.route('/users/:id')
  .get(userController.show)
  .patch(userController.update)
  .delete(userController.destroy)

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
  var featuredUsers = ['realDonaldTrump', 'katyperry', 'BarackObama', 'jtimberlake', 'rihanna', 'ladygaga', 'britneyspears', 'KimKardashian', 'taylorswift13', 'ArianaGrande']
  var userData = []

  twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[0], count: 1}, (err, data, response) => {
    var trumpData = data[0].user
    userData.push(trumpData)
    twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[1], count: 1}, (err, data, response) => {
      var perryData = data[0].user
      userData.push(perryData)
      twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[2], count: 1}, (err, data, response) => {
        var obamaData = data[0].user
        userData.push(obamaData)
        twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[3], count: 1}, (err, data, response) => {
          var timberlakeData = data[0].user
          userData.push(timberlakeData)
          twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[4], count: 1}, (err, data, response) => {
            var rihannaData = data[0].user
            userData.push(rihannaData)
            twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[5], count: 1}, (err, data, response) => {
              var gagaData = data[0].user
              userData.push(gagaData)
              twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[6], count: 1}, (err, data, response) => {
                var spearsData = data[0].user
                userData.push(spearsData)
                twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[7], count: 1}, (err, data, response) => {
                  var kardashianData = data[0].user
                  userData.push(kardashianData)
                  twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[8], count: 1}, (err, data, response) => {
                    var swiftData = data[0].user
                    userData.push(swiftData)
                    twitterClient.get('statuses/user_timeline', {screen_name: featuredUsers[9], count: 1}, (err, data, response) => {
                      var grandeData = data[0].user
                      userData.push(grandeData)
                      console.log(userData)
                      res.render('pages/featured', {userData: userData})
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})

userRouter.get('/tweets/:name', (req, res) => {
  twitterClient.get('statuses/user_timeline', {screen_name:   req.params.name, count: 200}, (err, data, response) => {
    res.render('pages/tweets', {data: data, name: req.params.name})
  })
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
