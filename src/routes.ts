import { Router } from 'express'
import { userController } from './container'

export const router = Router()

// USERS
router.get('/users', userController.index)
router.get('/users/:id', userController.findById)
router.post('/users', userController.create)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)
