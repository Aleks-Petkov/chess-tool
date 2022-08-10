import { Request, Response } from 'express'

const errorHandler = (err: Error, req: Request, res: Response) => {
    const statusCode = res.statusCode ?? 500
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}

export default errorHandler