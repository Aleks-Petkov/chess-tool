import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ?? 500
    console.error(err.message)
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}

export default errorHandler