import { prisma } from '../../databases/prisma'
import type {
  CreateTrackAttributes,
  FindTrackByIdResponse,
  FindTracksParams,
  ITrackRepository,
  Track,
  TrackWhereInputs,
  UpdateTrackAttributes,
} from '../ITrackRepository.interface'

export class PrismaTrackRepository implements ITrackRepository {
  find = async (params: FindTracksParams): Promise<Track[]> => {
    return prisma.track.findMany({
      where: params.where,
      skip: params.skip,
      take: params.take,
      orderBy: {
        [params.sortBy ?? 'name']: params.order,
      },
    })
  }

  findById = async (id: number): Promise<FindTrackByIdResponse | null> => {
    return prisma.track.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        coverUrl: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        modules: {
          select: {
            id: true,
            name: true,
            coverUrl: true,
          },
        },
      },
    })
  }

  findBySlug = async (slug: string): Promise<Track | null> => {
    return prisma.track.findUnique({
      where: {
        slug: slug,
      },
    })
  }

  create = async (attributes: CreateTrackAttributes): Promise<Track> => {
    return prisma.track.create({
      data: attributes,
    })
  }

  update = async (
    id: number,
    attributes: UpdateTrackAttributes
  ): Promise<Track> => {
    return prisma.track.update({
      where: {
        id: id,
      },
      data: attributes,
    })
  }

  delete = async (id: number): Promise<void> => {
    prisma.track.delete({
      where: {
        id: id,
      },
    })
  }

  count = async (where: TrackWhereInputs): Promise<number> => {
    return prisma.track.count({
      where: where,
    })
  }
}
