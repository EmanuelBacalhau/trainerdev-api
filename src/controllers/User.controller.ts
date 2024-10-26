import { unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Handler } from 'express'
import type { UserUseCase } from '../use-cases/User.use-case'
import { removeFile } from '../utils/remove-file'
import {
  CreateUserRequestSchema,
  FindUsersRequestSchema,
  GetUserIdRequestSchema,
  UpdateUserRequestSchema,
} from './schemas/UserRequestSchema'

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  index: Handler = async (request, response, next) => {
    try {
      const query = FindUsersRequestSchema.parse(request.query)
      const { users, meta } = await this.userUseCase.index(query)

      response.status(200).json({ users, meta })
    } catch (error) {
      next(error)
    }
  }

  findById: Handler = async (request, response, next) => {
    try {
      const params = GetUserIdRequestSchema.parse(request.params)
      const user = await this.userUseCase.findById(params.id)

      response.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (request, response, next) => {
    try {
      const body = CreateUserRequestSchema.parse(request.body)
      const user = await this.userUseCase.create(body)

      response.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  update: Handler = async (request, response, next) => {
    try {
      const body = UpdateUserRequestSchema.parse(request.body)
      const params = GetUserIdRequestSchema.parse(request.params)
      const avatar = request.file

      const user = await this.userUseCase.update(params.id, {
        ...body,
        avatar: avatar?.filename,
      })

      response.status(200).json(user)
    } catch (error) {
      if (request.file) {
        removeFile('users', request.file.filename)
      }
      next(error)
    }
  }

  delete: Handler = async (request, response, next) => {
    try {
      const params = GetUserIdRequestSchema.parse(request.params)
      await this.userUseCase.delete(params.id)

      response.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
