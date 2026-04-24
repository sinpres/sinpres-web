import { createOpenAPI } from 'fumadocs-openapi/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sinpres.com.br'

export const openapi = createOpenAPI({
  input: [`${API_URL}/doc`],
  proxyUrl: '/api/proxy',
})
