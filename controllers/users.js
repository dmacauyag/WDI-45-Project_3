const User = require('../models/User.js')

module.exports = {
  show: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.render('pages/profile', {user: user})
    })
  },

  update: (req, res) => {
    User.findByIdAndUpade(req.params.id, req.body, {new: true}, (err, updatedUser) => {
      if(err) {
        res.json({message: "Try again", success: false})
      }
      res.json({message: "Bye 😢", success: true})
    })
  },

  destroy: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
      if(err) {res.json({message: "Try again", success: false})}
      res.json({message: "User was deleted", success: true})
    })
  }
}
