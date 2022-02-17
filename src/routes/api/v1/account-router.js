/**
 * The member account router.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { MemberAccountController } from '../../../controllers/api/memberAccount-controller.js'

export const router = express.Router()
const memberController = new MemberAccountController()

router.post('/register', (req, res, next) => memberController.registerUser(req, res, next))
router.post('/login', (req, res, next) => memberController.loginUser(req, res, next))

