import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import User from './models/userModel.js'
import CharacterClass from './models/characterClassModel.js'
import Build from './models/buildsModel.js'
import Attributes from './models/attributesModel.js'
import BuildDetails from './models/buildDetailsModel.js'
import getCharacterClasses from './seeds/diabloClasses.js'
import getAttributes from './seeds/diabloAttributes.js'
import getDefaultUsers from './seeds/users.js'
import getBuilds from './seeds/builds.js'

dotenv.config()
connectDB()

async function clearData() {
  await BuildDetails.deleteMany()
  await Build.deleteMany()
  await CharacterClass.deleteMany()
  await Attributes.deleteMany()
  await User.deleteMany()
}

async function insertData(clean = true) {
  // Data that doesn't depend on anything else (production)
  await Attributes.insertMany(getAttributes())
  const createdClasses = await CharacterClass.insertMany(getCharacterClasses())

  // If clean is specified, don't insert any example data
  if (clean) {
    return
  }

  // Data that is for testing / development
  const users = await getDefaultUsers()
  const createdUsers = await User.insertMany(users)

  // Builds depend on a User that created it, and a valid character class
  // Create one build per class
  const testBuilds = getBuilds(
    createdUsers[0]._id,
    createdClasses.map((charClass) => ({
      classId: charClass._id,
      name: charClass.name,
    }))
  )
  const createdBuilds = await Build.insertMany(testBuilds)

  // Create some build details for each build we just created
  // (this duplicates behavior in our API controller)
  let i = 0
  for (i = 0; i < createdBuilds.length; i++) {
    const build = createdBuilds[i]
    // Create the details (class specific)
    const details = await BuildDetails.create({
      buildId: build._id,
      levels: [
        {
          level: 1,
          improvements: {
            skills: [],
            attributes: {
              strength: 0,
              dexterity: 0,
              vitality: 0,
              energy: 0,
            },
          },
        },
      ],
    })

    // Connect the buildDetails to the build
    build.buildDetails = details._id
    await build.save()
  }
}

/**
 * Seeder accepts an argument
 * npm run seed: inserts only minimal data (production)
 * npm run seed dev: insert a few example builds and users
 */
async function start() {
  let clean = true

  if (process.argv.length > 2 && process.argv[2] === 'dev') {
    clean = false
  }

  try {
    await clearData()
    await insertData(clean)

    console.log('Data seed success')
    process.exit()
  } catch (error) {
    console.error('Data seed failed!', error)
    process.exit(1)
  }
}

start()
