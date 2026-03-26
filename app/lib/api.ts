export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export interface Sector {
  id: number
  slug: string
  name: string
  description: string | null
  schemaName: string
  createdAt: string
}

export interface Item {
  id: number
  categoryId: number | null
  code: number
  description: string
  unit: string
  technicalStandards: string | null
  generalInfo: string | null
  imageUrl: string | null
  metadata: unknown
  sourceUpdatedAt: string | null
  createdAt: string
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ItemsResponse {
  data: Item[]
  meta: PaginationMeta
}

export interface SectorsResponse {
  data: Sector[]
}

export interface ItemsParams {
  search?: string
  unit?: string
  page?: number
  limit?: number
}

export async function getSectors(): Promise<Sector[]> {
  const res = await fetch(`${API_URL}/api/v1/sectors`)
  const json: SectorsResponse = await res.json()
  return json.data
}

export async function getItems(sectorSlug: string, params: ItemsParams = {}): Promise<ItemsResponse> {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.unit) query.set('unit', params.unit)
  if (params.page) query.set('page', String(params.page))
  if (params.limit) query.set('limit', String(params.limit))

  const res = await fetch(`${API_URL}/api/v1/sectors/${sectorSlug}/items?${query}`)
  return res.json()
}
