const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const connectDB = require('./database/db')
const auth = require('./server/routes/auth')
const jobs = require('./server/routes/jobs')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const aunthenticateUser = require('./middleware/authentication')

app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/jobs', aunthenticateUser, jobs)
app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 4000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}....`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
