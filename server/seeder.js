import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import User from './models/userModel.js'
import hashPassword from './utils/hashPassword.js'

dotenv.config()
connectDB()

function clearData() {
  return User.deleteMany()
}

async function insertData() {
  const users = await createDefaultUsers()
  const createdUsers = await User.insertMany(users)
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
