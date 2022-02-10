/**
 * Module for the Api-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import fetch from 'node-fetch'

/**
 * Encapsulates a controller.
 */
export class ImageController {
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
    
  }
}
