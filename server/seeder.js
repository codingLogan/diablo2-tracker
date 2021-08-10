import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import User from './models/userModel.js'
import hashPassword from './utils/hashPassword.js'
import CharacterClass from './models/characterClassModel.js'
import Build from './models/buildsModel.js'
import Attributes from './models/attributesModel.js'
import BuildDetails from './models/buildDetailsModel.js'

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
  const createdClasses = await createCharacterClasses()

  // Data that is for testing / development
  const users = await createDefaultUsers()
  const createdUsers = await User.insertMany(users)

  // Builds depend on a User that created it
  const testBuild = createBuild(createdUsers[0]._id, createdClasses[0]._id)
  const createdBuilds = await Build.insertMany([testBuild])

  // Build Details depend on the build
  const createdDetails = await BuildDetails.insertMany([
    {
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
    },
  ])
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

function createSkill(name, baseLevelRequirement) {
  return {
    name,
    baseLevelRequirement,
  }
}

async function createCharacterClasses() {
  const characterClasses = [
    {
      name: 'Necromancer',
      skillTrees: [
        {
          name: 'Summoning Skills',
          skills: [
            createSkill('Skeleton Mastery', 1),
            createSkill('Raise Skeleton', 1),
            createSkill('Clay Golen', 6),
            createSkill('Golem Mastery', 12),
            createSkill('Skeletal Mage', 12),
            createSkill('Blood Golem', 18),
            createSkill('Summon Resist', 24),
            createSkill('Iron Golem', 24),
            createSkill('Fire Golem', 30),
            createSkill('Revive', 30),
          ],
        },
        {
          name: 'Poison and Bone Skills',
          skills: [
            createSkill('Teeth', 1),
            createSkill('Bone Armor', 1),
            createSkill('Poison Dagger', 6),
            createSkill('Corpse Explosion', 6),
            createSkill('Bone Wall', 12),
            createSkill('Poison Explosion', 18),
            createSkill('Bone Spear', 18),
            createSkill('Bone Prison', 24),
            createSkill('Poison Nova', 30),
            createSkill('Bone Spirit', 30),
          ],
        },
        {
          name: 'Curses',
          skills: [
            createSkill('Amplify Damage', 1),
            createSkill('Dim Vision', 6),
            createSkill('Weaken', 6),
            createSkill('Iron Maiden', 12),
            createSkill('Terror', 12),
            createSkill('Confuse', 18),
            createSkill('Life Tap', 18),
            createSkill('Attract', 24),
            createSkill('Decrepify', 24),
            createSkill('Lower Resist', 30),
          ],
        },
      ],
    },
  ]
  return CharacterClass.insertMany(characterClasses)
}

function createBuild(userId, classId) {
  return {
    userId,
    classId,
    name: 'Example Build',
    summary: 'Example Summary',
  }
}

function getAttributes() {
  return [
    {
      name: 'Strength',
    },
    {
      name: 'Dexterity',
    },
    {
      name: 'Vitality',
    },
    {
      name: 'Energy',
    },
  ]
}

async function createDefaultUsers() {
  const password = await hashPassword('asdf')
  const testNames = ['John', 'Jane', 'Admin', 'Dev']

  const users = testNames.map((name) => ({
    name,
    email: `${name.toLowerCase()}@dev.com`,
    password,
  }))

  return users
}

start()
