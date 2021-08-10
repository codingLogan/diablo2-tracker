import express from 'express'
import checkToken from '../middleware/tokenMiddleWare.js'
import {
  createBuild,
  getBuildById,
  getBuilds,
  updateBuildById,
  addNewLevel,
  updateLevel,
  getLevel,
} from '../routeControllers/buildsController.js'

const router = express.Router()

router.route('/').post(checkToken, createBuild).get(getBuilds)
router.route('/:id').get(getBuildById).put(checkToken, updateBuildById)
router.route('/:id/level').post(checkToken, addNewLevel)
router.route('/:id/level/:level').put(checkToken, updateLevel).get(getLevel)

export default router
