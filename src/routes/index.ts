import { Router } from 'express'
import { authRouter } from './auth-router'
import { lessonRouter } from './lesson.router'
import { matriculationRouter } from './matriculation.router'
import { moduleRouter } from './module.router'
import { trackRouter } from './track.router'
import { userRouter } from './user.router'

export const router = Router()

router.use(authRouter)
router.use(userRouter)
router.use(trackRouter)
router.use(moduleRouter)
router.use(lessonRouter)
router.use(matriculationRouter)
