const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true }, // should be stored as bcrypted string
  role: { type: String, required: true },
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
