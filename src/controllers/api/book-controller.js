/**
 * Module for the Book-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { Book } from '../../models/book.js'
import createHttpError from 'http-errors'
import fetch from 'node-fetch'
import { Subscriber } from '../../models/subscriber.js'

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
    const result = {
      _links: {
        self: { href: process.env.API_URL + '/books/book/:id' },
        uploader: { href: process.env.API_URL + '/users/' + req.book.uploader },
        all: { href: process.env.API_URL + '/books' }
      },
      book: req.book
    }
    res.json(result)
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
      const result = {
        _links: {
          self: { href: process.env.API_URL + '/books' },
          specific: { href: process.env.API_URL + '/books/book/:id' },
          post: { href: process.env.API_URL + '/books/book' },
          put: { href: process.env.API_URL + '/books/book/:id' },
          delete: { href: process.env.API_URL + '/books/book/:id' },
          genre: { href: process.env.API_URL + '/genre/:search' }
        },
        books: (await Book.find({})).map(book => ({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          uploader: book.uploader,
          id: book.id // -------------EV använda annat ID----------
        }))
      }
      res
        .status(201)
        .json(result)
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
        uploader: req.user.username
      })
      this.sendWebHookToSubscribers(newBook)
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
   * Sends a webhook to all subscribers.
   *
   * @param {object} bookPosted - The book posted.
   */
  async sendWebHookToSubscribers (bookPosted) {
    try {
      const dataToSend = {
        book: bookPosted.title,
        author: bookPosted.author,
        description: bookPosted.description,
        genre: bookPosted.genre
      }
      const subscribers = await Subscriber.find({})
      subscribers.forEach(subscriber => {
        this.makePostToSubscriber(subscriber.url, subscriber.secret, dataToSend)
      })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Makes POST request to subscriber.
   *
   * @param {string} url - The url to send post to.
   * @param {string} secret - The secret to send as private token.
   * @param {object} dataToSend - The data to post.
   */
  async makePostToSubscriber (url, secret, dataToSend) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'PRIVATE-TOKEN': secret
        },
        body: JSON.stringify(dataToSend)
      })
    } catch (error) {
      console.log(error)
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

  /**
   * Gets all books by specific genre.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getBooksByGenre (req, res, next) {
    try {
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
      next(error)
    }
  }
}
