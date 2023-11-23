import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

export async function getAboutPage() {
  const pageId = process.env.NOTION_ABOUT_PAGE_ID || ''
  const response: any = await notion.pages.retrieve({ page_id: pageId })
  const title = response.properties?.title?.title[0].text?.content
  const mdblocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdblocks)

  return { title, content: mdString.parent }
}

// export async function getBlogPosts() {}
