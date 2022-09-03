import { Request, Response, NextFunction } from 'express'

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth')
}

export const verifyNotAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isUnauthenticated()) {
        return next()
    }
    res.redirect('/dashboard')
}

