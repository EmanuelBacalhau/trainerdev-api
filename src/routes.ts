import { Router } from 'express'
import multer from 'multer'
import { userController } from './container'
import { upload } from './libs/multer'

export const router = Router()

const useMulterConfig = multer({
  storage: upload('users', ['image/jpeg', 'image/png']),
})

// USERS
router.get('/users', userController.index)
router.get('/users/:id', userController.findById)
router.post('/users', userController.create)
router.put(
  '/users/:id',
  useMulterConfig.single('avatar'),
  userController.update
)
router.delete('/users/:id', userController.delete)
