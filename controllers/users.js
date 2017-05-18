const User = require('../models/User.js')

module.exports = {
  show: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.render('pages/profile', {user: user})
    })
  },

  edit: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err){console.log(err)}
      res.render('pages/edit', {user: user})
    })
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
      if(err) {
        res.json({message: "Try again", success: false})
      }
      res.redirect('/users/' + updatedUser.id)
    })
  },

  destroy: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
      if(err) {res.json({message: "Try again", success: false})}
      res.json({message: "Bye 😢", success: true})
    })
  }
}
