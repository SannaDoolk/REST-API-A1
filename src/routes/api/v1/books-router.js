/**
 * The member account router.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import createHttpError from 'http-errors'
import { BookController } from '../../../controllers/api/book-controller.js'

export const router = express.Router()
const bookController = new BookController()

router.param('id', (req, res, next, id) => bookController.loadBookOnReqObj(req, res, next, id))

router.get('/', (req, res, next) => bookController.getAllBooks(req, res, next))

// VERIFY
router.post('/book', (req, res, next) => bookController.postNewBook(req, res, next))

router.get('/book/:id', (req, res, next) => bookController.getBookById(req, res, next))

// VERIFY
router.put('/book/:id', (req, res, next) => bookController.putUpdateOnBook(req, res, next))
// VERIFY
router.delete('/book/:id', (req, res, next) => bookController.deleteBook(req, res, next))

router.get('/genre/:search', (req, res, next) => bookController.getBooksByGenre(req, res, next))
