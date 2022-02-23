/**
 * Module for the Hook-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { Subscriber } from '../../models/subscriber.js'
import createHttpError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class HookController {
  /**
   * Let user subscribes for webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async subscribeForNewBooks (req, res, next) {
    try {
      const newSubscriber = await Subscriber.saveSubscriber({
        url: req.body.url,
        secret: req.body.hook_secret
      })
      res
        .status(201)
        .json({ newSubscriber })
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

  // TEST -------------------------
  async getAllSubs(req, res, next) {
    try {
      const allSubs = {
        subs: (await Subscriber.find({})).map(subscriber => ({
          sub: subscriber.url,
          id: subscriber._id
        }))
      }
      res
        .status(201)
        .json(allSubs)
    } catch (error) {
      next(error)
    }
  }

    // TEST -------------------------
  async delete (req, res, next) {
    await Subscriber.deleteOne({ _id: req.params.id })
  }

}
