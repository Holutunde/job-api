const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customError')

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
    //status code = 404
  }
}

module.exports = NotFoundError
