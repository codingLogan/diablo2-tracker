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

async function insertData() {
  // Data that doesn't depend on anything else (production)
  await Attributes.insertMany(getAttributes())
  const createdClasses = await CharacterClass.insertMany(getCharacterClasses())

  // Data that is for testing / development
  const users = await getDefaultUsers()
  const createdUsers = await User.insertMany(users)

  // Builds depend on a User that created it, and a valid character class
  const testBuilds = getBuilds(
    createdUsers[0]._id,
    createdClasses.map((charClass) => charClass._id)
  )
  const createdBuilds = await Build.insertMany(testBuilds)

  // Build Details (depends on the build)
  const createdDetails = await BuildDetails.create({
    buildId: createdBuilds[0]._id,
    levels: [
      {
        level: 1,
      },
      {
        level: 2,
        improvements: {
          skills: [{ name: 'Teeth' }],
          attributes: {
            strength: 0,
            dexterity: 0,
            vitality: 5,
            energy: 0,
          },
        },
      },
    ],
  })

  // The only example data we are building by defautl is a necromancer
  const necro = await CharacterClass.find({ name: 'Necromancer' })
  const necroBuild = createdBuilds.find((build) => build.classid === necro._id)
  necroBuild.buildDetails = createdDetails._id
  await necroBuild.save()
}

async function start() {
  try {
    await clearData()
    await insertData()

    console.log('Data seed success')
    process.exit()
  } catch (error) {
    console.error('Data seed failed!', error)
    process.exit(1)
  }
}

start()
