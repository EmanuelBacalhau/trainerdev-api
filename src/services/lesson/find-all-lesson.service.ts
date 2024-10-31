import type {
  ILessonRepository,
  Lesson,
  LessonWhereInputs,
} from '@/repositories/lesson-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  page?: number
  perPage?: number
  name?: string
  moduleId?: number
  sortBy?: 'name' | 'createdAt' | 'order'
  order?: 'asc' | 'desc'
}

interface IResponse {
  lessons: Lesson[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

export class FindAllLessonService implements IService<IRequest, IResponse> {
  constructor(private readonly lessonRepository: ILessonRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const {
      name,
      moduleId,
      page = 1,
      perPage = 10,
      sortBy = 'name',
      order = 'asc',
    } = params

    const where: LessonWhereInputs = {}

    if (name) {
      where.name = {
        contains: name,
      }
    }

    if (moduleId) {
      where.moduleId = moduleId
    }

    const lessons = await this.lessonRepository.find({
      where,
      order,
      skip: (page - 1) * perPage,
      take: perPage,
      sortBy,
    })

    const total = await this.lessonRepository.count(where)
    const totalPages = Math.ceil(total / perPage)

    return {
      lessons,
      meta: {
        total,
        page,
        perPage,
        totalPages,
      },
    }
  }
}
