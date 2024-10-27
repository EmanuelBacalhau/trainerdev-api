import { prisma } from '../../databases/prisma'
import type {
  CreateMatriculationAttributes,
  FindMatriculationResponse,
  FindMatriculationsParams,
  IMatriculationRepository,
  Matriculation,
  MatriculationWhereInputs,
  UpdateMatriculationAttributes,
} from '../IMatriculationRepository.interface'

export class PrismaMatriculationRepository implements IMatriculationRepository {
  find = async (
    params: FindMatriculationsParams
  ): Promise<FindMatriculationResponse[]> => {
    const matriculations = await prisma.matriculation.findMany({
      where: {
        userId: params.where?.userId,
        trackId: params.where?.trackId,
        serialCode: {
          contains: params.where?.serialCode?.contains,
          mode: params.where?.serialCode?.mode,
        },
      },
      orderBy: {
        createdAt: params.order,
      },
      skip: params.skip,
      take: params.take,
      select: {
        id: true,
        serialCode: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        track: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return matriculations
  }

  findById = (id: number): Promise<Matriculation | null> => {
    return prisma.matriculation.findUnique({
      where: {
        id,
      },
    })
  }

  findByUserId = async (userId: number): Promise<Matriculation | null> => {
    return prisma.matriculation.findFirst({
      where: {
        userId,
      },
    })
  }

  create = async (
    attributes: CreateMatriculationAttributes
  ): Promise<Matriculation> => {
    return prisma.matriculation.create({
      data: {
        userId: attributes.userId,
        trackId: attributes.trackId,
        serialCode: attributes.serialCode,
      },
    })
  }

  update = async (
    id: number,
    attributes: UpdateMatriculationAttributes
  ): Promise<Matriculation> => {
    return prisma.matriculation.update({
      where: {
        id,
      },
      data: {
        trackId: attributes.trackId,
      },
    })
  }

  delete = async (id: number): Promise<void> => {
    await prisma.matriculation.delete({
      where: {
        id,
      },
    })
  }

  count = async (where: MatriculationWhereInputs): Promise<number> => {
    return prisma.matriculation.count({
      where,
    })
  }
}
