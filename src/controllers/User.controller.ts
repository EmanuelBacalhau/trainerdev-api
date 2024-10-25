import type { Handler } from 'express'
import type { UserUseCase } from '../use-cases/User.use-case'
import {
  CreateUserRequestSchema,
  FindUsersRequestSchema,
  GetIdRequestSchema,
  UpdateUserRequestSchema,
} from './schemas/UserRequestSchema'

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  index: Handler = async (request, response, next) => {
    try {
      const query = FindUsersRequestSchema.parse(request.query)
      const users = await this.userUseCase.index(query)

      response.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  findById: Handler = async (request, response, next) => {
    try {
      const params = GetIdRequestSchema.parse(request.params)
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
      const params = GetIdRequestSchema.parse(request.params)
      const user = await this.userUseCase.update(params.id, body)

      response.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  delete: Handler = async (request, response, next) => {
    try {
      const params = GetIdRequestSchema.parse(request.params)
      await this.userUseCase.delete(params.id)

      response.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
