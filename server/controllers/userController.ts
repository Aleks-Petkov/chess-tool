import { Request, Response } from 'express'
import 'express-async-errors' // Throws exception on async errors instead of try/catch

const getUsers = async (req: Request, res: Response) => {
    const users = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Mary', lastName: 'Smith' }
    ]
    return res.status(200).json(users)
}

const createUser = async (req: Request, res: Response) => {
    if (!req.body.id) { // TODO: fix conditional
        res.status(400)
        throw new Error('Please specify a user')
    }
    const user = { id: req.body.id, firstName: req.body.firstName, lastName: req.body.lastName }
    return res.status(200).json(user)
}

export { getUsers, createUser }
