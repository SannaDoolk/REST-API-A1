/**
 * Mongoose model Book.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
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
  genre: {
    type: String,
    required: true
  },
  createdAt: { type: String },
  updatedAt: { type: String },
  owner: { type: String }
}, {
  timestamps: true,
  toJSON: {
  /**
   * Performs a transformation of the resulting object to remove sensitive information.
   *
   * @param {object} doc - The mongoose document which is being converted.
   * @param {object} ret - The plain object representation which has been converted.
   */
    transform: function (doc, ret) {
      delete ret._id
    },
    virtuals: true
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Gets a Book by id.
 *
 * @param {string} id - The value of the id for the book to get.
 * @returns {Promise<Book[]>} The Promise to be fulfilled.
 */
schema.statics.getById = async function (id) {
  console.log(id)
  return this.findOne({ _id: id })
}

/**
 * Adds a new book.
 *
 * @param {object} newBook - the Book.
 * @param {string} newBook.title - the title.
 * @param {string} newBook.description - the description.
 * @param {string} newBook.author - the author.
 * @returns {Promise<Book[]>} The Promise to be fulfilled.
 */
schema.statics.add = async function (newBook) {
  const book = new Book(newBook)
  return book.save()
}

export const Book = mongoose.model('Book', schema)
