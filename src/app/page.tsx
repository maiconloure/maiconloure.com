import Link from 'next/link'
import { BsGithub, BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-between p-14 lg:pt-22 lg:mx-[16%] lg:my-10 z-50 bg-zinc-100 dark:bg-zinc-900 shadow-lg rounded-md">
      <div className="w-full">
        <h1 className="text-5xl text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white font-[800]">
          Maicon Lourenço
        </h1>
        <h2 className="text-2xl text-zinc-500 font-semibold">
          Full Stack Developer
        </h2>
        <br />
      </div>
      <article className="w-full font-light text-lg">
        <div className="text-zinc-600 dark:text-zinc-300">
          <p className="hover:text-black dark:hover:text-white">
            I'm a software developer based in Brazil with 4 year of experience
            in web development.
          </p>
          <p className="hover:text-black dark:hover:text-white">
            Working at{' '}
            <a
              className="text-black dark:text-zinc-100"
              href="https://webhelp.com/"
              target="_blank"
              rel="noopener"
            >
              <b className="font-bold">Webhelp</b>
            </a>
          </p>
          <p>
            I'm eternally curious about how everything works and how to solve
            the most challenging problems created by humans.
          </p>
          <br />
          <p className="hover:text-black dark:hover:text-white">
            Currently I'm working mainly with web technologies, internal
            systems, and artificial intelligence mechanisms, with the following
            stacks:{' '}
            <b className="font-bold">
              PHP, Javascript, NodeJS, Python and Java
            </b>
          </p>
          <p className="hover:text-black dark:hover:text-white">
            I have experience with these technologies:{' '}
            <b className="font-bold">
              Git, HTML5, CSS3, Laravel, TypeScript, NestJS, ReactJS, NextJS,
              Flask, Django, MySQL, PostgreSQL, Redis, RabbitMQ, Docker.
            </b>
          </p>
          <br />
          <p className="hover:text-black dark:hover:text-white">
            Outside of programming, I like to build computers and game servers,
            do some automation, and build robots. I also have a great admiration
            for the nature and especially the marine life, and I like to do some
            deep diving.
          </p>
          <p className="hover:text-black dark:hover:text-white">
            Ah, I also love music, my favorites styles are: Rock, Pop,
            Electronic, Classic and Post-punk.
          </p>

          <p className="mt-1 hover:text-black dark:hover:text-white">
            Check more about me{' '}
            <Link href="/about">
              <u className="font-bold">here.</u>
            </Link>
          </p>
          <br />
          <p>
            <b className="font-bold">Find me on</b>
          </p>
          <p className="flex gap-4 font-bold text-black dark:text-white flex-wrap mt-2">
            <span className="flex items-center gap-1 hover:underline hover:text-indigo-500 cursor-pointer">
              <MdEmail /> maiconloure@gmail.com
            </span>
            <a
              className="flex items-center gap-1 hover:underline hover:text-indigo-500"
              href="https://github.com/maiconloure"
              target="_blank"
              rel="noopener"
            >
              <BsGithub />
              GitHub
            </a>
            <a
              className="flex items-center gap-1 hover:underline hover:text-indigo-500"
              href="https://www.linkedin.com/in/maiconlourenco/"
              target="_blank"
              rel="noopener"
            >
              <BsLinkedin />
              LinkedIn
            </a>

            <a
              className="flex items-center gap-1 hover:underline hover:text-indigo-500"
              href="https://twitter.com/maiconloure"
              target="_blank"
              rel="noopener"
            >
              <BsTwitter />
              Twitter
            </a>
            <a
              className="flex items-center gap-1 hover:underline hover:text-indigo-500"
              href="https://www.instagram.com/maiconlloure/"
              target="_blank"
              rel="noopener"
            >
              <BsInstagram />
              Instagram
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
