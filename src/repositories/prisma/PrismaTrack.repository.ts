import { prisma } from '../../databases/prisma'
import type {
  CreateTrackAttributes,
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

  findById = async (id: number): Promise<Track | null> => {
    return prisma.track.findUnique({
      where: {
        id: id,
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
