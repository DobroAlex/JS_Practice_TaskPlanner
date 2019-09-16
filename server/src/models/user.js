const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  password: String, // should be stored as bcrypted string
  tasks: [{
    date: Date,
    remindBefore: Date, // notification should be sent at date - remindBefore
    description: String
  }],
  token: String,
  refreshToken: String
})

const User = mongoose.model('UserTasks', UserSchema)
module.exports = { User }
