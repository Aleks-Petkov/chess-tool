import { Request, Response, NextFunction } from 'express'
import { BackendError } from '../app.types'
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = res.statusCode ?? 500
    console.error(err.message)
    const error: BackendError = {
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    }
    res.status(statusCode).json(error)
}

export default errorHandler