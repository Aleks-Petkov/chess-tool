import { Router } from 'express'
import {
    getUsers,
    createUser
} from '../controllers/userController'

const router: Router = Router()

router.route('/').get(getUsers).post(createUser)

export default router
