const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router()

userRouter.route('/:id')
  .get((req, res) => {
    res.send('profile')
  })

function isloggedIn(req, res, next) {
  if (req.isAuthenicated()) return next()
  res.redirect('/')
}

module.exports = userRouter
