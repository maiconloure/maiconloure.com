import Markdown from 'react-markdown'
import { getPage } from '../_services/notion'

export default async function About() {
  const aboutPage = await getPage()

  return (
    <main className="flex flex-col items-center justify-between p-10 pt-24 mx-[22%] z-50">
      <Markdown
        components={{
          h2: ({ node, ...props }) => (
            <h2 className=" text-xl font-bold" {...props} />
          ),
        }}
      >
        {aboutPage}
      </Markdown>
    </main>
  )
}
