import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g
const INLINE_STYLE = /<style(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/style>/g

function hashOf(content) {
  return `'sha256-${createHash('sha256').update(content, 'utf-8').digest('base64')}'`
}

function collectHtmlFiles(root) {
  const files = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) files.push(full)
    }
  }
  walk(root)
  return files
}

// Astro's client-hydration runtime (astro-island custom element + the
// per-page framework bootstrap) is injected as inline <script>/<style>
// tags rather than external files, so a strict CSP with no
// 'unsafe-inline' would silently block it. Rather than loosen the
// policy, hash the exact inline content emitted by this build and
// allowlist those hashes in the deployed _headers file.
export default function cspHashes() {
  return {
    name: 'csp-hashes',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir)
        const scriptHashes = new Set()
        const styleHashes = new Set()

        for (const file of collectHtmlFiles(root)) {
          const html = readFileSync(file, 'utf-8')
          for (const match of html.matchAll(INLINE_SCRIPT)) {
            if (match[1].trim()) scriptHashes.add(hashOf(match[1]))
          }
          for (const match of html.matchAll(INLINE_STYLE)) {
            if (match[1].trim()) styleHashes.add(hashOf(match[1]))
          }
        }

        if (scriptHashes.size === 0 && styleHashes.size === 0) return

        const headersPath = path.join(root, '_headers')
        let headers = readFileSync(headersPath, 'utf-8')
        headers = headers.replace(
          /script-src 'self'/,
          `script-src 'self' ${[...scriptHashes].join(' ')}`,
        )
        headers = headers.replace(
          /style-src 'self'/,
          `style-src 'self' ${[...styleHashes].join(' ')}`,
        )
        writeFileSync(headersPath, headers)
      },
    },
  }
}
