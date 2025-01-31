import { HttpError } from '@/errors/HttpError'
import type {
  CreateLessonAttributes,
  ILessonRepository,
  Lesson,
} from '@/repositories/lesson-repository.interface'
import type { IModuleRepository } from '@/repositories/module-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  attributes: Omit<CreateLessonAttributes, 'slug'>
}

interface IResponse {
  lesson: Lesson
}

export class CreateLessonService implements IService<IRequest, IResponse> {
  constructor(
    private readonly lessonRepository: ILessonRepository,
    private readonly moduleRepository: IModuleRepository
  ) {}

  async execute({ attributes }: IRequest): Promise<IResponse> {
    const module = await this.moduleRepository.findById(attributes.moduleId)

    if (!module) {
      throw new HttpError('Module not found', 404)
    }

    const slug = attributes.name.toLowerCase().replace(' ', '-')
    const lessonWithSlug = await this.lessonRepository.findBySlug(slug)

    if (lessonWithSlug) {
      throw new HttpError('Lesson already exists', 409)
    }

    const lesson = await this.lessonRepository.create({
      ...attributes,
      slug,
    })

    return { lesson }
  }
}
