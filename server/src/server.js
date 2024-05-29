import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import connectMongoDB from './db/connectMongoDB.js'
import routes from './routes/index.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api', routes)

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectMongoDB()
})