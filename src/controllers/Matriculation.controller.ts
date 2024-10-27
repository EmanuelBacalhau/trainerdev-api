import type { Handler } from 'express'
import type { MatriculationUseCase } from '../use-cases/Matriculation.use-case'
import {
  CreateMatriculationRequestSchema,
  GetMatriculationByIdRequestSchema,
  GetMatriculationRequestSchema,
  UpdateMatriculationRequestSchema,
} from './schemas/MatriculationRequestSchema'

export class MatriculationController {
  constructor(private readonly matriculationUseCase: MatriculationUseCase) {}

  index: Handler = async (request, response, next) => {
    try {
      const query = GetMatriculationRequestSchema.parse(request.query)
      const { matriculations, meta } =
        await this.matriculationUseCase.index(query)

      response.json({ matriculations, meta })
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (request, response, next) => {
    try {
      console.log('request.body', request.body)

      const body = CreateMatriculationRequestSchema.parse(request.body)
      const matriculation = await this.matriculationUseCase.create(body)

      response.json(matriculation)
    } catch (error) {
      next(error)
    }
  }

  update: Handler = async (request, response, next) => {
    try {
      const { id } = GetMatriculationByIdRequestSchema.parse(request.params)
      const body = UpdateMatriculationRequestSchema.parse(request.body)

      const matriculation = await this.matriculationUseCase.update(id, body)

      response.status(200).json(matriculation)
    } catch (error) {
      next(error)
    }
  }

  delete: Handler = async (request, response, next) => {
    try {
      const { id } = GetMatriculationByIdRequestSchema.parse(request.params)

      await this.matriculationUseCase.delete(id)

      response.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
