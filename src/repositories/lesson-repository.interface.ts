export interface Lesson {
  id: number
  name: string
  slug: string
  order: number
  description: string
  videoUrl: string
  moduleId: number
}

export interface LessonWhereInputs {
  name?: {
    contains?: string
  }
  moduleId?: number
}

export interface FindLessonsParams {
  where?: LessonWhereInputs
  sortBy?: 'name' | 'order' | 'createdAt'
  order?: 'asc' | 'desc'
  skip?: number
  take?: number
}

export type CreateLessonAttributes = Omit<Lesson, 'id'>
export type UpdateLessonAttributes = Partial<CreateLessonAttributes>

export interface ILessonRepository {
  find: (params: FindLessonsParams) => Promise<Lesson[]>
  findById: (id: number) => Promise<Lesson | null>
  findBySlug: (slug: string) => Promise<Lesson | null>
  create: (attributes: CreateLessonAttributes) => Promise<Lesson>
  update: (id: number, attributes: UpdateLessonAttributes) => Promise<Lesson>
  delete: (id: number) => Promise<void>
  count: (where: LessonWhereInputs) => Promise<number>
}
