const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customError')

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
    //status code = 401
  }
}

module.exports = UnauthenticatedError
