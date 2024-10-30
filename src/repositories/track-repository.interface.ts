export type TrackStatus = 'ACTIVE' | 'ARCHIVED' | 'DRAFT'

export interface Track {
  id: number
  name: string
  description: string
  slug: string
  coverUrl: string
  status: TrackStatus
  createdAt: Date
  updatedAt: Date
}

export interface TrackWhereInputs {
  name?: {
    contains?: string
  }
  status?: TrackStatus
}

export interface FindTracksParams {
  where?: TrackWhereInputs
  sortBy?: 'name' | 'status' | 'createdAt'
  order?: 'asc' | 'desc'
  skip?: number
  take?: number
}

export interface CreateTrackAttributes {
  name: string
  description: string
  slug: string
  coverUrl: string
  moduleIds: number[]
}

export interface UpdateTrackAttributes {
  name?: string
  slug?: string
  description?: string
  coverUrl?: string
  status?: TrackStatus
  moduleIds?: number[]
}

export type FindTrackByIdResponse = Track & {
  modules: {
    id: number
    name: string
    coverUrl: string
  }[]
}

export interface ITrackRepository {
  find(params: FindTracksParams): Promise<Track[]>
  findById(id: number): Promise<FindTrackByIdResponse | null>
  findBySlug(slug: string): Promise<Track | null>
  create(attributes: CreateTrackAttributes): Promise<Track>
  update(id: number, attributes: UpdateTrackAttributes): Promise<Track>
  delete(id: number): Promise<void>
  removeModuleFromTrack(trackId: number, moduleId: number): Promise<void>
  count(where: TrackWhereInputs): Promise<number>
}
