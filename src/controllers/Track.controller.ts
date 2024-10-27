import type { Handler } from 'express'
import { HttpError } from '../errors/HttpError'
import type { TrackUseCase } from '../use-cases/Track.use-case'
import { removeFile } from '../utils/remove-file'
import {
  CreateTrackRequestSchema,
  GetModuleIdInTrackRequestSchema,
  GetTrackByIdRequestSchema,
  GetTrackBySlugRequestSchema,
  UpdateTrackRequestSchema,
} from './schemas/TrackRequestSchema'

export class TrackController {
  constructor(private readonly trackUseCase: TrackUseCase) {}

  index: Handler = async (request, response, next) => {
    try {
      const query = request.query
      const { tracks, meta } = await this.trackUseCase.index(query)

      response.json({ data: tracks, meta })
    } catch (error) {
      next(error)
    }
  }

  findById: Handler = async (request, response, next) => {
    try {
      const { id } = GetTrackByIdRequestSchema.parse(request.params)
      const track = await this.trackUseCase.findById(id)

      response.json(track)
    } catch (error) {
      next(error)
    }
  }

  findBySlug: Handler = async (request, response, next) => {
    try {
      const { slug } = GetTrackBySlugRequestSchema.parse(request.params)
      const track = await this.trackUseCase.findBySlug(slug)

      response.json(track)
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (request, response, next) => {
    try {
      const body = CreateTrackRequestSchema.parse(request.body)

      if (request.file === undefined) {
        throw new HttpError('Cover image is required', 400)
      }

      const coverUrl = request.file.filename

      const track = await this.trackUseCase.create({
        ...body,
        coverUrl,
      })

      response.status(201).json(track)
    } catch (error) {
      if (request.file) {
        removeFile('tracks', request.file.filename)
      }

      next(error)
    }
  }

  update: Handler = async (request, response, next) => {
    try {
      const { id } = GetTrackByIdRequestSchema.parse(request.params)
      const body = UpdateTrackRequestSchema.parse(request.body)

      let coverUrl: string | undefined

      if (request.file) {
        coverUrl = request.file.filename
      }

      const track = await this.trackUseCase.update(id, {
        ...body,
        coverUrl,
      })

      response.status(200).json(track)
    } catch (error) {
      if (request.file) {
        removeFile('tracks', request.file.filename)
      }
      next(error)
    }
  }

  delete: Handler = async (request, response, next) => {
    try {
      const { id } = GetTrackByIdRequestSchema.parse(request.params)
      await this.trackUseCase.delete(id)

      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  removeModuleFromTrack: Handler = async (request, response, next) => {
    try {
      const { moduleId } = GetModuleIdInTrackRequestSchema.parse(request.params)
      const { id: trackId } = GetTrackByIdRequestSchema.parse(request.params)

      await this.trackUseCase.removeModuleFromTrack(trackId, moduleId)

      response.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
