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
import { verifyUserRole } from './middlewares/verify-user-role.middleware'

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
router.get(
  '/users',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userController.index
)
router.get('/users/me', isAuthenticatedMiddleware, userController.myDetails)
router.get(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userController.findById
)
router.post(
  '/users',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userController.create
)
router.put(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userMulterConfig.single('avatar'),
  userController.update
)
router.delete(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userController.delete
)

// TRACKS
router.get(
  '/tracks',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  trackController.index
)
router.get(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  trackController.findById
)
router.get(
  '/tracks/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  trackController.findBySlug
)
router.post(
  '/tracks',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackMulterConfig.single('cover'),
  trackController.create
)
router.put(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackMulterConfig.single('cover'),
  trackController.update
)
router.delete(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackController.delete
)

// MODULES
router.get(
  '/modules',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleController.index
)
router.get(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  moduleController.findById
)
router.get(
  '/modules/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  moduleController.findBySlug
)
router.post(
  '/modules',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleMulterConfig.single('cover'),
  moduleController.create
)
router.put(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleMulterConfig.single('cover'),
  moduleController.update
)
router.delete(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleController.delete
)

// LESSONS
router.get(
  '/lessons',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  lessonController.index
)
router.get(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  lessonController.findById
)
router.get(
  '/lessons/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  lessonController.findBySlug
)
router.post(
  '/lessons',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonMulterConfig.single('video'),
  lessonController.create
)
router.put(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonMulterConfig.single('video'),
  lessonController.update
)
router.delete(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonController.delete
)

// MATRICULATIONS
router.get(
  '/matriculations',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.index
)
router.post(
  '/matriculations',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.create
)
router.put(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.update
)
router.delete(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.delete
)

// TRACK_MODULES
router.delete(
  '/tracks/:id/modules/:moduleId',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackController.removeModuleFromTrack
)
