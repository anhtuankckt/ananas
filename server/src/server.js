import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'

import connectMongoDB from './db/connectMongoDB.js'
import routes from './routes/index.js'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()

const corsOptions = {
  origin: 'https://ananas-theta.vercel.app',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api', routes)

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectMongoDB()
})