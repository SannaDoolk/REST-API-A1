/**
 * The member account router.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { router as bookRouter } from './books-router.js'
import { BookController } from '../../../controllers/api/book-controller.js'

export const router = express.Router()
const bookController = new BookController()

/**
 * Authenticates if the user has a valid JWT.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  // ? = no exception if authorization is undefined, if undefined, authorization === undefined
  const authorization = req.headers.authorization?.split(' ')

  if (authorization?.[0] !== 'Bearer') {
    console.log('no bearer')
    next(createHttpError(401))
    return
  }
  try {
    req.jwt = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET)
    req.user = {
      username: req.jwt.username
    }
    console.log('jwt: ' + req.jwt.username)
    next()
  } catch (error) {
    console.log(error)
    next(createHttpError(403))
  }
}

router.use('/books', bookRouter)







//router.param('id', (req, res, next, id) => bookController.loadBookOnReqObj(req, res, next, id))

//router.get('/books', (req, res, next) => bookController.getAllBooks(req, res, next))

// VERIFY
//router.post('/book', (req, res, next) => bookController.postNewBook(req, res, next))

//router.get('/book/:id', (req, res, next) => bookController.getBookById(req, res, next))

// TEST
//router.get('/genre/:search', (req, res, next) => bookController.getBooksByGenre(req, res, next))

//router.get('/author/:search', (req, res, next) => bookController.getBooksByAuthor(req, res, next))

// VERIFY
//router.put('/book/:id', (req, res, next) => bookController.putUpdateOnBook(req, res, next))
// VERIFY
//router.delete('/book/:id', (req, res, next) => bookController.deleteBook(req, res, next))
