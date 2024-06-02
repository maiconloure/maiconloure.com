import Markdown from 'react-markdown'
import { getAboutPage } from '../_services/notion'
import Image from 'next/image'
import {
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoJava,
  BiLogoJavascript,
  BiLogoPhp,
  BiLogoPython,
} from 'react-icons/bi'

export default async function About() {
  const { title, content } = await getAboutPage()

  return (
    <main className="flex flex-col items-center justify-between p-8 lg:pt-10 lg:mx-[12%] z-50">
      <article className="flex flex-col lg:flex-row gap-10 bg-zinc-50 dark:bg-zinc-950 py-8 px-20 bg-opacity-90 rounded-md shadow-xl">
        <div className="flex flex-col min-w-[180px]">
          <Image
            className="rounded-full border-solid border-2 border-zinc-600 w-20 h-20 lg:w-40 lg:h-40"
            src="/portrait.png"
            width={200}
            height={220}
            alt="profile image"
          />
          <h1 className="text-xl font-bold  mt-2">Maicon Lourenço</h1>
          <h2 className="text-base font-semibold text-zinc-400">
            Full Stack Developer
          </h2>
          <h3 className="text-sm font-semibold text-zinc-500">
            4 years of experience
          </h3>
          <p className="text-sm font-bold mt-2">STACK:</p>
          <p className="flex">
            <BiLogoHtml5 size="2em" title="HTML5" />
            <BiLogoCss3 size="2em" title="CSS3" />
            <BiLogoJavascript size="2em" title="JavaScript" />
            <BiLogoPhp size="2em" title="PHP" />
            <BiLogoPython size="2em" title="Python" />
            <BiLogoJava size="2em" title="JAVA" />
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <Markdown
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="my-4 font-inter text-zinc-700 dark:text-zinc-500 hover:text-black dark:hover:text-white"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong
                  className="text-zinc-700 dark:text-zinc-400"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="my-4 font-inter text-zinc-700 dark:text-zinc-500 hover:text-black dark:hover:text-white"
                  {...props}
                />
              ),
            }}
          >
            {content}
          </Markdown>
        </div>
      </article>
    </main>
  )
}
