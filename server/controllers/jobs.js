const Job = require('../models/Jobschema')
const { StatusCodes } = require('http-status-codes')

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const newJob = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ newJob })
}
const getAllJobs = async (req, res) => {}
const getJob = async (req, res) => {}

const updateJob = async (req, res) => {}

const deleteJob = async (req, res) => {}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
