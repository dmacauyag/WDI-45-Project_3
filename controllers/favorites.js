const
  User = require('../models/User.js')

module.exports = {
  index: (req, res) => {
    User.findById(req.user.id, (err, user) => {
      // console.log(user.local.favorite)
      res.render('pages/favorites', {user: user})
    })
  },

  create: (req, res) => {
    User.findById(req.user.id, (err, user) => {
      if(err) return console.log(err)
      user.local.favorite.push(req.body)
      user.save((err) => {
        if(err) return console.log(err)
        res.json(user)
      })
    })
  },


}
