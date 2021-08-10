import express from 'express'
import {
  getAttributes,
  getCharacterClasses,
} from '../routeControllers/diabloDataController.js'

const router = express.Router()

router.get('/attributes', getAttributes)
router.get('/classes', getCharacterClasses)

export default router
