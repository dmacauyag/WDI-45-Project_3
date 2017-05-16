const
  User = require('../models/User.js')

module.exports = {
  index: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      // console.log(user.local.favorite)
      res.render('pages/favorites', {user: user})
    })
  },

  create: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      user.local.favorite.push(req.body)
      user.save((err) => {
        if(err) return console.log(err)
        res.json(user)
      })
    })
  },

  show: (req, res) => {
    // placeholder for the favorites show page
  },

  update: (req, res) => {

  },

  destroy: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) console.log(err)
      
    })
  }
}
