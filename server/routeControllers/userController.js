import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

/**
 * @description Authenticate a user
 * @access Public
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @returns {object} {_id, name, email, isAdmin, token}
 */
const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    // Make sure password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    next(error)
  }
}

export { authenticateUser }
