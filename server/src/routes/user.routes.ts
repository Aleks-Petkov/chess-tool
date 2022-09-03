import { Router } from 'express'
import { verifyAuth, verifyNotAuth } from '../middleware/auth.middleware'
import {
    checkAuth,
    getDashboard,
    loginUser,
    logoutUser,
    registerUser,
} from '../controllers/user.controller'

const router: Router = Router()

router.route('/')
    .post(verifyNotAuth, registerUser)

router.get('/auth', checkAuth)
router.get('/dashboard', verifyAuth, getDashboard)
router.post('/login', verifyNotAuth, loginUser)
router.post('/logout', verifyAuth, logoutUser)

export default router
