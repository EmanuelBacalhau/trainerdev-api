import { HttpError } from '@/errors/HttpError'
import type {
  ILessonRepository,
  Lesson,
} from '@/repositories/lesson-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

interface IResponse {
  lesson: Lesson
}

export class FindLessonByIdService implements IService<IRequest, IResponse> {
  constructor(private readonly lessonRepository: ILessonRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const lesson = await this.lessonRepository.findById(params.id)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    return { lesson }
  }
}
