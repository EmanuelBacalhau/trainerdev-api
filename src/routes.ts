import { Router } from 'express'
import {
  authController,
  createModuleController,
  createTrackController,
  createUserController,
  deleteModuleController,
  deleteTrackController,
  deleteUserController,
  findAllModuleController,
  findAllTrackController,
  findAllUserController,
  findModuleByIdController,
  findModuleBySlugController,
  findTrackByIdController,
  findTrackBySlugController,
  findUserByIdController,
  getUserByIdController,
  lessonController,
  matriculationController,
  removeModuleFromTrackController,
  updateTrackController,
  updateUserController,
} from './container'
import { multerUpload } from './libs/multerUpload'
import { isAuthenticatedMiddleware } from './middlewares/is-authenticated.middleware'
import { verifyUserRole } from './middlewares/verify-user-role.middleware'

export const router = Router()

const userMulterConfig = multerUpload('users', ['image/jpeg', 'image/png'])

const trackMulterConfig = multerUpload('tracks', ['image/jpeg', 'image/png'])

const moduleMulterConfig = multerUpload('modules', ['image/jpeg', 'image/png'])

const lessonMulterConfig = multerUpload('lessons', ['video/mp4'])

// AUTH
router.post('/session', authController.execute)

// USERS
router.get(
  '/users',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findAllUserController.execute.bind(findAllUserController)
)
router.get(
  '/users/me',
  isAuthenticatedMiddleware,
  getUserByIdController.execute.bind(getUserByIdController)
)
router.get(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findUserByIdController.execute.bind(findUserByIdController)
)
router.post(
  '/users',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  createUserController.execute.bind(createUserController)
)
router.put(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userMulterConfig.single('avatar'),
  updateUserController.execute.bind(updateUserController)
)
router.delete(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteUserController.execute.bind(deleteUserController)
)

// TRACKS
router.get(
  '/tracks',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findAllTrackController.execute.bind(findAllTrackController)
)
router.get(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findTrackByIdController.execute.bind(findTrackByIdController)
)
router.get(
  '/tracks/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findTrackBySlugController.execute.bind(findTrackBySlugController)
)
router.post(
  '/tracks',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackMulterConfig.single('cover'),
  createTrackController.execute.bind(createTrackController)
)
router.put(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackMulterConfig.single('cover'),
  updateTrackController.execute.bind(updateTrackController)
)
router.delete(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteTrackController.execute.bind(deleteTrackController)
)

// MODULES
router.get(
  '/modules',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findAllModuleController.execute.bind(findAllModuleController)
)
router.get(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findModuleByIdController.execute.bind(findModuleByIdController)
)
router.get(
  '/modules/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findModuleBySlugController.execute.bind(findModuleBySlugController)
)
router.post(
  '/modules',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleMulterConfig.single('cover'),
  createModuleController.execute.bind(createModuleController)
)
router.put(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleMulterConfig.single('cover'),
  updateTrackController.execute.bind(updateTrackController)
)
router.delete(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteModuleController.execute.bind(deleteModuleController)
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
  removeModuleFromTrackController.execute.bind(removeModuleFromTrackController)
)
