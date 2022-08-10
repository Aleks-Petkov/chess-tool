import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import 'colors'
import userRoutes from './routes/userRoutes'
import errorHandler from './middleware/errorMiddleware'
import { connectDB } from './config/db'

connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    res.send("Home page")
})

app.use('/users', userRoutes)

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})