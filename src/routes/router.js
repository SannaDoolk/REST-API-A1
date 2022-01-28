/**
 * The routes.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hello world!' }))
