import { Router } from 'express'
import multer from 'multer'
import {
  authController,
  lessonController,
  matriculationController,
  moduleController,
  trackController,
  userController,
} from './container'
import { upload } from './libs/multer'
import { isAuthenticatedMiddleware } from './middlewares/is-authenticated.middleware'

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

const lessonMulterConfig = multer({
  storage: upload('lessons', ['video/mp4']),
})

// AUTH
router.post('/session', authController.execute)

// USERS
router.get('/users', isAuthenticatedMiddleware, userController.index)
router.get('/users/:id', isAuthenticatedMiddleware, userController.findById)
router.post('/users', isAuthenticatedMiddleware, userController.create)
router.put(
  '/users/:id',
  isAuthenticatedMiddleware,
  userMulterConfig.single('avatar'),
  userController.update
)
router.delete('/users/:id', isAuthenticatedMiddleware, userController.delete)

// TRACKS
router.get('/tracks', isAuthenticatedMiddleware, trackController.index)
router.get('/tracks/:id', isAuthenticatedMiddleware, trackController.findById)
router.get(
  '/tracks/slug/:slug',
  isAuthenticatedMiddleware,
  trackController.findBySlug
)
router.post(
  '/tracks',
  isAuthenticatedMiddleware,
  trackMulterConfig.single('cover'),
  trackController.create
)
router.put(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  trackMulterConfig.single('cover'),
  trackController.update
)
router.delete('/tracks/:id', isAuthenticatedMiddleware, trackController.delete)

// MODULES
router.get('/modules', isAuthenticatedMiddleware, moduleController.index)
router.get('/modules/:id', isAuthenticatedMiddleware, moduleController.findById)
router.get(
  '/modules/slug/:slug',
  isAuthenticatedMiddleware,
  moduleController.findBySlug
)
router.post(
  '/modules',
  isAuthenticatedMiddleware,
  moduleMulterConfig.single('cover'),
  moduleController.create
)
router.put(
  '/modules/:id',
  isAuthenticatedMiddleware,
  moduleMulterConfig.single('cover'),
  moduleController.update
)
router.delete(
  '/modules/:id',
  isAuthenticatedMiddleware,
  moduleController.delete
)

// LESSONS
router.get('/lessons', isAuthenticatedMiddleware, lessonController.index)
router.get('/lessons/:id', isAuthenticatedMiddleware, lessonController.findById)
router.get(
  '/lessons/slug/:slug',
  isAuthenticatedMiddleware,
  lessonController.findBySlug
)
router.post(
  '/lessons',
  isAuthenticatedMiddleware,
  lessonMulterConfig.single('video'),
  lessonController.create
)
router.put(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  lessonMulterConfig.single('video'),
  lessonController.update
)
router.delete(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  lessonController.delete
)

// MATRICULATIONS
router.get(
  '/matriculations',
  isAuthenticatedMiddleware,
  matriculationController.index
)
router.post(
  '/matriculations',
  isAuthenticatedMiddleware,
  matriculationController.create
)
router.put(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  matriculationController.update
)
router.delete(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  matriculationController.delete
)

// TRACK_MODULES
router.delete(
  '/tracks/:id/modules/:moduleId',
  isAuthenticatedMiddleware,
  trackController.removeModuleFromTrack
)
