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
}
