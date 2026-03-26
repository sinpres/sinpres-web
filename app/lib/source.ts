import { loader } from 'fumadocs-core/source'
import { openapiSource, openapiPlugin } from 'fumadocs-openapi/server'
import { openapi } from './openapi'

export const source = loader(
  await openapiSource(openapi, { per: 'tag' }),
  {
    baseUrl: '/docs',
    plugins: [openapiPlugin()],
  },
)
