import type {
  ITrackRepository,
  Track,
  TrackStatus,
  TrackWhereInputs,
} from '@/repositories/track-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  page?: number
  perPage?: number
  name?: string
  status?: TrackStatus
  sortBy?: 'name' | 'status' | 'createdAt'
  order?: 'asc' | 'desc'
}

interface IResponse {
  tracks: Track[]
  meta: {
    total: number
    totalPages: number
    page: number
    perPage: number
  }
}

export class FindAllTrackService implements IService<IRequest, IResponse> {
  constructor(private readonly trackRepository: ITrackRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const {
      name,
      status,
      page = 1,
      perPage = 10,
      sortBy = 'name',
      order = 'asc',
    } = params

    const where: TrackWhereInputs = {}

    if (name) {
      where.name = {
        contains: name,
      }
    }

    if (status) {
      where.status = status
    }

    const tracks = await this.trackRepository.find({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      sortBy: sortBy,
      order: order,
    })

    const total = await this.trackRepository.count(where)
    const totalPages = Math.ceil(total / perPage)

    return {
      tracks,
      meta: {
        total,
        totalPages,
        page,
        perPage,
      },
    }
  }
}
