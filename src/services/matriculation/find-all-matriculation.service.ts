import type {
  FindMatriculationResponse,
  IMatriculationRepository,
  MatriculationWhereInputs,
} from '@/repositories/matriculation-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  userId?: number
  trackId?: number
  serialCode?: string
  order?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

interface IResponse {
  matriculations: FindMatriculationResponse[]
  meta: {
    total: number
    totalPage: number
    page: number
    perPage: number
  }
}

export class FindAllMatriculationService
  implements IService<IRequest, IResponse>
{
  constructor(
    private readonly matriculationRepository: IMatriculationRepository
  ) {}

  async execute(params: IRequest): Promise<IResponse> {
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
}
