import { Router } from 'express'
import { verifyAuth, verifyNotAuth } from '../middleware/auth.middleware'
import {
    getUsers,
    getHome,
    loginUser,
    logoutUser,
    registerUser,
    deleteUser
} from '../controllers/user.controller'

const router: Router = Router()

router.route('/')
    .get(getUsers) // Temporary route
    .post(verifyNotAuth, registerUser)

router.get('/home', verifyAuth, getHome)
router.post('/login', verifyNotAuth, loginUser)
router.post('/logout', verifyAuth, logoutUser)

router.route('/:id') // temporary route
    .delete(deleteUser)

export default router
