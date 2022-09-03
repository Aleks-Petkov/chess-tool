import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import logger, { Theme } from 'better-logging'
logger(console, { color: Theme.dark })
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()
import 'colors'
import userRouter from './routes/user.routes'
import openingRouter from './routes/opening.routes'
import errorHandler from './middleware/error.middleware'
import passport from './middleware/passport.middleware'
import connectDB from './config/db'

const app = express()
const port = process.env.PORT || 5000
connectDB()
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: 'strict' } // 
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', userRouter)
app.use('/openings', openingRouter)

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})