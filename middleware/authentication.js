const User = require('../server/models/UserSchema')
const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthError')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    const { userId, name } = payload
    req.user = { userId: userId, name: name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
