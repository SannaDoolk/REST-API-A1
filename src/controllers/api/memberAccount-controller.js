/**
 * Module for the Api-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import { User } from '../../models/user.js'
import createHttpError from 'http-errors'
import { Book } from '../../models/book.js'

/**
 * Encapsulates a controller.
 */
export class MemberAccountController {
  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerUser (req, res, next) {
    try {
      const newUser = await User.saveUser({
        username: req.body.username,
        password: req.body.password
      })

      res
        .status(201)
        .json(newUser.username)
    } catch (error) {
      let err = error
      if (error.code === 11000) {
        err = createHttpError(409)
        err.innerException = error
      } else if (error.name === 'ValidationError') {
        err = createHttpError(400)
        err.innerException = error
      }
      next(err)
    }
  }

  /**
   * Logs in a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginUser (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      const payload = {
        username: user.username
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h'
      })
      res
        .status(200)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      const err = createHttpError(401)
      err.innerException = error
      next(err)
    }
  }

  /**
   * Finds a user by their username.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getUserByUsername (req, res, next) {
    try {
      const usernameSearch = req.params.username
      const nrOfBooksUploaded = await Book.countDocuments({ uploader: usernameSearch })
      const user = await User.findOne({ username: usernameSearch })
      if (!user) {
        next(createHttpError(404))
        return
      }
      const userData = {
        username: user.username,
        numberOfUploads: nrOfBooksUploaded
      }
      const result = {
        _links: {
          self: { href: process.env.API_URL + '/user/' + usernameSearch },
          uploads: { href: process.env.API_URL + '/user/' + usernameSearch + '/uploaded-books' }
        },
        user: userData
      }
      res
        .json(result)
        .status(200)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets all uploaded books by a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getUsersUploadedBooks (req, res, next) {
    try {
      const username = req.params.username
      // const count = await Book.countDocuments({ uploader: username })
      const user = await User.findOne({ username: username })
      if (!user) {
        next(createHttpError(404))
        return
      }
      const booksFromUser = {
        books: (await Book.find({ uploader: user.username })).map(book => ({
          title: book.title,
          author: book.author,
          id: book.id
        }))
      }

      const result = {
        _links: {
          self: { href: process.env.API_URL + '/user/' + username + '/uploaded-books' },
          book: { href: process.env.API_URL + '/books/book/:id' },
          uploader: { href: process.env.API_URL + '/user/sanna3' },
          all: { href: process.env.API_URL + '/books' }
        },
        books: booksFromUser
      }

      res
        .json(result)
        .status(200)
    } catch (error) {
      next(error)
    }
  }
}
