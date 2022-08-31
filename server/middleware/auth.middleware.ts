import { Request, Response, NextFunction } from 'express'

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
    //res.redirect('/users/login')
}

export const verifyNotAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isUnauthenticated()) {
        console.log("LOGGING IN NORMALLY")
        return next()
    }
    console.log("ALREADY LOGGED IN - PASSING THROUGH")
    res.redirect('/dashboard')
}

