/**
 * The member account router.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { HookController } from '../../../controllers/api/hook-cotroller.js'

export const router = express.Router()
const hookController = new HookController()

router.post('/', (req, res, next) => hookController.subscribeForNewBooks(req, res, next))
