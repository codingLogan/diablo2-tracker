import hashPassword from '../utils/hashPassword.js'

async function getDefaultUsers() {
  const password = await hashPassword('asdf')
  const testNames = ['John', 'Jane', 'Admin', 'Dev']

  const users = testNames.map((name) => ({
    name,
    email: `${name.toLowerCase()}@dev.com`,
    password,
  }))

  return users
}

export default getDefaultUsers
