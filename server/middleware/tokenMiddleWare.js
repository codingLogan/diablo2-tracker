import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

async function checkToken(req, res, next) {
  const { authorization } = req.headers
  let token

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // "Bearer sometokenvalue"
      token = authorization.split(' ')[1]
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

      // Give the routes access to the user that "bears" the token
      // But remove the password
      req.user = await User.findById(tokenPayload.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      next(error)
    }
  } else {
    res.status(401)
    next(Error('Not authorized, no token was provided'))
  }
}

export default checkToken
