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

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    // Make sure user email doesn't already exist
    const foundUser = await User.findOne({ email: email })

    if (foundUser) {
      res.status(400)
      throw new Error('Email address already in use')
    }

    // Accept user information
    const newUser = {
      name,
      email,
      // We don't have to hash this password, because we told Mongo
      // to hash the password pre "save": see userModel.js
      password,
    }

    // Save the information into the database via Mongoose
    const savedUser = await User.create(newUser)

    if (savedUser) {
      res.json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      })
    } else {
      res.status(400)
      throw new Error('User could not be saved')
    }
  } catch (error) {
    next(error)
  }
}

export { authenticateUser, registerUser }
