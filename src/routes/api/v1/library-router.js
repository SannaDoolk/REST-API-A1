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

router.get('/', (req, res) => res.json({
  _links: {
    self: { href: process.env.API_URL },
    register: { href: process.env.API_URL + '/user/register' },
    login: { href: process.env.API_URL + '/user/login' },
    books: { href: process.env.API_URL + '/books' }
  }
}))
router.use('/books', bookRouter)
router.use('/user', memberAccountRouter)
