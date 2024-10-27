import dayjs from 'dayjs'
import { HttpError } from '../errors/HttpError'
import type {
  FindMatriculationResponse,
  IMatriculationRepository,
  Matriculation,
  MatriculationStatus,
  MatriculationWhereInputs,
  UpdateMatriculationAttributes,
} from '../repositories/IMatriculationRepository.interface'
import type { ITrackRepository } from '../repositories/ITrackRepository.interface'
import type { IUserRepository } from '../repositories/IUserRepository.interface'

interface FindResponse {
  matriculations: FindMatriculationResponse[]
  meta: {
    total: number
    totalPage: number
    page: number
    perPage: number
  }
}

interface GetMatriculationsParams {
  userId?: number
  trackId?: number
  serialCode?: string
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

type CreateMatriculationUseCase = {
  userId: number
  trackId: number
}

export class MatriculationUseCase {
  constructor(
    private readonly matriculationRepository: IMatriculationRepository,
    private readonly trackRepository: ITrackRepository,
    private readonly userRepository: IUserRepository
  ) {}

  index = async (params: GetMatriculationsParams): Promise<FindResponse> => {
    const {
      userId,
      trackId,
      serialCode,
      order = 'asc',
      page = 1,
      perPage = 10,
    } = params

    const where: MatriculationWhereInputs = {}

    if (userId) where.userId = userId
    if (trackId) where.trackId = trackId
    if (serialCode) {
      where.serialCode = { contains: serialCode, mode: 'insensitive' }
    }

    const matriculations = await this.matriculationRepository.find({
      where,
      order,
      skip: (page - 1) * perPage,
      take: perPage,
    })

    const total = await this.matriculationRepository.count(where)
    const totalPage = Math.ceil(total / perPage)

    return {
      matriculations,
      meta: { total, totalPage, page, perPage },
    }
  }

  create = async (
    attributes: CreateMatriculationUseCase
  ): Promise<Matriculation> => {
    const isUserExists = await this.userRepository.findById(attributes.userId)

    if (!isUserExists) {
      throw new HttpError('User not found', 404)
    }

    const isTrackExists = await this.trackRepository.findById(
      attributes.trackId
    )

    if (!isTrackExists) {
      throw new HttpError('Track not found', 404)
    }

    const isMatriculationExists =
      await this.matriculationRepository.findByUserId(attributes.userId)

    if (isMatriculationExists) {
      throw new HttpError('User already matriculated', 409)
    }

    const prefix = dayjs().format('YYMM')
    const randomSerial = Math.random()
      .toString(36)
      .substring(2, 8)
      .toLocaleUpperCase()
    const serialCode = `${prefix}${randomSerial}`

    const matriculation = await this.matriculationRepository.create({
      ...attributes,
      serialCode,
    })

    return matriculation
  }

  update = async (
    id: number,
    attributes: UpdateMatriculationAttributes
  ): Promise<Matriculation> => {
    const matriculation = await this.matriculationRepository.findById(id)

    if (!matriculation) {
      throw new HttpError('Matriculation not found', 404)
    }

    if (attributes.userId) {
      const isUserExists = await this.userRepository.findById(attributes.userId)

      if (!isUserExists) {
        throw new HttpError('User not found', 404)
      }
    }

    if (attributes.trackId) {
      const isTrackExists = await this.trackRepository.findById(
        attributes.trackId
      )

      if (!isTrackExists) {
        throw new HttpError('Track not found', 404)
      }
    }

    const matriculationUpdated = await this.matriculationRepository.update(id, {
      ...attributes,
    })

    return matriculationUpdated
  }

  delete = async (id: number) => {
    const matriculation = await this.matriculationRepository.findById(id)

    if (!matriculation) {
      throw new HttpError('Matriculation not found', 404)
    }

    await this.matriculationRepository.delete(id)
  }
}
