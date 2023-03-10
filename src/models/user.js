/**
 * Mongoose model User.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minlength: [10, 'The password must contain at least 10 characters']
  }
})

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
  console.log('hashed')
})

/**
 * Saves a user to the database.
 *
 * @param {string} userData - The user to save.
 * @returns {Promise<User>} The Promise to be fulfilled.
 */
schema.statics.saveUser = async function (userData) {
  const user = new User(userData)
  return user.save()
}

/**
 * Checks if a user exists and if password matches the saved hashed password.
 *
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {object} - The user.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log('wrong credentials')
    throw new Error('Invalid login attempt')
  }
  return user
}

export const User = mongoose.model('User', schema)
