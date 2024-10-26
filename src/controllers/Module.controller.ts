import type { Handler } from 'express'
import { HttpError } from '../errors/HttpError'
import type { ModuleUseCase } from '../use-cases/Module.use-case'
import { removeFile } from '../utils/remove-file'
import {
  CreateModuleAttributesSchema,
  FindModulesParamsSchema,
  GetModuleByIdParamsSchema,
  GetModuleBySlugParamsSchema,
  UpdateModuleAttributesSchema,
} from './schemas/ModuleRequestSchema'

export class ModuleController {
  constructor(private readonly moduleUseCase: ModuleUseCase) {}

  index: Handler = async (request, response, next) => {
    try {
      const query = FindModulesParamsSchema.parse(request.query)
      const { modules, meta } = await this.moduleUseCase.index(query)

      response.json({
        modules,
        meta,
      })
    } catch (error) {
      next(error)
    }
  }

  findById: Handler = async (request, response, next) => {
    try {
      const { id } = GetModuleByIdParamsSchema.parse(request.params)
      const module = await this.moduleUseCase.findById(id)

      response.json(module)
    } catch (error) {
      next(error)
    }
  }

  findBySlug: Handler = async (request, response, next) => {
    try {
      const { slug } = GetModuleBySlugParamsSchema.parse(request.params)
      const module = await this.moduleUseCase.findBySlug(slug)

      response.json(module)
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (request, response, next) => {
    try {
      const body = CreateModuleAttributesSchema.parse(request.body)

      if (!request.file) {
        throw new HttpError('Cover image is required', 400)
      }

      const coverUrl = request.file.filename

      const module = await this.moduleUseCase.create({
        ...body,
        coverUrl,
      })

      response.status(201).json(module)
    } catch (error) {
      if (request.file) {
        removeFile('modules', request.file.path)
      }
      next(error)
    }
  }

  update: Handler = async (request, response, next) => {
    try {
      const { id } = GetModuleByIdParamsSchema.parse(request.params)
      const body = UpdateModuleAttributesSchema.parse(request.body)

      let coverUrl: string | undefined

      if (request.file) {
        coverUrl = request.file.filename
      }

      const module = await this.moduleUseCase.update(id, {
        ...body,
        coverUrl,
      })

      response.status(200).json(module)
    } catch (error) {
      if (request.file) {
        removeFile('modules', request.file.path)
      }
      next(error)
    }
  }

  delete: Handler = async (request, response, next) => {
    try {
      const { id } = GetModuleByIdParamsSchema.parse(request.params)

      await this.moduleUseCase.delete(id)

      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
