import type { TrackStatus } from '@prisma/client'
import { HttpError } from '../errors/HttpError'
import type {
  ITrackRepository,
  Track,
  TrackWhereInputs,
} from '../repositories/ITrackRepository.interface'
import { removeFile } from '../utils/remove-file'

interface GetTracksWithPaginated {
  page?: number
  perPage?: number
  name?: string
  status?: TrackStatus
  sortBy?: 'name' | 'status' | 'createdAt'
  order?: 'asc' | 'desc'
}

interface CreateTrackAttributes {
  name: string
  description: string
  coverUrl: string
}

interface UpdateTrackAttributes {
  name?: string
  description?: string
  coverUrl?: string
  status?: TrackStatus
}

interface FindResponse {
  tracks: Track[]
  meta: {
    total: number
    totalPages: number
    page: number
    perPage: number
  }
}

export class TrackUseCase {
  constructor(private readonly trackRepository: ITrackRepository) {}

  index = async (params: GetTracksWithPaginated): Promise<FindResponse> => {
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
        mode: 'insensitive',
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

  findById = async (id: number): Promise<Track> => {
    const track = await this.trackRepository.findById(id)

    if (!track) {
      throw new HttpError('Track not found', 404)
    }

    return track
  }

  findBySlug = async (slug: string): Promise<Track> => {
    const track = await this.trackRepository.findBySlug(slug)

    if (!track) {
      throw new HttpError('Track not found', 404)
    }

    return track
  }

  create = async (attributes: CreateTrackAttributes): Promise<Track> => {
    const slug = attributes.name.toLowerCase().replace(' ', '-')

    const isTrackExist = await this.trackRepository.findBySlug(slug)

    if (isTrackExist) {
      throw new HttpError('Track already exist', 400)
    }

    return this.trackRepository.create({
      ...attributes,
      slug,
    })
  }

  update = async (
    id: number,
    attributes: UpdateTrackAttributes
  ): Promise<Track> => {
    const track = await this.trackRepository.findById(id)

    if (!track) {
      throw new HttpError('Track not found', 404)
    }

    if (attributes.name) {
      const slug = attributes.name.toLowerCase().replace(' ', '-')
      const isTrackExist = await this.trackRepository.findBySlug(slug)

      if (isTrackExist) {
        throw new HttpError('Track already exist', 400)
      }
    }

    const slug = attributes.name?.toLowerCase().replace(' ', '-')

    if (attributes.coverUrl) {
      removeFile('tracks', track.coverUrl)
    }

    const updatedTrack = await this.trackRepository.update(id, {
      ...attributes,
      slug,
    })

    return updatedTrack
  }

  delete = async (id: number): Promise<void> => {
    const isTrackExist = await this.trackRepository.findById(id)

    if (!isTrackExist) {
      throw new HttpError('Track not found', 404)
    }

    removeFile('tracks', isTrackExist.coverUrl)

    await this.trackRepository.delete(id)
  }
}
