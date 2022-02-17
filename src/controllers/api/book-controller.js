/**
 * Module for the Book-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { Book } from '../../models/book.js'
import createHttpError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class BookController {
  /**
   * Load a book by its id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The book id.
   */
  async loadBookOnReqObj (req, res, next, id) {
    try {
      console.log(req.params)
      const book = await Book.getById(id)

      if (!book) {
        next(createHttpError(404))
        return
      }
      req.book = book
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get specific book by its ID.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getBookById (req, res, next) {
    res.json(req.book)
  }

  /**
   * Get all books.
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
          genre: book.genre,
          owner: book.owner,
          id: book.id // -------------EV använda annat ID----------
        }))
      }
      res
        .status(201)
        .json(allBooks)
    } catch (error) {
      next(error)
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
        genre: req.body.genre,
        owner: req.body.owner
      })
      res
        .status(201)
        .json(newBook)
    } catch (error) {
      let err = error
      if (error.name === 'ValidationError') {
        err = createHttpError(400)
        err.innerException = error
      }
      next(err)
    }
  }

  /**
   * Update a book completely.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async putUpdateOnBook (req, res, next) {
    try {
      await req.book.putUpdate({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre
      })
      res
        .status(204)
        .end()
    } catch (error) {
      let err = error
      if (error.name === 'ValidationError') {
        err = createHttpError(400)
        err.innerException = error
      }
      next(err)
    }
  }

  /**
   * Delete a book.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteBook (req, res, next) {
    try {
      req.book.delete()
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  async getBooksByGenre (req, res, next) {
    try {
      console.log(req.params)
      let search = req.params.search
      search = search.charAt(0).toUpperCase() + search.slice(1)
      const allBooksByGenre = {
        books: (await Book.find({ genre: search })).map(book => ({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          id: book.id // -------------EV använda annat ID----------
        }))
      }
      res
        .status(201)
        .json(allBooksByGenre)
    } catch (error) {

    }
  }

  /*async getBooksByAuthor (req, res, next) {
    try {
      console.log(req.params.author)
      const allBooksByGenre = {
        books: (await Book.find({ author: '/^' + req.params.search + '$/i' })).map(book => ({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          id: book.id // -------------EV använda annat ID----------
        }))
      }
      res
        .status(201)
        .json(allBooksByGenre)
    } catch (error) {

    }
  }*/

  test (req, res, next) {
    console.log('test')
    console.log(req.params.title)
  }
}
