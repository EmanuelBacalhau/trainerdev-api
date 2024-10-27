import { PrismaClient } from '@prisma/client'
import { prisma } from '../../databases/prisma'
import type {
  CreateLessonAttributes,
  FindLessonsParams,
  ILessonRepository,
  Lesson,
  LessonWhereInputs,
  UpdateLessonAttributes,
} from '../ILessonRepository.interface'

export class PrismaLessonRepository implements ILessonRepository {
  find = async (params: FindLessonsParams): Promise<Lesson[]> => {
    return await prisma.lesson.findMany({
      where: params.where,
      orderBy: {
        [params.sortBy ?? 'name']: params.order,
      },
      skip: params.skip,
      take: params.take,
    })
  }

  findById = async (id: number): Promise<Lesson | null> => {
    return await prisma.lesson.findUnique({
      where: { id },
    })
  }

  findBySlug = async (slug: string): Promise<Lesson | null> => {
    return await prisma.lesson.findUnique({
      where: { slug },
    })
  }

  create = async (attributes: CreateLessonAttributes): Promise<Lesson> => {
    return await prisma.lesson.create({
      data: attributes,
    })
  }

  update = async (
    id: number,
    attributes: UpdateLessonAttributes
  ): Promise<Lesson> => {
    return await prisma.lesson.update({
      where: { id },
      data: attributes,
    })
  }

  delete = async (id: number): Promise<void> => {
    await await prisma.lesson.delete({
      where: { id },
    })
  }

  count = async (where: LessonWhereInputs): Promise<number> => {
    return await prisma.lesson.count({
      where,
    })
  }
}
