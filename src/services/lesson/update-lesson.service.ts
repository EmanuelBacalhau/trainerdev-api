import { HttpError } from '@/errors/HttpError'
import type {
  ILessonRepository,
  Lesson,
  UpdateLessonAttributes,
} from '@/repositories/lesson-repository.interface'
import type { IModuleRepository } from '@/repositories/module-repository.interface'
import { removeFile } from '@/utils/remove-file'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
  attributes: UpdateLessonAttributes
}

interface IResponse {
  lesson: Lesson
}

export class UpdateLessonService implements IService<IRequest, IResponse> {
  constructor(
    private readonly lessonRepository: ILessonRepository,
    private readonly moduleRepository: IModuleRepository
  ) {}

  async execute(params: IRequest): Promise<IResponse> {
    const lesson = await this.lessonRepository.findById(params.id)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    if (params.attributes.moduleId) {
      const module = await this.moduleRepository.findById(
        params?.attributes.moduleId
      )

      if (!module) {
        throw new HttpError('Module not found', 404)
      }
    }

    if (!module) {
      throw new HttpError('Module not found', 404)
    }

    if (params.attributes.name) {
      const slug = params.attributes.name.toLowerCase().replace(' ', '-')
      const lessonWithSlug = await this.lessonRepository.findBySlug(slug)

      if (lessonWithSlug) {
        throw new HttpError('Lesson already exists', 409)
      }
    }

    let slug: string | undefined

    if (params.attributes.name) {
      slug = params.attributes.name.toLowerCase().replace(' ', '-')
    }

    if (params.attributes.videoUrl) {
      removeFile('lessons', lesson.videoUrl)
    }

    return {
      lesson: await this.lessonRepository.update(params.id, {
        ...params.attributes,
        slug,
      }),
    }
  }
}
