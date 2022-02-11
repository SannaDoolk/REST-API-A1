/**
 * Module for the Book-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import { User } from '../../models/user.js'
import { Book } from '../../models/book.js'

/**
 * Encapsulates a controller.
 */
export class BookController {
  /**
   * Get all boks.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllBooks (req, res, next) {
    try {
      const allBooks = {
        books: (await Book.find({})).map(book => ({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre
        }))
      }
      res
        .status(201)
        .json(allBooks)
    } catch (error) {

    }
  }

  /**
   * Posts a new book.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async postNewBook (req, res, next) {
    try {
      const newBook = await Book.add({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre
      })
      res
        .status(201)
        .json(newBook)
    } catch (error) {
      console.log(error)
    }
  }
}
