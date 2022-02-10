/**
 * Module for the Api-Controller.
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
export class MemberAccountController {
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
      console.log(error)
    }
  }
}
