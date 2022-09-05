require('dotenv').config()
require('express-async-errors')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const express = require('express')
const app = express()
const connectDB = require('./database/db')

//routes
const auth = require('./server/routes/auth')
const jobs = require('./server/routes/jobs')

//errors
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

//authentication
const aunthenticateUser = require('./middleware/authentication')

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

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
