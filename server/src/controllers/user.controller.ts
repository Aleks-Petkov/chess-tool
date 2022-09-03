import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import 'express-async-errors' // Catches exceptions on async errors instead of try/catch
import User from '../models/user.model'
import bcrypt from 'bcrypt'

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({
        user: req.user?.username ?? null,
    })
}

export const getHome = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send("Home screen for chess tool!")
}

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send(req.user?.username)
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
    })(req, res, next)
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.logout((error: Error) => {
        if (error) { return next(error) }
        req.session.destroy((err: Error) => {
            if (err) {
                console.error("Session was not ended successfully")
                res.sendStatus(500)
            }
            else {
                res.clearCookie('connect.sid')
                res.sendStatus(200)
            }
        })
    })
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400)
        throw new Error('Please specify a username and password')
    }
    const userExists = await User.findOne({ username })
    if (userExists) {
        res.status(400)
        throw new Error(`User '${username}' already exists`)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashedPassword })
    if (user) {
        res.status(201).send(`User ${username} successfully created.`)
    } else {
        res.status(400)
        throw new Error("User could not be created")
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error(`User with ID ${req.params.id} not found`)
    }
    await user.remove()
    res.status(200).json({ id: req.params.id })
}