const User = require('../models/User.js')

module.exports = {
  index: (req, res) => {
    User.find({}, (err, users) => {
      if(err) return console.log(err)
      res.json(users)
    })
  },

  show: (req, res) => {
    User.findById(req.params.id, (err, singleUser) => {
      if(err) return console.log(err)
      res.json(singleUser)
    })
  },

  create: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      user.local.favorite.push(req.body)
      user.save((err) => {
        if(err) return console.log(err)
        res.json({success: true, favorite: req.body})
      })
    })
  },

  update: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) console.log(err)
      var favoritesArray = user.local.favorite
      var updatedFavorite = ""
      for( i = favoritesArray.length - 1; i>=0; i--) {
        if(favoritesArray[i]._id == req.params.favId) {
          favoritesArray[i].name = req.body.name
          updatedFavorite = favoritesArray[i]
        }
      }
      user.save((err) => {
        if(err) return console.log(err)
        res.json({success: true, updatedTask: updatedFavorite.name})
      })
    })
  },

  destroy: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) console.log(err)
      var favoritesArray = user.local.favorite
      var favoriteRemoved = ""
      for( i = favoritesArray.length - 1; i>=0; i--) {
        if(favoritesArray[i]._id == req.params.favId) {
          favoriteRemoved = favoritesArray[i]
          favoritesArray.splice(i,1)
        }
      }
      user.save((err) => {
        if(err) return console.log(err)
        res.json({success: true, favoriteRemoved: favoriteRemoved})
      })
    })
  }

}
