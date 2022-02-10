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

export const User = mongoose.model('User', schema)
