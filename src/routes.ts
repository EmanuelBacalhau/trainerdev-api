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

// LESSONS
router.get('/lessons', lessonController.index)
router.get('/lessons/:id', lessonController.findById)
router.get('/lessons/slug/:slug', lessonController.findBySlug)
router.post(
  '/lessons',
  lessonMulterConfig.single('video'),
  lessonController.create
)
router.put(
  '/lessons/:id',
  lessonMulterConfig.single('video'),
  lessonController.update
)
router.delete('/lessons/:id', lessonController.delete)

// MATRICULATIONS
router.get('/matriculations', matriculationController.index)
router.post('/matriculations', matriculationController.create)
router.put('/matriculations/:id', matriculationController.update)
router.delete('/matriculations/:id', matriculationController.delete)

// TRACK_MODULES
router.delete(
  '/tracks/:id/modules/:moduleId',
  trackController.removeModuleFromTrack
)
