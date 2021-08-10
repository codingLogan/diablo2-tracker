import Build from '../models/buildsModel.js'

async function createBuild(req, res, next) {
  try {
    const build = req.body.build

    const newBuild = await Build.save(build)
    res.status(201) // Created
    res.json(newBuild)
  } catch (error) {
    next(error)
  }
}

export { createBuild }
