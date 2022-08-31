import { Router } from 'express'
import { verifyAuth, verifyNotAuth } from '../middleware/auth.middleware'
import {
    checkAuth,
    getHome,
    getDashboard,
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,
} from '../controllers/user.controller'

const router: Router = Router()

router.route('/')
    .get(verifyNotAuth, getHome)
    .post(verifyNotAuth, registerUser)

router.get('/auth', checkAuth) // TODO: endpoint might not be needed
router.get('/dashboard', verifyAuth, getDashboard)
router.post('/login', verifyNotAuth, loginUser)
router.post('/logout', verifyAuth, logoutUser)

router.route('/:id') // temporary route
    .delete(deleteUser)

export default router
