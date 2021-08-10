import express from 'express' // ESModule
import colors from 'colors'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './db.js'
import userRoutes from './routes/userRoutes.js'
import buildRoutes from './routes/buildRoutes.js'
import { notFound, internalError } from './middleware/errorMiddleWare.js'

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  // Gives route logging
  app.use(morgan('dev'))
}

// Parse json requests into the body
app.use(express.json())

// Add route collections here
app.use('/users', userRoutes)
app.use('/builds', buildRoutes)

// Provide the static file location
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  // Get any route not defined above for the API and serve the React App
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)
app.use(internalError)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
