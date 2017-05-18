const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  favoriteSchema = mongoose.Schema({
    name: {type: String, required: true}
  }),
  userSchema = new mongoose.Schema({
    local: {
      name: {type: String, required: true},
      head_line: {type: String, default: "I'm a Twitlitics badass"},
      user_name: {type: String, unique: true, required: true},
      email: {type: String, lowercase: true, unique: true, required: true},
      password: String,
      favorite: [favoriteSchema]
    }
  })

// when creating an account bcrypt scrambles password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// use when login
// finds if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
