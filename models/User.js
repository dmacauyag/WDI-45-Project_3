const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    local: {
      name: String,
      user_name: {type: String, unique: true,require: true},
      email: {type: String, lowercase: true, unique:true,require: true},
      password: String
    }
  })

// when creating an account bcrypt scrambles password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// use when login
// finds if password is valid
userSchema.methods.generateHash = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
