const User = require('../models/UserSchema')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const BadRequestError = require('../../errors/badRequest')

const register = async (req, res) => {
  const { name, email, password } = req.body

  const salt = await bcrypt.genSalt(10)

  const hashPassword = await bcrypt.hash(password, salt)

  const newUser = { name, email, password: hashPassword }

  const regUser = await User.create({ ...newUser })

  res.status(StatusCodes.CREATED).json(regUser)
}

const login = async (req, res) => {
  res.send('login')
}

module.exports = {
  register,
  login,
}
