export type MatriculationStatus = 'ACTIVE' | 'INACTIVE'

export interface MatriculationWhereInputs {
  userId?: number
  trackId?: number
  serialCode?: {
    contains?: string
    mode?: 'insensitive' | 'default'
  }
}

export interface FindMatriculationsParams {
  where?: MatriculationWhereInputs
  order?: 'asc' | 'desc'
  skip?: number
  take?: number
}

export interface Matriculation {
  id: number
  userId: number
  trackId: number
  serialCode: string
  status: MatriculationStatus
  createdAt: Date
  updatedAt: Date
}

export interface CreateMatriculationAttributes {
  userId: number
  trackId: number
  serialCode: string
}

export interface UpdateMatriculationAttributes {
  userId?: number
  trackId?: number
  status?: MatriculationStatus
}

export type FindMatriculationResponse = {
  id: number
  status: MatriculationStatus
  serialCode: string
  track: {
    id: number
    name: string
  }
  user: {
    id: number
    name: string
    avatar: string | null
  }
}

export interface IMatriculationRepository {
  find(params: FindMatriculationsParams): Promise<FindMatriculationResponse[]>
  findById(id: number): Promise<Matriculation | null>
  findByUserId(userId: number): Promise<Matriculation | null>
  create(attributes: CreateMatriculationAttributes): Promise<Matriculation>
  update(
    id: number,
    attributes: UpdateMatriculationAttributes
  ): Promise<Matriculation>
  delete(id: number): Promise<void>
  count(where: MatriculationWhereInputs): Promise<number>
}
