import { HttpError } from '../errors/HttpError'
import type {
  CreateLessonAttributes,
  ILessonRepository,
  Lesson,
  LessonWhereInputs,
} from '../repositories/ILessonRepository.interface'
import { removeFile } from '../utils/remove-file'

interface FindResponse {
  lessons: Lesson[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

interface GetLessonParams {
  page?: number
  perPage?: number
  name?: string
  moduleId?: number
  sortBy?: 'name' | 'createdAt' | 'order'
  order?: 'asc' | 'desc'
}

type CreateLessonUseCase = Omit<CreateLessonAttributes, 'slug'>
type UpdateLessonUseCase = Partial<CreateLessonUseCase>

export class LessonUseCase {
  constructor(private readonly lessonRepository: ILessonRepository) {}

  index = async (params: GetLessonParams): Promise<FindResponse> => {
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
        mode: 'insensitive',
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

  findById = async (id: number): Promise<Lesson> => {
    const lesson = await this.lessonRepository.findById(id)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    return lesson
  }

  findBySlug = async (slug: string): Promise<Lesson> => {
    const lesson = await this.lessonRepository.findBySlug(slug)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    return lesson
  }

  create = async (attributes: CreateLessonUseCase): Promise<Lesson> => {
    const slug = attributes.name.toLowerCase().replace(' ', '-')
    const lessonWithSlug = await this.lessonRepository.findBySlug(slug)

    if (lessonWithSlug) {
      throw new HttpError('Lesson already exists', 409)
    }

    const lesson = await this.lessonRepository.create({
      ...attributes,
      slug,
    })

    return lesson
  }

  update = async (
    id: number,
    attributes: UpdateLessonUseCase
  ): Promise<Lesson> => {
    const lesson = await this.lessonRepository.findById(id)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    if (attributes.name) {
      const slug = attributes.name.toLowerCase().replace(' ', '-')
      const lessonWithSlug = await this.lessonRepository.findBySlug(slug)

      if (lessonWithSlug) {
        throw new HttpError('Lesson already exists', 409)
      }
    }

    let slug: string | undefined

    if (attributes.name) {
      slug = attributes.name.toLowerCase().replace(' ', '-')
    }

    if (attributes.videoUrl) {
      removeFile('lessons', lesson.videoUrl)
    }

    return await this.lessonRepository.update(id, {
      ...attributes,
      slug,
    })
  }

  delete = async (id: number): Promise<void> => {
    const lesson = await this.lessonRepository.findById(id)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    removeFile('lessons', lesson.videoUrl)

    await this.lessonRepository.delete(id)
  }
}
