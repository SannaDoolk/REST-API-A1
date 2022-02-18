/**
 * The member account router.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { router as bookRouter } from './books-router.js'
import { router as memberAccountRouter } from './account-router.js'

export const router = express.Router()

router.use('/books', bookRouter)
router.use('/user', memberAccountRouter)







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
