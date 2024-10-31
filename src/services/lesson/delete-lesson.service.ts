import { HttpError } from '@/errors/HttpError'
import type { ILessonRepository } from '@/repositories/lesson-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

export class DeleteLessonService implements IService<IRequest, void> {
  constructor(private readonly lessonRepository: ILessonRepository) {}

  async execute(params: IRequest): Promise<void> {
    const lesson = await this.lessonRepository.findById(params.id)

    if (!lesson) {
      throw new HttpError('Lesson not found', 404)
    }

    await this.lessonRepository.delete(params.id)
  }
}
