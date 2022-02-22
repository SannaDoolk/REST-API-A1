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

router.get('/subscribers', (req, res, next) => hookController.getAllSubs(req, res, next))
router.delete('/subscribers/:id', (req, res, next) => hookController.delete(req, res, next))
router.post('/', (req, res, next) => hookController.subscribeForNewBooks(req, res, next))

router.post('/subscribers/test', (req, res, next) => hookController.test(req, res, next))

router.post('/subscribers/test2', (req, res, next) => hookController.test(req, res, next))

router.post('/subscribers/test3', (req, res, next) => hookController.test(req, res, next))

router.post('/subscribers/test4', (req, res, next) => hookController.test(req, res, next))
