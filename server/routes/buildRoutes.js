import express from 'express'
import checkToken from '../middleware/tokenMiddleWare.js'
import {
  createBuild,
  getBuildById,
  getBuilds,
} from '../routeControllers/buildsController.js'

const router = express.Router()

router.route('/').post(checkToken, createBuild).get(getBuilds)
router.get('/:id', getBuildById)

export default router
