const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customError')

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    //status code = 400
  }
}

module.exports = BadRequestError
