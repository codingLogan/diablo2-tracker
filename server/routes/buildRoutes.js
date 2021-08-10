import express from 'express'
import checkToken from '../middleware/tokenMiddleWare.js'
import {
  createBuild,
  getBuildById,
} from '../routeControllers/buildsController.js'

const router = express.Router()

router.post('/', checkToken, createBuild)
router.get('/:id', getBuildById)

export default router
