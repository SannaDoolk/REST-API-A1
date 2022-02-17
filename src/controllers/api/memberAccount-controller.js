/**
 * Module for the Api-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import { User } from '../../models/user.js'
import createHttpError from 'http-errors'
import { Subscriber } from '../../models/subscriber.js'

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
        .json({ newUser })
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

  async subscribeForNewBooks (req, res, next) {
    console.log(req.params.username)
    try {
      const newSubscriber = await Subscriber.saveSubscriber({
        subscriberName: req.params.username
      })

      res
        .status(201)
        .json({ newSubscriber })
    } catch (error) {

    }
  }

  async getAllSubs(req, res, next) {
    try {
      const allSubs = {
        subs: (await Subscriber.find({})).map(subscriber => ({
          sub: subscriber.subscriberName
        }))
      }
      res
        .status(201)
        .json(allSubs)
    } catch (error) {
      next(error)
    }
  }

  test (req, res, next) {
    try {
      const message = 'veryfied'
      res
      .status(200)
      .json({ message })
    } catch (error) {
      
    }
  }
}
