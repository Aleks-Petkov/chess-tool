import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import bcrypt from 'bcrypt'
import 'express-async-errors'
import User from '../models/user.model'


passport.use(new LocalStrategy(
    async function verify(username: string, password: string, done): Promise<void> {
        const user = await User.findOne({ username: username }) // TODO: error handling
        if (!user)
            return done(new Error(`No user with username '${username}'`), false)
        if (await bcrypt.compare(password, user.password))
            return done(null, user)
        else
            return done(new Error('Incorrect password'), false)
    }))

passport.serializeUser((user: any, done): void => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done): Promise<void> => {
    try {
        const user = await User.findById(id) // TODO: experiment without try/catch
        done(null, user)
    }
    catch (err) {
        done(err)
    }
})

export default passport
