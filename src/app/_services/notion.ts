import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

export async function getPage() {
  const pageId = '3854e4711c2b42d3be88d1934276a93e'
  const response: any = await notion.pages.retrieve({ page_id: pageId })
  const title = response.properties?.title?.title[0].text?.content
  const mdblocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdblocks)
  console.log(mdString.parent)

  return mdString.parent
}
