const User = require('../models/UserSchema')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const BadRequestError = require('../../errors/badRequest')
const UnauthenticatedError = require('../../errors/unauthError')

const register = async (req, res) => {
  const regUser = await User.create({ ...req.body })
  const newToken = regUser.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: regUser.name }, newToken })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const getUser = await User.findOne({ email })
  if (!getUser) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordSame = await getUser.comparePassword(password)
  if (!isPasswordSame) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // invoke jwt
  const userToken = getUser.createJWT()
  res
    .status(StatusCodes.OK)
    .json({
      user: `name: ${getUser.name} has successfully logged in`,
      userToken,
    })
}

module.exports = {
  register,
  login,
}
