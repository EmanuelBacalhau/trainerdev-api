import { HttpError } from '@/errors/HttpError'
import type { IMatriculationRepository } from '@/repositories/IMatriculationRepository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

export class DeleteMatriculationService implements IService<IRequest, void> {
  constructor(
    private readonly matriculationRepository: IMatriculationRepository
  ) {}

  async execute(params: IRequest): Promise<void> {
    const matriculation = await this.matriculationRepository.findById(params.id)

    if (!matriculation) {
      throw new HttpError('Matriculation not found', 404)
    }

    await this.matriculationRepository.delete(params.id)
  }
}
