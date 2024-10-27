import type { Handler } from 'express'
import { HttpError } from '../errors/HttpError'
import type { LessonUseCase } from '../use-cases/Lesson.use-case'
import { removeFile } from '../utils/remove-file'
import {
  CreateLessonAttributesSchema,
  FindLessonRequestSchema,
  GetLessonByIdParamsSchema,
  UpdateLessonAttributesSchema,
} from './schemas/LessonRequestSchema'

export class LessonController {
  constructor(private readonly lessonUseCase: LessonUseCase) {}

  index: Handler = async (request, response, next) => {
    try {
      const query = FindLessonRequestSchema.parse(request.query)
      const { lessons, meta } = await this.lessonUseCase.index(query)

      response.json({
        lessons,
        meta,
      })
    } catch (error) {
      next(error)
    }
  }

  findById: Handler = async (request, response, next) => {
    try {
      const { id } = GetLessonByIdParamsSchema.parse(request.params)

      const lesson = await this.lessonUseCase.findById(Number(id))

      response.json(lesson)
    } catch (error) {
      next(error)
    }
  }

  findBySlug: Handler = async (request, response, next) => {
    try {
      const { slug } = request.params

      const lesson = await this.lessonUseCase.findBySlug(slug)

      response.json(lesson)
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (request, response, next) => {
    try {
      const body = CreateLessonAttributesSchema.parse(request.body)

      if (!request.file) {
        throw new HttpError('Video is require', 400)
      }

      const videoUrl = request.file.filename

      const lesson = await this.lessonUseCase.create({
        ...body,
        videoUrl,
      })

      response.status(201).json(lesson)
    } catch (error) {
      if (request.file) {
        removeFile('lessons', request.file.filename)
      }
      next(error)
    }
  }

  update: Handler = async (request, response, next) => {
    try {
      const body = UpdateLessonAttributesSchema.parse(request.body)
      const { id } = GetLessonByIdParamsSchema.parse(request.params)

      let videoUrl: string | undefined

      if (request.file) {
        videoUrl = request.file.filename
      }

      const lesson = await this.lessonUseCase.update(Number(id), {
        ...body,
        videoUrl,
      })

      response.json(lesson)
    } catch (error) {
      if (request.file) {
        removeFile('lessons', request.file.filename)
      }
      next(error)
    }
  }

  delete: Handler = async (request, response, next) => {
    try {
      const { id } = GetLessonByIdParamsSchema.parse(request.params)

      await this.lessonUseCase.delete(Number(id))

      response.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
