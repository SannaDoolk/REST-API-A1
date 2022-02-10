/**
 * Module for the Api-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import { User } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class MemberAccountController {
  test (req, res, next) {
    try {
      const test = 'hello'
      res
        .status(201)
        .json({ test })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerUser (req, res, next) {
    console.log('in register')
    try {
      const newUser = await User.saveUser({
        username: req.body.username,
        password: req.body.password
      })
      res
        .status(201)
        .json({ newUser })
    } catch (error) {
      console.log(error)
    }
  }
}
