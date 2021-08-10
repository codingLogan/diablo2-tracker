import express from 'express'
import {
  getAttributes,
  getCharacterClassById,
  getCharacterClasses,
} from '../routeControllers/diabloDataController.js'

const router = express.Router()

router.get('/attributes', getAttributes)
router.get('/classes', getCharacterClasses)
router.get('/classes/:id', getCharacterClassById)

export default router
