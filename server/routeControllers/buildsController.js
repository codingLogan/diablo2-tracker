import BuildDetails from '../models/buildDetailsModel.js'
import Build from '../models/buildsModel.js'

async function createBuild(req, res, next) {
  try {
    const build = Build(req.body)
    const newBuild = await build.save()

    // Builds should start at lvl 1, with no buffs yet
    const buildDetails = await BuildDetails.create({
      buildId: newBuild._id,
      levels: [{ level: 1 }],
    })

    if (!buildDetails) {
      throw new Error('Build details failed to create')
    }

    // Update the build with reference to the details
    newBuild.buildDetails = buildDetails._id
    newBuild.save()

    res.status(201) // Created
    res.json(newBuild)
  } catch (error) {
    next(error)
  }
}

async function getBuildById(req, res, next) {
  try {
    const buildId = req.params.id
    const build = await Build.findById(buildId).populate('buildDetails')

    if (build) {
      res.json(build)
    } else {
      res.status(404)
      throw new Error('Build could not be found')
    }
  } catch (error) {
    next(error)
  }
}

export { createBuild, getBuildById }
