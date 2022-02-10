/**
 * Mongoose model Book.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  titel: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: { type: String },
  updatedAt: { type: String },
  owner: { type: String }
})

export const User = mongoose.model('Book', schema)
