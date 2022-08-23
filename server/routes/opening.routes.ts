import { Router } from 'express'
import {
    getOpenings,
    createOpening,
    deleteOpening
} from '../controllers/opening.controller'

const router: Router = Router()

router.route('/')
    .get(getOpenings)
    .post(createOpening)

router.route('/:id')
    .delete(deleteOpening)


export default router
