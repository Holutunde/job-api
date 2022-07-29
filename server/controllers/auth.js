const User = require('../models/UserSchema')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const regUser = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json(regUser)
}

const login = async (req, res) => {
  res.send('login')
}

module.exports = {
  register,
  login,
}
