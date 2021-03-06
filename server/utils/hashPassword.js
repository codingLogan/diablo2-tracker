import bcrypt from 'bcryptjs'

export default async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPasswod = await bcrypt.hash(password, salt)
  return hashedPasswod
}
