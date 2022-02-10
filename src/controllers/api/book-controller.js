/**
 * Module for the Book-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import { User } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class BookController {

  test (req, res, next) {
    try {
      const message = 'In books'
      res
      .status(200)
      .json({ message })
    } catch (error) {
      
    }
  }

  async postNewBook (req, res, next) {
    try {
      console.log(req.body)
    } catch (error) {
      console.log(error)
    }
  }
}
