const Job = require('../models/Jobschema')
const { StatusCodes } = require('http-status-codes')

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const newJob = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ newJob })
}

const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({ createdBy: req.user.userId }).sort(
    'createdAt',
  )
  res.status(StatusCodes.OK).json({ allJobs, count: jobs.length })
}

const getJob = async (req, res) => {
  //   const {
  //     user: { userId },
  //     params: { id: jobId },
  //   } = req
  const { userId } = req.user
  const { jobId } = req.params.id
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {}

const deleteJob = async (req, res) => {}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
