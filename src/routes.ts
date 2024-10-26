import { Router } from 'express'
import multer from 'multer'
import { moduleController, trackController, userController } from './container'
import { upload } from './libs/multer'

export const router = Router()

const userMulterConfig = multer({
  storage: upload('users', ['image/jpeg', 'image/png']),
})

const trackMulterConfig = multer({
  storage: upload('tracks', ['image/jpeg', 'image/png']),
})

const moduleMulterConfig = multer({
  storage: upload('modules', ['image/jpeg', 'image/png']),
})

// USERS
router.get('/users', userController.index)
router.get('/users/:id', userController.findById)
router.post('/users', userController.create)
router.put(
  '/users/:id',
  userMulterConfig.single('avatar'),
  userController.update
)
router.delete('/users/:id', userController.delete)

// TRACKS
router.get('/tracks', trackController.index)
router.get('/tracks/:id', trackController.findById)
router.get('/tracks/slug/:slug', trackController.findBySlug)
router.post(
  '/tracks',
  trackMulterConfig.single('cover'),
  trackController.create
)
router.put(
  '/tracks/:id',
  trackMulterConfig.single('cover'),
  trackController.update
)
router.delete('/tracks/:id', trackController.delete)

// MODULES
router.get('/modules', moduleController.index)
router.get('/modules/:id', moduleController.findById)
router.get('/modules/slug/:slug', moduleController.findBySlug)
router.post(
  '/modules',
  moduleMulterConfig.single('cover'),
  moduleController.create
)
router.put(
  '/modules/:id',
  moduleMulterConfig.single('cover'),
  moduleController.update
)
router.delete('/modules/:id', moduleController.delete)
