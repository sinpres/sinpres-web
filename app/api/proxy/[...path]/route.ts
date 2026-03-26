import { openapi } from '@/app/lib/openapi'

export const { GET, POST, PUT, DELETE, PATCH, HEAD } = openapi.createProxy({
  allowedOrigins: ['*'],
})
