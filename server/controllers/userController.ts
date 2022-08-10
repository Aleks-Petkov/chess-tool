import { Request, Response  } from 'express'
import 'express-async-errors' // Throws exception on async errors instead of try/catch
import User from '../models/userModel'

const getUsers = async (req: Request, res: Response) => {
    const users = await User.find()
  
    return res.status(200).json(users)
}

const createUser = async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) { // TODO: fix conditional
        res.status(400)
        throw new Error('Please specify a username and password')
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    return res.status(200).json(user)
}

export { getUsers, createUser }
