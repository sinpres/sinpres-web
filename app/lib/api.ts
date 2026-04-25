export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sinpres.com.br'

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
  stateCode: string | null
  referenceMonth: string | null
  isDesonerated: boolean | null
  unitPrice: number | null
  technicalStandards: string | null
  generalInfo: string | null
  imageUrl: string | null
  metadata: unknown
  sourceUpdatedAt: string | null
  previousCode: number | null
  createdAt: string
}

export interface CompositionItem {
  itemType: 'INPUT' | 'SUB_COMPOSITION'
  code: number
  description: string
  unit: string
  resourceType: 'MATERIAL' | 'LABOR' | 'EQUIPMENT' | null
  coefficient: string
  unitPrice: number
  totalPrice: number
}

export interface Composition {
  id: number
  code: number
  description: string
  unit: string
  stateCode: string | null
  referenceMonth: string | null
  isDesonerated: boolean | null
  baseUnitCost: number | null
  sourceUpdatedAt: string | null
  previousCode: number | null
  createdAt: string
}

export interface CompositionDetail extends Composition {
  items: CompositionItem[]
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

export interface CompositionsResponse {
  data: Composition[]
  meta: PaginationMeta
}

export interface SectorsResponse {
  data: Sector[]
}

export interface ListParams {
  search?: string
  unit?: string
  state?: string
  month?: string
  is_desonerated?: boolean
  page?: number
  limit?: number
}

export async function getSectors(): Promise<Sector[]> {
  const res = await fetch(`${API_URL}/api/v1/sectors`)
  const json: SectorsResponse = await res.json()
  return json.data
}

function buildQuery(params: ListParams): URLSearchParams {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.unit) query.set('unit', params.unit)
  if (params.state) query.set('state', params.state)
  if (params.month) query.set('month', params.month)
  if (params.is_desonerated !== undefined) query.set('is_desonerated', String(params.is_desonerated))
  if (params.page) query.set('page', String(params.page))
  if (params.limit) query.set('limit', String(params.limit))
  return query
}

export async function getItems(sectorSlug: string, params: ListParams = {}): Promise<ItemsResponse> {
  const query = buildQuery(params)
  const res = await fetch(`${API_URL}/api/v1/sectors/${sectorSlug}/items?${query}`)
  return res.json()
}

export async function getCompositions(sectorSlug: string, params: ListParams = {}): Promise<CompositionsResponse> {
  const query = buildQuery(params)
  const res = await fetch(`${API_URL}/api/v1/sectors/${sectorSlug}/compositions?${query}`)
  return res.json()
}

export async function getCompositionByCode(
  sectorSlug: string,
  code: number,
  params: { state?: string; month?: string; is_desonerated?: boolean } = {}
): Promise<{ data: CompositionDetail }> {
  const query = new URLSearchParams()
  if (params.state) query.set('state', params.state)
  if (params.month) query.set('month', params.month)
  if (params.is_desonerated !== undefined) query.set('is_desonerated', String(params.is_desonerated))
  const res = await fetch(`${API_URL}/api/v1/sectors/${sectorSlug}/compositions/${code}?${query}`)
  return res.json()
}

export async function getStates(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/v1/sinapi/states`)
  const json: { data: string[] } = await res.json()
  return json.data
}

export function formatPrice(cents: number | null | undefined): string {
  if (cents === null || cents === undefined) return '—'
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
