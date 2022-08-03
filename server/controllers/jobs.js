const Job = require('../models/Jobschema')
const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../../errors/badRequest')
const NotFoundError = require('../../errors/not-found')

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({ createdBy: req.user.userId }).sort(
    'createdAt',
  )
  res.status(StatusCodes.OK).json({ allJobs, count: allJobs.length })
}

const getJob = async (req, res) => {
  //   const {
  //     user: { userId },
  //     params: { id: jobId },
  //   } = req
  const { userId } = req.user
  const jobId = req.params.id
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`Job with id ${jobId} does not exit`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  )
  if (!job) {
    throw new NotFoundError(`Job with id ${jobId} does not exit`)
  }
  res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`Job with id ${jobId} does not exit`)
  }
  res.status(StatusCodes.OK).json(`Job with id ${jobId} deleted`)
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
