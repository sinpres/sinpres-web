import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import sanitizeHtml from 'sanitize-html'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const GITHUB_README_URL = 'https://raw.githubusercontent.com/tree-ia/sinpres-api/main/README.md'
const LOCAL_README_PATH = resolve(process.cwd(), '../sinpres-api/README.md')

interface TocItem {
  title: string
  url: string
  depth: number
}

async function getReadmeMarkdown(): Promise<string> {
  try {
    const res = await fetch(GITHUB_README_URL, { next: { revalidate: 3600 } })
    if (res.ok) return res.text()
  } catch {}

  try {
    return await readFile(LOCAL_README_PATH, 'utf-8')
  } catch {}

  return '# Documentacao indisponivel\n\nNao foi possivel carregar o README do sinpres-api.'
}

function sanitize(rawHtml: string): string {
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'del', 'input',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height'],
      a: ['href', 'target', 'rel'],
      code: ['class'],
      pre: ['class'],
      h1: ['id'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
    },
  })
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const lines = markdown.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/)
    if (match) {
      const depth = match[1].length
      const title = match[2].trim()
      const slug = slugify(title)
      items.push({ title, url: `#${slug}`, depth })
    }
  }

  return items
}

function addIdsToHeadings(html: string): string {
  return html.replace(
    /<(h[2-4])>([^<]+)<\/\1>/g,
    (_, tag, text) => {
      const id = slugify(text)
      return `<${tag} id="${id}">${text}</${tag}>`
    }
  )
}

export async function getReadmeData(): Promise<{ html: string; toc: TocItem[] }> {
  const markdown = await getReadmeMarkdown()
  const toc = extractToc(markdown)
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown)
  // Content is sanitized to prevent XSS — only allowlisted tags/attributes pass through
  const sanitized = sanitize(result.toString())
  const html = addIdsToHeadings(sanitized)
  return { html, toc }
}
