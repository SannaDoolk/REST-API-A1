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
router.get('/:username', (req, res, next) => memberController.getUserByUsername(req, res, next))
router.get('/:username/uploaded-books', (req, res, next) => memberController.getUsersUploadedBooks(req, res, next))


//router.post('/subscribe/:username', (req, res, next) => memberController.subscribeForNewBooks(req, res, next))

// TEST ----------------------------------
router.get('/subscribers', (req, res, next) => memberController.getAllSubs(req, res, next))
