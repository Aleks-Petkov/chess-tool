import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import bcrypt from 'bcrypt'
import User from '../models/user.model'


passport.use(new LocalStrategy(
    async function verify(username: string, password: string, done): Promise<void> {
        const user = await User.findOne({username: username}) // TODO: error handling
        if (!user) 
            return done(null, false, {message: `No user with username ${username}`})
        if (await bcrypt.compare(password, user.password)) 
            return done(null, user)
        else 
            return done(null, false, {message: 'Incorrect password'})
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
