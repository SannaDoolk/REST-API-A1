/**
 * The member account router.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { HookController } from '../../../controllers/api/hook-cotroller.js'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

export const router = express.Router()
const hookController = new HookController()

/**
 * Authenticates if the user has a valid JWT.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
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

router.get('/subscribers', (req, res, next) => hookController.getAllSubs(req, res, next))
router.delete('/subscribers/:id', (req, res, next) => hookController.delete(req, res, next))

// ENDAST DENNA SKA VARA KVAR -----------------------------------------
router.post('/', authenticateJWT, (req, res, next) => hookController.subscribeForNewBooks(req, res, next))
