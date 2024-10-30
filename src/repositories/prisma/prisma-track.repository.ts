import { prisma } from '../../databases/prisma'
import type {
  CreateTrackAttributes,
  FindTrackByIdResponse,
  FindTracksParams,
  ITrackRepository,
  Track,
  TrackWhereInputs,
  UpdateTrackAttributes,
} from '../track-repository.interface'

export class PrismaTrackRepository implements ITrackRepository {
  find = async (params: FindTracksParams): Promise<Track[]> => {
    return await prisma.track.findMany({
      where: {
        name: {
          contains: params.where?.name?.contains,
          mode: 'insensitive',
        },
        status: params.where?.status,
      },
      skip: params.skip,
      take: params.take,
      orderBy: {
        [params.sortBy ?? 'name']: params.order,
      },
    })
  }

  findById = async (id: number): Promise<FindTrackByIdResponse | null> => {
    return await prisma.track.findUnique({
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
    return await prisma.track.findUnique({
      where: {
        slug: slug,
      },
    })
  }

  create = async (attributes: CreateTrackAttributes): Promise<Track> => {
    return await prisma.track.create({
      data: {
        name: attributes.name,
        description: attributes.description,
        coverUrl: attributes.coverUrl,
        slug: attributes.slug,
        modules: {
          connect: attributes.moduleIds.map(id => ({ id: id })),
        },
      },
    })
  }

  update = async (
    id: number,
    attributes: UpdateTrackAttributes
  ): Promise<Track> => {
    return await prisma.track.update({
      where: {
        id: id,
      },
      data: {
        name: attributes.name,
        description: attributes.description,
        coverUrl: attributes.coverUrl,
        slug: attributes.slug,
        status: attributes.status,
        modules: {
          connect: attributes.moduleIds?.map(id => ({ id: id })),
        },
      },
    })
  }

  delete = async (id: number): Promise<void> => {
    await prisma.track.delete({
      where: {
        id: id,
      },
    })
  }

  removeModuleFromTrack = async (
    trackId: number,
    moduleId: number
  ): Promise<void> => {
    await prisma.track.update({
      where: {
        id: trackId,
      },
      data: {
        modules: {
          disconnect: {
            id: moduleId,
          },
        },
      },
    })
  }

  count = async (where: TrackWhereInputs): Promise<number> => {
    return await prisma.track.count({
      where: where,
    })
  }
}
