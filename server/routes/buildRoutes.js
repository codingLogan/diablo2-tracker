import express from 'express'
import checkToken from '../middleware/tokenMiddleWare.js'
import {
  createBuild,
  getBuildById,
  getBuildSummary,
  getBuilds,
  updateBuildById,
  addNewLevel,
  updateLevel,
  getLevel,
  deleteBuild,
} from '../routeControllers/buildsController.js'

const router = express.Router()

router.route('/').post(checkToken, createBuild).get(getBuilds)
router
  .route('/:id')
  .get(getBuildById)
  .put(checkToken, updateBuildById)
  .delete(checkToken, deleteBuild)
router.route('/:id/summary').get(getBuildSummary)
router.route('/:id/level').post(checkToken, addNewLevel)
router.route('/:id/level/:level').put(checkToken, updateLevel).get(getLevel)

export default router
