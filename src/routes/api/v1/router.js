/**
 * The routes.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { router as memberAccountRouter } from './account-router.js'
import { router as booksRouter } from './books-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hello world!' }))
router.use('/', memberAccountRouter)
router.use('/books', booksRouter)
